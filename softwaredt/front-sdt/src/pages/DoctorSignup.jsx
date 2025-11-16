import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios'; // Simulación de axiosAuth
import { Link, useNavigate } from 'react-router-dom';

const RegisterIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
);

const Doctorsignup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
    const [successMessage, setSuccessMessage] = useState(null);
    const [error, setError] = useState(null);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        setIsLoading(true);
        setError(null);
        setSuccessMessage(null);

        try {

            await new Promise(resolve => setTimeout(resolve, 1500));

            setSuccessMessage('¡Registro exitoso! Serás redirigido al login en breve.');
            reset();
            
            setTimeout(() => {
                navigate('/doctor/login');
            }, 2000);

        } catch (processError) {
            console.error("Doctor Signup failed", processError);
            const errorMessage = processError?.response?.data?.error || processError?.message || 'Error al registrar el especialista.';
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (

        <div className="min-h-screen flex items-center justify-center bg-gray-50/70 p-4 sm:p-8 lg:p-12 font-sans transition-all duration-300">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden">
                
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-4 sm:mb-6 mt-16 md:mt-0 transition-colors">
                        <RegisterIcon className="inline mr-3 h-8 w-8 sm:h-10 sm:w-10 text-green-600"/>
                        Registro de Especialistas
                    </h1>
                    <p className='text-base sm:text-lg text-gray-700 mb-2'>
                        Este portal es exclusivo para Empleados/Programadores de Software DT.
                    </p>
                    <p className='mt-4 text-base text-gray-500'>
                        ¿Ya tienes una cuenta? 
                        <Link 
                            to="/doctor/login" 
                            className='text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-200 border-b border-blue-600/50 hover:border-blue-800/80'
                        >
                            Inicia sesión aquí
                        </Link>
                    </p>
                </div>

                <div className="w-full md:w-1/2 pt-6 md:pt-0 border-t md:border-t-0 md:border-l md:border-l-2 border-green-100/50 md:pl-10 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Crear Cuenta</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2 font-medium text-gray-700 text-sm">Nombre Completo</label>
                            <input
                                type="text"
                                id="name"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-inner hover:border-green-400/50 outline-none w-full"
                                placeholder="Ingresa tu nombre y apellido..."
                                {...register('name', { required: 'El nombre es obligatorio' })}
                            />
                            {errors.name && <span className="text-red-600 text-sm mt-1 font-medium">{errors.name.message}</span>}
                        </div>

                        {/* Campo Email */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium text-gray-700 text-sm">Email Corporativo</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-inner hover:border-green-400/50 outline-none w-full"
                                placeholder="ejemplo@software-dt.com"
                                {...register('email', { required: 'El email es obligatorio' })}
                            />
                            {errors.email && <span className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</span>}
                        </div>

                        {/* Campo Contraseña */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-2 font-medium text-gray-700 text-sm">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-inner hover:border-green-400/50 outline-none w-full"
                                placeholder="Crea una contraseña segura..."
                                {...register('password', { required: 'La contraseña es obligatoria', minLength: { value: 6, message: 'Mínimo 6 caracteres' } })}
                            />
                            {errors.password && <span className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</span>}
                        </div>

                        {/* Mensajes de Estado */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 font-semibold text-sm">
                                {error}
                            </div>
                        )}
                        {successMessage && (
                            <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4 font-semibold text-sm">
                                {successMessage}
                            </div>
                        )}

                        {/* Botón de Envío (Color Verde para Especialistas) */}
                        <button
                            type="submit"
                            disabled={isLoading || successMessage}
                            className={`w-full py-3.5 bg-green-600 text-white rounded-xl font-bold shadow-lg shadow-green-500/30 transition-all duration-300 flex items-center justify-center ${
                                isLoading 
                                ? 'opacity-70 cursor-not-allowed' 
                                : 'hover:bg-green-700 hover:shadow-green-600/50 transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Registrarse'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Doctorsignup;