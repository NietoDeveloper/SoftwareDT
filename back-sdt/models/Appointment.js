const mongoose = require('mongoose');
const { Schema } = mongoose;
const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({
    // Referencias a los IDs originales (Lógica de base de datos)
    user: { type: mongoose.Types.ObjectId, ref: "User", required: false, default: null }, // Corregido: No required para guests (default null)
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true }, // Mantiene 'doctor' para no romper la relación con la colección

    // Información Denormalizada del Servicio (Para la "Tarjeta")
    serviceName: { type: String, required: true },      // Antes: doctorName
    specialization: { type: String, required: true },

    // Información del Formulario (Diligenciada por el Usuario)
    userInfo: {                                         // Antes: patientInfo
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },

    // Detalles del Servicio Reservado
    appointmentDetails: {
        date: { type: Date, required: true },           // Corregido: Type Date para mejor manejo (convierte en controller)
        time: { type: String, required: true },         // 'HH:MM'
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        }
    },

    // Información de Pago
    paymentInfo: {
        price: { type: Number, default: 0 },
        isPaid: { type: Boolean, default: false },
        currency: { type: String, default: "COP" }
    }
}, { 
    timestamps: true 
});

// Agregado: Índices para queries eficientes (e.g., buscar citas por doctor y date)
appointmentSchema.index({ doctor: 1, 'appointmentDetails.date': 1 });
appointmentSchema.index({ user: 1 });

// Exportación mediante la conexión citaDB (Base de datos sdt2)
module.exports = citaDB.model('Appointment', appointmentSchema);