// backend/config/db.js
// (Ensure you've run: npm install mysql2 dotenv)
import mysql from 'mysql2/promise';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env for local dev

let pool;

if (!process.env.DATABASE_URL) {
    console.error("FATAL ERROR: DATABASE_URL is not defined in environment variables.");
    // In a real app, you might want different behavior than exiting,
    // but for setup, it highlights the missing variable.
    process.exit(1);
}

try {
    pool = mysql.createPool({
        uri: process.env.DATABASE_URL, // Use the DATABASE_URL directly
        waitForConnections: true,
        connectionLimit: 10, // Adjust based on Railway plan if needed
        queueLimit: 0,
        // SSL options might be needed depending on Railway's config,
        // Often handled by the connection string, but keep in mind.
        // Check Railway docs if connections fail. Example:
        // ssl: {
        //    rejectUnauthorized: false // Or configure CA certs if provided by Railway
        // }
        // Start without SSL object first, add if necessary.
    });

    // Optional: Test connection during startup
    pool.getConnection()
        .then(connection => {
            console.log('Successfully connected to Railway MySQL database!');
            connection.release();
        })
        .catch(err => {
            console.error('Error connecting to the Railway database:');
            console.error(err.message);
             // Log the connection string minus password for debugging if needed
            // console.error('Using Connection String:', process.env.DATABASE_URL?.replace(/:([^:@]*?)@/, ':*****@'));
             if (err.code === 'PROTOCOL_CONNECTION_LOST') {
                 console.error('Database connection was closed.');
             }
             if (err.code === 'ER_CON_COUNT_ERROR') {
                 console.error('Database has too many connections.');
             }
             if (err.code === 'ECONNREFUSED') {
                 console.error('Database connection was refused.');
             }
             // Consider exiting only in critical failure scenarios during startup
            // process.exit(1);
        });

} catch (error) {
     console.error("Error creating database pool:", error);
     process.exit(1);
}


export default pool;