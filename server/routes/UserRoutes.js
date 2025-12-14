import admin from 'firebase-admin';
import { db } from '../firebaseAdmin.js'
import { Router } from 'express';
import verifyToken from '../middleware/authMiddleware.js';

const userRoutes = Router()

userRoutes.post("/check-in", verifyToken, async (req, res) => {
    try {
        const uid = req.user.uid;
        const userRef = db.collection("users").doc(uid);

        // We return the result FROM the transaction to avoid a second DB read
        const result = await db.runTransaction(async (tx) => {
            const snap = await tx.get(userRef);
            if (!snap.exists) throw new Error("User not found");

            const user = snap.data();

            // 1. Handle Dates safely
            const now = new Date();
            const lastCheckTimestamp = user.lastCheckInDate;
            // Convert Firestore Timestamp to JS Date, or null if it doesn't exist
            const lastCheckDate = lastCheckTimestamp ? lastCheckTimestamp.toDate() : null;

            // 2. Check if already checked in TODAY (Calendar Date comparison)
            if (lastCheckDate) {
                if (
                    lastCheckDate.getDate() === now.getDate() &&
                    lastCheckDate.getMonth() === now.getMonth() &&
                    lastCheckDate.getFullYear() === now.getFullYear()
                ) {
                    // Stop transaction and return a specific flag
                    return { alreadyCheckedIn: true, user };
                }
            }

            // 3. STREAK LOGIC (Calendar Day Logic)
            let newCurrent = 1;

            if (lastCheckDate) {
                // Create a date object for "Yesterday"
                const yesterday = new Date(now);
                yesterday.setDate(now.getDate() - 1);

                // Check if last check-in was specifically on "Yesterday"
                const isYesterday =
                    lastCheckDate.getDate() === yesterday.getDate() &&
                    lastCheckDate.getMonth() === yesterday.getMonth() &&
                    lastCheckDate.getFullYear() === yesterday.getFullYear();

                if (isYesterday) {
                    newCurrent = (user.streak?.current || 0) + 1;
                }
            }

            const newBest = Math.max(user.streak?.best || 0, newCurrent);
            const newCoins = (user.coins || 0) + 10;

            // 4. Update
            tx.update(userRef, {
                "streak.current": newCurrent,
                "streak.best": newBest,
                "streak.lastActivityDate": admin.firestore.FieldValue.serverTimestamp(),
                coins: newCoins,
                lastCheckInDate: admin.firestore.FieldValue.serverTimestamp(),
            });

            // Return the NEW values so we don't have to query DB again
            return {
                alreadyCheckedIn: false,
                coins: newCoins,
                streak: {
                    current: newCurrent,
                    best: newBest
                }
            };
        });

        // Handle the result from the transaction
        if (result.alreadyCheckedIn) {
            return res.json({
                success: true,
                already: true,
                coins: result.user.coins,
                streak: result.user.streak
            });
        }

        return res.json({
            success: true,
            already: false,
            coins: result.coins,
            streak: result.streak,
        });

    } catch (err) {
        console.error("Check-in error:", err);
        return res.status(500).json({
            success: false,
            error: err.message,
        });
    }
});

export default userRoutes