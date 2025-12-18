const mongoose = require('mongoose');
const { Schema } = mongoose;

const { citaDB } = require('../config/dbConn');

const appointmentSchema = new Schema({

        type: String,
        enum: ["pending", "approved", "cancelled"],
        default: "pending",
    },


module.exports = citaDB.model('Appointment', appointmentSchema);