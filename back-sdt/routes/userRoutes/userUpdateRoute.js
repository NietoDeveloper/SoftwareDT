const User = require('../models/User'); // Asegúrate de que este modelo use userDB
const asyncHandler = require('express-async-handler');

/**
 * @desc    Actualizar detalles del perfil en Software DT
 * @route   PUT /api/user/update/:id
 * @access  Private (Owner or Admin)
 */
const updateUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;

    // SEGURIDAD: Validamos contra el token decodificado por verifyAccess
    // Nota: Usamos req.userId (inyectado por el middleware)
    if (req.userId !== id && req.role !== 'admin') {
        return res.status(403).json({ 
            success: false, 
            message: "Acceso denegado: No tienes permisos para modificar este perfil." 
        });
    }

    try {
        // Extraemos solo los campos permitidos para evitar escalada de privilegios
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
            { new: true, runValidators: true } 
        ).select('-password -refreshToken -__v'); // Limpiamos la respuesta

        if (!updatedUser) {
            return res.status(404).json({ 
                success: false, 
                message: "Usuario no encontrado en el Datacenter." 
            });
        }

        res.status(200).json({
            success: true,
            message: "Perfil actualizado con éxito.",
            data: updatedUser
        });

    } catch (error) {
        // Manejo específico para errores de validación de MongoDB
        res.status(error.name === 'ValidationError' ? 400 : 500).json({ 
            success: false, 
            message: "Error en la actualización de datos.",
            error: error.message 
        });
    }
});

module.exports = { updateUserDetails };