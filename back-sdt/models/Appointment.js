
const { citaDB } = require('../config/dbConn');



module.exports = citaDB.model('Appointment', appointmentSchema);