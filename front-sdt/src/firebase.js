import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = JSON.parse(typeof firebaseConfig !== 'undefined' ? firebaseConfig : '{}');

let app;
if (getApps().length === 0) {

    app = initializeApp(firebaseConfig);
} else {

    app = getApp();
}

const auth = getAuth(app);
const db = getFirestore(app);

const storage = getStorage(app);

export { app, auth, db, storage };