// middleware/optionalAccess.js
const jwt = require('jsonwebtoken');

const optionalAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // Si no hay header de autorización, seguimos como "guest"
    if (!authHeader?.startsWith('Bearer ')) {
        req.user = null; 
        return next();
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                // Si el token es inválido o expiró, lo tratamos como guest 
                // o podrías retornar error, pero para "optional" es mejor dejarlo como null
                req.user = null;
            } else {
                // Si es válido, extraemos los datos del usuario
                req.user = decoded.UserInfo.username;
                req.roles = decoded.UserInfo.roles;
                req.userId = decoded.UserInfo.id; // Muy importante para vincular la cita
            }
            next();
        }
    );
};

module.exports = optionalAccess;