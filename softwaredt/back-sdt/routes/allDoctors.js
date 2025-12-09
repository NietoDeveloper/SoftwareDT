// En tu archivo de ruta (ej. ./routes/allDoctors.js)
const express = require('express');
const router = express.Router();
// 💡 CÓDIGO CORREGIDO: Usar el nombre del controlador que coincide con la funcionalidad
const { getAllServices } = require('../controllers/serviceController'); 

// Mantenemos la ruta de
router.get('/', getAllServices); 

module.exports = router;