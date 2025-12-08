const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG: Access Denied. Token is missing or invalid format (401).');
        return res.status(401).json({ 
            success: false, 
            message: "Acceso denegado. Se requiere un token de portador ('Bearer')." 
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                const errorMessage = err.name === 'TokenExpiredError' 
                    ? "Token expirado. Por favor, inicia sesión de nuevo."
                    : "Token inválido o malformado.";
                
                console.log(`DEBUG: Token verification failed (${err.name}): ${err.message}`);
                
                return res.status(403).json({ 
                    success: false, 
                    message: `Acceso prohibido. ${errorMessage}`
                });
            }

            if (!decoded || !decoded.id) {
                console.log('DEBUG: Token payload is incomplete (missing user ID).');
                return res.status(403).json({ 
                    success: false, 
                    message: "Acceso prohibido. Información de usuario incompleta en el token." 
                });
            }
            
            req.userId = decoded.id;
            req.roles = decoded.roles; 
            
