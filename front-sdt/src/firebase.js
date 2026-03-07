/**
 * SOFTWARE DT - FIREBASE SERVICE INITIALIZATION
 * * This module manages the connection to Firebase services (Auth, Firestore, Storage).
 * Uses a dynamic configuration approach with environment safety.
 * * Engineering Standard: NietoDeveloper (Committers #1 Colombia)
 */

import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

/**
 * DYNAMIC FIREBASE CONFIGURATION
 * Loads from environment variables for production-grade security.
 * Fallback to an empty object if no config is detected to prevent runtime crashes.
 */
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
    appId: import.meta.env.VITE_FIREBASE_APP_ID
};

/**
 * SINGLETON INITIALIZATION PATTERN
 * Prevents re-initialization of Firebase during Hot Module Replacement (HMR) 
 * or multi-render cycles in React/Vite.
 */
let app;
try {
    if (getApps().length === 0) {
        app = initializeApp(firebaseConfig);
    } else {
        app = getApp();
    }
} catch (error) {
    console.error("Firebase initialization failed:", error);
}

// Exporting Core Services
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };