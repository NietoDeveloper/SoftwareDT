const mongoose = require('mongoose');
const { Schema } = mongoose;
const { userDB } = require('../config/dbConn'); 

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        select: false 
    },
    phone: { type: String },
    photo: { type: String, default: "https://www.pngarts.com/explore/215296" },
    gender: { type: String, enum: ["male", "female", "trans", "other"] },
    
    // Campo especial para el Desarrollador/Administrador
    adminMessage: { 
        type: String, 
        default: "" // Aquí es donde escribirás el contenido exclusivo para el usuario
    },

    // Referencias a los servicios contratados
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    
    roles: {
        usuario: { type: Number, default: 1002 }, // Cambiado de 'patient' a 'usuario'
        admin: { type: Number } 
    },

    refreshToken: {
        type: [String],
        index: true
    }
}, { timestamps: true }); 

// Usamos la conexión userDB (sdt1 en Atlas)
module.exports = userDB.model('User', userSchema);