const express = require('express');
const router = express.Router();
// Importamos la función específica del controlador
const { doctorRegister } = require('../../controllers/doctorController');

/**
 * @route   POST /api/doctor/register
 * @desc    Registrar un nuevo perfil de doctor
 * @access  Public
 */
router.post('/', doctorRegister);

module.exports = router;