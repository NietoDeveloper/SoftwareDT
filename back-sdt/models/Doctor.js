const mongoose = require('mongoose');
const { Schema } = mongoose;

const { userDB } = require('../config/dbConn'); 







module.exports = userDB.model('Doctor', doctorSchema);