const mongoose = require('mongoose');

const initializeConnection = async (uri, name, dbName) => {
    if (!uri) {
        console.error(`⚠️ URI de MongoDB para ${name} no definida en .env`);
        return null;
    }
    
    const connectionOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName: dbName || 'test'  // Reemplaza con nombre real de DB en Atlas (e.g., 'dt_usuarios')
    };

    try {
        const connection = await mongoose.createConnection(uri, connectionOptions);
        
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
    } catch (err) {
        console.error(`❌ Fallo inicial en conexión MongoDB (${name}):`, err);
        return null;
    }
};

const connectDBs = async () => {
    const userDB = await initializeConnection(
        process.env.MONGODB_URI_USUARIOS, 
        'USUARIOS',
        'dt_usuarios'  // Ajusta al nombre real de tu DB en dt1
    );

    const citaDB = await initializeConnection(
        process.env.MONGODB_URI_CITAS, 
        'CITAS',
        'dt_citas'  // Ajusta al nombre real de tu DB en dt2
    );

    return { userDB, citaDB };
};

module.exports = connectDBs;