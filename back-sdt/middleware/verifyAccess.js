const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
er = usernfo.username || userInfo.email || null;
        
        // --- AJUSTE DE CLASE MUNDIAL: Verificación de Admin Blindada ---
        // Convertimos a Array si es un solo valor y luego convertimos cada rol a String
        const rolesArray = Array.isArray(req.roles) ? req.roles : [req.roles];
        
        req.isAdmin = rolesArray.some(role => {
            if (!role) return false;
            // Convertimos a String para evitar error si el rol es un número (ej: 1002)
            return String(role).toLowerCase() === 'admin';
        });
        
        next();
    });
};

module.exports = verifyAccess;