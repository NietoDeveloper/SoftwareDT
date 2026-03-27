import allowedOrigins from '../config/allowedOrigins.js';

/**
 * SOFTWARE DT - CREDENTIALS & CORS SHAKING (S+ Tier)
 * Habilita el flujo de cookies seguras y headers de autorización.
 */
const credentials = (req, res, next) => {
    const origin = req.headers.origin;

    // 1. Verificación en Lista Blanca de Software DT (Railway/Vercel)
    if (allowedOrigins.includes(origin)) {
        // PERMITIR CREDENCIALES (VITAL para refresh-token vía Cookies)
        res.header('Access-Control-Allow-Credentials', 'true');
        
        // Refuerzo de origen dinámico para evitar el error "Wildcard not allowed with credentials"
        res.header('Access-Control-Allow-Origin', origin);

        // 2. Headers de seguridad para Software DT
        // Aseguramos que el navegador permita los headers personalizados que usamos
        res.header(
            'Access-Control-Allow-Headers', 
            'Origin, X-Requested-With, Content-Type, Accept, Authorization, x-sdt-access'
        );
    }
    
    // Si es una petición de pre-vuelo (OPTIONS), respondemos OK inmediatamente
    if (req.method === 'OPTIONS') {
        return res.sendStatus(200);
    }
    
    next();
};

export default credentials;