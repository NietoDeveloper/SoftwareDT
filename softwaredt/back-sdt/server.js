require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
const corsOptions = require('./config/corsOptions');
// Importaciones de Middlewares
const { verifyAccess } = require('./middleware/verifyAccess');
const { unknownEndpoint } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
// Uso de process.env.PORT, que es estándar en entornos cloud, con fallback a 5000.
const PORT = process.env.PORT || 5000;

// =================================================================================
// 1. CONEXIÓN A BASE DE DATOS
// =================================================================================

// Conectar a la base de datos (Ejecuta la conexión asíncrona)
connectDB();

// =================================================================================
// 2. MIDDLEWARES GLOBALES
// =================================================================================

// Configuración de CORS
app.use(cors(corsOptions));

// Middleware para servir archivos JSON
app.use(express.json());

// Middleware para manejar datos codificados en la URL (formularios)
app.use(express.urlencoded({ extended: false }));

// Middleware para el manejo de cookies (necesario para Refresh Tokens)
app.use(cookieParser());

// Servir archivos estáticos (imágenes, SVGs, CSS, etc.)
// Esto es correcto, asume que 'public' es la raíz de los assets estáticos.
app.use(express.static('public'));

// Rutas de Listado Público de Doctores
app.use('/api/doctors', require('./routes/allDoctors'));

// Rutas de Autenticación de Usuario
app.use('/api/user/register', require('./routes/userRoutes/userRegister'));
app.use('/api/user/login', require('./routes/userRoutes/userLogin'));
app.use('/api/user/refresh', require('./routes/userRoutes/userRefresh'));
app.use('/api/user/logout', require('./routes/userRoutes/userLogout'));

// Rutas de Autenticación de Doctor
app.use('/api/doctor/register', require('./routes/doctorRoutes/doctorRegister'));
app.use('/api/doctor/login', require('./routes/doctorRoutes/doctorLogin'));
app.use('/api/doctor/refresh', require('./routes/doctorRoutes/doctorRefresh'));
app.use('/api/doctor/logout', require('./routes/doctorRoutes/doctorLogout'));

// =================================================================================
// 4. MIDDLEWARE DE PROTECCIÓN (Aplica a todas las rutas definidas debajo)
// =================================================================================

// Aplica el middleware verifyAccess (Verificación de JWT)
app.use(verifyAccess);

// =================================================================================
// 5. RUTAS PROTEGIDAS (Requieren un token de acceso válido)
// =================================================================================

// Rutas Protegidas de Usuario
app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/user/appointment', require('./routes/appointmentRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));

// Rutas Protegidas de Doctor
app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));
app.use('/api/doctor/profile', require('./routes/bookingRoute'));


// =================================================================================
// 6. MANEJO DE ERRORES Y SERVIDOR
// =================================================================================

// Manejo de endpoints desconocidos (404 Not Found)
app.use(unknownEndpoint);

// Manejador centralizado de errores (Debe ser el último middleware)
app.use(errorHandler);

// Iniciar el servidor solo después de que MongoDB haya reportado una conexión exitosa
mongoose.connection.once('open', () => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT} in ${process.env.NODE_ENV} mode`));
});

// ********** MEJORA ADICIONAL: MANEJO DE ERRORES DE CONEXIÓN **********
// Esto es importante para que el servidor no quede colgado si la DB falla al inicio.
mongoose.connection.on('error', err => {
    console.error(`❌ MongoDB connection error: ${err}`);
    // Opcional: Terminar la aplicación si la conexión inicial a la DB falla.
    // process.exit(1); 
});