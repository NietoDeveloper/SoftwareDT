const mongoose = require('mongoose');
const { Schema } = mongoose;

const { userDB } = require('../config/dbConn'); 

const experienceSchema = new Schema({
  hospital: { type: String, required: true },
  role: { type: String, required: true },
  startYear: { type: Number, required: true },
 
});

const timeSlotSchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});

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
    collection: 'services' 
});

module.exports = userDB.model('Doctor', doctorSchema);