const mongoose = require('mongoose');
const { Schema } = mongoose;
const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({
    // Referencias a los IDs originales
    user: { type: mongoose.Types.ObjectId, ref: "User", required: false, default: null },
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },

    // Información Denormalizada (Lo que el cliente ve en su dashboard)
    serviceName: { type: String, required: true },
    specialization: { type: String, required: true },

    // Información del Formulario
    userInfo: {
        fullName: { type: String, required: true },
        // Ajuste: email requerido pero con lógica de seguridad en el controller
        email: { type: String, required: true }, 
        phone: { type: String, required: true }
    },

    // Detalles del Servicio Reservado
    appointmentDetails: {
        date: { type: Date, required: true },
        time: { type: String, required: true },
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        }
    },

    // Información de Pago (Sincronizado con Services.jsx)
    paymentInfo: {
        // Mantenemos String para soportar formatos "$ 100.000"
        price: { type: String, default: "0" }, 
        isPaid: { type: Boolean, default: false },
        currency: { type: String, default: "COP" }
    }
}, { 
    timestamps: true 
});

// Índices para velocidad de búsqueda en Bogotá y reportes
appointmentSchema.index({ doctor: 1, 'appointmentDetails.date': 1 });
appointmentSchema.index({ user: 1 });

module.exports = citaDB.model('Appointment', appointmentSchema);