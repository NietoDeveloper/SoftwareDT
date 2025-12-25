require('dotenv').config();
const express = require('express');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const path = require('path');
const morgan = require('morgan');
const helmet = require('helmet'); // Seguridad para cabeceras en producción

const { userDB, citaDB } = require('./config/dbConn'); 
const corsOptions = require('./config/corsOptions');
const verifyAccess = require('./middleware/verifyAccess'); 
const { unknownEndpoint } = require('./middleware/notFound');
const { errorHandler } = require('./middleware/errorHandler');

const app = express();
const PORT = process.env.PORT || 5000;

// --- 1. SEGURIDAD Y LOGS (Capas iniciales) ---
app.use(helmet({ contentSecurityPolicy: false })); // Protege la infraestructura
app.use(morgan(process.env.NODE_ENV === 'production' ? 'combined' : 'dev')); 
app.use(cors(corsOptions));

// --- 2. PARSEADORES ---
app.use(express.json({ limit: '10mb' })); // Aumentado por si el usuario sube fotos de perfil
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

// Health Check optimizado para servicios de despliegue (Railway/Render/Vercel)
app.get('/health', (req, res) => {
    res.status(200).send('OK');
});

app.get('/', (req, res) => {
    res.status(200).json({ 
        status: 'Operational', 
        service: 'SoftwareDT Datacenter',
        env: process.env.NODE_ENV 
    });
});

// --- 3. CARGA DE RUTAS ---
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

// --- 4. RUTAS PÚBLICAS (Registro e Inicio de Sesión) ---
app.use(['/api/user/register', '/api/auth/register'], routes.userRegister);
app.use(['/api/user/login', '/api/auth/login'], routes.userLogin);
app.use('/api/doctor/register', routes.doctorRegister);
app.use('/api/doctor/login', routes.doctorLogin);
app.use('/api/doctors', routes.allDoctors); 

// --- 5. GESTIÓN DE TOKEN ---
app.use('/api/user/refresh', routes.userRefresh);
app.use('/api/user/logout', routes.userLogout);

// --- 6. MIDDLEWARE DE PROTECCIÓN ---
// Solo protege lo que viene debajo
app.use(verifyAccess); 

// --- 7. RUTAS PRIVADAS (Sincronizadas con Software DT) ---
app.use('/api/user/profile', routes.booking); 
app.use('/api/user/update', routes.userUpdate);
app.use('/api/user/review', routes.review);
app.use('/api/appointments', routes.appointmentRoutes); 
app.use('/api/doctor/update', routes.doctorUpdate);
app.use('/api/doctor/profile', routes.booking);

// --- 8. MANEJO DE FINALES ---
app.use(unknownEndpoint);
app.use(errorHandler);

// --- 9. ARRANQUE SINCRONIZADO DE DATACENTERS ---
const startServer = async () => {
    try {
        await Promise.all([
            new Promise((resolve, reject) => {
                userDB.once('open', resolve);
                userDB.on('error', reject);
            }),
            new Promise((resolve, reject) => {
                citaDB.once('open', resolve);
                citaDB.on('error', reject);
            })
        ]);
        
        console.log('✅ Datacenter SoftwareDT: Infraestructura vinculada.');
        app.listen(PORT, () => {
            console.log(`🚀 API en línea en puerto ${PORT} | Modo: ${process.env.NODE_ENV || 'development'}`);
        });
    } catch (err) {
        console.error('❌ ERROR CRÍTICO SDT:', err.message);
        process.exit(1);
    }
};

startServer();