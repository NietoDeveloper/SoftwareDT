const jwt = require('jsonwebtoken');

const verifyAccess = (req, res, next) => {
    const authHeader = req.headers.authorization || req.headers.Authorization;

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.log('DEBUG: Access Denied. Token is missing or invalid format (401).');
        return res.sendStatus(401); 
    }

    const token = authHeader.split(' ')[1];

    jwt.verify(
        token, 
        process.env.ACCESS_TOKEN_SECRET, 
        (err, decoded) => {
            if (err) {
                // Manejo d
                const statusCode = 403;
                let errorMessage;

                if (err.name === 'TokenExpiredError') {
                    errorMessage = "Token expirado. Por favor, inicia sesión de nuevo.";
                } else if (err.name === 'JsonWebTokenError') 
                    errorMessage = "Token inválido o malformado.";
