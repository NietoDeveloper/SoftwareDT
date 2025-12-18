const express = require('express');
const asyncHandler = require('express-async-handler'); // Agregado: Para manejar async errors automáticamente (opcional, pero recomendado)
const router = express.Router();
const { getDoctorProfile } = require('../controllers/BookDocController'); // Importa el controller para obtener perfil de doctor

// Ruta GET /api/doctor/profile/:id - Obtiene el perfil de un doctor por ID (privada, requiere auth)
router.get(
  '/:id',
  asyncHandler(getDoctorProfile) // Envuelve en asyncHandler para catch errors
);

module.exports = router;