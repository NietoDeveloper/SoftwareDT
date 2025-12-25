const express = require('express');
const router = express.Router();
const { userRegister } = require('../../controllers/userController');

/**
 * @route   POST /api/user/register
 * @desc    Registro de nuevos nodos (usuarios) en el Datacenter Software DT
 * @access  Público
 */
router.post('/', userRegister);

module.exports = router;