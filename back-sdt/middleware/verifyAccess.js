const jwt = require('jsonwebtoken');

/**
 * verifyAccess - Middleware de Seguridad Nivel Senior para SoftwareDT
 * Maneja la verificación de JWT y normalización de identidades.
 */
const verifyAccess = (req, res, next) => {
    // Manejo flexible de encabezados
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Verificar presencia y formato del token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG [SDT]: Access Denied - Missing or Malformed Token (401).');
        return res.status(401).json({ 
            success: false, 
            message: "Acceso denegado. Token no proporcionado o formato incorrecto." 
        }); 
    }

    // 2. Extracción limpia
    const token = authHeader.split(' ')[1];

    // 3. Verificación criptográfica
    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                let errorMessage;
                // Clasificación de errores para feedback preciso en el Frontend
                if (err.name === 'TokenExpiredError') {
                    errorMessage = "Sesión expirada. Por favor, inicia sesión de nuevo.";
                } else if (err.name === 'JsonWebTokenError') {
                    errorMessage = "Token inválido (Firma no reconocida).";
                } else {
                    errorMessage = "Error de autenticación en el Datacenter.";
                }
                
                console.log(`DEBUG [SDT]: Auth failed (${err.name}): ${err.message}`);
                
                return res.status(403).json({ 
                    success: false, 
                    message: errorMessage
                });
            }

            // 4. Normalización del Payload (Compatible con UserInfo y Root)
            const userInfo = decoded.UserInfo || decoded;

            if (!userInfo || (!userInfo.id && !userInfo._id)) {
                console.log('DEBUG [SDT]: Token payload is incomplete or corrupt.');
                return res.status(403).json({ 
                    success: false, 
                    message: "Acceso prohibido. Datos de usuario incompletos en el token." 
                });
            }

            // 5. Inyección de contexto en el Request (Hydration)
            req.userId = userInfo.id || userInfo._id;
            req.roles = userInfo.roles || []; 
            req.user = userInfo.username || userInfo.email || null;
            
            // Lógica de Administrador: Detecta si el rol admin está presente
            // Ajusta "admin" según cómo lo guardes en tu DB (puede ser "admin", "ADMIN", etc.)
            req.isAdmin = Array.isArray(req.roles) && req.roles.some(role => 
                role.toLowerCase() === 'admin'
            );
            
            next();
        }
    );
};

module.exports = verifyAccess;