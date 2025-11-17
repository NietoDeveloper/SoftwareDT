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
const path = require('path');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB();

app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/', (req, res) => {
    res.status(200).json({
        status: 'Server Operational',
        message: 'Welcome to the API root. Use /api/doctors to fetch the list.'
    });
});

app.use('/api/doctors', require('./routes/allDoctors')); 

app.use('/api/user/register', require('./routes/userRoutes/userRegister'));
app.use('/api/user/login', require('./routes/userRoutes/userLogin'));
app.use('/api/user/refresh', require('./routes/userRoutes/userRefresh'));
app.use('/api/user/logout', require('./routes/userRoutes/userLogout'));

app.use('/api/doctor/register', require('./routes/doctorRoutes/doctorRegister'));
app.use('/api/doctor/login', require('./routes/doctorRoutes/doctorLogin'));
app.use('/api/doctor/refresh', require('./routes/doctorRoutes/doctorRefresh'));
app.use('/api/doctor/logout', require('./routes/doctorRoutes/doctorLogout'));

// ----------------------------------------------------------------------
// PASO 1.5: Archivos Estáticos (Movido aquí para evitar el 401 del favicon)
// ----------------------------------------------------------------------

app.use(express.static(path.join(__dirname, 'public')));


// ----------------------------------------------------------------------
// PASO 2: MIDDLEWARE DE AUTENTICACIÓN (Solo para lo que sigue)
// ----------------------------------------------------------------------

// Ahora, verifyAccess solo se aplicará a todas las rutas que se definan
// en los bloques app.use() siguientes.
app.use(verifyAccess); 

// ----------------------------------------------------------------------
// PASO 3: Rutas PROTEGIDAS (Requieren token)
// ----------------------------------------------------------------------

app.use('/api/user/update', require('./routes/userRoutes/userUpdateRoute'));
app.use('/api/user/appointment', require('./routes/appointmentRoute'));
app.use('/api/user/review', require('./routes/reviewRoute'));

app.use('/api/doctor/update', require('./routes/doctorRoutes/doctorUpdate'));
app.use('/api/doctor/profile', require('./routes/bookingRoute'));

// ----------------------------------------------------------------------
// PASO 4: Middlewares de Manejo de Errores (Siempre al final)
// ----------------------------------------------------------------------

app.use(unknownEndpoint);
app.use(errorHandler);

mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
});