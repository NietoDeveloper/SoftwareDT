// Signup.jsx

// 💡 ARREGLO CLAVE 1: React y useState se importan desde 'react'
import React, { useState } from 'react'; 
import axios from 'axios';

// 💡 ARREGLO CLAVE 2: useForm se importa desde 'react-hook-form'
import { useForm } from 'react-hook-form'; 

// ✨ IMPORTACIÓN CLAVE para la redirección
import { useNavigate } from 'react-router-dom'; 

function Signup() {
    const [apiError, setApiError] = useState(''); 
    const { handleSubmit, register } = useForm(); 
    // ✨ INICIALIZAMOS useNavigate
    const navigate = useNavigate(); 

    const onSubmit = async (data) => {
        setApiError(''); 

        try {
            const response = await axios.post('http://localhost:5000/api/user/register', data);
            
            // --- Manejo de Éxito ---
            console.log('Registro exitoso:', response.data);
            
            // Saludo Amigable
            // Aseguramos que tengamos algo para el saludo
            const userName = data.username || data.email || 'Nuevo Usuario'; 
            
            // 🥳 Mensaje amigable al usuario
            console.log(`🎉 ¡Bienvenido/a a bordo, ${userName}! Tu cuenta ha sido creada con éxito. Redireccionando...`);
            
            // Redirección al Home o Dashboard
            navigate('/dashboard'); 
            
        } catch (error) {
            // --- Manejo de Errores (409) ---
            if (error.response && error.response.status === 409) {
                setApiError('**¡Ups! Conflicto al registrar.** Ya existe una cuenta con este correo o nombre de usuario. Por favor, intenta iniciar sesión. 😅');
            } else if (error.response) {
                const serverMessage = error.response.data.message || `Error ${error.response.status}.`;
                setApiError(`**Error del servidor:** ${serverMessage} No pudimos completar el registro.`);
            } else {
                setApiError('**¡Problemas de conexión!** No pudimos contactar con el servidor. Revisa tu red.');
            }
            
            console.error('Detalle del error de registro:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit(onSubmit)}> 
            {/* Aquí van tus campos de formulario usando el 'register' */}
            {/* Ejemplo: <input type="email" {...register("email", { required: true })} /> */}
            
            {/* Muestra el mensaje de error si existe */}
            {apiError && (
                <div style={{ color: 'white', backgroundColor: '#e74c3c', padding: '10px', borderRadius: '5px', marginTop: '15px' }}>
                    {apiError}
                </div>
            )}
            
            <button type="submit">Registrarme</button>
        </form>
    );
}

export default Signup;