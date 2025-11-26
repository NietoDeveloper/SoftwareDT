const mongoose = require('mongoose');

const initializeConnection = (uri, name) => {
    if (!uri) {
        console.error(`⚠️ URI de MongoDB para ${name} no definida en .env`);
        return null;
    }
    
    const connection = mongoose.createConnection(uri);
    
    connection.on('connected', () => {
        console.log(`✅ MongoDB (${name}) Conectado exitosamente.`);
    });
    
    connection.on('error', (err) => {
        console.error(`❌ Error al conectar MongoDB (${name}):`, err.message);
    });

    connection.on('disconnected', () => {
        console.log(`🔌 MongoDB (${name}) Desconectado. Reconectando...`);
    });
    
    return connection;
};

const userDB = initializeConnection(
    process.env.MONGODB_URI_USUARIOS, 
    'USUARIOS'
);

const citaDB = initializeConnection(
    process.env.MONGODB_URI_CITAS, 
    'CITAS'
);

module.exports = { userDB, citaDB };