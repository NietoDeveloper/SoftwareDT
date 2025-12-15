const express = require('express');
const router = express.Router();

const { getAllDoctors } = require('../controllers/doctorController'); 

// 💡 CORRECCIÓN APLICADA: Middleware para forzar 200 OK y deshabilitar caché/ETag.

router.get('/', (req, res, next) => {
    // 1. Deshabilitar los encabezados de caché comunes
    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('ETag', ''); 
    
    next(); // Pasar al controlador
}, getAllDoctors); 

module.exports = router;