import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
let app;
if (getApps().length === 0) {

    app = initializeApp(firenfig);
} else {

    app = getApp();
