require('dotenv').config({ path: '../.env' });
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
const {verifyAccess} = require('./middleware/verifyAccess');
const {unknownEndpoint} = require('./middleware/notFound');
const {errorHandler} = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000; 

// Conectar a la base de datos
connectDB();

// Middlewares globales
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// --- CORRECCIÓN SVGH/SVG: Servir archivos estáticos ---
// Esto permite que el servidor sirva archivos como imágenes, CSS y SVGs
// desde la carpeta 'public', que es donde el frontend debe buscar los assets.
app.use(express.static('public')); 

// ------------------------------------------------------------------------------------------------------------------
// 1. RUTAS PÚBLICAS (No requieren autenticación)
// ------------------------------------------------------------------------------------------------------------------

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