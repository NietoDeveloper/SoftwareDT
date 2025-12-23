const mongoose = require('mongoose');
const { Schema } = mongoose;
const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({
    // Referencias a los clústeres originales
    // 'user' es opcional para permitir citas de invitados (aunque el panel actual requiere login)
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: false, 
        default: null 
    },
    doctor: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Doctor", 
        required: true 
    },

    // --- INFORMACIÓN DENORMALIZADA ---
    // Clave para rendimiento: No necesitamos popular 'Doctor' solo para ver el nombre del servicio
    serviceName: { 
        type: String, 
        required: true, 
        default: "Consultoría Técnica" 
    },
    specialization: { 
        type: String, 
        required: true, 
        default: "Software Development" 
    },

    // --- DATOS DEL CLIENTE (Capturados en el formulario) ---
    userInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true }, 
        phone: { type: String, required: true }
    },

    // --- DETALLES DE LA CITA (Estructura lógica) ---
    appointmentDetails: {
        // Almacenamos como String "YYYY-MM-DD" para facilitar filtros directos desde el front
        date: { type: String, required: true }, 
        time: { type: String, required: true },
        reason: { type: String, default: "Asesoría inicial" },
        status: {
            type: String,
            // Sincronizado con los filtros de 'ClientAppointmentsPanel.jsx'
            enum: ["pending", "approved", "cancelled", "completed", "active", "scheduled", "taken", "finished"],
            default: "pending",
        }
    },

    // --- CAPA FINANCIERA ---
    paymentInfo: {
        price: { type: String, default: "0" }, 
        isPaid: { type: Boolean, default: false },
        currency: { type: String, default: "COP" }
    }
}, { 
    // Genera createdAt y updatedAt (útil para el "Historial de Mensajería" del panel)
    timestamps: true 
});

// --- ÍNDICES DE ALTO RENDIMIENTO (SDT Optimization) ---
// Optimiza la búsqueda de disponibilidad por especialista y fecha
appointmentSchema.index({ doctor: 1, 'appointmentDetails.date': 1 });
// Optimiza la carga del panel del cliente (el GET /api/appointments/user/:id será instantáneo)
appointmentSchema.index({ user: 1, createdAt: -1 });

// Exportamos vinculado a la conexión de base de datos de CITAS (citaDB)
module.exports = citaDB.model('Appointment', appointmentSchema);