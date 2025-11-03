// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const storage = getStorage(app)
//const analytics = getAnalytics(app);


// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getStorage} from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54xf67A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",
  storageBucket: "software-dt.firebasestorage.app",
  messagingSenderId: "739796107685",
  appId: "1:739796107685:web:6652ea0c94a15b6aee684c"
};