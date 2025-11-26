const mongoose = require('mongoose');

const initializeConnection = (uri, name, dbName) => {
    if (!uri) {
        console.error(`⚠️ URI de MongoDB para ${name} no definida en .env`);
        return null;
    }
    
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: dbName || 'test'  // Reemplaza: 'softwaredt_usuarios' o real de Atlas
    };

    const connection = mongoose.createConnection(uri, connectionOptions);
    
    connection.on('connected', () => {
        console.log(`✅ MongoDB (${name}) Conectado exitosamente a ${dbName}.`);
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
    'softwaredt_usuarios'  // Ajusta al real
);

const citaDB = initializeConnection(
    process.env.MONGODB_URI_CITAS, 
    'CITAS',
    'softwaredt_citas'  // Ajusta al real
);

module.exports = { userDB, citaDB };