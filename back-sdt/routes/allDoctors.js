const express = require('express');
const router = express.Router();

const { getAllDoctors } = require('../controllers/doctorController'); 

// Ruta GET para obtener todos los doctores (de colección 'services')
router.get('/', async (req, res, next) => {
  try {
    await getAllDoctors(req, res);  // Llama al controller
  } catch (error) {
    console.error('Error en ruta /doctors:', error.message);
    res.status(500).json({ message: 'Error al obtener services. Verifica logs del server.' });
  }
});

module.exports = router;