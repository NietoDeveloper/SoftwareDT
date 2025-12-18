const jwt = require('jsonwebtoken');

const optionalAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Si no hay token, definimos como guest y salimos rápido
    if (!authHeader?.startsWith('Bearer ')) {
        req.user = null;
        req.userId = null;
        return next();
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificación del token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                // Si el token falló (expirado/mal formado), tratamos como guest
                req.user = null;
                req.userId = null;
            } else {
                // 3. Mapeo de datos (Asegúrate que coincida con tu UserLogin/Refresh)
                // Usualmente es decoded.UserInfo o directamente decoded
                req.user = decoded.UserInfo?.username || decoded.username;
                req.roles = decoded.UserInfo?.roles || decoded.roles;
                req.userId = decoded.UserInfo?.id || decoded.id; 
            }
            
            // Siempre llamamos a next() dentro del callback
            next();
        }
    );
};

module.exports = optionalAccess;