require('dotenv').config();
const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { citaDB } = require('./config/dbConn'); // Tu conexión personalizada
const mongoose = require('mongoose');

const app = express();
const PORT = process.env.PORT || 5000;

// 1. CONFIGURACIÓN DE CORS (Software DT Security)
const allowedOrigins = [
    'http://localhost:5173', // Tu Vite local
    'https://softwaredt.vercel.app' // Tu producción
];

app.use(cors({
    origin: (origin, callback) => {
        if (!origin || allowedOrigins.includes(origin)) {
            callback(null, true);
        } else {
            callback(new Error('Bloqueado por políticas de CORS de SDT'));
        }
    },
    credentials: true, // Permite el envío de cookies/tokens
    optionsSuccessStatus: 200
}));

// 2. MIDDLEWARES BÁSICOS
app.use(express.json());
app.use(cookieParser()); // ¡INDISPENSABLE para Refresh Tokens!

// 3. RUTAS
app.use('/api/auth', require('./routes/authRoutes'));
app.use('/api/appointments', require('./routes/appointmentRoute'));

// 4. MANEJO DE ERRORES GLOBAL
app.use((err, req, res, next) => {
    console.error(`❌ Error en el Datacenter: ${err.message}`);
    res.status(err.status || 500).json({
        success: false,
        message: err.message || "Error interno del servidor en Software DT"
    });
});

// 5. INICIO DEL SERVIDOR TRAS CONEXIÓN A DB
mongoose.connection.once('open', () => {
    console.log('✅ Conectado a MongoDB Atlas (Software DT Cluster)');
    app.listen(PORT, () => console.log(`🚀 Servidor corriendo en puerto ${PORT}`));
});