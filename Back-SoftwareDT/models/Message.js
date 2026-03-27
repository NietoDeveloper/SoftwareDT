import mongoose from 'mongoose';
import { userDB } from '../config/dbConn.js'; // Extensión .js obligatoria

/**
 * 🛠️ SDT CORE: ESQUEMA DE MENSAJERÍA Y NOTIFICACIONES (Nivel S+)
 * Ubicación: Datacenter DT1 | Colección: messages
 * Mapeado para: Historial de Red / Dashboard Logs
 */
const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: { // Mapeado con 'subject' del frontend
        type: String,
        required: true,
        default: "Actividad del Sistema"
    },
    content: {
        type: String,
        required: true
    },
    type: { // Mapeado con 'channel' del frontend
        type: String,
        enum: ['info', 'success', 'warning', 'appointment', 'WhatsApp', 'Email'],
        default: 'info'
    },
    link: { // Campo extra para el botón LOG del frontend
        type: String,
        default: "#"
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { 
    timestamps: true // Crucial para mostrar la fecha en el "Historial de Red"
});

// --- GESTIÓN DE COLISIONES DE MODELO (SDT Optimization) ---
const Message = userDB.models.Message || userDB.model('Message', messageSchema);

export default Message;