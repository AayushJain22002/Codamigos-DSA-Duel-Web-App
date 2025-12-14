// server/src/controllers/matchController.js
import { db, rtdb } from '../firebaseAdmin.js';
import admin from 'firebase-admin';
import { computeEloMulti, computeRanksFromRoom } from '../utils/eloCounter.js';

/**
 * finalizeMatchController
 * POST /api/match/finalize
 * body: { roomCode: string }
 * requires auth middleware to set req.user (uid)
 */
export const finalizeMatchController = async (req, res) => {
  const { roomCode } = req.body;
  const callerUid = req.user?.uid ?? null;

  if (!roomCode) return res.status(400).json({ error: 'roomCode required' });

  try {
    // 1) Read room from RTDB
    const roomRef = rtdb.ref(`rooms/${roomCode}`);
    const roomSnap = await roomRef.once('value');
    
    if (!roomSnap.exists()) return res.status(404).json({ error: 'Room not found' });

    const room = roomSnap.val();
    if (room.status !== 'ongoing') {
      return res.status(400).json({ error: 'Room is not ongoing or already finished' });
    }

    // 2) Compute ranks + prepare Elo
    const ranked = computeRanksFromRoom(room); // [{ uid, solvedCount, earliest, rating, rank }, ...]
    const playersForElo = ranked.map(p => ({
      uid: p.uid,
      rating: Number(p.rating ?? 1200),
      rank: Number(p.rank)
    }));
    
    const eloResults = computeEloMulti(playersForElo, {
      K: (rating, uid, idx) => {
        const gamesPlayed = room.players?.[playersForElo[idx].uid]?.gamesPlayed ?? 0;
        if (gamesPlayed < 30) return 40;
        if (rating >= 2200) return 16;
        return 32;
      }
    });

    // Pre-create archived doc ref so we can return ID
    const matchDocRef = db.collection('roomsData').doc();
    const matchDocId = matchDocRef.id;

    // --- Transaction: read all users first, then write updates & archived doc ---
    let updatedUsersResult = [];
    await db.runTransaction(async (tx) => {
      // Build user refs
      const userRefs = eloResults.map(r => db.collection('users').doc(r.uid));

      // Read all users first (Firestore requires reads before writes in a transaction)
      const userSnaps = [];
      for (const ref of userRefs) {
        const snap = await tx.get(ref); // read
        userSnaps.push({ ref, snap });
      }

      // LOG: which users exist or missing (server console)
      userSnaps.forEach(({ ref, snap }) => {
        console.log(`[finalizeMatch] userDoc: ${ref.path}, exists: ${snap.exists}`);
      });

      // Helper: determine win/loss/draw by rank
      const getResultType = (uid) => {
        const entry = ranked.find(r => r.uid === uid);
        if (!entry) return 'loss';
        const rank = entry.rank;
        const total = ranked.length;
        // win if rank 1 and unique
        if (rank === 1) {
          const sameRankCount = ranked.filter(x => x.rank === 1).length;
          return sameRankCount > 1 ? 'draw' : 'win';
        }
        // loss if last and unique
        if (rank === total) {
          const sameRankCount = ranked.filter(x => x.rank === rank).length;
          return sameRankCount > 1 ? 'draw' : 'loss';
        }
        // if multiple share same rank -> draw
        const sameRankCount = ranked.filter(x => x.rank === rank).length;
        if (sameRankCount > 1) return 'draw';
        // middle ranks -> treat as neutral/loss (you can adjust)
        return 'loss';
      };

      // Prepare JS Date timestamp (Correct fix for array error)
      const now = new Date();

      // Apply writes for users (all reads already done)
      updatedUsersResult = [];
      for (let i = 0; i < eloResults.length; i++) {
        const r = eloResults[i];
        const { ref: userRef, snap } = userSnaps[i];
        const resultType = getResultType(r.uid);

        if (!snap.exists) {
          // Create new user doc with initial counters and last match info
          const payload = {
            elo: r.newRating,
            lastDelta: r.delta,
            lastMatchAt: now,
            lastMatchId: matchDocId,
            gamesPlayed: 1,
            wins: resultType === 'win' ? 1 : 0,
            losses: resultType === 'loss' ? 1 : 0,
            draws: resultType === 'draw' ? 1 : 0,
            matchHistory: [
              {
                matchId: matchDocId,
                delta: r.delta,
                result: resultType,
                rank: ranked.find(x => x.uid === r.uid)?.rank ?? null,
                solved: ranked.find(x => x.uid === r.uid)?.solvedCount ?? 0,
                timestamp: now
              }
            ]
          };
          tx.set(userRef, payload, { merge: true });
          updatedUsersResult.push({ uid: r.uid, action: 'created', payload });
        } else {
          // Update existing user doc: increment counters and push small history (keep last 10)
          const prev = snap.data() || {};
          const newGames = (prev.gamesPlayed ?? 0) + 1;
          const wins = (prev.wins ?? 0) + (resultType === 'win' ? 1 : 0);
          const losses = (prev.losses ?? 0) + (resultType === 'loss' ? 1 : 0);
          const draws = (prev.draws ?? 0) + (resultType === 'draw' ? 1 : 0);

          // Build new small history entry (we store as array up to 20 entries in this transaction)
          const prevHistory = Array.isArray(prev.matchHistory) ? prev.matchHistory : [];
          const newEntry = {
            matchId: matchDocId,
            delta: r.delta,
            result: resultType,
            rank: ranked.find(x => x.uid === r.uid)?.rank ?? null,
            solved: ranked.find(x => x.uid === r.uid)?.solvedCount ?? 0,
            timestamp: now
          };
          // keep last 19 then add new (so final length <= 20)
          const historySlice = prevHistory.slice(-19);
          const newHistory = [...historySlice, newEntry];

          const payload = {
            elo: r.newRating,
            lastDelta: r.delta,
            lastMatchAt: now,
            lastMatchId: matchDocId,
            gamesPlayed: newGames,
            wins,
            losses,
            draws,
            matchHistory: newHistory
          };

          tx.update(userRef, payload);
          updatedUsersResult.push({ uid: r.uid, action: 'updated', payload });
        }
      }

      // Build compact players snapshot (important fields only)
      const playersSnapshot = {};
      Object.entries(room.players || {}).forEach(([uid, p]) => {
        playersSnapshot[uid] = {
          uid,
          name: p?.name ?? null,
          isHost: Boolean(p?.isHost),
          ratingBefore: (typeof p?.rating === 'number') ? p.rating : null,
          joinedAt: p?.joinedAt ?? null,
          gamesPlayed: p?.gamesPlayed ?? null
        };
      });

      // problems and compact problemsSolved
      const problemsArr = Array.isArray(room.problems) ? room.problems.slice(0, 100) : [];
      const problemsSolvedCompact = {};
      Object.entries(room.problemsSolved || {}).forEach(([pid, entry]) => {
        problemsSolvedCompact[pid] = {
          solvedBy: entry?.solvedBy ?? null,
          solverName: entry?.solverName ?? null,
          solvedAt: entry?.solvedAt ?? null
        };
      });

      // Summary compute (lightweight)
      const computeSummary = (roomObj, rankedArr, eloArr) => {
        const problemsSolvedMap = roomObj.problemsSolved || {};
        const problemsArrLocal = Array.isArray(roomObj.problems) ? roomObj.problems : (roomObj.state?.problems ?? []);
        const totalParticipants = Object.keys(roomObj.players || {}).length;
        const totalProblems = problemsArrLocal.length || (roomObj.state?.totalProblems ?? 0);
        const totalSolves = Object.keys(problemsSolvedMap).length;

        let durationSeconds = null;
        if (typeof roomObj.startTime === 'number') {
          const finishTs = roomObj.finishedAt ?? roomObj.endTime ?? Date.now();
          durationSeconds = Math.max(0, Math.floor((finishTs - roomObj.startTime) / 1000));
        }

        const top = rankedArr && rankedArr[0] ? rankedArr[0] : null;
        const topSolver = top?.uid ?? null;
        const topSolverCount = top?.solvedCount ?? 0;

        const solveTimes = [];
        if (roomObj.startTime && typeof roomObj.startTime === 'number') {
          for (const [pid, entry] of Object.entries(problemsSolvedMap)) {
            if (entry?.solvedAt && typeof entry.solvedAt === 'number') {
              solveTimes.push(Math.max(0, Math.floor((entry.solvedAt - roomObj.startTime) / 1000)));
            }
          }
        }
        const avgSolveTimeSeconds = solveTimes.length ? (solveTimes.reduce((a, b) => a + b, 0) / solveTimes.length) : null;
        const medianSolveTimeSeconds = solveTimes.length ? solveTimes.sort((a, b) => a - b)[Math.floor(solveTimes.length / 2)] : null;
        let fastestSolve = null;
        if (solveTimes.length) {
          const minSec = Math.min(...solveTimes);
          for (const [pid, entry] of Object.entries(problemsSolvedMap)) {
            if (entry?.solvedAt && Math.floor((entry.solvedAt - roomObj.startTime) / 1000) === minSec) {
              fastestSolve = { uid: entry.solvedBy ?? null, problem: pid, timeSeconds: minSec };
              break;
            }
          }
        }

        const deltas = (eloArr || []).map(r => r.delta ?? 0);
        const ratingDeltaMin = deltas.length ? Math.min(...deltas) : 0;
        const ratingDeltaMax = deltas.length ? Math.max(...deltas) : 0;
        const ratingDeltaSum = deltas.reduce((a, b) => a + b, 0);

        // submissions summary
        const submissionsMap = roomObj.submissions || {};
        let totalSubmissions = 0;
        const submissionsCountPerPlayer = {};
        Object.entries(submissionsMap).forEach(([problemId, perProblemMap]) => {
          Object.entries(perProblemMap || {}).forEach(([uid, sub]) => {
            submissionsCountPerPlayer[uid] = (submissionsCountPerPlayer[uid] || 0) + 1;
            totalSubmissions++;
          });
        });

        // messages summary
        const messagesMap = roomObj.messages || {};
        const messageEntries = Object.entries(messagesMap);
        const messagesCount = messageEntries.length;
        let lastMessage = null;
        if (messageEntries.length) {
          const sortedMsgs = messageEntries
            .map(([k, v]) => ({ key: k, ...v }))
            .filter(m => m && typeof m.timestamp === 'number')
            .sort((a, b) => (b.timestamp || 0) - (a.timestamp || 0));
          if (sortedMsgs[0]) {
            lastMessage = {
              sender: sortedMsgs[0].sender ?? null,
              senderId: sortedMsgs[0].senderId ?? null,
              text: (sortedMsgs[0].text ?? '').slice(0, 800),
              timestamp: sortedMsgs[0].timestamp ?? null
            };
          }
        }

        const gamesPlayedSnapshot = {};
        Object.entries(roomObj.players || {}).forEach(([uid, p]) => {
          gamesPlayedSnapshot[uid] = p?.gamesPlayed ?? null;
        });

        return {
          totalParticipants,
          totalProblems,
          totalSolves,
          durationSeconds,
          topSolver,
          topSolverCount,
          avgSolveTimeSeconds,
          medianSolveTimeSeconds,
          fastestSolve,
          ratingDeltaMin,
          ratingDeltaMax,
          ratingDeltaSum,
          totalSubmissions,
          submissionsCountPerPlayer,
          messagesCount,
          lastMessage,
          gamesPlayedSnapshot
        };
      };

      const summary = computeSummary(room, ranked, eloResults);

      // Finally write the compact archived doc using the pre-created matchDocRef
      tx.set(matchDocRef, {
        meta: {
          roomId: roomCode,
          roomName: room.name ?? room.roomName ?? null,
          code: room.code ?? roomCode ?? null,
          mode: room.mode ?? null,
          difficulty: room.difficulty ?? null,
          status: 'finished',
          winner: ranked[0]?.uid ?? null,
          totalParticipants: summary.totalParticipants,
          totalProblems: summary.totalProblems,
          totalSolves: summary.totalSolves,
          durationSeconds: summary.durationSeconds,
          archivedAt: admin.firestore.FieldValue.serverTimestamp(), // Safe here (top level)
          createdAt: room.createdAt ?? null,
          gamesPlayedSnapshot: summary.gamesPlayedSnapshot
        },

        players: playersSnapshot,
        messagesSummary: {
          count: summary.messagesCount,
          lastMessage: summary.lastMessage
        },

        problems: problemsArr,
        problemsSolved: problemsSolvedCompact,

        submissionsSummary: {
          totalSubmissions: summary.totalSubmissions,
          perPlayer: summary.submissionsCountPerPlayer
        },

        ranking: ranked,
        eloResults: eloResults,

        summary: {
          topSolver: summary.topSolver,
          topSolverCount: summary.topSolverCount,
          avgSolveTimeSeconds: summary.avgSolveTimeSeconds,
          medianSolveTimeSeconds: summary.medianSolveTimeSeconds,
          fastestSolve: summary.fastestSolve,
          ratingDeltaMin: summary.ratingDeltaMin,
          ratingDeltaMax: summary.ratingDeltaMax,
          ratingDeltaSum: summary.ratingDeltaSum
        },

        finishedBy: callerUid ?? null
      });
    }); // end transaction

    // 6) DELETE Room from RTDB
    // Use .remove() to delete the node completely instead of updating status
    await roomRef.remove();

    // 7) Return results and the archived doc id and updatedUsersResult
    return res.json({
      ok: true,
      results: eloResults,
      ranking: ranked,
      archivedId: matchDocId,
      updatedUsers: updatedUsersResult
    });
  } catch (err) {
    console.error('finalizeMatch error', err);
    return res.status(500).json({ error: 'Failed to finalize match', details: err.message });
  }
};