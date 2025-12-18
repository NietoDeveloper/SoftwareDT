const express = require('express');
const asyncHandler = require('express-async-handler'); // Agregado: Maneja async errors automáticamente (instala si no lo tienes: npm i express-async-handler)
const router = express.Router();
const { appointmentBooking, getAppointments, getUserAppointments } = require('../controllers/appointmentController'); // Importa funciones del controller (agrega get si no existen)

// POST /api/appointments - Crear una nueva cita (pública para guests, doctorId en body)
router.post(
  '/', // Cambiado: Sin :id, usa req.body.doctorId para coincidir con frontend
  asyncHandler(appointmentBooking)
);

// Opcional: GET /api/appointments - Listar todas las citas (para admin/testing, hazla privada si prefieres)
router.get(
  '/',
  asyncHandler(getAppointments)
);

// Opcional: GET /api/appointments/user/:userId - Listar citas de un usuario (para /my-appointments, privada)
router.get(
  '/user/:userId',
  asyncHandler(getUserAppointments)
);

module.exports = router;