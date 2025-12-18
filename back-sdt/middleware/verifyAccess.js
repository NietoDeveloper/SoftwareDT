const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    // Manejo de encabezados (soporta 'Authorization' y 'authorization')
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Verificar si el token está presente y tiene el formato 'Bearer '
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG: Access Denied. Token is missing or invalid format (401).');
        return res.status(401).json({ 
            success: false, 
            message: "Acceso denegado. No se proporcionó un token válido." 
        }); 
    }

    // 2. Extraer el token
    const token = authHeader.split(' ')[1];

    // 3. Verificar el Token
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                let errorMessage;
                if (err.name === 'TokenExpiredError') {
                    errorMessage = "Token expirado. Por favor, inicia sesión de nuevo.";
                } else if (err.name === 'JsonWebTokenError') {
                    errorMessage = "Token inválido o malformado.";
                } else {
                    errorMessage = "Error de verificación desconocido.";
                }
                
                console.log(`DEBUG: Token verification failed (${err.name}): ${err.message}`);
                
                return res.status(403).json({ 
                    success: false, 
                    message: `Acceso prohibido. ${errorMessage}`
                });
            }

            // Normalización de datos (coherente con optionalAccess)
            const userInfo = decoded.UserInfo || decoded;

            if (!userInfo || (!userInfo.id && !userInfo._id)) {
                console.log('DEBUG: Token payload is incomplete.');
                return res.status(403).json({ 
                    success: false, 
                    message: "Acceso prohibido. Payload incompleto." 
                });
            }

            // Asignamos al request para uso en controladores
            req.userId = userInfo.id || userInfo._id;
            req.roles = userInfo.roles || []; 
            req.user = userInfo.username || null;
            
            next();
        }
    );
};

// CORRECCIÓN CRÍTICA: Exportar la función directamente, no como objeto
module.exports = verifyAccess;