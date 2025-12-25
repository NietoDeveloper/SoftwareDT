require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');
const verifyAccess = require('./middleware/verifyAccess'); 
const { unknownEndpoint } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. SEGURIDAD ---
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); 
app.use(cors(corsOptions));

// --- 2. MIDDLEWARES ---
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints de Control
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'Operational', 
        service: 'SoftwareDT Datacenter',
        commit_consistency: '141+ Days', // Actualizado a tu racha actual
        env: process.env.NODE_ENV || 'development'
    });
});

// --- 3. DEFINICIÓN DE RUTAS ---
// IMPORTANTE: Asegúrate de que cada uno de estos archivos termine en module.exports = router;
const routes = {
    userRegister: require('./routes/userRoutes/userRegister'),
    userLogin: require('./routes/userRoutes/userLogin'),
    userRefresh: require('./routes/userRoutes/userRefresh'),
    userLogout: require('./routes/userRoutes/userLogout'),
    doctorRegister: require('./routes/doctorRoutes/doctorRegister'),
    doctorLogin: require('./routes/doctorRoutes/doctorLogin'),
    allDoctors: require('./routes/allDoctors'),
    appointmentRoutes: require('./routes/appointmentRoute'),
    userUpdate: require('./routes/userRoutes/userUpdateRoute'),
    review: require('./routes/reviewRoute'),
    doctorUpdate: require('./routes/doctorRoutes/doctorUpdate'),
    booking: require('./routes/bookingRoute')
};

// --- 4. RUTAS PÚBLICAS ---
app.use('/api/user/register', routes.userRegister);
app.use('/api/auth/register', routes.userRegister);
app.use('/api/user/login', routes.userLogin);
app.use('/api/auth/login', routes.userLogin);
app.use('/api/doctor/register', routes.doctorRegister);
app.use('/api/doctor/login', routes.doctorLogin);
app.use('/api/doctors', routes.allDoctors); 

// --- 5. GESTIÓN DE SESIÓN ---
app.use('/api/user/refresh', routes.userRefresh);
app.use('/api/user/logout', routes.userLogout);

// --- 6. FILTRO DE ACCESO ---
app.use(verifyAccess); 

// --- 7. RUTAS PRIVADAS ---
app.use('/api/user/profile', routes.booking); 
app.use('/api/user/update', routes.userUpdate);
app.use('/api/user/review', routes.review);
app.use('/api/appointments', routes.appointmentRoutes); 
app.use('/api/doctor/update', routes.doctorUpdate);
app.use('/api/doctor/profile', routes.booking);

// --- 8. MANEJO DE ERRORES ---
app.use(unknownEndpoint);
app.use(errorHandler);

// --- 9. ARRANQUE ---
const startServer = async () => {
    try {
        console.log('⏳ Sincronizando Datacenters Software DT...');
        
        const connectDB = (db, name) => new Promise((resolve, reject) => {
            if (db.readyState === 1) return resolve();
            db.once('open', () => {
                console.log(`📡 Conexión establecida: ${name}`);
                resolve();
            });
            db.on('error', (err) => {
                console.error(`❌ Error en ${name}:`, err);
                reject(err);
            });
        });

        await Promise.all([
            connectDB(userDB, 'UserDB (Auth)'),
            connectDB(citaDB, 'CitaDB (Bookings)')
        ]);
        
        app.listen(PORT, () => {
            console.log('----------------------------------------------------');
            console.log(`🚀 SOFTWARE DT OPERATIVO EN PUERTO: ${PORT}`);
            console.log(`📈 ESTADO: Clase Mundial | NODO: ${process.env.NODE_ENV || 'dev'}`);
            console.log('----------------------------------------------------');
        });
    } catch (err) {
        console.error('💥 FALLO CRÍTICO:', err.message);
        process.exit(1);
    }
};

process.on('unhandledRejection', (reason, promise) => {
    console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});

startServer();