const Message = require('../models/Message');
const asyncHandler = require('express-async-handler');

// @desc    Obtener logs de actividad del usuario
// @route   GET /api/messages/user/:userId
const getUserMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Solo el dueño puede ver sus logs
    if (req.userId !== userId && req.role !== 'admin') {
        return res.status(403).json({ message: "No autorizado" });
    }

    const messages = await Message.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(10); // Traemos los últimos 10 para el Panel

    res.status(200).json({ success: true, messages });
});

module.exports = { getUserMessages };