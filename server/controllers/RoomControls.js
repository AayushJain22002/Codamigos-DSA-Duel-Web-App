import { db, rtdb } from "../firebaseAdmin.js";
import { generateRoomCode } from "../utils/generateRoomCode.js"

const pickRandom = (arr, count) => {
    if (!arr || arr.length === 0) return [];
    const shuffled = [...arr].sort(() => 0.5 - Math.random());
    return shuffled.slice(0, count);
};

export const createRoom = async (req, res) => {
    try {
        const { roomName, mode, difficulty, user } = req.body || {};

        if (!user || !user.uid) {
            return res.status(400).json({ ok: false, message: "User is required" });
        }
        let code;
        const metaDoc = await db.collection('system').doc('metadata').get();
        if (!metaDoc.exists) {
            return res.status(500).json({
                ok: false,
                message: "System metadata missing. Please run 'node scripts/update-metadata.mjs'"
            });
        }
        const idsData = metaDoc.data().problemIds;
        let pool = [];
        const selectedDiff = (difficulty || 'mixed').toLowerCase(); // normalize to lowercase

        if (selectedDiff === 'easy') {
            pool = idsData.easy;
        } else if (selectedDiff === 'medium') {
            pool = idsData.medium;
        } else if (selectedDiff === 'hard') {
            pool = idsData.hard;
        } else {
            pool = idsData.all;
        }
        if (!pool || pool.length === 0) {
            console.warn(`Warning: No problems found for difficulty '${selectedDiff}'. Falling back to 'all'.`);
            pool = idsData.all;
        }

        const selectedProblemIds = pickRandom(pool, 3);

        for (let attempt = 0; attempt < 5; attempt++) {
            const candidate = generateRoomCode();
            const snap = await rtdb.ref(`rooms/${candidate}`).get();
            if (!snap.exists()) {
                code = candidate;
                break;
            }
        }
        if (!code) throw new Error("Could not generate room code");
        const now = Date.now();
        const room = {
            code,
            roomName: roomName || "Untitled Room",
            mode: mode || "dsa",
            difficulty: selectedDiff,
            status: "waiting",
            createdAt: now,
            problems: selectedProblemIds,
            activeProblem: 0,
            players: {
                [user.uid]: {
                    uid: user.uid,
                    name: user.name || "Host",
                    avatarUrl: user.avatarUrl || null,
                    isHost: true,
                    joinedAt: now,
                },
            },
            state: {
                currentProblemIndex: 0,
                totalProblems: selectedProblemIds.length,
            },
        };
        await rtdb.ref(`rooms/${code}`).set(room);

        return res.status(201).json({ ok: true, room });
    } catch (err) {
        console.error("createRoom error:", err);
        return res.status(500).json({ ok: false, message: "Server error" });
    }
}

export const joinRoom = async (req, res) => {
    try {
        const { code, user } = req.body;
        if (!code || !user?.uid) {
            return res.status(400).json({ ok: false, message: "Code And User Are required" });
        }
        const upperCode = code.toUpperCase()
        const roomRef = rtdb.ref(`rooms/${upperCode}`)
        const snap = await roomRef.get()

        if (!snap.exists()) {
            return res.status(404).json({ ok: false, message: "Room Not Found" });
        }

        const room = snap.val()
        if (room.status !== 'waiting') {
            return res
                .status(400)
                .json({ ok: false, message: "Room already started" });
        }

        const now = Date.now();
        const playerRef = rtdb.ref(`rooms/${upperCode}/players/${user.uid}`);
        await playerRef.set({
            uid: user.uid,
            name: user.name || "Guest",
            avatarUrl: user.avatarUrl || null,
            isHost: false,
            joinedAt: now,
        })
        const updatedSnap = await roomRef.get();
        const updatedRoom = updatedSnap.val();

        return res.json({ ok: true, room: updatedRoom })
    } catch (err) {
        console.error("joinRoom error:", err);
        return res
            .status(500)
            .json({ ok: false, message: err.message || "Server error" });
    }
}