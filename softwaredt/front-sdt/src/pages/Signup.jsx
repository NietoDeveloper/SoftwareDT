import React, { useState } from 'react'; 
import axios from 'axios';
import { useForm } from 'react-hook-form'; 
import { useNavigate, Link } from 'react-router-dom'; 

// Componente de Icono de Lápiz (para claridad visual en el registro)
const PenIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M17 3a2.828 2.828 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5L17 3z"></path>
    </svg>
);

function Signup() {
    const [apiError, setApiError] = useState(''); 
    const [isLoading, setIsLoading] = useState(false);
    
    const navigate = useNavigate(); 
    const { 
        handleSubmit, 
        register, 
        formState: { errors }, 
        watch // Hook para observar el valor de un campo (necesario para la validación de contraseña)
    } = useForm(); 

    const password = watch("password"); // Observa la contraseña original

    const onSubmit = async (data) => {
        setApiError(''); 
        setIsLoading(true);

        // Desestructuramos para no enviar 'confirmPassword' al backend
        const { confirmPassword, ...registerData } = data;

        try {
            // Nota: Cambia la URL a tu variable de entorno en producción.
            const response = await axios.post('http://localhost:5000/api/user/register', registerData);
            
            console.log('Registro exitoso:', response.data);
            
            const userName = data.username || data.email || 'Nuevo Usuario'; 
            
            console.log(`🎉 ¡Bienvenido/a a bordo, ${userName}! Tu cuenta ha sido creada con éxito. Redireccionando al login...`);
            
            // Redirección al Login para que el usuario pueda iniciar sesión inmediatamente
            navigate('/login', { state: { message: 'Registro exitoso. Por favor, inicia sesión.' } }); 
            
        } catch (error) {
            setIsLoading(false);
            
            if (error.response) {
                const status = error.response.status;
                if (status === 409) {
                    setApiError('¡Ups! Ya existe una cuenta con este correo o nombre de usuario. Por favor, intenta iniciar sesión.');
                } else if (status === 400 && error.response.data.message) {
                    setApiError(error.response.data.message);
                } else {
                    setApiError(`Error ${status}: No pudimos completar el registro. Inténtalo más tarde.`);
                }
            } else {
                setApiError('¡Problemas de conexión! No pudimos contactar con el servidor. Revisa tu red.');
            }
            
            console.error('Detalle del error de registro:', error);
        }
    };

    return (
        // Contenedor principal: Responsive, limpio y centrado
        <div className="min-h-screen flex items-center justify-center bg-gray-50/70 p-4 sm:p-8 lg:p-12 font-sans transition-all duration-300">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden">
                
                {/* Lado Izquierdo: Información */}
                {/* Usamos order-2 para que en móvil la info quede después del formulario */}
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center text-center md:text-left order-2 md:order-1">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-green-700 mb-4 sm:mb-6 mt-6 md:mt-0 transition-colors">
                        <PenIcon className="inline mr-3 h-8 w-8 sm:h-10 sm:w-10 text-green-600"/>
                        Regístrate
                    </h1>
                    <p className='text-base sm:text-lg text-gray-700 mb-2'>
                        Únete a nuestra comunidad. Es rápido y sencillo.
                    </p>
                    <p className='mt-8 text-sm text-gray-500'>
                        ¿Ya tienes una cuenta? Inicia sesión 
                        <Link 
                            to="/login" 
                            className='text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-200 border-b border-blue-600/50 hover:border-blue-800/80'
                        >
                            Aquí
                        </Link>
                    </p>
                    <p className='mt-2 text-sm text-gray-500'>
                        ¿Eres Programador Software DT? Regístrate 
                        <Link 
                            to="/doctor/signup" 
                            className='text-green-600 hover:text-green-800 font-semibold ml-1 transition duration-200 border-b border-green-600/50 hover:border-green-800/80'
                        >
                            Aquí
                        </Link>
                    </p>
                </div>

                {/* Lado Derecho: Formulario de Registro */}
                <div className="w-full md:w-1/2 pt-6 md:pt-0 border-t md:border-t-0 md:border-l md:border-l-2 border-green-100/50 md:pl-10 mt-6 md:mt-0 order-1 md:order-2">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Datos de Acceso</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Campo Nombre de Usuario */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="username" className="mb-2 font-medium text-gray-700 text-sm">Nombre de Usuario</label>
                            <input
                                type="text"
                                id="username"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-inner hover:border-green-400/50 outline-none w-full"
                                placeholder="Tu nombre de usuario"
                                {...register('username', { 
                                    required: 'El nombre de usuario es obligatorio',
                                    minLength: {
                                        value: 3,
                                        message: 'Mínimo 3 caracteres'
                                    }
                                })}
                            />
                            {errors.username && <span className="text-red-600 text-sm mt-1 font-medium">{errors.username.message}</span>}
                        </div>
                        
                        {/* Campo Email */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium text-gray-700 text-sm">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-inner hover:border-green-400/50 outline-none w-full"
                                placeholder="tu.correo@ejemplo.com"
                                {...register('email', { 
                                    required: 'El email es obligatorio',
                                    pattern: {
                                        value: /^\S+@\S+$/i,
                                        message: "Formato de email inválido"
                                    }
                                })}
                            />
                            {errors.email && <span className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</span>}
                        </div>

                        {/* Campo Contraseña */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-2 font-medium text-gray-700 text-sm">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-inner hover:border-green-400/50 outline-none w-full"
                                placeholder="Mínimo 6 caracteres"
                                {...register('password', { 
                                    required: 'La contraseña es obligatoria',
                                    minLength: {
                                        value: 6,
                                        message: 'La contraseña debe tener al menos 6 caracteres'
                                    }
                                })}
                            />
                            {errors.password && <span className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</span>}
                        </div>

                        {/* Campo Confirmar Contraseña */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="confirmPassword" className="mb-2 font-medium text-gray-700 text-sm">Confirmar Contraseña</label>
                            <input
                                type="password"
                                id="confirmPassword"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-green-500 focus:border-green-500 transition duration-200 shadow-inner hover:border-green-400/50 outline-none w-full"
                                placeholder="Repite la contraseña"
                                {...register('confirmPassword', { 
                                    required: 'Debes confirmar la contraseña',
                                    // Validación: comprueba si el valor coincide con el campo 'password' que estamos observando
                                    validate: (value) => value === password || "Las contraseñas no coinciden" 
                                })}
                            />
                            {errors.confirmPassword && <span className="text-red-600 text-sm mt-1 font-medium">{errors.confirmPassword.message}</span>}
                        </div>

                        {/* Mensaje de Error de API (global) */}
                        {apiError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 font-semibold text-sm">
                                {apiError}
                            </div>
                        )}

                        {/* Botón de Envío */}
                        <button
                            type="submit"
                            disabled={isLoading}
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
                                'Registrar Cuenta'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}

export default Signup;