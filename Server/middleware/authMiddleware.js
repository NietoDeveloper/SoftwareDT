// backend/middleware/authMiddleware.js
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const protect = async (req, res, next) => {
    let token;

    // Check for token in Authorization header (Bearer Token)
    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            // Get token from header
            token = req.headers.authorization.split(' ')[1];

            // Verify token
            const decoded = jwt.verify(token, process.env.JWT_SECRET);

            // Get user from the token (excluding password)
            const [rows] = await pool.query('SELECT id, username, email, role FROM users WHERE id = ?', [decoded.id]);

            if (rows.length === 0) {
               throw new Error('User not found');
            }

            req.user = rows[0]; // Attach user object to the request
            next(); // Proceed to the next middleware/route handler

        } catch (error) {
            console.error('Token verification failed:', error);
            res.status(401).json({ message: 'Not authorized, token failed' });
        }
    }

    if (!token) {
        res.status(401).json({ message: 'Not authorized, no token' });
    }
};

// Middleware to check for Admin role
const admin = (req, res, next) => {
    if (req.user && req.user.role === 'admin') {
        next(); // User is admin, proceed
    } else {
        res.status(403).json({ message: 'Not authorized as an admin' }); // Forbidden
    }
};

export { protect, admin };