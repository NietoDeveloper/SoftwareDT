const mongoose = require('mongoose');

// Función para inicializar una conexión y manejar sus eventos
const initializeConnection = (uri, name) => {
    if (!uri) {
        console.error(`⚠️ URI de MongoDB para ${name} no definida en .env`);
        return null;
    }
    
    // mongoose.createConnection crea una conexión que puede ser asignada a modelos específicos
    const connection = mongoose.createConnection(uri);
    
    connection.on('connected', () => {
        console.log(`✅ MongoDB (${name}) Conectado exitosamente.`);
    });
    
    connection.on('error', (err) => {
        console.error(`❌ Error al conectar MongoDB (${name}):`, err.message);
    });
    
    return connection;
};

// 1. Conexión para Usuarios y Perfiles (Clúster Original)
const userDB = initializeConnection(
    process.env.MONGODB_URI_USUARIOS, 
    'USUARIOS'
);

// 2. Conexión para Citas (Clúster Nuevo para las Citas)
const citaDB = initializeConnection(
    process.env.MONGODB_URI_CITAS, 
    'CITAS'
);

// Exportamos ambas conexiones para que los Modelos (Cita y Usuario) puedan usarlas
module.exports = {
    userDB,
    citaDB
};