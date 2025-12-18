const express = require('express');
const router = express.Router();
// Importamos la función exacta definida en doctorController
const { handleDoctorLogin } = require('../../controllers/doctorController');

/**
 * @route   POST /api/doctor/login
 * @desc    Autenticación de doctores y generación de tokens
 * @access  Public
 */
router.post('/', handleDoctorLogin);

module.exports = router;