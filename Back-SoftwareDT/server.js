import dotenv from 'dotenv';
import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';

// Config & Middleware - Importación de Datacenters S+
import { userDB, citaDB } from './config/dbConn.js'; 
import corsOptions from './config/corsOptions.js';
import verifyAccess from './middleware/verifyAccess.js'; 
import { unknownEndpoint } from './middleware/notFound.js';
import { errorHandler } from './middleware/errorHandler.js';

// Routers
import userRegister from './routes/userRoutes/userRegister.js';
import userLogin from './routes/userRoutes/userLogin.js';
import userLogout from './routes/userRoutes/userLogout.js';
import userUpdate from './routes/userRoutes/userUpdateRoute.js';
import userRefreshRouter from './routes/userRoutes/userRefresh.js'; 
import allProducts from './routes/productsRoutes/allProducts.js'; 
import appointmentRoutes from './routes/appointmentRoute.js';
import booking from './routes/bookingRoute.js';
import messageRoutes from './routes/messageRoutes.js'; 

dotenv.config();
const app = express();

/**
 * 🛰️ CONFIGURACIÓN DE RED PARA RAILWAY
 */
const PORT = process.env.PORT || 8080; 
const HOST = '0.0.0.0'; 

/**
 * 🛡️ MIDDLEWARES GLOBALES
 */
app.use(helmet({ 
    contentSecurityPolicy: false,
    crossOriginResourcePolicy: { policy: "cross-origin" } 
})); 

app.use(morgan('dev')); 
app.use(cors(corsOptions));
app.use(express.json({ limit: '10mb' })); 
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

/**
 * 🛠️ 0. RUTAS DE INFRAESTRUCTURA (CRÍTICAS PARA RAILWAY)
 */
app.get('/', (req, res) => {
    res.status(200).send('Software DT Core - Infraestructura Nivel S+ Operacional');
});

app.get('/favicon.ico', (req, res) => res.status(204).end());
app.get('/robots.txt', (req, res) => res.status(204).end());

app.get('/api/health', (req, res) => {
    res.status(200).json({ 
        status: 'ONLINE', 
        timestamp: new Date().toISOString(),
        node: 'Software DT Core',
        uptime: process.uptime(),
        db_user: userDB.readyState === 1 ? 'CONNECTED' : 'CONNECTING',
        db_cita: citaDB.readyState === 1 ? 'CONNECTED' : 'CONNECTING'
    });
});

/**
 * 🌐 1. RUTAS PÚBLICAS
 */
app.use('/api/user/register', userRegister);
app.use('/api/user/login', userLogin); 
app.use('/api/user/refresh', userRefreshRouter);
app.use('/api/products', allProducts); 

/**
 * 🔒 2. CAPA DE SEGURIDAD (TOKEN VERIFICATION)
 */
app.use(verifyAccess); 

/**
 * 🗝️ 3. RUTAS PRIVADAS
 */
app.use('/api/user/logout', userLogout); 
app.use('/api/user/update', userUpdate);
app.use('/api/appointments', appointmentRoutes);
app.use('/api/booking', booking);
app.use('/api/messages', messageRoutes); 

app.use(unknownEndpoint);
app.use(errorHandler);

/**
 * 🚀 ARRANQUE DE INFRAESTRUCTURA CORE S+
 */
const server = app.listen(PORT, HOST, () => {
    const gold = '\x1b[33m';
    const green = '\x1b[32m';
    const cyan = '\x1b[36m';
    const reset = '\x1b[0m';
    const bold = '\x1b[1m';
    
    const doubleLine = '═'.repeat(65);
    const singleLine = '─'.repeat(65);

    console.log(`\n${gold}${doubleLine}${reset}`);
    console.log(`${green}${bold}  🛰️  SOFTWARE DT CORE - INFRAESTRUCTURA NIVEL S+ ACTIVA${reset}`);
    console.log(`${gold}${doubleLine}${reset}`);
    console.log(`  ${cyan}👤 ARCHITECT${reset}  : Manuel Nieto (Committers #1 Colombia)`);
    console.log(`  ${cyan}🌐 NETWORK${reset}    : Protocolo HTTP | Host: ${HOST} | Port: ${PORT}`);
    console.log(`  ${cyan}🛡️  SECURITY${reset}   : JWT-Bearer & Multi-Cluster Enabled`);
    console.log(`${gold}${singleLine}${reset}`);
    console.log(`  ${gold}📊 DATACENTERS STATUS:${reset}`);
    console.log(`     ├─ 🔑 User DB  : [${userDB.readyState === 1 ? green+'CONNECTED'+reset : gold+'CONNECTING'+reset}]`);
    console.log(`     └─ 📅 Citas DB : [${citaDB.readyState === 1 ? green+'CONNECTED'+reset : gold+'CONNECTING'+reset}]`);
    console.log(`${gold}${doubleLine}${reset}\n`);
});

/**
 * ⚠️ GESTIÓN DE ERRORES Y CONEXIONES LATENTES
 */
userDB.on('error', err => console.error('\n❌ Atlas User Cluster Error:', err));
citaDB.on('error', err => console.error('\n❌ Atlas Cita Cluster Error:', err));

process.on('unhandledRejection', (reason) => {
    console.error('\n⚠️ SDT Async Rejection:', reason);
});

/**
 * 💓 HEARTBEAT
 */
setInterval(() => {
    if (server.listening) {
        const timestamp = new Date().toLocaleTimeString();
        process.stdout.write(`\r \x1b[33m💓\x1b[0m [${timestamp}] Software DT Core: Sincronizado`);
    }
}, 60000);

export default app;