// Este archivo debe ejecutarse después de que 'dotenv' haya cargado las variables.
const allowedOrigins = [
    // Carga la URL del frontend desde la variable de entorno
    process.env.FRONTEND_URL, 
];

module.exports = allowedOrigins;