const express = require('express');
const router = express.Router();

const { getAllDoctors } = require('../controllers/doctorController'); 

router.get('/', (req, res, next) => {

    res.set('Cache-Control', 'no-store, no-cache, must-revalidate, proxy-revalidate');
    res.set('Pragma', 'no-cache');
    res.set('Expires', '0');
    res.set('ETag', ''); 
    
    next(); 
}, getAllDoctors); 

module.exports = router;