import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import { userDB } from '../config/dbConn.js';

const userSchema = new mongoose.Schema({
    name: { 
        type: String, 
        required: [true, 'El nombre es obligatorio'],
        trim: true 
    },
    email: { 
        type: String, 
        required: [true, 'El email es obligatorio'],
        unique: true,
        lowercase: true,
        trim: true 
    },
    password: { 
        type: String, 
        required: [true, 'El password es obligatorio'],
        select: false 
    },
    photo: { 
        type: String,
        default: 'https://placehold.co/400x400?text=SDT_USER'
    },
    roles: {
        user: { type: Number, default: 1002 },
        employee: { type: Number }
    },
    refreshToken: [String]
}, { 
    timestamps: true,
    collection: 'users'
});

userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    try {
        const salt = await bcrypt.genSalt(10);
        this.password = await bcrypt.hash(this.password, salt);
        next();
    } catch (error) {
        next(error);
    }
});

// Vinculación al pool userDB para evitar colisiones con modelos de productos u otros
const User = userDB.models.User || userDB.model('User', userSchema);

export default User;