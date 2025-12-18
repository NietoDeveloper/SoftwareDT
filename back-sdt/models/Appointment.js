const mongoose = require('mongoose');
const { Schema } = mongoose;
const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({
    // Referencias (IDs)
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },

    // Información Denormalizada del Doctor (Para la "Tarjeta")
    doctorName: { type: String, required: true },
    specialization: { type: String, required: true },

    // Información del Formulario (Diligenciada por el usuario)
    patientInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true },
        phone: { type: String, required: true }
    },

    // Detalles de la Cita
    appointmentDetails: {
        date: { type: String, required: true },  // 'YYYY-MM-DD'
        time: { type: String, required: true },  // 'HH:MM'
        reason: { type: String, required: true },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled"],
            default: "pending",
        }
    },

    // Información de Pago y Precio
    paymentInfo: {
        price: { type: Number, default: 0 },
        isPaid: { type: Boolean, default: false },
        currency: { type: String, default: "COP" }
    }
}, { 
    timestamps: true // Esto crea 'createdAt' y 'updatedAt' automáticamente
});

// IMPORTANTE: Se exporta usando la conexión 'citaDB' (sdt2 en Atlas)
module.exports = citaDB.model('Appointment', appointmentSchema);