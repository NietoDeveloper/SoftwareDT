import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Usar la configuración inyectada por el entorno para asegurar la integridad.
// Se asume que '__firebase_config' es una variable global.
const firebaseConfig = JSON.parse(typeof __firebase_config !== 'undefined' ? __firebase_config : '{}');

// Inicializar la aplicación de Firebase de forma segura (solo si no existe).
let app;
if (getApps().length === 0) {
    // Si no hay aplicaciones inicializadas, crea una nueva.
    app = initializeApp(firebaseConfig);
} else {
    // Si ya existe una aplicación, obtén la instancia por defecto.
    app = getApp();
}

// Inicializar los servicios
const auth = getAuth(app);
const db = getFirestore(app);

// Para el error de Storage ("No default bucket found"):
// Este error ocurre si la propiedad 'storageBucket' está ausente o vacía
// en la configuración de Firebase. La inicialización del servicio se mantiene,
// pero asegúrese de que su configuración (firebaseConfig) sea completa.
const storage = getStorage(app);

// Exportar la instancia de la aplicación y los servicios para que sean usados en otros módulos
export { app, auth, db, storage };