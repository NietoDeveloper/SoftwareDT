const express = require('express');
const router = express.Router();
const { appointmentBooking } = require('../controllers/appointmentController');

router.route('/:id').
      post(appointmentBooking);

module.exports = router;
