const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userDB } = require('../config/dbConn'); // Conexión específica para Auth

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'El correo es obligatorio'], 
        unique: true,
        lowercase: true,
        trim: true
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'], 
        select: false, // Seguridad: no se envía en consultas por defecto
        minlength: 8
    },
    photo: {
        type: String,
        default: 'https://placehold.co/400x400?text=SDT'
    },
    roles: {
        usuario: {
            type: Number,
            default: 1002 // Código estándar de Software DT
        }
    },
    // Autoridad Técnica
    adminMessage: { 
        type: String, 
        default: "Software DT: Ingeniería de alto rendimiento." 
    },
    customMessage: { 
        type: String, 
        default: "Hola Software DT, solicito soporte técnico especializado." 
    },
    refreshToken: {
        type: [String],
        index: true
    }
}, { 
    timestamps: true // Crea createdAt y updatedAt automáticamente
});

// --- LÓGICA DE SEGURIDAD (PRE-SAVE) ---
userSchema.pre('save', async function (next) {
    // 1. Solo hashear si el password fue modificado o es nuevo
    if (!this.isModified('password')) return next();

    // 2. Blindaje contra doble hash
    if (this.password.startsWith('$2b$')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// --- EL CAMBIO MAESTRO PARA MULTI-CONEXIÓN ---
// Usamos la instancia userDB para vincular el modelo a la base de datos de usuarios
const User = userDB.model('User', userSchema);

module.exports = User;