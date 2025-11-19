const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        select: false // 👈 CORRECCIÓN CLAVE: No devuelve la contraseña por defecto en las consultas.
    },
    phone: { type: String },
    photo: { type: String, default: "https://www.pngarts.com/explore/215296" },
    gender: { type: String, enum: ["male", "female", "trans", "other"] },
    bloodType: { type: String },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    roles: {
        patient: { type: Number, default: 1002 }
    },
    refreshToken: {
        type: [String],
        index: true // 👈 MEJORA: Crea un índice para búsquedas rápidas durante el login/logout.
    }
}, { timestamps: true }); // 👈 MEJORA: Añade campos createdAt y updatedAt automáticamente.


module.exports = mongoose.model('User', userSchema);