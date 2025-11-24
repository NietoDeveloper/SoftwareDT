const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    // 1. Obtener el encabezado de autorización
    // Usa req.headers.authorization directamente (Express a menudo lo normaliza a minúsculas)
    const authHeader = req.headers.authorization;

    // 2. Verificar la presencia y el formato 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG: Access Denied. Token is missing or invalid format (401).');
        // 401 Unauthorized: El cliente debe autenticarse (enviar un token válido)
        return res.status(401).json({ 
            success: false, 
            message: "Acceso denegado. Se requiere un token de portador ('Bearer')." 
        });
    }

    const token = authHeader.split(' ')[1];

    // 3. Verificar el token usando la clave secreta
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                // 403 Forbidden: El token existe pero es inválido (ej. expirado, malformado, firma incorrecta)
                // Usar 403 es apropiado si el cliente envió un token, pero no tiene acceso.
                const errorMessage = err.name === 'TokenExpiredError' 
                    ? "Token expirado. Por favor, inicia sesión de nuevo."
                    : "Token inválido o malformado.";
                
                console.log(`DEBUG: Token verification failed (${err.name}): ${err.message}`);
                
                return res.status(403).json({ 
                    success: false, 
                    message: `Acceso prohibido. ${errorMessage}`
                });
            }

            // 4. Verificar el payload mínimo y adjuntar datos al objeto request
            if (!decoded || !decoded.id) {
                console.log('DEBUG: Token payload is incomplete (missing user ID).');
                return res.status(403).json({ 
                    success: false, 
                    message: "Acceso prohibido. Información de usuario incompleta en el token." 
                });
            }
            
            // Adjuntar datos decodificados al objeto de solicitud para middlewares/rutas subsiguientes
            req.userId = decoded.id;
            req.roles = decoded.roles; 
            
            next();
        }
    );
};

module.exports = { verifyAccess };