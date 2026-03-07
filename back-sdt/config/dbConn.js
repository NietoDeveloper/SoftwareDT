/**
 * SOFTWARE DT - DATABASE INFRASTRUCTURE (MONGODB ATLAS)
 * Dual Cluster Architecture for High Availability and Redundancy.
 * * Implementation: NietoDeveloper (Committers #1 Colombia)
 */

const mongoose = require('mongoose');

/**
 * Initialize a persistent MongoDB connection.
 * @param {string} uri - Connection string from environment variables.
 * @param {string} clusterName - Human-readable name for logging.
 * @returns {mongoose.Connection}
 */
const initializeConnection = (uri, clusterName) => { 
    if (!uri) {
        console.error(`⚠️ CRITICAL: MongoDB URI for ${clusterName} is not defined in .env`);
        return null;
    }

    // Advanced connection options for production stability
    const connectionOptions = {
        autoIndex: true, // Build indexes for performance
        connectTimeoutMS: 10000, // 10s timeout
        socketTimeoutMS: 45000, // Close sockets after 45s of inactivity
    }; 
    
    const connection = mongoose.createConnection(uri, connectionOptions);
    
    // Connection Event Handlers
    connection.on('connected', () => {
        console.log(`✅ MongoDB [${clusterName}] Cluster connected to: ${connection.name}`);
    });
    
    connection.on('error', (err) => {
        console.error(`❌ MongoDB [${clusterName}] Connection Error:`, err.message);
    });

    connection.on('disconnected', () => {
        console.warn(`🔌 MongoDB [${clusterName}] Disconnected. Attempting reconnection...`);
    });
    
    return connection;
};

// INITIALIZE DUAL CLUSTER STRATEGY
// Cluster 1: Identity & Access Management (Users)
const userDB = initializeConnection(
    process.env.MONGODB_URI_USERS, 
    'IDENTITY_CLUSTER'
);

// Cluster 2: Business Logic & Scheduling (Bookings)
const citaDB = initializeConnection(
    process.env.MONGODB_URI_BOOKINGS, 
    'BOOKING_CLUSTER'
);

module.exports = { userDB, citaDB };