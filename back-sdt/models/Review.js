const mongoose = require('mongoose');
const { Schema } = mongoose;

const { citaDB } = require('../config/dbConn');

const reviewSchema = new Schema({
    doctor: { type: mongoose.Types.ObjectId, ref: "Doctor", required: true },
    user: { type: mongoose.Types.ObjectId, ref: "User", required: true },
    reviewText: { type: String, required: true, maxLength: 250 },
    rating: { 
        type: Number, 
        required: true, 
        min: 1, 
        max: 5 
    }
}, { timestamps: true });

module.exports = citaDB.model('Review', reviewSchema);