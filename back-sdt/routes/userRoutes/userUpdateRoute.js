const express = require('express');
const router = express.Router();
// Asegúrate de que en userController.js la función se llame exactamente updateUserDetails
const { updateUserDetails } = require('../../controllers/userController');

/**
 * @route   PUT /api/user/update/:id
 * @desc    Actualizar datos del perfil de usuario
 * @access  Private
 */
router.put('/:id', updateUserDetails);

module.exports = router;