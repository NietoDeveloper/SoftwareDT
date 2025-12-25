// --- PROTOCOLO DE RUTAS SOFTWARE DT ---
const express = require('express');
const router = express.Router();

/**
 * @path /api/user/login o /api/auth/login
 * @description Punto de entrada para la autenticación de nodos
 */
const { userLogin } = require('../../controllers/userController'); 

// Definición de la ruta POST para el login
router.post('/', userLogin);

// Exportación del router para el orquestador (server.js)
module.exports = router;