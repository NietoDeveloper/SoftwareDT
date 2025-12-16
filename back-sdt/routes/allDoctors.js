const express = require('express');
const router = express.Router();

const { getAllDoctors } = require('../controllers/doctorController'); 

// 💡 CORRECCIÓN APLICADA: Middleware para forzar 200 OK y deshabilitar caché/ETag.

router.get('/', (req, res, next) => {

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('ETag', ''); 
    
    next(); 
}, getAllDoctors); 

module.exports = router;