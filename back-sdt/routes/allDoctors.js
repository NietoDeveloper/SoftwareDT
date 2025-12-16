const express = require('express');
const router = express.Router();

const { getAllDoctors } = require('../controllers/doctorController'); 

router.get('/', (req, res, next) => {

    
    next(); 
}, getAllDoctors); 

module.exports = router;