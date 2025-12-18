const jwt = require('jsonwebtoken');

const optionalAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Si no hay token o no empieza con Bearer, es un invitado (Guest)
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.user = null;
        req.userId = null;
        req.roles = []; // Inicializamos roles como array vacío por seguridad
        return next();
    }

    const token = authHeader.split(' ')[1];

    // 2. Verificación del token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                // Token inválido o expirado: tratamos como guest en lugar de lanzar error 403
                req.user = null;
                req.userId = null;
                req.roles = [];
            } else {
                // 3. Mapeo de datos (Normalización)
                // Usamos optional chaining para evitar errores si decoded es null
                const userInfo = decoded.UserInfo || decoded;
                
                req.user = userInfo.username || null;
                req.userId = userInfo.id || userInfo._id || null; 
                req.roles = userInfo.roles || [];
            }
            
            // Siempre llamamos a next() al terminar la verificación asíncrona
            next();
        }
    );
};

module.exports = optionalAccess;