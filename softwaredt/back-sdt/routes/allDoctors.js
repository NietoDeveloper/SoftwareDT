const express = require('express');
const router = express.Router();
const { getAllDoctors } = require('../controllers/doctorController');  // Asegura controller usa Doctor.find({ isApproved: 'approved', isAvailable: true })

// GET /api/user/doctors - Lista doctors disponibles (protegida por verifyAccess en server.js)
router.get('/', getAllDoctors);

module.exports = router;