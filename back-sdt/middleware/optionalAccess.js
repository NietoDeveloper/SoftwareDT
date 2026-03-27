const jwt = require('jsonwebtoken');

const optionalAccess = (req, res, next) => {


    const token = authHeader.split(' ')[1];

    // 2. Verificación silenciosa del token
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,

                // 3. Normalización de datos (Coherente con el resto del sistema)
                const userInfo = decoded.UserInfo || decoded;
                
                req.user = userInfo.username || null;
                // Soportamos 'id' de la lógica de negocio y '_id' de MongoDB
                req.userId = userInfo.id || userInfo._id || null; 
                req.roles = Array.isArray(userInfo.roles) ? userInfo.roles : [];
            }
            
            // Siempre continuamos el flujo
            next();
        }
    );
};

// Exportación directa para que app.use(optionalAccess) funcione en server.js
module.exports = optionalAccess;