import { initializeApp, getApps, getApp } from "firebase/app";
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54xf67A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",
  storageBucket: "software-dt-storage-alpha",
  messagingSenderId: "739796107685",
  appId: "1:739796107685:web:6652ea0c94a15b6aee684c"
};

// --- FIX CRÍTICO: Evitar el error app/duplicate-app ---
// 1. Verifica si ya existe alguna aplicación Firebase inicializada.
// 2. Si getApps() devuelve un array vacío (no existe), inicializa la app.
// 3. Si ya existe (array no vacío), usa getApp() para obtener la instancia por defecto.
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

export const storage = getStorage(app);
// Si tienes otros servicios (como Firestore), los exportarías usando 'app':
// import { getFirestore } from 'firebase/firestore';
// export const db = getFirestore(app);