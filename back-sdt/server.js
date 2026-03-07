/**
 * SOFTWARE DT - CORE BACKEND ENGINE
 * Enterprise-grade MERN architecture for scalable booking solutions.
 * * Developed by: NietoDeveloper (Committers #1 Colombia)
 * * Standards: Clean Architecture | High Availability | Secure RBAC
 */

require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

// Database Infrastructure & Configuration
const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');

// Middleware Layer
const verifyAccess = require('./middleware/verifyAccess'); 
const { unknownEndpoint } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. SECURITY & LOGGING ---
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); 
app.use(cors(corsOptions));

// --- 2. CORE MIDDLEWARES ---
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Service Health & Datacenter Status Endpoints
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'Operational', 
        service: 'SoftwareDT Datacenter',
        commit_consistency: '141+ Days', 
        location: 'Bogotá, Colombia',
        env: process.env.NODE_ENV || 'development'
    });
});

// --- 3. ROUTE DEFINITIONS & SAFE MODULE EXTRACTION ---
// User Identity Management
const uReg = require('./routes/userRoutes/userRegister');
const uLog = require('./routes/userRoutes/userLogin');
const uRef = require('./routes/userRoutes/userRefresh');
const uOut = require('./routes/userRoutes/userLogout');
const uUpd = require('./routes/userRoutes/userUpdateRoute');

// Provider/Doctor Management
const dReg = require('./routes/doctorRoutes/doctorRegister');
const dLog = require('./routes/doctorRoutes/doctorLogin');
const dUpd = require('./routes/doctorRoutes/doctorUpdate');

// Safe module extraction to prevent undefined crashes
const userRegister = uReg.userRegister || uReg;
const userLogin = uLog.userLogin || uLog;
const userRefresh = uRef.userRefresh || uRef;
const userLogout = uOut.userLogout || uOut;
const doctorRegister = dReg.doctorRegister || dReg;
const doctorLogin = dLog.doctorLogin || dLog;
const userUpdate = uUpd.userUpdate || uUpd;
const doctorUpdate = dUpd.doctorUpdate || dUpd;

// Core Business Logic Routers
const allDoctors = require('./routes/allDoctors');
const appointmentRoutes = require('./routes/appointmentRoute');
const review = require('./routes/reviewRoute');
const booking = require('./routes/bookingRoute');

// --- 4. ENDPOINT MAPPING (Public Routes) ---
app.use(['/api/user/register', '/api/auth/register'], userRegister);
app.use(['/api/user/login', '/api/auth/login'], userLogin);
app.use('/api/doctor/register', doctorRegister);
app.use('/api/doctor/login', doctorLogin);
app.use('/api/doctors', allDoctors); 
app.use('/api/user/refresh', userRefresh);
app.use('/api/user/logout', userLogout);

// --- 5. ACCESS FILTER (Security Layer) ---
app.use(verifyAccess); 

// --- 6. PRIVATE BUSINESS ROUTES (Protected) ---
app.use('/api/user/profile', booking); 
app.use('/api/user/update', userUpdate);
app.use('/api/user/review', review);
app.use('/api/appointments', appointmentRoutes); 
app.use('/api/doctor/update', doctorUpdate);
app.use('/api/doctor/profile', booking);

// --- 7. GLOBAL ERROR HANDLING ---
app.use(unknownEndpoint);
app.use(errorHandler);

// --- 8. SERVER BOOTSTRAP ---
const startServer = async () => {
    try {
        console.log('⏳ Synchronizing Software DT Datacenters...');
        
        // Dynamic DB Connection Handler
        const connectDB = (db, name) => new Promise((resolve, reject) => {
            if (db.readyState === 1) return resolve();
            db.once('open', () => {
                console.log(`📡 Datacenter connection established: ${name}`);
                resolve();
            });
            db.on('error', (err) => {
                console.error(`❌ Connection failure at ${name}:`, err);
                reject(err);
            });
        });

        // Resolve Dual Cluster Strategy
        await Promise.all([
            connectDB(userDB, 'IdentityCluster (Auth)'),
            connectDB(citaDB, 'BusinessCluster (Bookings)')
        ]);
        
        app.listen(PORT, () => {
            console.log('----------------------------------------------------');
            console.log(`🚀 SOFTWARE DT OPERATIONAL ON PORT: ${PORT}`);
            console.log(`📈 STATUS: World Class Engineering | Bogotá, CO`);
            console.log(`🔧 MODE: ${process.env.NODE_ENV || 'development'}`);
            console.log('----------------------------------------------------');
        });
    } catch (err) {
        console.error('💥 CRITICAL SYSTEM FAILURE:', err.message);
        process.exit(1);
    }
};

startServer();