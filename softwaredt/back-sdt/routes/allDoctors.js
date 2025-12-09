const express = require('express');
const router = express.Router();

// 1. I
const { getAllDoctors } = require('../controllers/doctorController'); 

router.get('/', getAllDoctors); 

module.exports = router;