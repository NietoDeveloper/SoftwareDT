require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');
const verifyAccess = require('./middleware/verifyAccess'); 
const optionalAccess = require('./middleware/optionalAccess'); 
const { unknownEndpoint } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// --- MIDDLEWARES GLOBALES ---
app.use(morgan('dev')); 
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Server Operational',
        message: 'Welcome to the SoftwareDT API root.'
    });
});

// --- RUTAS PÚBLICAS ---

// Auth Usuarios
app.use('/api/user/register', require('./routes/userRoutes/userRegister'));
app.use('/api/user/login', require('./routes/userRoutes/userLogin'));
app.use('/api/user/refresh', require('./routes/userRoutes/userRefresh'));
app.use('/api/user/logout', require('./routes/userRoutes/userLogout'));

// Auth Doctores
app.use('/api/doctor/register', require('./routes/doctorRoutes/doctorRegister'));
app.use('/api/doctor/login', require('./routes/doctorRoutes/doctorLogin'));
app.use('/api/doctor/refresh', require('./routes/doctorRoutes/doctorRefresh'));
app.use('/api/doctor/logout', require('./routes/doctorRoutes/doctorLogout'));

// Servicios y Doctores (Público)
app.use('/api/doctors', require('./routes/allDoctors'));  

// 🚀 Citas: Usamos optionalAccess para permitir Guests y Usuarios logueados
app.use('/api/appointments', optionalAccess, require('./routes/appointmentRoute'));

// --- MIDDLEWARE DE AUTENTICACIÓN ESTRICTA ---
// Solo lo que sigue requiere token obligatorio
app.use(verifyAccess); 

// --- RUTAS PRIVADAS ---
app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));
app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));
app.use('/api/doctor/profile', require('./routes/bookingRoute'));

// --- MANEJO DE ERRORES ---
app.use(unknownEndpoint);
app.use(errorHandler);

// --- CONEXIÓN Y ARRANQUE ---
Promise.all([
    new Promise(resolve => userDB.once('open', resolve)),
    new Promise(resolve => citaDB.once('open', resolve))
]).then(() => {
    console.log('✅ MongoDB (USUARIOS) y (CITAS) conectadas.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
    console.error('❌ Error crítico en conexiones DB:', err.message);
    process.exit(1);
});