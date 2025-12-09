const express = require('express');
const router = express.Router();
const { getAllServices } 








const express = require('express');
const router = express.Router();

// 1. Importa la función correcta (getAllDoctors) del controlador correcto (doctorController)
const { getAllDoctors } = require('../controllers/doctorController'); 

// 2. Asocia la ruta GET con la función getAllDoctors
router.get('/', getAllDoctors); 

module.exports = router;