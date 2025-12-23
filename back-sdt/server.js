require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');

const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');
const verifyAccess = require('./middleware/verifyAccess'); 
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

// Root Endpoint
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Operational', message: 'SoftwareDT API v1.0' });
});

// --- IMPORTACIÓN DE RUTAS ---
const routes = {
    userRegister: require('./routes/userRoutes/userRegister'),
    userLogin: require('./routes/userRoutes/userLogin'),
    userRefresh: require('./routes/userRoutes/userRefresh'),
    userLogout: require('./routes/userRoutes/userLogout'),
    doctorRegister: require('./routes/doctorRoutes/doctorRegister'),
    doctorLogin: require('./routes/doctorRoutes/doctorLogin'),
    doctorRefresh: require('./routes/doctorRoutes/doctorRefresh'),
    doctorLogout: require('./routes/doctorRoutes/doctorLogout'),
    allDoctors: require('./routes/allDoctors'),
    appointmentRoutes: require('./routes/appointmentRoute'),
    userUpdate: require('./routes/userRoutes/userUpdateRoute'),
    review: require('./routes/reviewRoute'),
    doctorUpdate: require('./routes/doctorRoutes/doctorUpdate'),
    booking: require('./routes/bookingRoute')
};

// --- ASIGNACIÓN DE RUTAS PÚBLICAS ---
app.use('/api/user/register', routes.userRegister);
app.use('/api/user/login', routes.userLogin);
app.use('/api/user/refresh', routes.userRefresh);
app.use('/api/user/logout', routes.userLogout);
app.use('/api/doctor/register', routes.doctorRegister);
app.use('/api/doctor/login', routes.doctorLogin);
app.use('/api/doctor/refresh', routes.doctorRefresh);
app.use('/api/doctor/logout', routes.doctorLogout);
app.use('/api/doctors', routes.allDoctors); 

// --- CAPA DE PROTECCIÓN (JWT VERIFICATION) ---
// A partir de aquí, Software DT requiere identidad confirmada
app.use(verifyAccess); 

// --- ASIGNACIÓN DE RUTAS PRIVADAS (User Panel & Booking) ---
app.use('/api/appointments', routes.appointmentRoutes); // Protegido para asegurar req.userId
app.use('/api/user/update', routes.userUpdate);
app.use('/api/user/review', routes.review);
app.use('/api/doctor/update', routes.doctorUpdate);
app.use('/api/doctor/profile', routes.booking);

// --- MANEJO DE ERRORES ---
app.use(unknownEndpoint);
app.use(errorHandler);

// --- ARRANQUE SINCRONIZADO DE DATACENTER ---
Promise.all([
    new Promise(resolve => userDB.once('open', resolve)),
    new Promise(resolve => citaDB.once('open', resolve))
]).then(() => {
    console.log('✅ Datacenter SoftwareDT: Usuarios y Citas vinculados.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
    console.error('❌ Error crítico de conexión:', err.message);
    process.exit(1);
});