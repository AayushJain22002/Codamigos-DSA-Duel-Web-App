import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyC8P8iT4FITpR-XQXsBGe3QRhxPOQs0ZF0",
  authDomain: "codamigos-4f9b9.firebaseapp.com",
  projectId: "codamigos-4f9b9",
  storageBucket: "codamigos-4f9b9.firebasestorage.app",
  messagingSenderId: "117224252200",
  appId: "1:117224252200:web:fa84d2f09f9a1a7dea261d",
  measurementId: "G-4WGBBH2ZQL",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

export { auth, db };
