const mongoose = require('mongoose');
const { Schema } = mongoose;

const { userDB } = require('../config/dbConn'); 

const qualificationSchema = new Schema({
  institution: { type: String, required: true },
  degree: { type: String, required: true },
  year: { type: Number, required: true }
});

const experienceSchema = new Schema({
  hospital: { type: String, required: true },
  role: { type: String, required: true },
  startYear: { type: Number, required: true },
  endYear: { type: Number }
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
    ticketPrice: { type: Number, default: 30 },
    specialization: { type: String, required: true },
    qualifications: [qualificationSchema],
