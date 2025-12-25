/**
 * @description Actualización de Nodo de Usuario con persistencia en UserDB
 * @access Private
 */
const updateUserDetails = asyncHandler(async (req, res) => {
    const { id } = req.params;
    const { name, email, photo, password, customMessage } = req.body;

    // 1. Buscar el usuario
    const user = await User.findById(id);

    if (!user) {
        return res.status(404).json({ 
            success: false, 
            message: 'Error: El nodo de usuario no existe en el Datacenter.' 
        });
    }

    // 2. Actualización Selectiva (Protocolo Clean Data)
    if (name) user.name = name;
    if (email) user.email = email;
    if (photo) user.photo = photo;
    if (customMessage) user.customMessage = customMessage;
    
    // 3. Si se actualiza el password, el middleware .pre('save') en User.js lo hasheará
    if (password) user.password = password;

    const updatedUser = await user.save();

    res.status(200).json({
        success: true,
        message: 'Configuración de nodo actualizada exitosamente.',
        user: {
            _id: updatedUser._id,
            name: updatedUser.name,
            email: updatedUser.email,
            photo: updatedUser.photo,
            role: updatedUser.roles?.usuario || 1002,
            location: "Bogotá, Colombia"
        }
    });
});

// No olvides añadirlo a tus exports
module.exports = { userRegister, userLogin, updateUserDetails };