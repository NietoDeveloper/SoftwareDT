const express = require('express');
const router = express.Router();

const { getAllDoctors } = require('../controllers/doctorController'); 

// Esta es la forma estándar y limpia de definir una ruta GET que llama a un controlador.
// La ruta completa es ahora más directa: GET /api/doctors/ (o la ruta que uses en server.js)
router.get('/', getAllDoctors); 

module.exports = router;