import { initializeApp, getApps, getApp } from "firebase/app";

// 💡 Nota: Esta configuración ahora incluye 'storageBucket', resolviendo el error.
// Se recomienda mover las claves sensibles (API Key, etc.) a variables de entorno.
const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54xf67A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",
  storageBucket: "software-dt.appspot.com", // SOLUCIONADO: Bucket de almacenamiento especificado
  messagingSenderId: "739796107685",
  appId: "1:739796107685:web:6652ea0c94a15b6aee684c"
};

// Initializes the Firebase app safely (prevents re-initialization in React/hot-reloading environments).
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };