const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. Verificación de formato
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG [SDT]: Access Denied - Missing or Malformed Header (401).');
        return res.status(401).json({ 
            success: false, 
            message: "Acceso denegado. Formato de token incorrecto." 
        }); 
    }

    const token = authHeader.split(' ')[1]?.trim();

    // 2. Validación de nulidad
    if (!token || token === 'undefined' || token === 'null') {
        return res.status(401).json({ 
            success: false, 
            message: "Token inválido o vacío." 
        });
    }

    // --- SEGURIDAD: Validar existencia de la llave secreta ---
    const secret = process.env.ACCESS_TOKEN_SECRET;
    if (!secret) {
        console.error('❌ ERROR CRÍTICO: ACCESS_TOKEN_SECRET no definida en .env');
        return res.status(500).json({ message: "Error interno de configuración del Datacenter." });
    }

    // 3. Verificación criptográfica
    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            let errorMessage = "Error de autenticación.";
            if (err.name === 'TokenExpiredError') errorMessage = "Sesión expirada.";
            else if (err.name === 'JsonWebTokenError') errorMessage = "Token malformado.";
            
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
        req.roles = userInfo.roles || userInfo.role || []; // Soporta ambos formatos
        req.user = userInfo.username || userInfo.email || null;
        
        // Verificación de Admin mejorada
        const rolesArray = Array.isArray(req.roles) ? req.roles : [req.roles];
        req.isAdmin = rolesArray.some(role => role?.toLowerCase() === 'admin');
        
        next();
    });
};

module.exports = verifyAccess;