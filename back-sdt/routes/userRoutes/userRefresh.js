const express = require('express');
const router = express.Router();
const { handleRefreshToken } = require('../../controllers/refreshTokenController');

// Cambiado a POST para recibir el token en el req.body desde el frontend
router.post('/', handleRefreshToken);

module.exports = router;