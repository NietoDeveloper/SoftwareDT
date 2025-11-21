const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    // Busca el encabezado 'Authorization', permitiendo variaciones en mayúsculas/minúsculas
    const authHeader = req.headers.Authorization || req.headers.authorization;

    // 1. Verificar la presencia y formato 'Bearer '
    if (!authHeader?.startsWith('Bearer ')) {
        // 401 Unauthorized: No se proporcionó token o el formato es incorrecto
        console.log('DEBUG: Access Denied. No Bearer token found in headers.');
        return res.status(401).json({ message: "Access denied! Token is missing or invalid format." });
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificar el token usando la clave secreta
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                // 403 Forbidden: El token existe pero es inválido (ej. expirado, firma incorrecta)
                console.log('DEBUG: Token verification failed:', err.message);
                return res.status(403).json({ message: "Access denied. Token is invalid or expired." });
            }

            // 3. Asignar el ID de usuario y roles al objeto request
            if (!decoded?.id) {
                 // Protección extra si el payload del token no contiene el ID mínimo requerido
                 console.log('DEBUG: Token payload missing required user ID.');
                 return res.status(403).json({ message: "Access denied. Token payload is incomplete." });
            }
            
            req.userId = decoded.id;
            req.roles = decoded.roles; // Asigna los roles decodificados (Nota: ver sugerencia a continuación)
            
            next();
        }
    );
};

module.exports = { verifyAccess };