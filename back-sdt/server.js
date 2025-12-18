require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

// Importaciones de base de datos y config
const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');

// --- MIDDLEWARES (Importaciones directas sin llaves) ---
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

// --- IMPORTACIÓN DE RUTAS ---
// Públicas
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

// Privadas (Separadas para evitar el TypeError en el arranque)
const userUpdate = require('./routes/userRoutes/userUpdateRoute');
const review = require('./routes/reviewRoute');
const doctorUpdate = require('./routes/doctorRoutes/doctorUpdate');
const booking = require('./routes/bookingRoute');

// --- USO DE RUTAS PÚBLICAS ---
app.use('/api/user/register', userRegister);
app.use('/api/user/login', userLogin);
app.use('/api/user/refresh', userRefresh);
app.use('/api/user/logout', userLogout);
app.use('/api/doctor/register', doctorRegister);
app.use('/api/doctor/login', doctorLogin);
app.use('/api/doctor/refresh', doctorRefresh);
app.use('/api/doctor/logout', doctorLogout);
app.use('/api/doctors', allDoctors);  
app.use('/api/appointments', optionalAccess, appointmentRoutes);

// --- PROTECCIÓN GLOBAL ---
app.use(verifyAccess); 

// --- USO DE RUTAS PRIVADAS ---
app.use('/api/user/update', userUpdate);
app.use('/api/user/review', review);
app.use('/api/doctor/update', doctorUpdate);
app.use('/api/doctor/profile', booking);

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