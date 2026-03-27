export const unknownEndpoint = (req, res) => {
    console.warn(`⚠️ [404 - NOT FOUND]: Intento de acceso a ${req.originalUrl}`);

    res.status(404).send({ 
        success: false, 
        error: 'Punto de conexión desconocido. Verifica la documentación de la API de Software DT.',
        location: 'Bogotá, Colombia',
        developer: 'NietoDeveloper'
    });
};