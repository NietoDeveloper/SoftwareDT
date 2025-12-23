const User = require('../models/User');
const asyncHandler = require('express-async-handler');

// @desc    Actualizar detalles del perfil
// @route   PUT /api/user/update/:id
// @access  Private
const updateUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // SEGURIDAD: Solo el dueño del perfil o un admin pueden actualizar
    if (req.userId !== id && req.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: "No tienes permiso para actualizar este perfil." 
        });
    }

    try {
        // Filtramos para evitar que el usuario cambie su rol o su password por esta ruta
        const { name, email, phone, gender, photo, bloodType } = req.body;

        const updatedUser = await User.findByIdAndUpdate(
            id,
            { 
                $set: { 
                    name, 
                    email, 
                    phone, 
                    gender, 
                    photo, 
                    bloodType 
                } 
            },
            { new: true, runValidators: true } // new: true devuelve el doc actualizado
        ).select('-password -refreshToken'); // Seguridad: no devolver datos sensibles

        if (!updatedUser) {
            return res.status(404).json({ success: false, message: "Usuario no encontrado." });
        }

        res.status(200).json({
            success: true,
            message: "Perfil actualizado correctamente en el Datacenter.",
            data: updatedUser
        });

    } catch (error) {
        res.status(500).json({ 
            success: false, 
            message: "Error al actualizar los datos.",
            error: error.message 
        });
    }
});

module.exports = { updateUserDetails };