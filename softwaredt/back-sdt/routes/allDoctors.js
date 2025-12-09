// En tu archivo de ruta (ej. ./routes/allDoctors.js)
const express = require('express');
const router = express.Router();
const { getAllServices } = require('../controllers/serviceController'); 

router.get('/', getAllServices); 

module.exports = router;