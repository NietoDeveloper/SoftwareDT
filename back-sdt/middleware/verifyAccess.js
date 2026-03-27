const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;


    const token = authHeader.split(' ')[1]?.trim();

    }r('❌ ERROR CRÍTICO: ACCESS_TOKEN_SECRET no definida en .env');
        return res.status(500).json({ message: "Error interno de configuración del Datacenter." });
    }

 if (err.name === 'JsonWebTokenError') errorMessage = "Token malformado.";
            
            console.log(`DEBUG [SDT]: Auth failed: ${err.message}`);
            return res.status(403).json({ success: false, message: errorMessage });
        }

        // 4. Normalización (Hydration)
        const userInfo = decoded.UserInfo || decoded;

        // Extraemos el ID asegurando que SoftwareDT reciba siempre un valor
        const userId = userInfo.id || userInfo._id || userInfo.sub;

        if (!userId) {
            return res.status(403).json({ 
                success: false, 
                message: "Payload del token incompleto." 
            });
        }

        // 5. Inyección en el Request
        req.userId = userId;
        req.roles = userInfo.roles || userInfo.role || []; 
        req.user = userInfo.username || userInfo.email || null;
        
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