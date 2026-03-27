import Message from '../models/Message.js'; // Extensión .js obligatoria
import asyncHandler from 'express-async-handler';

// @desc    Obtener logs de actividad del usuario (Historial de Mensajería)
// @route   GET /api/messages/user/:userId
// @access  Private
export const getUserMessages = asyncHandler(async (req, res) => {
    const { userId } = req.params;

    // Validación de Identidad (Seguridad SDT)
    // Comparamos el ID del token (inyectado por verifyAccess/middleware) con el solicitado
    if (req.userId !== userId && req.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: "Acceso restringido: No autorizado para ver este historial." 
        });
    }

    // Buscamos en el Datacenter de actividad
    const messages = await Message.find({ user: userId })
        .sort({ createdAt: -1 })
        .limit(10); // Optimizamos para la última tarjeta del Panel de Control

    res.status(200).json({ 
        success: true, 
        count: messages.length,
        messages 
    });
});

// @desc    Registrar log de comunicación externa (WhatsApp/Email)
// @route   POST /api/messages/log
// @access  Private
export const logMessage = asyncHandler(async (req, res) => {
    const { channel, subject, content } = req.body;

    // Validación básica de entrada
    if (!channel || !content) {
        return res.status(400).json({ 
            success: false, 
            message: "Datos incompletos para el registro de red." 
        });
    }

    // Creamos el log vinculando los campos del Front con el Schema
    const newLog = new Message({
        user: req.userId, // ID inyectado por el middleware de autenticación
        title: subject || "Consulta de Soporte",
        content: content,
        type: channel, // 'WhatsApp' o 'Email' según el Enum del modelo
        link: channel === 'WhatsApp' 
            ? `https://wa.me/573115456209?text=${encodeURIComponent(content)}` 
            : "#"
    });

    await newLog.save();

    res.status(201).json({ 
        success: true, 
        message: "Actividad sincronizada con el clúster central." 
    });
});