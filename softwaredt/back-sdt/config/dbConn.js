const mongoose = require('mongoose');

// Función para inicializar una conexión y manejar sus eventos
const initializeConnection = (uri, name) => {
    if (!uri) {
        // En un entorno de producción, puedes optar por lanzar un error fatal.
        console.error(`⚠️ URI de MongoDB para ${name} no definida en .env`);
        return null;
    }
    
    // Opciones recomendadas de Mongoose para conexiones robustas
    const connectionOptions = {
        // Estas opciones solían ser obligatorias, ahora son el comportamiento por defecto en Mongoose 6+
        // Se mantienen aquí para claridad y compatibilidad
        // useNewUrlParser: true, 
        // useUnifiedTopology: true,
        // Puedes agregar más opciones específicas aquí si las necesitas, ej: serverSelectionTimeoutMS
    };

    // mongoose.createConnection crea una conexión que puede ser asignada a modelos específicos
    const connection = mongoose.createConnection(uri, connectionOptions);
    
    connection.on('connected', () => {
        console.log(`✅ MongoDB (${name}) Conectado exitosamente.`);
    });
    
    connection.on('error', (err) => {
        console.error(`❌ Error al conectar MongoDB (${name}):`, err.message);
        // Puedes añadir aquí lógica de reintento si es necesario
    });

    connection.on('disconnected', () => {
        console.log(`🔌 MongoDB (${name}) Desconectado. Reconectando...`);
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

module.exports = {
    userDB,
    citaDB
};