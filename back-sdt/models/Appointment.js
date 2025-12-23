const mongoose = require('mongoose');
const { Schema } = mongoose;
const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({
    // Referencias a los IDs originales
    user: { type: mongoose.Types.ObjectId, ref: "User", required: false, default: null },
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },

    // Información Denormalizada (Clave para que el Dashboard no dependa de otros fetch)
    serviceName: { type: String, required: true },
    specialization: { type: String, required: true },

    // Información del Formulario de Reserva
    userInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true }, 
        phone: { type: String, required: true }
    },

    // Detalles del Servicio Reservado
    appointmentDetails: {
        // Usamos String temporalmente si el front envía "YYYY-MM-DD" 
        // o Date si prefieres validación estricta de Mongoose
        date: { type: String, required: true }, 
        time: { type: String, required: true },
        reason: { type: String, required: true },
        status: {
            type: String,
            // Ampliamos el enum para que coincida con los filtros del Panel
            enum: ["pending", "approved", "cancelled", "completed", "active", "scheduled", "finished"],
            default: "pending",
        }
    },

    // Información de Pago (Sincronizado con Services.jsx)
    paymentInfo: {
        price: { type: String, default: "0" }, 
        isPaid: { type: Boolean, default: false },
        currency: { type: String, default: "COP" }
    }
}, { 
    timestamps: true // Esto genera createdAt y updatedAt automáticamente
});

// Índices para velocidad de búsqueda en Datacenter
appointmentSchema.index({ doctor: 1, 'appointmentDetails.date': 1 });
appointmentSchema.index({ user: 1 });

module.exports = citaDB.model('Appointment', appointmentSchema);