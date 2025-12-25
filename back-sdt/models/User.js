const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userDB } = require('../config/dbConn'); // IMPORTANTE: Traer la conexión correcta

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
        select: false, // Protege la contraseña de fugas en el API
        minlength: 8
    },
    // Mantengo tus campos de autoridad técnica
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
}, { timestamps: true });

// --- LÓGICA DE SEGURIDAD (PRE-SAVE) ---
userSchema.pre('save', async function (next) {
    // 1. Evitar doble hash o re-hasheo innecesario
    if (!this.isModified('password')) return next();

    // 2. Si ya viene hasheada desde el controlador (por error), no tocarla
    if (this.password.startsWith('$2b$')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// --- EL CAMBIO MAESTRO PARA EVITAR EL TIMEOUT ---
// No uses mongoose.model, usa la instancia de conexión userDB
const User = userDB.model('User', userSchema);

module.exports = User;