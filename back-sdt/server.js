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

// Health Check
app.get('/', (req, res) => {
    res.status(200).json({ status: 'Operational', service: 'SoftwareDT Datacenter' });
});

// --- CARGA DE RUTAS ---
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

// --- 1. RUTAS TOTALMENTE PÚBLICAS ---
// Soporte doble para /api/user y /api/auth (Evita errores 404 en el Login/Signup)
app.use(['/api/user/register', '/api/auth/register'], routes.userRegister);
app.use(['/api/user/login', '/api/auth/login'], routes.userLogin);

app.use('/api/doctor/register', routes.doctorRegister);
app.use('/api/doctor/login', routes.doctorLogin);
app.use('/api/doctors', routes.allDoctors); 

// --- 2. RUTAS DE SESIÓN ---
app.use('/api/user/refresh', routes.userRefresh);
app.use('/api/user/logout', routes.userLogout);

// --- 3. CAPA DE PROTECCIÓN (EL PORTERO) ---
// Todo lo que esté abajo de esta línea requiere cabecera: Authorization: Bearer <token>
app.use(verifyAccess); 

// --- 4. RUTAS PRIVADAS (Sincronizadas con el flujo SDT) ---

// Ajuste para que coincida con lo que el Frontend busca como "Profile"
app.use('/api/user/profile', routes.booking); 
app.use('/api/user/update', routes.userUpdate);
app.use('/api/user/review', routes.review);

app.use('/api/appointments', routes.appointmentRoutes); 
app.use('/api/doctor/update', routes.doctorUpdate);
app.use('/api/doctor/profile', routes.booking);

// --- MANEJO DE ERRORES ---
app.use(unknownEndpoint);
app.use(errorHandler);

// --- ARRANQUE SINCRONIZADO ---
Promise.all([
    new Promise(resolve => userDB.once('open', resolve)),
    new Promise(resolve => citaDB.once('open', resolve))
]).then(() => {
    console.log('✅ Datacenter SoftwareDT: Infraestructura vinculada.');
    app.listen(PORT, () => console.log(`🚀 API en línea: Puerto ${PORT}`));
}).catch(err => {
    console.error('❌ Error crítico de conexión:', err.message);
    process.exit(1);
});