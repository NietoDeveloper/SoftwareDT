const express = require('express');
const router = express.Router();

// Importamos ambos controladores
const { getAllDoctors, getSingleDoctor } = require('../controllers/doctorController'); 

/**
 * @route   GET /api/doctors
 * @desc    Obtener todos los doctores
 */
router.get('/', getAllDoctors);

/**
 * @route   GET /api/doctors/:id
 * @desc    Obtener un doctor por su ID (Usado por BookingPage)
 */
router.get('/:id', getSingleDoctor);

module.exports = router;