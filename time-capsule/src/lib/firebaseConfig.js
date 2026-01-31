import { initializeApp, getApps, getApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// These values come from your Firebase Console Settings
const firebaseConfig = {
  apiKey: "AIzaSyAjcXN8feQ7LrnXft2El1trsKSc-LCYFXk",
  authDomain: "timecapsule-d251e.firebaseapp.com",
  projectId: "timecapsule-d251e",
  storageBucket: "timecapsule-d251e.firebasestorage.app",
  messagingSenderId: "118307102880",
  appId: "1:118307102880:web:b210aa5db88261fd8c29c5"
};

// Initialize Firebase (Prevents re-initialization during Next.js hot reloads)
const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);

// Export the services you need
export const db = getFirestore(app);
export const storage = getStorage(app);
export { app };