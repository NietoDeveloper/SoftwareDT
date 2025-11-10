// Signup.jsx

import React, { useState } from 'react';
import axios from 'axios';
// ... otras importaciones (useForm, etc.)

function Signup() {
    // 1. **Nuevo estado para manejar los errores de la API**
    const [apiError, setApiError] = useState(''); 
    // const { handleSubmit, register } = useForm(); 
    // ... otros estados y hooks

    const onSubmit = async (data) => {
        // Limpiamos errores anteriores antes de cada intento
        setApiError(''); 

        try {
            // **Línea 34 (o similar) donde ocurre la petición POST**
            const response = await axios.post('http://localhost:5000/api/user/register', data);
            
            // Si tiene éxito
            console.log('Registro exitoso:', response.data);
            // ... Aquí iría el código para redireccionar o mostrar éxito
            
        } catch (error) {
            // 2. **Manejo del Error 409 y otros**
            if (error.response) {
                if (error.response.status === 409) {
                    // Es un error 409 (Conflict) - Usuario ya existe
                    setApiError('Ya existe una cuenta con el email o nombre de usuario proporcionado. ¿Intentaste iniciar sesión?');
                } else if (error.response.data && error.response.data.message) {
                    // Otro error del servidor con mensaje específico
                    setApiError(error.response.data.message);
                } else {
                    // Error de respuesta genérico del servidor
                    setApiError(`Oops! Ocurrió un error en el servidor: Estado ${error.response.status}.`);
                }
            } else if (error.request) {
                // Error de red, el servidor no respondió
                setApiError('¡Parece que hay un problema de conexión! No pudimos contactar al servidor. Revisa tu red.');
            } else {
                // Algo más falló (ej: error en la configuración de axios)
                setApiError('Ocurrió un error inesperado al preparar la solicitud.');
            }
            
            console.error('Error en el proceso de registro:', error);
        }
    };

    return (
        <form onSubmit={/* handleSubmit(onSubmit) */}>
            {/* ... Tus campos de formulario aquí */}
            
            {/* 3. **Muestra el mensaje de error al usuario** */}
            {apiError && (
                <div style={{ color: 'red', marginTop: '10px' }}>
                    {apiError}
                </div>
            )}
            
            <button type="submit">Registrar</button>
        </form>
    );
}

export default Signup;