import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
// Asumimos que estás usando react-router-dom v6
import { Link, useNavigate } from 'react-router-dom';

const Signup = () => {
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setError(null);

        try {
            // Se define una URL de foto por defecto para los clientes.
            const defaultImageUrl = 'https://placehold.co/400x400/EBF4FF/76A9FA?text=Perfil'; // Imagen de perfil genérica

            // Destructuramos para omitir el campo 'photo' si existiera (aunque lo quitamos del form)
            const { photo, ...restOfData } = data;

            const formData = {
                ...restOfData, // Incluye name, email, password
                photo: defaultImageUrl // Asignamos la URL por defecto
            };

            // Asegúrate de que tu backend (localhost:8080) esté corriendo
            const response = await axios.post('http://localhost:8080/api/user/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data && response.data.error) {
                // El backend devolvió un error específico (ej: email ya registrado)
                throw new Error(response.data.error);
            }

            // Si el registro es exitoso, redirige al login
            navigate('/login');

        } catch (processError) {
            // Manejo de errores de Axios o errores lanzados por el backend
            const errorMessage = processError?.response?.data?.error
                                 || processError?.message
                                 || 'Ocurrió un error en el registro. Inténtalo de nuevo.';
            
            console.error('Error en el proceso de registro:', errorMessage);

            setError(
                errorMessage.includes('Network')
                ? 'Error de conexión con el servidor (backend). Asegúrate de que esté activo.'
                : errorMessage
            );
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center bg-gray-50 font-sans">
            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10 bg-white shadow-2xl rounded-xl p-8">
                
                {/* Lado Izquierdo: Información */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Agenda tu Cita Médica</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Regístrate como Cliente y accede a nuestra red de especialistas.
                    </p>
                    <p className="text-gray-500 text-sm">
                        ¿Ya tienes una Cuenta?
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold ml-1 transition duration-150 border-b border-blue-600 hover:border-blue-800">
                            Inicia Sesión aquí
                        </Link>
                    </p>
                </div>

                {/* Lado Derecho: Formulario de Registro */}
                <div className="w-full md:w-1/2 p-6 border-l md:border-l-2 border-blue-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Cliente</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2 font-medium text-gray-700">Primer Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                                placeholder="Ingresa tu nombre..."
                                {...register('name', { required: 'Este campo es obligatorio' })}
                            />
                            {errors.name && <span className="text-red-600 text-sm mt-1 font-medium">{errors.name.message}</span>}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                                placeholder="Ingresa tu email..."
                                {...register('email', {
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Formato de email incorrecto"
                                    }
                                })}
                            />
                            {errors.email && <span className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</span>}
                        </div>

                        {/* Input de Contraseña */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-2 font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                                placeholder="Ingresa tu contraseña..."
                                {...register('password', { required: 'Este campo es obligatorio', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
                            />
                            {errors.password && <span className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</span>}
                        </div>
                        
                        {/* El campo de subir foto fue eliminado */}
                        
                        {/* Mensaje de Error */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 font-semibold text-sm">
                                {error}
                            </div>
                        )}

                        {/* Botón de Envío */}
                        <button
                            type="submit"
                            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 flex items-center justify-center"
                        >
                            Registrarse
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;