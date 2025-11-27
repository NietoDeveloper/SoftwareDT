const express = require('express');
const router = express.Router();
const { getAllDoctors } = require('../controllers/doctorController');  // Asegura controller usa Doctor.find({ isApproved: 'approved', isAvailable: true })

router.get('/', getAllDoctors);

module.exports = router;