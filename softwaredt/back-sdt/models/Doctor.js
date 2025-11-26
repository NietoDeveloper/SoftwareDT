const mongoose = require('mongoose');
const { Schema } = mongoose;

const { userDB } = require('../config/dbConn'); 

const doctorSchema = new Schema({
    email: { type: String, required: true, unique: true },
    name: { type: String, required: true },
    password: { 
        type: String, 
        required: true, 
        select: false 
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
    ticketPrice: { type: Number, default: 30 },

    specialization: { type: String },
    qualifications: { type: [Schema.Types.Mixed] },
    experience: { type: [Schema.Types.Mixed] },
    bio: { type: String, maxLength: 250 },
    timeSlots: { type: [Schema.Types.Mixed] },
    reviews: [{ type: mongoose.Types.ObjectId, ref: "Review" }],
    rating: { type: Number, default: 0 },
    totalRating: { type: Number, default: 0 },
    isApproved: { type: String, enum: ["pending", "approved", "cancelled"], default: "pending" },
    appointments: [{ type: mongoose.Types.ObjectId, ref: "Appointment" }],
    refreshToken: {
        type: [String],
        select: false, 
        index: true
    },
    isAvailable: { type: Boolean, default: true }
}, { 
    timestamps: true 
});

module.exports = userDB.model('Doctor', doctorSchema);