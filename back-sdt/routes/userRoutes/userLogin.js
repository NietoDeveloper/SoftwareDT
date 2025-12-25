const express = require('express');
const router = express.Router();
const { userLogin } = require('../../controllers/userController'); // Asegúrate que el nombre del archivo sea igual

router.post('/', userLogin);

module.exports = router;