const mongoose = require('mongoose');

const initializeConnection = (uri, name) => { // 1. Quitar 'dbName' como argumento
    if (!uri) {
        console.error(`⚠️ URI de MongoDB para ${name} no definida en .env`);
        return null;
    }

    const connectionOptions = {}; 
    
    const connection = mongoose.createConnection(uri, connectionOptions);
    
    connection.on('connected', () => {
        console.log(`✅ MongoDB (${name}) Conectado exitosamente a DB: ${connection.name}.`);
    });
    
    connection.on('error', (err) => {
        console.error(`❌ Error al conectar MongoDB (${name}):`, err.message);
    });

    connection.on('disconnected', () => {
        console.log(`🔌 MongoDB (${name}) Desconectado. Reconectando...`);
    });
    
    return connection;
};

// 3. Llamar a la función sin el tercer argumento (dbName)

const userDB = initializeConnection(
    process.env.MONGODB_URI_USUARIOS, 
    'USUARIOS'
);

const citaDB = initializeConnection(
    process.env.MONGODB_URI_CITAS, 
    'CITAS'
);

module.exports = { userDB, citaDB };