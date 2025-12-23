const mongoose = require('mongoose');
const { userDB } = require('../config/dbConn'); // Usamos la conexión de usuarios

const messageSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        required: true,
        default: "Actividad del Sistema"
    },
    content: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['info', 'success', 'warning', 'appointment'],
        default: 'info'
    },
    isRead: {
        type: Boolean,
        default: false
    }
}, { timestamps: true });

// Vinculamos el esquema específicamente a la base de datos de usuarios
const Message = userDB.model('Message', messageSchema);

module.exports = Message;