const express = require('express');
const router = express.Router();
// Importamos la función exacta del controlador de doctores
const { updateDoctor } = require('../../controllers/doctorController');

/**
 * @route   PUT /api/doctor/update/:id
 * @desc    Actualizar información del perfil del doctor
 * @access  Private (El middleware verifyAccess ya está en server.js)
 */
router.put('/:id', updateDoctor);

module.exports = router;