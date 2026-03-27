import mongoose from 'mongoose';
const { Schema } = mongoose;
import { citaDB } from '../config/dbConn.js';

/**
 * 🛰️ SOFTWARE DT - APPOINTMENT MODEL (Nivel S+)
 * Ubicación: Datacenter DT2 | Colección: appointments
 */
const appointmentSchema = new Schema({
    // --- VINCULACIÓN AL ECOSISTEMA ---
    user: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "User", 
        required: false, 
        default: null 
    },
    // ✅ Referencia al Nodo de Producto en DT1
    product: { 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Product", 
        required: true 
    },

    // --- INFORMACIÓN DENORMALIZADA (SDT Core) ---
    solutionName: { 
        type: String, 
        required: true, 
        default: "Solución Software DT" 
    },
    specialization: { 
        type: String, 
        required: true, 
        default: "Arquitectura Cloud / MERN" 
    },

    // --- DATOS (Cliente/User) ---
    userInfo: {
        fullName: { type: String, required: true },
        email: { type: String, required: true }, 
        phone: { type: String, required: true }
    },

    // --- DETALLES DE SINCRONIZACIÓN (Agenda de Implementación) ---
    appointmentDetails: {
        date: { type: String, required: true }, 
        time: { type: String, required: true },
        reason: { type: String, default: "Requerimiento Técnico Inicial" },
        status: {
            type: String,
            enum: ["pending", "approved", "cancelled", "completed", "active", "scheduled", "finished"],
            default: "pending",
        }
    },

    // --- CAPA FINANCIERA (Inversión del Proyecto) ---
    paymentInfo: {
        price: { type: Number, default: 0 }, 
        isPaid: { type: Boolean, default: false },
        currency: { type: String, default: "COP" }
    }
}, { 
    timestamps: true,
    collection: 'appointments'
});

// --- ÍNDICES DE ALTO RENDIMIENTO (SDT Optimization) ---
appointmentSchema.index({ product: 1, 'appointmentDetails.date': 1 });
appointmentSchema.index({ user: 1, createdAt: -1 });

const Appointment = citaDB.models.Appointment || citaDB.model('Appointment', appointmentSchema);

export default Appointment;