const express = require('express');
const router = express.Router();
const asyncHandler = require('express-async-handler');
// Verifica que el nombre del archivo y la carpeta sean exactos
const { getDoctorProfile } = require('../controllers/BookDocController'); 

/**
 * @route   GET /api/doctor/profile/:id
 * @desc    Obtener perfil privado del doctor
 * @access  Private
 */
router.get('/:id', asyncHandler(getDoctorProfile));

module.exports = router;