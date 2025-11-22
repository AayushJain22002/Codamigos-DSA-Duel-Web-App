import { db } from "../firebaseAdmin";

export const getUserProfile = async (uid) => {
  const userRef = db.collection("users").doc(uid);
  const snap = await userRef.get();

  if (!snap.exists) {
    throw new Error("User profile not found in Firestore");
  }
  return snap.data();
}
