const mongoose = require('mongoose');

const initializeConnection = (uri, name, dbName) => {
    if (!uri) {
        console.error(`⚠️ URI de MongoDB para ${name} no definida en .env`);
        return null;
    }
    
    const connectionOptions = {
        dbName: dbName  // Especifica DB real en Atlas
    };
    
    const connection = mongoose.createConnection(uri, connectionOptions);
    
    connection.on('connected', () => {
        console.log(`✅ MongoDB (${name}) Conectado exitosamente a ${dbName || 'default'}.`);
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
    'USUARIOS',
    'sdt'  // DB para dt1 con collections engineers, reviews, users
);

const citaDB = initializeConnection(
    process.env.MONGODB_URI_CITAS, 
    'CITAS',
    'sdt2' 
);

module.exports = { userDB, citaDB };