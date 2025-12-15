require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const mongoose = require('mongoose'); 

const { userDB, citaDB } = require('./config/dbConn'); 

const corsOptions = require('./config/corsOptions');
const {verifyAccess} = require('./middleware/verifyAccess');
const {unknownEndpoint} = require('./middleware/notFound');
const {errorHandler} = require('./middleware/errorHandler');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

// =========================================================
// 💡 CORRECCIÓN PARA EL PROBLEMA 304 (Cache/ETag)
// Deshabilitar ETag asegura que el servidor siempre envíe una 
// respuesta completa (200 OK) con el cuerpo de los datos, 
// en lugar de un 304 Not Modified sin cuerpo.
// =========================================================
app.disable('etag'); 

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Server Operational',
        message: 'Welcome to the API root.'
    });
});

app.use('/api/user/register', require('./routes/userRoutes/userRegister'));
app.use('/api/user/login', require('./routes/userRoutes/userLogin'));
app.use('/api/user/refresh', require('./routes/userRoutes/userRefresh'));
app.use('/api/user/logout', require('./routes/userRoutes/userLogout'));

app.use('/api/doctor/register', require('./routes/doctorRoutes/doctorRegister'));
app.use('/api/doctor/login', require('./routes/doctorRoutes/doctorLogin'));
app.use('/api/doctor/refresh', require('./routes/doctorRoutes/doctorRefresh'));
app.use('/api/doctor/logout', require('./routes/doctorRoutes/doctorLogout'));

app.use(express.static(path.join(__dirname, 'public')));

app.use('/api/doctors', require('./routes/allDoctors'));  
app.use(verifyAccess); 

app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/user/appointment', require('./routes/appointmentRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));

app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));
app.use('/api/doctor/profile', require('./routes/bookingRoute'));

app.use(unknownEndpoint);
app.use(errorHandler);

Promise.all([
    new Promise(resolve => userDB.once('open', resolve)),
    new Promise(resolve => citaDB.once('open', resolve))
]).then(() => {
    console.log('✅ Ambas conexiones DB listas. Servidor iniciando.');
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
}).catch(err => {
    console.error('❌ Error en conexiones DB:', err);
    process.exit(1);
});