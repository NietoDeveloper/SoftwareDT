require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet');

const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');
const verifyAccess = require('./middleware/verifyAccess'); 
const { unknownEndpoint } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. SEGURIDAD ---
app.use(helmet({ contentSecurityPolicy: false })); 
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); 
app.use(cors(corsOptions));

// --- 2. MIDDLEWARES ---
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Endpoints de Control
app.get('/health', (req, res) => res.status(200).send('OK'));
app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'Operational', 
        service: 'SoftwareDT Datacenter',
        commit_consistency: '141+ Days', 
        env: process.env.NODE_ENV || 'development'
    });
});

// --- 3. DEFINICIÓN DE RUTAS (CORREGIDO) ---
// Extraemos la función específica de cada objeto exportado
const { userRegister } = require('./routes/userRoutes/userRegister');
const { userLogin } = require('./routes/userRoutes/userLogin');
const { userRefresh } = require('./routes/userRoutes/userRefresh');
const { userLogout } = require('./routes/userRoutes/userLogout');
const { doctorRegister } = require('./routes/doctorRoutes/doctorRegister');
const { doctorLogin } = require('./routes/doctorRoutes/doctorLogin');
const allDoctors = require('./routes/allDoctors'); // Si estos ya exportan un router, se dejan así
const appointmentRoutes = require('./routes/appointmentRoute');
const { userUpdate } = require('./routes/userRoutes/userUpdateRoute');
const review = require('./routes/reviewRoute');
const { doctorUpdate } = require('./routes/doctorRoutes/doctorUpdate');
const booking = require('./routes/bookingRoute');

// --- 4. MAPEO DE ENDPOINTS ---
app.use(['/api/user/register', '/api/auth/register'], userRegister);
app.use(['/api/user/login', '/api/auth/login'], userLogin);
app.use('/api/doctor/register', doctorRegister);
app.use('/api/doctor/login', doctorLogin);
app.use('/api/doctors', allDoctors); 
app.use('/api/user/refresh', userRefresh);
app.use('/api/user/logout', userLogout);

// --- 5. FILTRO DE ACCESO (PROTECCIÓN) ---
app.use(verifyAccess); 

// --- 6. RUTAS PRIVADAS ---
app.use('/api/user/profile', booking); 
app.use('/api/user/update', userUpdate);
app.use('/api/user/review', review);
app.use('/api/appointments', appointmentRoutes); 
app.use('/api/doctor/update', doctorUpdate);
app.use('/api/doctor/profile', booking);

// --- 7. MANEJO DE ERRORES ---
app.use(unknownEndpoint);
app.use(errorHandler);

// --- 8. ARRANQUE ---
const startServer = async () => {
    try {
        console.log('⏳ Sincronizando Datacenters Software DT...');
        
        const connectDB = (db, name) => new Promise((resolve, reject) => {
            if (db.readyState === 1) return resolve();
            db.once('open', () => {
                console.log(`📡 Conexión establecida: ${name}`);
                resolve();
            });
            db.on('error', (err) => {
                console.error(`❌ Error en ${name}:`, err);
                reject(err);
            });
        });

        await Promise.all([
            connectDB(userDB, 'UserDB (Auth)'),
            connectDB(citaDB, 'CitaDB (Bookings)')
        ]);
        
        app.listen(PORT, () => {
            console.log('----------------------------------------------------');
            console.log(`🚀 SOFTWARE DT OPERATIVO EN PUERTO: ${PORT}`);
            console.log(`📈 ESTADO: Clase Mundial | BOGOTÁ, COLOMBIA`);
            console.log('----------------------------------------------------');
        });
    } catch (err) {
        console.error('💥 FALLO CRÍTICO:', err.message);
        process.exit(1);
    }
};

startServer();