const mongoose = require('mongoose');
const { Schema } = mongoose;

const { userDB } = require('../config/dbConn'); 

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




module.exports = userDB.model('Doctor', doctorSchema);