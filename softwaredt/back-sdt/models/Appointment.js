const mongoose = require('mongoose');
const { Schema } = mongoose;

const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },
    userInfo: { type: Object },  // Denormalized user data
    doctorInfo: { type: Object },  // Denormalized doctor data
    date: { type: String, required: true },  // e.g., 'YYYY-MM-DD'
    time: { type: String, required: true },  // e.g., 'HH:MM'
    status: {
        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = citaDB.model('Appointment', appointmentSchema);