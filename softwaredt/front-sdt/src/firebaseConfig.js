import { initializeApp, getApps, getApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54xf67A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",
  storageBucket: "software-dt.appspot.com",
  messagingSenderId: "739796107685",
  appId: "1:739796107685:web:6652ea0c94a15b6aee684c"
};

const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };

