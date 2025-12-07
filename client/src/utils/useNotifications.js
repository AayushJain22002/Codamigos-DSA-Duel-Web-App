import { useState, useEffect } from "react";
import {
    collection, query, where, orderBy, onSnapshot,
    doc, deleteDoc,
    addDoc,
    serverTimestamp
} from "firebase/firestore";
import { useAuth } from "../lib/AuthProvider";
import { db } from "../../firebase";
import toast from "react-hot-toast";

export function useNotifications() {
    const { currentUser } = useAuth();
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        if (!currentUser) return;
        const q = query(
            collection(db, "notifications"),
            where("userId", "==", currentUser.uid),
            orderBy("createdAt", "desc")
        );

        const unsubscribe = onSnapshot(q, (snapshot) => {
            // automatically syncs notification list when DB changes
            setNotifications(
                snapshot.docs.map((doc) => ({
                    id: doc.id,
                    ...doc.data(),
                }))
            );
        });

        return () => unsubscribe();
    }, [currentUser]);

    // THIS IS THE FUNCTION YOU WANTED
    const markRead = async (id) => {
        try {
            await deleteDoc(doc(db, "notifications", id));
        } catch (error) {
            console.error("Error deleting notification:", error);
        }
    };



    const sendNotification = async (targetUserId, title, type = "info") => {
        let description = "";
        switch (type) {
            case "sentFriendReq":
                description = "Check your 'My Amigos' tab to respond.";
                break;

            case "acceptedFriendReq":
                description = "You are now connected! Start a chat or duel.";
                break;

            case "challengeReceived":
                description = "A new coding battle awaits you. Don't keep them waiting!";
                break;

            case "challengeWon":
                description = "Great job! Your rating has increased.";
                break;

            case "challengeLost":
                description = "Don't give up! Review the solution and try again.";
                break;

            // --- SYSTEM ---
            case "welcome":
                description = "We are glad to have you on Codamigos.";
                break;

            case "leaderboardUpdate":
                description = "Ranks have been updated. Check your position!";
                break;

            default:
                description = "Click to view details.";
                break;
        }

        try {
            const notifRef = collection(db, "notifications");
            await addDoc(notifRef, {
                userId: targetUserId,
                title: title,
                type: type,
                description: description,
                read: false,
                createdAt: serverTimestamp()
            });
            // toast.success(`Notification sent to ${targetUserId}`);
        } catch (error) {
            console.log(error)
            // toast.error("Error sending notification:", error);
        }
    };
    return { notifications, markRead, sendNotification };

}