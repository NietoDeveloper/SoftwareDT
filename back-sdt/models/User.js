const mongoose = require('mongoose');
const { Schema } = mongoose;
const { userDB } = require('../config/dbConn');

const userSchema = new Schema({
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
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Por favor, use un correo válido']
    },
    password: { 
        type: String, 
        required: [true, 'La contraseña es obligatoria'], 
        select: false, // Protege la contraseña en consultas comunes
        minlength: 8
    },
    phone: { 
        type: String,
        trim: true 
    },
    photo: { 
        type: String, 
        default: "https://www.pngarts.com/explore/215296" 
    },
    gender: { 
        type: String, 
        enum: {
            values: ["male", "female", "trans", "other"],
            message: '{VALUE} no es un género soportado'
        }
    },
    
    // Elon Musk Standard: Mensaje de autoridad técnica
    adminMessage: { 
        type: String, 
        default: "Software DT: Ingeniería de Software de alto rendimiento. Compromiso total, 361 días de despliegue continuo." 
    },

    // Personalización Pro: Plantilla de WhatsApp
    customMessage: { 
        type: String, 
        default: "Hola Software DT, solicito soporte técnico especializado para mi proyecto." 
    },

    // Relaciones
    appointments: [{ 
        type: mongoose.Schema.Types.ObjectId, 
        ref: "Appointment" 
    }],
    
    // RBAC (Role-Based Access Control)
    roles: {
        usuario: { type: Number, default: 1002 }, 
        admin: { type: Number } 
    },

    // Seguridad de Sesiones
    refreshToken: {
        type: [String],
        index: true
    }
}, { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// Middleware pre-save (ejemplo para capitalizar nombre)
userSchema.pre('save', function(next) {
    if (this.name) {
        this.name = this.name.split(' ').map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()).join(' ');
    }
    next();
});

// Exportamos usando la conexión específica para Software DT
module.exports = userDB.model('User', userSchema);