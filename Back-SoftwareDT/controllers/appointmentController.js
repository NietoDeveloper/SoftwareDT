import Appointment from '../models/Appointment.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import asyncHandler from 'express-async-handler';

/**
 * 🛰️ SOFTWARE DT - APPOINTMENT SYSTEM (Nivel S+)
 * Arquitectura de servicios y consultoría técnica.
 * Controladores vinculados al Datacenter DT2 (citaDB).
 */

// --- 1. CREAR RESERVA DE SOLUCIÓN (Booking Flow) ---
export const appointmentBooking = asyncHandler(async (req, res) => {
    const { 
        productId, 
        userId: bodyUserId, 
        fullName, 
        email, 
        phone, 
        slotDate, 
        slotTime, 
        reason, 
        solutionName, 
        price,
        amount 
    } = req.body;

    const finalPrice = price || amount;

    // Validación de integridad de protocolo
    if (!productId || !slotDate || !slotTime || !fullName || !phone) {
        return res.status(400).json({ 
            success: false, 
            message: "Protocolo incompleto: Faltan datos críticos para el agendamiento del módulo." 
        });
    }

    // Identificación del nodo de usuario (Extracción de Token o Body)
    const userId = req.userId || bodyUserId || null; 
    
    // Verificación de existencia del producto en DT1
    const nodeData = await Product.findById(productId).lean();
    if (!nodeData) {
        return res.status(404).json({ 
            success: false, 
            message: "El producto o nodo de destino no existe en el Datacenter." 
        });
    }

    try {
        const newAppointment = await Appointment.create({
            user: userId,
            product: productId, 
            solutionName: solutionName || nodeData.name || "Solución Técnica SDT",         
            specialization: nodeData.category || "Software DT Engineering",
            userInfo: { 
                fullName, 
                email: email || "usuario@softwaredt.com",
                phone 
            },
            appointmentDetails: {
                date: slotDate, 
                time: slotTime,
                reason: reason || "Implementación de Módulo Software DT",
                status: "pending"
            },
            paymentInfo: {
                price: finalPrice ? Number(finalPrice) : (nodeData.price ? Number(nodeData.price) : 0),
                currency: "COP",
                isPaid: false
            }
        });

        if (newAppointment) {
            // Sincronización inversa opcional con el perfil de usuario en DT1
            if (userId) {
                await User.findByIdAndUpdate(userId, { $push: { appointments: newAppointment._id } });
            }
            
            res.status(201).json({ 
                success: true, 
                message: "¡Sincronización de reserva completada!",
                appointment: newAppointment 
            });
        }
    } catch (error) {
        res.status(500).json({ success: false, message: `Fallo Crítico: ${error.message}` });
    }
});

// --- 2. OBTENER REGISTROS POR USUARIO (Panel Usuario Blindado) ---
export const getUserAppointments = asyncHandler(async (req, res) => {
    const userId = req.params.userId || req.userId;
    
    if (!userId) {
        return res.status(400).json({ success: false, message: "ID de usuario requerido para auditoría." });
    }

    const now = new Date();
    const todayStr = now.toISOString().split('T')[0];
    const timeStr = now.toTimeString().split(' ')[0].substring(0, 5);

    // ✅ AUTO-FULFILL: Protocolo de actualización automática para fechas vencidas
    await Appointment.updateMany(
        {
            user: userId,
            "appointmentDetails.status": "pending",
            $or: [
                { "appointmentDetails.date": { $lt: todayStr } },
                { 
                    "appointmentDetails.date": todayStr, 
                    "appointmentDetails.time": { $lt: timeStr } 
                }
            ]
        },
        { $set: { "appointmentDetails.status": "completed" } }
    );

    // 🛰️ SDT OPTIMIZATION: Leemos de la colección de citas sin populate cruzado para evitar el error de Schema
    const appointments = await Appointment.find({ user: userId })
        .sort({ 'appointmentDetails.date': -1, 'appointmentDetails.time': -1 })
        .lean();

    // Mapeo limpio usando la data denormalizada que ya tienes guardada
    const formattedAppointments = appointments.map(appt => ({
        _id: appt._id,
        solutionName: appt.solutionName,
        specialization: appt.specialization,
        appointmentDate: appt.appointmentDetails?.date,
        appointmentTime: appt.appointmentDetails?.time,
        status: appt.appointmentDetails?.status, 
        price: appt.paymentInfo?.price,
        isPaid: appt.paymentInfo?.isPaid,
        productName: appt.solutionName || "Software DT Product", // Respaldo denormalizado
        productImage: "" // El frontend puede inyectar imágenes por defecto según el nombre
    }));

    res.status(200).json({ 
        success: true, 
        count: formattedAppointments.length,
        appointments: formattedAppointments 
    });
});

// --- 3. ACTUALIZAR ESTADO (Admin Dashboard / Panel Control) ---
export const updateAppointmentStatus = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { status } = req.body; 

    const validStatuses = ["pending", "approved", "cancelled", "completed", "active", "scheduled", "finished"];
    if (!validStatuses.includes(status)) {
        return res.status(400).json({ success: false, message: "Estado de protocolo inválido." });
    }

    // 🛰️ SDT OPTIMIZATION: Quitamos el populate que rompe el hilo entre DT1 y DT2
    const appointment = await Appointment.findByIdAndUpdate(
        id, 
        { $set: { "appointmentDetails.status": status } },
        { new: true }
    ).lean();

    if (!appointment) {
        return res.status(404).json({ success: false, message: "Registro no localizado." });
    }

    res.status(200).json({ 
        success: true, 
        message: `Estado actualizado a: ${status}.`,
        appointment 
    });
});

// --- 4. AUDITORÍA GLOBAL (Solo Staff/Admin Blindado) ---
export const getAppointments = asyncHandler(async (req, res) => {
    // 🛰️ SDT OPTIMIZATION: Quitamos los .populate que cruzaban de forma inestable
    const appointments = await Appointment.find({})
        .sort({ createdAt: -1 })
        .lean();
        
    res.status(200).json({ success: true, appointments });
});