// Signup.jsx

import React, { useState } from 'react';
import axios from 'axios';
import { useForm } from 'react-hook-form'; // Asumiendo que usas react-hook-form

function Signup() {
    // 1. Estado para manejar los mensajes de error de la API
    const [apiError, setApiError] = useState(''); 
    const { handleSubmit, register } = useForm(); 
    // ... otros estados y hooks si los tienes

    const onSubmit = async (data) => {
        // Limpiamos errores anteriores antes de cada intento
        setApiError(''); 

        try {
            // **Petición POST a tu API (Aquí ocurre el error 409 si el usuario existe)**
            const response = await axios.post('http://localhost:5000/api/user/register', data);
            
            // Si tiene éxito
            console.log('Registro exitoso:', response.data);
            // Mostrar mensaje de éxito o redireccionar
            
        } catch (error) {
            // 2. **Manejo del Error 409 (El foco principal de la corrección)**
            if (error.response && error.response.status === 409) {
                // Mensaje amigable cuando el usuario ya existe
                setApiError('¡Ups! Ya existe una cuenta con este correo o nombre de usuario. ¿Intentaste iniciar sesión?');
            } else if (error.response) {
                // Otros errores del servidor (400, 500, etc.)
                const serverMessage = error.response.data.message || `Error del servidor: Código ${error.response.status}`;
                setApiError(`No pudimos completar el registro: ${serverMessage}`);
            } else {
                // Error de red, conexión, etc.
                setApiError('¡Problemas de conexión! No pudimos contactar con el servidor. Revisa tu red.');
            }
            
            console.error('Detalle del error de registro:', error);
        }
    };

    return (
        // 50 |      return (
        // 51 |          <form onSubmit={/* handleSubmit(onSubmit) */}>
        // Usamos handleSubmit de react-hook-form:
        <form onSubmit={handleSubmit(onSubmit)}> 
            
            <h2>Crea tu Cuenta</h2>
            
            {/* 52 |              {/* ... Tus campos de formulario aquí */} */}
            <div>
                <label>Email:</label>
                <input type="email" {...register("email", { required: true })} />
            </div>
            <div>
                <label>Contraseña:</label>
                <input type="password" {...register("password", { required: true })} />
            </div>
            
            {/* 54 |              {/* 3. **Muestra el mensaje de error al usuario** */} */}
            {/* El div que muestra el error capturado en el 'catch' */}
            {apiError && (
                <div style={{ color: 'red', marginTop: '15px', padding: '10px', border: '1px solid red', borderRadius: '4px' }}>
                    **⚠️ Error de Registro:** {apiError}
                </div>
            )}
            
            <button type="submit">Registrarme</button>
        </form>
    );
}

export default Signup;