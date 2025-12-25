// --- PROTOCOLO DE RUTAS SOFTWARE DT ---
const express = require('express');
const router = express.Router();

/**
 * IMPORTACIÓN DE CONTROLADORES
 * Subimos dos niveles (../../) para salir de 'userRoutes', luego de 'routes'
 * y finalmente entrar en la carpeta 'controllers'.
 */
const { updateUserDetails } = require('../../controllers/userController');

/**
 * @route   PUT /api/user/update/:id
 * @desc    Actualizar datos de perfil del usuario (Nombre, Email, Foto, Password)
 * @access  Private (El middleware verifyAccess se aplica globalmente en server.js)
 */
if (updateUserDetails) {
    router.put('/:id', updateUserDetails);
} else {
    console.error('❌ ERROR CRÍTICO: El controlador updateUserDetails no está definido en userController.js');
}

module.exports = router;