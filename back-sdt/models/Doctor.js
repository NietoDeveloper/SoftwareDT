const mongoose = require('mongoose');
const { Schema } = mongoose;

const { userDB } = require('../config/dbConn'); 

const timeSlotSchema = new Schema({
  day: { type: String, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true }
});





module.exports = userDB.model('Doctor', doctorSchema);