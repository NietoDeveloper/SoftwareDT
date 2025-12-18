require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Importaciones de base de datos y config
const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');

// --- CORRECCIÓN DE MIDDLEWARES (Importaciones directas sin llaves) ---
const verifyAccess = require('./middleware/verifyAccess'); 
const optionalAccess = require('./middleware/optionalAccess'); 

// Importaciones con llaves (para exports nombrados)
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

// --- IMPORTACIÓN DE RUTAS (Se asignan a constantes para depurar errores) ---
const userRegister = require('./routes/userRoutes/userRegister');
const userLogin = require('./routes/userRoutes/userLogin');
const userRefresh = require('./routes/userRoutes/userRefresh');
const userLogout = require('./routes/userRoutes/userLogout');

const doctorRegister = require('./routes/doctorRoutes/doctorRegister');
const doctorLogin = require('./routes/doctorRoutes/doctorLogin');
const doctorRefresh = require('./routes/doctorRoutes/doctorRefresh');
const doctorLogout = require('./routes/doctorRoutes/doctorLogout');

const allDoctors = require('./routes/allDoctors');
const appointmentRoutes = require('./routes/appointmentRoute');

// --- RUTAS PÚBLICAS ---
app.use('/api/user/register', userRegister);
app.use('/api/user/login', userLogin);
app.use('/api/user/refresh', userRefresh);
app.use('/api/user/logout', userLogout);

app.use('/api/doctor/register', doctorRegister);
app.use('/api/doctor/login', doctorLogin);
app.use('/api/doctor/refresh', doctorRefresh);
app.use('/api/doctor/logout', doctorLogout);

app.use('/api/doctors', allDoctors);  

// 🚀 Citas: Middleware opcional
app.use('/api/appointments', optionalAccess, appointmentRoutes);

// --- PROTECCIÓN GLOBAL (Middleware de seguridad estricta) ---
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