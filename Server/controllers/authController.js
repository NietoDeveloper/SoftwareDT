// backend/controllers/authController.js
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';

const SALT_ROUNDS = 10; // Cost factor for bcrypt hashing

// --- Helper Function to Generate JWT ---
const generateToken = (id, role) => {
    return jwt.sign({ id, role }, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || '1d',
    });
};

// --- Register User ---
export const registerUser = async (req, res, next) => {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
        return res.status(400).json({ message: 'Please provide username, email, and password' });
    }

    // Basic email validation (consider a library like validator.js for more robust validation)
    if (!/\S+@\S+\.\S+/.test(email)) {
         return res.status(400).json({ message: 'Please provide a valid email address' });
    }

    // Basic password length check
    if (password.length < 6) {
         return res.status(400).json({ message: 'Password must be at least 6 characters long' });
    }


    let connection; // Declare connection outside try block
    try {
        connection = await pool.getConnection(); // Get a connection from the pool

        // Check if user already exists (by email or username)
        const [existingUsers] = await connection.query(
            'SELECT id FROM users WHERE email = ? OR username = ?',
            [email, username]
        );

        if (existingUsers.length > 0) {
            connection.release(); // Release connection before sending response
            return res.status(400).json({ message: 'User already exists with this email or username' });
        }

        // Hash password
        const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

        // Insert new user (default role is 'user' from schema)
        const [result] = await connection.query(
            'INSERT INTO users (username, email, password) VALUES (?, ?, ?)',
            [username, email, hashedPassword]
        );

        const insertId = result.insertId;

         // Fetch the newly created user data (excluding password)
        const [newUserRows] = await connection.query(
            'SELECT id, username, email, role, created_at FROM users WHERE id = ?',
            [insertId]
        );

        connection.release(); // Release the connection

        if (newUserRows.length > 0) {
            const newUser = newUserRows[0];
            // Generate token
            const token = generateToken(newUser.id, newUser.role);

            res.status(201).json({
                message: 'User registered successfully',
                token: token, // Send token back
                user: { // Send user info (without password)
                    id: newUser.id,
                    username: newUser.username,
                    email: newUser.email,
                    role: newUser.role,
                },
            });
        } else {
             // This case should technically not happen if insert succeeded
            throw new Error('Failed to retrieve newly registered user');
        }

    } catch (error) {
        if (connection) connection.release(); // Ensure connection is released on error
        console.error("Registration Error:", error);
        // Pass error to the global error handler
        next(new Error('User registration failed. Please try again later.'));
    }
};

// --- Login User ---
export const loginUser = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({ message: 'Please provide email and password' });
    }

    let connection;
    try {
         connection = await pool.getConnection();

        // Find user by email
        const [users] = await connection.query(
            'SELECT id, username, email, password, role FROM users WHERE email = ?', // Fetch password hash
            [email]
        );

        if (users.length === 0) {
             connection.release();
            return res.status(401).json({ message: 'Invalid credentials' }); // User not found
        }

        const user = users[0];

        // Compare provided password with stored hash
        const isMatch = await bcrypt.compare(password, user.password);

        connection.release(); // Release connection after query

        if (!isMatch) {
            return res.status(401).json({ message: 'Invalid credentials' }); // Password doesn't match
        }

        // Passwords match - Generate token
        const token = generateToken(user.id, user.role);

        res.status(200).json({
            message: 'Login successful',
            token: token,
            user: { // Send user info (without password hash)
                id: user.id,
                username: user.username,
                email: user.email,
                role: user.role,
            },
        });

    } catch (error) {
        if (connection) connection.release();
        console.error("Login Error:", error);
        next(new Error('Login failed. Please try again later.'));
    }
};

// --- Get Logged-in User Profile ---
export const getUserProfile = async (req, res, next) => {
    // Assumes 'protect' middleware ran successfully and attached req.user
    try {
         // The user data (without password) is already attached by the 'protect' middleware
         // If not, you'd fetch it here based on req.user.id
        if (!req.user) {
             return res.status(404).json({ message: 'User not found' });
        }
        res.status(200).json(req.user); // Send the user data from middleware
    } catch (error) {
        console.error("Get Profile Error:", error);
        next(new Error('Failed to fetch user profile.'));
    }
};