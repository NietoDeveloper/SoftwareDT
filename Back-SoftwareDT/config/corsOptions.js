// config/corsOptions.js
import dotenv from 'dotenv';
dotenv.config();

/**
 * SOFTWARE DT - CORS ENGINE 
 * Control de acceso perimetral para el Datacenter en Railway.
 */

const allowedOrigins = [
    process.env.CLIENT_URL,            // URL dinámica desde variables de entorno
    'https://softwaredt.vercel.app',   // Software DT Production
    'http://localhost:5173',           // Entorno Vite
    'http://localhost:3000',           // Entorno Next.js
    'http://127.0.0.1:5173'            // IP Loopback
].filter(Boolean); 

const corsOptions = {
    origin: (origin, callback) => {
        // 1. PROTOCOLO OPEN: Permitir herramientas de testing (Postman) o peticiones Server-to-Server
        if (!origin || process.env.NODE_ENV === 'development') {
            return callback(null, true);
        }

        const sanitizedOrigin = origin.replace(/\/$/, "").toLowerCase();
        
        const isAllowed = allowedOrigins.some(allowed => {
            if (!allowed) return false;
            return allowed.replace(/\/$/, "").toLowerCase() === sanitizedOrigin;
        });

        if (isAllowed) {
            callback(null, true);
        } else {
            // Log de auditoría para NietoDeveloper en la consola de Railway
            console.warn(`🚨 [CORS_SECURITY]: Intento de acceso no autorizado desde: ${origin}`);
            callback(new Error('Acceso restringido por protocolos de seguridad Software DT'));
        }
    },
    credentials: true, // VITAL para persistencia de Cookies y Refresh Tokens
    methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
    allowedHeaders: [
        'Content-Type', 
        'Authorization', 
        'X-Requested-With', 
        'Accept',
        'x-sdt-access', // Header mandatorio para Software DT
        'x-api-key'
    ],
    // Permitimos que el cliente lea el header de las cookies para sincronizar sesión
    exposedHeaders: ['set-cookie'], 
    optionsSuccessStatus: 200,
};

export default corsOptions;