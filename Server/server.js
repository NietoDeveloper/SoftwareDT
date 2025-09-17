// backend/server.js
import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

// --- Load Environment Variables ---
// Load variables from .env file (important for local development)
// Ensure this runs before any code that relies on process.env
dotenv.config();

// --- Import Routes ---
// Import route handlers for different parts of the API
import authRoutes from './routes/authRoutes.js';
import productRoutes from './routes/productRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
import adminRoutes from './routes/adminRoutes.js';
import paymentRoutes from './routes/paymentRoutes.js'; // Stripe Payment Intent routes
import webhookRoutes from './routes/webhookRoutes.js'; // Stripe Webhook routes

// --- Import DB Connection ---
// This initializes the database connection pool when the server starts.
// It also contains connection success/error logging.
import pool from './config/db.js';

// --- Initialize Express Application ---
const app = express();

// --- Define Port ---
// Use the port assigned by the hosting environment (e.g., Railway, Render)
// or default to 5001 for local development.
const PORT = process.env.PORT || 5001;

// --- CORS (Cross-Origin Resource Sharing) Configuration ---
// Define the frontend URLs allowed to access this backend.
const allowedOrigins = [
    process.env.FRONTEND_URL, // Local frontend URL (e.g., http://localhost:3000)
    process.env.FRONTEND_URL_PROD // Deployed frontend URL (e.g., https://your-app.vercel.app)
].filter(Boolean); // Removes any undefined/null entries if env vars aren't set

// Log allowed origins for debugging purposes, especially during deployment.
if (allowedOrigins.length === 0) {
    console.warn("--------------------------------------------------------------------");
    console.warn("WARNING: No FRONTEND_URL or FRONTEND_URL_PROD defined in environment.");
    console.warn("CORS might block your frontend from accessing the API.");
    console.warn("Make sure these environment variables are set correctly.");
    console.warn("--------------------------------------------------------------------");
} else {
    console.log("Server configured to allow CORS requests from:", allowedOrigins);
}

const corsOptions = {
    origin: function (origin, callback) {
        // Allow requests with no 'Origin' header (e.g., server-to-server, curl, Postman)
        // OR requests from origins present in the allowedOrigins array.
        if (!origin || allowedOrigins.indexOf(origin) !== -1) {
            callback(null, true); // Allow the request
        } else {
            // Log CORS errors for easier debugging
            console.error(`CORS Blocked: Origin '${origin}' is not in the allowed list.`);
            // Reject the request with a CORS error
            callback(new Error('This origin is not permitted by CORS policy.'));
        }
    },
    credentials: true, // Allow frontend to send cookies or Authorization headers.
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
};
// Apply CORS middleware globally to all routes
app.use(cors(corsOptions));

// --- SPECIAL MIDDLEWARE: Stripe Webhook Route ---
// This route MUST come BEFORE `express.json()` because Stripe requires
// the raw, unparsed request body to verify the webhook signature.
// The webhook handler itself uses `express.raw({type: 'application/json'})`.
app.use('/api/webhooks', webhookRoutes);

// --- Standard Request Body Parsing Middleware ---
// Parse incoming requests with JSON payloads.
app.use(express.json());
// Parse incoming requests with URL-encoded payloads (e.g., from simple HTML forms).
app.use(express.urlencoded({ extended: true }));


// --- API Routes Mounting ---
// Define base paths for different sections of the API.

// Basic health check / welcome route
app.get('/api', (req, res) => {
    res.status(200).json({ message: 'E-commerce API is active and running!' });
});

// Mount specific routers
app.use('/api/auth', authRoutes);       // Authentication routes (login, register, profile)
app.use('/api/products', productRoutes); // Product routes (list, detail, search, admin CRUD)
app.use('/api/orders', orderRoutes);     // Order routes (create, view, list)
app.use('/api/admin', adminRoutes);      // Admin-specific routes (user management)
app.use('/api/payments', paymentRoutes); // Payment Intent creation routes

// --- 404 Not Found Handler ---
// This middleware runs if no preceding route matched the request URL.
app.use((req, res, next) => {
  res.status(404).json({ message: `Resource not found at ${req.originalUrl}` });
});


// --- Global Error Handling Middleware ---
// Catches errors passed down the middleware chain using `next(err)`.
// Should be the LAST `app.use()` call before `app.listen()`.
app.use((err, req, res, next) => {
    // Log the error for server-side debugging
    console.error("--- Global Error Handler ---");
    console.error(`Timestamp: ${new Date().toISOString()}`);
    console.error(`Route: ${req.method} ${req.originalUrl}`);
    console.error(err.stack || err); // Log the full stack trace or error object

    // Determine the status code: Use the error's status code if provided,
    // use the response status code if already set (e.g., by previous middleware),
    // or default to 500 (Internal Server Error).
    const statusCode = err.status || (res.statusCode >= 400 ? res.statusCode : 500);

    // Send a standardized JSON error response to the client
    res.status(statusCode).json({
        message: err.message || 'An internal server error occurred on the server.',
        // Only include the stack trace in the response during development for security
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
    });
});


// --- Start Listening for Requests ---
const server = app.listen(PORT, () => {
    console.log(`--------------------------------------------------------------------`);
    console.log(`Server started successfully.`);
    console.log(`  Mode: ${process.env.NODE_ENV || 'development'}`);
    console.log(`  Listening on Port: ${PORT}`);
    console.log(`  Local API: http://localhost:${PORT}/api`);
    console.log(`--------------------------------------------------------------------`);
    // Optional: Verify DB connection again or log DB host (masked)
    // pool.query('SELECT 1').then(() => console.log('Database connection verified.')).catch(err=>console.error('DB Verification Failed:', err));
});

// --- Graceful Shutdown Handling ---
// Listen for termination signals (Ctrl+C, Docker stop, hosting platform signals)
// to close resources like the database pool cleanly before exiting.
const shutdown = (signal) => {
    console.log(`\n${signal} signal received. Initiating graceful shutdown...`);
    // Stop accepting new connections
    server.close(() => {
        console.log('HTTP server closed successfully.');
        // Close the database connection pool
        pool.end(err => {
            if (err) {
                console.error('Error occurred during database pool closure:', err);
                process.exit(1); // Exit with error code
            } else {
                console.log('Database pool closed successfully.');
                process.exit(0); // Exit cleanly
            }
        });
    });

    // Force close server after a timeout if graceful shutdown fails
    setTimeout(() => {
        console.error('Could not close connections in time, forcefully shutting down.');
        process.exit(1);
    }, 10000); // 10 seconds timeout
};

process.on('SIGINT', () => shutdown('SIGINT')); // Ctrl+C in terminal
process.on('SIGTERM', () => shutdown('SIGTERM')); // Termination signal (e.g., from Docker or hosting)