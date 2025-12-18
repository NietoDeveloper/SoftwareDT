require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan'); // Agregado: Para logging de requests (instala con npm i morgan)

const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');
const verifyAccess = require('./middleware/verifyAccess'); // Cambiado a require normal
const optionalAccess = require('./middleware/optionalAccess'); // Agregado: Nuevo middleware para auth opcional
const { unknownEndpoint } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(morgan('dev')); // Agregado: Loguea requests en consola para depurar (e.g., POST /api/appointments 201)
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// Root endpoint
app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Server Operational',
        message: 'Welcome to the API root.'
    });
});

// --- RUTAS PÚBLICAS (No requieren verifyAccess) ---

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

// 🚀 RUTA CRÍTICA: Servicios/Doctores (Pública para que el Booking Page cargue datos)
app.use('/api/doctors', require('./routes/allDoctors'));  

// Nueva ruta para citas (Pública con auth opcional). Cambiada de /api/user/appointment a /api/appointments
app.use('/api/appointments', optionalAccess, require('./routes/appointmentRoute')); // <--- Agregado optionalAccess para manejar logueados/guests

app.use(express.static(path.join(__dirname, 'public')));

// --- MIDDLEWARE DE AUTENTICACIÓN ---
// Todo lo que esté debajo de esta línea requiere un Token válido
app.use(verifyAccess); 

// --- RUTAS PRIVADAS (Requieren login) ---

// Rutas de Usuario
app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));

// Rutas de Doctor
app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));
app.use('/api/doctor/profile', require('./routes/bookingRoute'));

// Opcional: Si quieres una ruta privada para ver mis citas (e.g., GET /api/user/my-appointments)
// Puedes agregar aquí: app.use('/api/user/my-appointments', require('./routes/myAppointmentsRoute'));

// Manejo de errores
app.use(unknownEndpoint);
app.use(errorHandler);

// --- CONEXIÓN A BASES DE DATOS Y ARRANQUE ---

Promise.all([
    new Promise(resolve => userDB.once('open', resolve)),
    new Promise(resolve => citaDB.once('open', resolve))
]).then(() => {
    console.log('✅ MongoDB (USUARIOS) y (CITAS) conectadas.');
    console.log('✅ Ambas conexiones DB listas. Servidor iniciando.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
    console.error('❌ Error crítico en conexiones DB:', err.message);
    process.exit(1);
});