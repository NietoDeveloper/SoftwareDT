/**
 * SOFTWARE DT - FIREBASE INFRASTRUCTURE CONFIGURATION
 * * This module initializes the Firebase SDK for the Software DT ecosystem.
 * Security Note: All sensitive credentials are loaded via Environment Variables (Vite).
 * * Developed by: NietoDeveloper (Manuel Nieto)
 * Location: Bogotá, Colombia 🇨🇴
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Firebase Configuration Object using Vite's Environment Variables
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || "YOUR_API_KEY",
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || "YOUR_AUTH_DOMAIN",
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || "YOUR_PROJECT_ID",
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || "YOUR_STORAGE_BUCKET",
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || "YOUR_MESSAGING_SENDER_ID",
  appId: import.meta.env.VITE_FIREBASE_APP_ID || "YOUR_APP_ID"
};

/**
 * Initialization Logic (Singleton Pattern)
 * Ensures that the app is only initialized once, even during Hot Module Replacement (HMR).
 */
let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else {
  app = getApp();
}

// Initialize and export core services
export const auth = getAuth(app);
export const db = getFirestore(app);
export const storage = getStorage(app);

export default app;