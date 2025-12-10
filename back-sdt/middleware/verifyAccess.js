const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    // Manejo de encabezados (soporta 'Authorization' y 'authorization')
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Verificar si el token está presente y tiene el formato 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG: Access Denied. Token is missing or invalid format (401).');
        // 401: No autorizado (token faltante)
        return res.sendStatus(401); 
    }

    // 2. Extraer el token
    const token = authHeader.split(' ')[1];

    // 3. Verificar el Token
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                // 403: Prohibido (Token inválido, malformado o expirado)
                const statusCode = 403;
                let errorMessage;

                if (err.name === 'TokenExpiredError') {
                    errorMessage = "Token expirado. Por favor, inicia sesión de nuevo.";
                } else if (err.name === 'JsonWebTokenError') {
                    // CÓDIGO CORREGIDO: Las llaves deben ser coherentes
                    errorMessage = "Token inválido o malformado.";
                } else {
                    errorMessage = "Error de verificación desconocido.";
                }
                
                console.log(`DEBUG: Token verification failed (${err.name}): ${err.message}`);
                
                return res.status(statusCode).json({ 
                    success: false, 
                    message: `Acceso prohibido. ${errorMessage}`
                });
            }

            if (!decoded || !decoded.id || !decoded.roles) {
                console.log('DEBUG: Token payload is incomplete (missing user ID or roles).');
                return res.status(403).json({ 
                    success: false, 
                    message: "Acceso prohibido. Información de usuario incompleta en el token." 
                });
            }

            req.userId = decoded.id;
            req.roles = decoded.roles; 
            
            next();
        }
    );
};

module.exports = { verifyAccess };