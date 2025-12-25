const mongoose = require('mongoose');
const bcrypt = require('bcrypt');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true, select: false }, // 'select: false' por seguridad
    // ... otros campos
}, { timestamps: true });

// --- AJUSTE CRÍTICO ---
userSchema.pre('save', async function (next) {
    // Si la contraseña no ha sido modificada, saltamos el hash
    if (!this.isModified('password')) return next();

    // Verificamos si la contraseña YA parece un hash de bcrypt (empieza por $2b$)
    // Esto evita el "Doble Hash" si el controlador ya la encriptó
    if (this.password.startsWith('$2b$')) {
        return next();
    }

    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

module.exports = mongoose.model('User', userSchema);