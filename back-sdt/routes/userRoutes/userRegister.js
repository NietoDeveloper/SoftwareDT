const userRegister = asyncHandler(async (req, res) => {
    const { name, email, password, photo } = req.body;
    
    // 1. Validaciones de entrada
    if (!name || !email || !password) {
        return res.status(400).json({ success: false, message: 'Todos los campos son obligatorios' });
    }

    // 2. Verificar existencia
    const userexist = await User.findOne({ email });
    if (userexist) {
        return res.status(409).json({ success: false, message: 'El usuario ya existe en el Datacenter' });
    }

    // 3. Crear usuario (El modelo User.js hace el hash automáticamente)
    const result = await User.create({
        name,
        email,
        photo: photo || null,
        password,
        customMessage: "Hola Software DT, solicito soporte técnico."
    });

    if (result) {
        // 4. GENERAR TOKENS INMEDIATAMENTE (Igual que en Login)
        const accessToken = jwt.sign(
            { id: result._id, email: result.email, role: result.roles?.usuario || 1002 },
            process.env.ACCESS_TOKEN_SECRET,
            { expiresIn: '1h' }
        );

        const refreshToken = jwt.sign(
            { id: result._id },
            process.env.REFRESH_TOKEN_SECRET,
            { expiresIn: '1d' }
        );

        // 5. Persistencia del Refresh Token
        result.refreshToken = [refreshToken];
        await result.save();

        // 6. Configurar Cookie
        res.cookie('jwt', refreshToken, {
            httpOnly: true,
            sameSite: 'None',
            secure: true,
            maxAge: 24 * 60 * 60 * 1000,
        });

        // 7. Respuesta de éxito con Data Completa para el Frontend
        res.status(201).json({
            success: true,
            message: 'Nodo vinculado e identificado exitosamente',
            accessToken,
            user: { 
                _id: result._id, 
                name: result.name, 
                email: result.email,
                role: result.roles?.usuario || 1002,
                photo: result.photo,
                location: "Bogotá, Colombia" // Tu marca personal
            }
        });
    } else {
        res.status(500).json({ success: false, message: 'Error de infraestructura' });
    }
});