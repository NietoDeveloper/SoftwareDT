const express = require('express');
const router = express.Router();

// CORRECTO: Subimos dos niveles (../../) para salir de routes/userRoutes/ 
// y entrar a controllers. NO importamos modelos aquí.
const { updateUserDetails } = require('../../controllers/userController');

/**
 * @route   PUT /api/user/update/:id
 * @desc    Actualizar datos de perfil del usuario
 * @access  Private (Protegido por verifyAccess en server.js)
 */
router.put('/:id', updateUserDetails);

module.exports = router;