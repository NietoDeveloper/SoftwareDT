const mongoose = require('mongoose');
const { Schema } = mongoose;

const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({

        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },
    isPaid: { type: Boolean, default: false }
}, { timestamps: true });

module.exports = citaDB.model('Appointment', appointmentSchema);