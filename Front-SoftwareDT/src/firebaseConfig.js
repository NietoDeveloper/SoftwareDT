import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",

};

let app;
if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
} else 

const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage };