/**
 * MIDDLEWARE DE MANEJO DE ERRORES CENTRALIZADO - SOFTWARE DT (Rank S+)
 * Estandarización de respuestas de falla para el Datacenter.
 */
export const errorHandler = (err, req, res, next) => {
    // 1. Log técnico para monitoreo en consola de Railway
    console.error(`❌ [SDT_STACK_TRACE]: ${err.stack || err.message}`);

    // 2. Errores de Mongoose: ID mal formado
    if (err.name === 'CastError') {
        return res.status(400).json({ 
            success: false, 
            message: 'Identificador de nodo con formato inválido.',
            code: 'SDT_ID_INVALID'
        });
    } 
    
    // 3. Errores de Validación de Mongoose
    if (err.name === 'ValidationError') {
        const messages = Object.values(err.errors).map(val => val.message);
        return res.status(400).json({ 
            success: false, 
            message: `Error de integridad: ${messages.join('. ')}`,
            code: 'SDT_VALIDATION_ERROR'
        });
    }

    // 4. Error de Duplicidad (Email/ID ya existente)
    if (err.code === 11000) {
        const field = Object.keys(err.keyValue || {});
        return res.status(409).json({
            success: false,
            message: `Conflicto: El recurso [${field}] ya está registrado en el Datacenter.`,
            code: 'SDT_DUPLICATE_KEY'
        });
    }

    // 5. Errores de JWT (Fallback)
    if (err.name === 'JsonWebTokenError') {
        return res.status(401).json({
            success: false, 
            message: 'Token corrupto o firma inválida.',
            code: 'SDT_AUTH_ERROR'
        });
    }

    // 6. Error por Defecto (Software DT Infrastructure Fail)
    // Forzamos el 500 si no hay un status de error previo definido
    const statusCode = (res.statusCode >= 400) ? res.statusCode : 500;
    
    res.status(statusCode).json({
        success: false,
        message: err.message || "Error interno en la infraestructura de Software DT Core",
        stack: process.env.NODE_ENV === 'development' ? err.stack : undefined,
        node: "SDT_CORE_BOGOTA",
        architect: "Manuel Nieto"
    });
};