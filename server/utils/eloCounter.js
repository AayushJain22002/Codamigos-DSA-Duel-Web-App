const computeExpectedScored = (ratings) => {
    const N = ratings.length;
    const E = new Array(N).fill(0)
    for (let i = 0; i < N; i++) {
        for (let j = 0; j < N; j++) {
            if (i == j) {
                const diff = (ratings[j] - ratings[i]) / 400;
                const denom = 1 + Math.pow(10, diff);
                E[i] += 1 / denom;
            }
        }
    }
    return E
}

const computeActualScoreFromRanks = (ranks) => {
    const N = ranks.length;
    const baseScore = (rank) => (N - rank)
    const rankToIndices = {}
    ranks.forEach((r, index) => {
        if (!rankToIndices[r]) rankToIndices[r] = [];
        rankToIndices[r].push(index);
    });

    const actual = new Array(N).fill(0);
    for (const rankStr of Object.keys(rankToIndices)) {
        const rank = Number(rankStr);
        const indices = rankToIndices[rank];
        if (indices.length === 1) {
            actual[indices[0]] = baseScore(rank);
        } else {
            // tied ranks: average the baseScore across the tied positions
            const sum = indices.reduce((s, _) => s + baseScore(rank), 0);
            const avg = sum / indices.length;
            indices.forEach(idx => actual[idx] = avg);
        }
    }
    return actual
}

export const computeEloMulti = (players, options = {}) => {
    if (!Array.isArray(players) || players.length === 0) return [];

    const N = players.length;
    const ratings = players.map(p => (typeof p.rating === 'number' ? p.rating : 1200));
    const ranks = players.map(p => (typeof p.rank === 'number' ? p.rank : N)); // default worst

    const expected = computeExpectedScored(ratings); // each in [0, N-1]
    const actual = computeActualScoreFromRanks(ranks);   // each in [0, N-1]

    const results = players.map((p, idx) => {
        // Determine K: allow per-player K function or constant
        const Kopt = options.K;
        let K = 32;
        if (typeof Kopt === 'function') {
            try { K = Number(Kopt(p.rating, p.uid, idx)) || 32; } catch (e) { K = 32; }
        } else if (typeof Kopt === 'number') {
            K = Kopt;
        }

        // Normalize difference to [ -1 .. 1 ] by dividing by (N-1)
        const diff = (actual[idx] - expected[idx]) / (N - 1);
        // delta = K * diff, rounding to integer rating steps
        const rawDelta = K * diff;
        const delta = Math.round(rawDelta);
        const newRating = Math.max(0, Math.round(p.rating + delta)); // don't go below 0
        return {
            uid: p.uid,
            oldRating: p.rating,
            newRating,
            delta
        };
    });

    return results;
}

export function computeRanksFromRoom(room) {
  const players = Object.keys(room.players || {});
  const solvedCount = {};
  const earliest = {};
  players.forEach(uid => { solvedCount[uid] = 0; earliest[uid] = Infinity; });

  const problemsSolved = room.problemsSolved || {};
  Object.values(problemsSolved).forEach(entry => {
    const uid = entry.solvedBy;
    if (!uid || !solvedCount.hasOwnProperty(uid)) return;
    solvedCount[uid] += 1;
    earliest[uid] = Math.min(earliest[uid], entry.solvedAt || Infinity);
  });

  // Build array and sort
  const arr = players.map(uid => ({
    uid,
    solvedCount: solvedCount[uid],
    earliest: earliest[uid],
    rating: room.players[uid].rating ?? 400,
  }));

  arr.sort((a, b) => {
    const diff = b.solvedCount - a.solvedCount;
    if (diff !== 0) return diff;
    return (a.earliest === b.earliest) ? 0 : (a.earliest - b.earliest);
  });

  // assign ranks (ties get same rank)
  const results = [];
  for (let i = 0; i < arr.length; i++) {
    if (i === 0) {
      results.push({ ...arr[i], rank: 1 });
    } else {
      const prev = arr[i - 1];
      const curr = arr[i];
      const tied = (curr.solvedCount === prev.solvedCount) && (curr.earliest === prev.earliest);
      results.push({ ...curr, rank: tied ? results[i - 1].rank : i + 1 });
    }
  }
  return results;
};
