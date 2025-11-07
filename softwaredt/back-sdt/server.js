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

const app = express();
const PORT = process.env.PORT || 5000; 

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

// 1. RUTAS PÚBLICAS (NO NECESITAN verifyAccess)
// Rutas Públicas Generales
app.use('/api/doctors', require('./routes/allDoctors'));

// Rutas Públicas de Usuario
app.use('/api/user/register', require('./routes/userRoutes/userRegister'));
app.use('/api/user/login', require('./routes/userRoutes/userLogin'));
app.use('/api/user/refresh', require('./routes/userRoutes/userRefresh'));
app.use('/api/user/logout', require('./routes/userRoutes/userLogout'));

// Rutas Públicas de Doctor (Incluye el problemático /api/doctor/register)
app.use('/api/doctor/register', require('./routes/doctorRoutes/doctorRegister')); // ⬅️ ESTÁ BIEN UBICADA AQUÍ
app.use('/api/doctor/login', require('./routes/doctorRoutes/doctorLogin'));
app.use('/api/doctor/refresh', require('./routes/doctorRoutes/doctorRefresh'));
app.use('/api/doctor/logout', require('./routes/doctorRoutes/doctorLogout'));

// ------------------------------------------------------------------------------------------------------------------
// 2. MIDDLEWARE DE PROTECCIÓN (PROTEGE TODO LO QUE VIENE ABAJO)
app.use(verifyAccess); 
// ------------------------------------------------------------------------------------------------------------------


// 3. RUTAS PROTEGIDAS (Solo se accede si verifyAccess pasa)

// Rutas Protegidas de Usuario
app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/user/appointment', require('./routes/appointmentRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));

// Rutas Protegidas de Doctor
app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));

// NOTA: Esta ruta parece ser privada y genérica. Se deja aquí después de la protección.
app.use('/api/doctor/profile', require('./routes/bookingRoute'));


app.use(unknownEndpoint);
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});