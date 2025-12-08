const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    // 1. Manejo de Encabezados (Soporte para 'Authorization' y 'authorization')
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 2. Comprobación inicial: Token faltante o formato incorrecto ('Bearer ')
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG: Access Denied. Token is missing or invalid format (401).');
        // Usar sendStatus(401) es común para no autorizado
        return res.sendStatus(401); 
    }

    // 3. Extracción del Token (la parte después de 'Bearer ')
    const token = authHeader.split(' ')[1];

    // 4. Verificación
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                // Manejo de errores específicos de JWT
                const statusCode = 403;
                let errorMessage;

                if (err.name === 'TokenExpiredError') {
                    errorMessage = "Token expirado. Por favor, inicia sesión de nuevo.";
                } else if (err.name === 'JsonWebTokenError') 
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
