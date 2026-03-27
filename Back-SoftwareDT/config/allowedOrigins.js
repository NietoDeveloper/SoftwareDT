/**
 * SOFTWARE DT - ALLOWED ORIGINS MANAGER
 * Normalización dinámica de dominios autorizados para el Datacenter.
 */

// 1. Extracción y limpieza de orígenes desde el clúster de variables (.env)
const originsFromEnv = process.env.ALLOWED_ORIGINS 
    ? process.env.ALLOWED_ORIGINS.split(',').map(origin => origin.trim()) 
    : [];

const allowedOrigins = [
    process.env.FRONTEND_URL, // Tu URL principal de Vercel (https://softwaredt.vercel.app)
    process.env.CLIENT_URL,   // URL alternativa si se usa
    ...originsFromEnv,         // URLs adicionales: localhost, IPs de prueba, etc.
];

// 2. Protocolo de Limpieza S+
// Eliminamos duplicados, valores vacíos y removemos slash final de cada origen
const uniqueOrigins = [...new Set(allowedOrigins)]
    .filter(Boolean)
    .map(origin => origin.replace(/\/$/, "")); 

// Log de diagnóstico silencioso para el arranque en Railway
if (process.env.NODE_ENV === 'development') {
    console.log('📡 [SDT_CORS]: Orígenes autorizados:', uniqueOrigins);
}

export default uniqueOrigins;