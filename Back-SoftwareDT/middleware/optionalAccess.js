import jwt from 'jsonwebtoken';

/**
 * MIDDLEWARE DE ACCESO OPCIONAL - SOFTWARE DT
 * "Silent Authentication": Identifica nodos activos sin interrumpir el flujo de invitados.
 */
const optionalAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    // 1. PROTOCOLO GUEST: Si no hay rastro de Bearer, continuamos como invitado
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        req.userId = null;
        req.userEmail = null;
        req.roles = [];
        req.isAdmin = false;
        return next();
    }

    const token = authHeader.split(' ')[1]?.trim();

    // 2. VERIFICACIÓN SILENCIOSA (No bloqueante)
    jwt.verify(
        token,
        process.env.ACCESS_TOKEN_SECRET,
        (err, decoded) => {
            if (err) {
                // Si el token expiró o es inválido, simplemente ignoramos la identidad
                req.userId = null;
                req.roles = [];
                req.isAdmin = false;
            } else {
                // 3. NORMALIZACIÓN DE IDENTIDAD (Sincronizada con verifyAccess)
                const data = decoded.UserInfo || decoded.userInfo || decoded;
                
                req.userId = data.id || data._id || null; 
                req.userEmail = data.email || null;
                req.roles = Array.isArray(data.roles) ? data.roles : (data.role ? [data.role] : []);
                
                // 4. AUDITORÍA DE ROL (Para vistas híbridas Admin/User)
                const rolesArray = req.roles.map(r => String(r).toLowerCase());
                req.isAdmin = rolesArray.some(r => r === 'admin' || r === '2001');
            }
            
            // Fluidez total: nunca devolvemos error, solo pasamos al siguiente nodo
            next();
        }
    );
};

export default optionalAccess;