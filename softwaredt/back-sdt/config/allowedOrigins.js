// Este archivo debe ejecutarse después de que 'dotenv' haya cargado las variables.
const allowedOrigins = [
    process.env.FRONTEND_URL, 
];

module.exports = allowedOrigins;