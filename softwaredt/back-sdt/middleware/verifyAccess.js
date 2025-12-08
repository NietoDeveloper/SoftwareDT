const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG: Access Denied. Token is missing or invalid format (401).');
        return res.status(401).json({ 
            success: false, 
            message: "Acceso denegado. Se requiere un token de portador ('Bearer')." 
        });
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token, 
