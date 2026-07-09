import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",
  storageBucket: "software-dt.appspot.com",
  messagingSenderId: "73979610685",

};

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