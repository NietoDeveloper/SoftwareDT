const jwt = require('jsonwebtoken');

const optionalAccess = (req, res, next) => {


    const token = authHeader.split(' ')[1];

    // 2. Verificación silenciosa del token
    jwt..roles = Array.isArray(userInfo.roles) ? userInfo.roles : [];
            }
            
            // Siempre continuamos el flujo
            next();
        }
    );
};

// Exportación directa para que app.use(optionalAccess) funcione en server.js
module.exports = optionalAccess;