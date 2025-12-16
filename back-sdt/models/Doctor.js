const mongoose = require('mongoose');
const { Schema } = mongoose;
const bcrypt = require('bcrypt');  // Agregado para hashing seguro de passwords

const { userDB } = require('../config/dbConn'); 

const timeSlotSchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

const doctorSchema = new Schema({
  email: { 
    type: String, 
    required: true, 
    unique: true,
    lowercase: true,  // Agregado: normaliza email
    index: true  // Agregado: index para queries rápidas
  },
  name: { type: String, required: true },
  password: { 
    type: String, 
    required: true, 
    select: false,
    minlength: 8  // Agregado: validación mínima para seguridad
  },
  photo: { type: String }, 
  phone: { type: String },
  roles: {
    doctor: {
      type: Number,
      default: 1001
    },
    admin: Number 
  },
  ticketPrice: { type: Number, default: 0 },
  specialization: { type: String, required: true },
  bio: { type: String, maxlength: 250 },
  timeSlots: [timeSlotSchema],
  reviews: [{ type: Schema.Types.ObjectId, ref: "Review" }],
  rating: { type: Number, default: 0 }, 
  totalRating: { type: Number, default: 0 }, 
  isApproved: { type: String, enum: ["pending", "approved", "cancelled"], default: "approved" },
  appointments: [{ type: Schema.Types.ObjectId, ref: "Appointment" }],
  refreshToken: {
    type: [String],
    select: false, 
    index: true 
  },
  isAvailable: { type: Boolean, default: true }
}, { 
  timestamps: true,
  collection: 'services'  // Mantenido: guarda en 'services' como especificas
});

// Hook pre-save: Hash password automáticamente si no está hasheado
doctorSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    console.error('Error hashing password:', error);
    next(error);
  }
});

// Método para comparar passwords (para login)
doctorSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = userDB.model('Doctor', doctorSchema);