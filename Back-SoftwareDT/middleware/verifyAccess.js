import jwt from 'jsonwebtoken';

/**
 * 🛠️ ROLES_LIST - DICCIONARIO DE AUTORIDAD SOFTWARE DT
 * Sincronizado con la lógica de base de datos y frontend.
 */
export const ROLES_LIST = {
    "Admin": 2001,    // Superusuario / Manuel Nieto
    "Employee": 1001, // Staff / Soporte Técnico / Nodos de Producto
    "User": 1002      // Cliente Final
};

/**
 * 🛡️ verifyAccess (Middleware Principal)
 * Valida el JWT de infraestructura e inyecta la identidad en el Request.
 */
const verifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader?.startsWith('Bearer ')) {
        console.log("⚠️ [SDT_SECURITY]: Intento de acceso sin token Bearer.");
        return res.status(401).json({ 
            success: false, 
            message: 'No autorizado: Falta token de acceso de infraestructura.' 
        });
    }

    const token = authHeader.split(' ')[1];

    // ⚡ FALLBACK DE SEGURIDAD: Railway puede usar cualquiera de estas dos llaves
    const secret = process.env.ACCESS_TOKEN_SECRET || process.env.JWT_SECRET;

    jwt.verify(token, secret, (err, decoded) => {
        if (err) {
            console.log("❌ [SDT_SECURITY]: Token inválido o expirado detectado.");
            return res.status(403).json({ 
                success: false, 
                message: 'Sesión expirada o token corrupto. Reautentique el nodo.' 
            });
        }
        
        /**
         * 🛰️ NORMALIZACIÓN DE IDENTIDAD S+
         * Asegura que req.userId esté disponible sin importar si el token
         * viene con el wrapper 'UserInfo' o plano.
         */
        const info = decoded.UserInfo || decoded; 
        
        req.userId = info.id || info._id;
        req.roles = info.roles;
        req.email = info.email;
        
        next();
    });
};

/**
 * 🔐 verifyRoles (Middleware de Permisos Granulares)
 * Filtra el acceso según el nivel de autoridad (Admin, Employee, User).
 */
export const verifyRoles = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req?.roles) {
            return res.status(401).json({ 
                success: false, 
                message: "Fallo de protocolo: Identidad no verificada en el clúster." 
            });
        }

        const rolesArray = [...allowedRoles];
        
        // Verificamos si alguno de los roles del usuario coincide con los permitidos
        // Normalizamos a Number para evitar errores de comparación de tipos
        const hasAccess = req.roles.some(role => rolesArray.includes(Number(role)));

        if (!hasAccess) {
            console.log(`🚫 [SDT_SECURITY]: Acceso denegado para el rol ${req.roles}.`);
            return res.status(403).json({ 
                success: false, 
                message: "Acceso denegado: Nivel de autoridad insuficiente." 
            });
        }
        
        next();
    };
};

export default verifyAccess;