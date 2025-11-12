import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
// Nota: axiosAuth debe estar definido en tu entorno. Lo he simulado aquí con axios.
import axios from 'axios'; 
import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/UserContext'; // Asumo que el contexto existe

// Componente de Icono de Candado (para claridad visual)
const LockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const Login = () => {
    // const {setToken, setUser} = useContext(AppContext) // Descomentar en tu entorno real
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    const onSubmit = async (data) => {
        setError(null);
        setIsLoading(true);

        try {
            // Reemplazar axios con tu axiosAuth y la ruta correcta en un entorno real
            // const response = await axiosAuth.post('/user/login', data) 
            
            // --- SIMULACIÓN DE LOGIN EXITOSO ---
            // Nota: Si usas el backend real, reemplaza este bloque con la llamada real a la API.
            await new Promise(resolve => setTimeout(resolve, 1500)); // Simula latencia de red
            const mockResponse = {
                data: {
                    accessToken: 'mock_token_12345',
                    userData: { name: 'Usuario Ejemplo', email: data.email }
                }
            };
            const response = mockResponse;
            // --- FIN SIMULACIÓN ---

            // Almacenar el Access Token localmente
            localStorage.setItem('accessToken', response.data.accessToken); 

            // Actualizar el estado del contexto (Descomentar en tu entorno real)
            // setToken(response.data.accessToken);
            // setUser(response.data.userData);
            
            // =================================================================
            // 🚀 CAMBIOS SOLICITADOS AQUÍ 🚀
            // =================================================================
            
            // 1. Mensaje en la Consola
            console.log(`👋 ¡Hola, ${response.data.userData.name || 'Usuario'}! Inicio de sesión exitoso. Redirigiendo a doctores.`);
            
            // 2. Redirección a Doctors (ruta: /doctors)
            navigate('/doctors', {replace:true}); 

            // Nota: Se eliminó el 'navigate('/', {replace:true})' anterior.
            // =================================================================
            // 🚀 FIN DE CAMBIOS SOLICITADOS 🚀
            // =================================================================
            
            reset();
            
        } catch (processError) {
            console.error("Login failed", processError);
            const errorMessage = processError?.response?.data?.error
                                 || processError?.message
                                 || 'Credenciales inválidas o error de servidor.';
            
            setError(
                errorMessage.includes('Network')
                ? 'Error de conexión con el servidor (backend). Asegúrate de que esté activo.'
                : 'Email o Contraseña incorrectos.'
            );
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        // Contenedor principal: Responsive, limpio y centrado
        <div className="min-h-screen flex items-center justify-center bg-gray-50/70 p-4 sm:p-8 lg:p-12 font-sans transition-all duration-300">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden">

                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center text-center md:text-left">
                    {/* Título ajustado 60px hacia abajo en dispositivos pequeños (mt-16 ~ 64px) */}
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4 sm:mb-6 mt-16 md:mt-0 transition-colors">
                        <LockIcon className="inline mr-3 h-8 w-8 sm:h-10 sm:w-10 text-blue-600"/>
                        Inicio de Sesión
                    </h1>
                    <p className='text-base sm:text-lg text-gray-700 mb-2'>
                        ¿No Tienes Una Cuenta? 
                        <Link 
                            to="/signup" 
                            className='text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-200 border-b border-blue-600/50 hover:border-blue-800/80'
                        >
                            Regístrate
                        </Link>
                    </p>
                    <p className='mt-8 text-sm text-gray-500'>
                        ¿Eres Programador Software DT? Inicia sesión
                        <Link 
                            to="/doctor/login" 
                            className='text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-200 border-b border-blue-600/50 hover:border-blue-800/80'
                        >
                            Aquí
                        </Link>
                    </p>
                </div>

                {/* Lado Derecho: Formulario de Login */}
                <div className="w-full md:w-1/2 pt-6 md:pt-0 border-t md:border-t-0 md:border-l md:border-l-2 border-blue-100/50 md:pl-10 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Acceso de Cliente</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                    
                        {/* Campo Email */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium text-gray-700 text-sm">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full"
                                placeholder="Ingresa tu email..."
                                {...register('email', { required: 'Este campo es obligatorio' })}
                            />
                            {errors.email && <span className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</span>}
                        </div>

                        {/* Campo Contraseña */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="password" className="mb-2 font-medium text-gray-700 text-sm">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full"
                                placeholder="Ingresa tu contraseña..."
                                {...register('password', { required: 'Este campo es obligatorio' })}
                            />
                            {errors.password && <span className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</span>}
                        </div>

                        {/* Mensaje de Error */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 font-semibold text-sm">
                                {error}
                            </div>
                        )}

                        {/* Botón de Envío (Uniforme y Elegante Hover) */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all duration-300 flex items-center justify-center ${
                                isLoading 
                                ? 'opacity-70 cursor-not-allowed' 
                                : 'hover:bg-blue-700 hover:shadow-blue-600/50 transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Iniciar Sesión'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;