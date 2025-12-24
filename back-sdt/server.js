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

// --- 1. RUTAS TOTALMENTE PÚBLICAS (Antes del Portero) ---

// Mantenemos /api/user para consistencia
app.use('/api/user/register', routes.userRegister);
app.use('/api/user/login', routes.userLogin);

// AÑADIMOS /api/auth para que tu Frontend (que usa /api/auth/register) NO sea bloqueado
app.use('/api/auth/register', routes.userRegister);
app.use('/api/auth/login', routes.userLogin);

app.use('/api/doctor/register', routes.doctorRegister);
app.use('/api/doctor/login', routes.doctorLogin);
app.use('/api/doctors', routes.allDoctors); 

// --- 2. RUTAS SEMI-PÚBLICAS (Manejo de Tokens) ---
app.use('/api/user/refresh', routes.userRefresh);
app.use('/api/user/logout', routes.userLogout);

// --- 3. CAPA DE PROTECCIÓN (EL PORTERO) ---
// El portero solo vigila lo que viene DESPUÉS de él
app.use(verifyAccess); 

// --- 4. RUTAS PRIVADAS (Solo con JWT válido) ---
app.use('/api/appointments', routes.appointmentRoutes); 
app.use('/api/user/update', routes.userUpdate);
app.use('/api/user/review', routes.review);
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
    console.error('❌ Error crítico:', err.message);
    process.exit(1);
});