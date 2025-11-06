const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        // CAMBIADO: Usar MONGODB_URI para que coincida con el .env
        await mongoose.connect(process.env.MONGODB_URI) 
        console.log('MongoDB Conectado exitosamente'); // Añadido para confirmar el éxito
    } catch (error) {
        console.error('⚠️ Error al conectar a MongoDB:', error.message); 
        // Es buena práctica salir si la DB es crítica
        // process.exit(1); 
    }
}

module.exports = connectDB;