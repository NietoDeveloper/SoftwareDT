const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const { userDB } = require('../config/dbConn'); 

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
        select: false, 
        minlength: 8
    },
    photo: {
        type: String,
        default: 'https://placehold.co/400x400?text=SDT'
    },
    roles: {
        usuario: {
            type: Number,
            default: 1002 
        },
        admin: Number,
        editor: Number
    },
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
    timestamps: true 
});

// --- SEGURIDAD: HASHING PROTOCOL ---
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();

    // Evita doble hash si el dato ya viene procesado
    if (this.password.startsWith('$2b$')) return next();

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// --- MÉTODOS DE INSTANCIA (Opcional para Login) ---
userSchema.methods.comparePassword = async function (candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
};

// --- SINGLETON PATTERN PARA MODELOS ---
// Esto evita el error "OverwriteModelError" en desarrollo
const User = userDB.models.User || userDB.model('User', userSchema);

module.exports = User;