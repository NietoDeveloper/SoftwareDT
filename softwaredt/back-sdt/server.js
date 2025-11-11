require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const {verifyAccess} = require('./middleware/verifyAccess');
const {unknownEndpoint} = require('./middleware/notFound');
const {errorHandler} = require('./middleware/errorHandler');
const path = require('path'); // Necesario para path.join

const app = express();
const PORT = process.env.PORT || 5000; 

// Conectar a la base de datos
connectDB();

// ==============================================================================
// 0. SERVIR ARCHIVOS ESTÁTICOS Y ELIMINAR EL ERROR 401 DEL FAVICON
// 
// Importante: Esto DEBE ser el primer middleware para asegurar que archivos 
// como favicon.ico, o cualquier JS/CSS estático, se sirvan antes de que 
// cualquier lógica de autenticación (como verifyAccess) pueda bloquearlos.
// ==============================================================================
// 🎯 INTERVENCIÓN: Uso de path.join(__dirname, 'public') para una ruta absoluta.
app.use(express.static(path.join(__dirname, 'public'))); 


// Middlewares globales
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// ------------------------------------------------------------------------------------------------------------------
// 1. RUTAS PÚBLICAS (No requieren autenticación)
// ------------------------------------------------------------------------------------------------------------------

// 🎯 INTERVENCIÓN: Ruta para la Raíz (GET /)
// Responde a peticiones directas a http://localhost:5000/ y evita el 401.
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'Server Operational', 
        message: 'Welcome to the API root. Use /api/doctors to fetch the list.'
    });
});

// Rutas de Listado Público de Doctores (Ruta que llama DoctorList.jsx)
app.use('/api/doctors', require('./routes/allDoctors'));

// Rutas Públicas de Autenticación de Usuario
app.use('/api/user/register', require('./routes/userRoutes/userRegister'));
app.use('/api/user/login', require('./routes/userRoutes/userLogin'));
app.use('/api/user/refresh', require('./routes/userRoutes/userRefresh'));
app.use('/api/user/logout', require('./routes/userRoutes/userLogout'));

// Rutas Públicas de Doctor (Registro de Doctor ya sin dependencias de Firebase)
app.use('/api/doctor/register', require('./routes/doctorRoutes/doctorRegister')); 
app.use('/api/doctor/login', require('./routes/doctorRoutes/doctorLogin'));
app.use('/api/doctor/refresh', require('./routes/doctorRoutes/doctorRefresh'));
app.use('/api/doctor/logout', require('./routes/doctorRoutes/doctorLogout'));

// ------------------------------------------------------------------------------------------------------------------
// 2. MIDDLEWARE DE PROTECCIÓN (Protege todas las rutas que se definen a partir de aquí)
app.use(verifyAccess); 
// ------------------------------------------------------------------------------------------------------------------

// 3. RUTAS PROTEGIDAS (Requieren verifyAccess)

// Rutas Protegidas de Usuario
app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/user/appointment', require('./routes/appointmentRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));

// Rutas Protegidas de Doctor
app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));
app.use('/api/doctor/profile', require('./routes/bookingRoute'));


// Manejo de errores y endpoints desconocidos
app.use(unknownEndpoint);
app.use(errorHandler);

// Iniciar el servidor solo después de conectar a MongoDB
mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});