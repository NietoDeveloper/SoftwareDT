// backend/models/User.js
// Basic example if you want to encapsulate queries further.
// For this project size, keeping queries in controllers is also acceptable.
import pool from '../config/db.js';
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 10;

export const User = {
    // Find user by email (used in login)
    findByEmail: async (email) => {
        try {
            const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
            return rows[0]; // Return user object or undefined
        } catch (error) {
            console.error("Error finding user by email:", error);
            throw new Error('Database error while finding user.');
        }
    },

    // Find user by ID (used in protect middleware)
    findById: async (id) => {
        try {
            // Exclude password hash
            const [rows] = await pool.query('SELECT id, username, email, role, created_at FROM users WHERE id = ?', [id]);
            return rows[0];
        } catch (error) {
            console.error("Error finding user by ID:", error);
            throw new Error('Database error while finding user.');
        }
    },

    // Create a new user (used in registration)
    create: async ({ username, email, password }) => {
         try {
            // Hash password before saving
            const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

            const [result] = await pool.query(
                'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
                [username, email, hashedPassword]
            );
            const insertId = result.insertId;

            // Return the newly created user data (without password)
            return User.findById(insertId);

        } catch (error) {
             console.error("Error creating user:", error);
             // Handle specific errors like duplicate email/username if needed (e.g., check error.code === 'ER_DUP_ENTRY')
             if (error.code === 'ER_DUP_ENTRY') {
                 throw new Error('Username or email already exists.');
             }
             throw new Error('Database error while creating user.');
        }
    },

    // Method to compare password (used in login)
    comparePassword: async (candidatePassword, hashedPassword) => {
        return bcrypt.compare(candidatePassword, hashedPassword);
    }

    // Add other user-related database functions here if needed
};