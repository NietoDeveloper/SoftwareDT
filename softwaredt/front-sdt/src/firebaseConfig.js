import { initializeApp, getApps, getApp } from "firebase/app";

// 💡 Nota: Asegúrate de que esta configuración sea la que se está usando
// en el archivo `installHook.js` o en el componente que accede a Storage.
const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54xf67A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",
  storageBucket: "software-dt.appspot.com", // Confirma que este valor es correcto
  messagingSenderId: "739796107685",
  appId: "1:739796107685:web:6652ea0c94a15b6aee684c"
};

// 🌟 Mejorando la inicialización para evitar re-inicializaciones:
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();

export { app };