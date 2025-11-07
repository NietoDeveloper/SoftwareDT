require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose');
const connectDB = require('./config/dbConn');
// Asumo que 'corsOptions' contiene la configuración { origin: 'http://localhost:5173', credentials: true }
const corsOptions = require('./config/corsOptions');
const {verifyAccess} = require('./middleware/verifyAccess');
const {unknownEndpoint} = require('./middleware/notFound');
const {errorHandler} = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000; // Añadido 5000 como default

connectDB();

// 1. MIDDLEWARE: CORS (DEBE IR ANTES DE CUALQUIER OTRA RUTA)
// Esto asegura que la comunicación entre 5173 y 5000 funcione con cookies.
app.use(cors(corsOptions));

// 2. MIDDLEWARE: JSON Parser
app.use(express.json());

// 3. MIDDLEWARE: URL Encoded (si lo necesitas)
app.use(express.urlencoded({ extended: false }));

// 4. MIDDLEWARE: Cookie Parser (PARA LEER req.cookies.refreshToken)
app.use(cookieParser());

// NOTA: Eliminado el bloque manual y duplicado de 'res.header'

// public routes
app.use('/api/doctors', require('./routes/allDoctors'));

// user routes
app.use('/api/user/register', require('./routes/userRoutes/userRegister'));
app.use('/api/user/login', require('./routes/userRoutes/userLogin'));
app.use('/api/user/refresh', require('./routes/userRoutes/userRefresh'));
app.use('/api/user/logout', require('./routes/userRoutes/userLogout'));

// doctor routes
app.use('/api/doctor/register', require('./routes/doctorRoutes/doctorRegister'));
app.use('/api/doctor/login', require('./routes/doctorRoutes/doctorLogin'));
app.use('/api/doctor/refresh', require('./routes/doctorRoutes/doctorRefresh'));
app.use('/api/doctor/logout', require('./routes/doctorRoutes/doctorLogout'));


app.use(verifyAccess);
// user-specific protected routes
app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/doctor/profile', require('./routes/bookingRoute'));
// middleware to ensure only patients book appointments
app.use('/api/user/appointment', require('./routes/appointmentRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));


// doctor-specific protected routes
app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));

app.use(unknownEndpoint);

app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});