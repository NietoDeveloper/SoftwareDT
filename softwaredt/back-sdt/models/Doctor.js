// models/Doctor.js (CÓDIGO CORREGIDO)

const mongoose = require('mongoose');
const { Schema } = mongoose;

// 1. 🎯 Importar la conexión específica (UserDB)
// Asegúrate de que esta ruta sea correcta para tu proyecto
const { userDB } = require('../config/dbConn'); 

const doctorSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        select: false // 🔒 Oculta la contraseña por defecto en consultas GET públicas
    },
    photo: { type: String },
    phone: { type: String },
    roles: {
        doctor: {
            type: Number,
            default: 1001
        },
        admin: Number
    },
    ticketPrice: { type: Number, default: 30 },

    specialization: { type: String },
    qualifications: { type: Array },
    experience: { type: Array },
    bio: { type: String, maxLength: 250 },
    timeSlots: { type: Array },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    rating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    isApproved: { type: String, enum: ["pending", "approved", "cancelled"], default: "pending" },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    refreshToken: {
        type: [String],
        select: false, 
        index: true
    }
}, { 
    timestamps: true 
});

// 2. 🔗 EXPORTACIÓN CLAVE: Usamos userDB.model() para asociar el modelo a la conexión principal
module.exports = userDB.model('Doctor', doctorSchema);