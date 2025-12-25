const allowedOrigins = [
    'http://localhost:5173',           // Desarrollo local
    'https://softwaredt.vercel.app',   // Producción en Vercel 🚀
    'https://softwaredt.vercel.app/'   // Variación común con slash
];

const corsOptions = {
    origin: (origin, callback) => {
        // Normalizamos el origen eliminando el slash final si existe para la comparación
        const sanitizedOrigin = origin ? origin.replace(/\/$/, "") : null;
        
        // Permitir si el origen está en la lista o si no hay origen (como Postman o peticiones del mismo servidor)
        if (!origin || allowedOrigins.includes(origin) || allowedOrigins.includes(sanitizedOrigin)) {
            callback(null, true);
        } else {
            // Log de seguridad en la consola del servidor para depurar bloqueos en producción
            console.warn(`[CORS BLOQUEADO]: Intento de acceso desde ${origin}`);
            callback(new Error('Acceso denegado por políticas de seguridad de Software DT'));
        }
    },
    credentials: true, // Crucial para permitir el envío de Cookies (Refresh Token)
    optionsSuccessStatus: 200,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Definir métodos permitidos explícitamente
};

module.exports = corsOptions;