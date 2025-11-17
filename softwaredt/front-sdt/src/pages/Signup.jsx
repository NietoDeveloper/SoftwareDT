import { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';

const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const Signup = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            role: 'PATIENT' 
        }
    });

    const onSubmit = async (data) => {
        setError(null);
        setIsLoading(true);

        try {
            const defaultImageUrl = 'https://placehold.co/400x400/EBF4FF/76A9FA?text=Perfil'; 
            
            const formData = {
                ...data, 
                photo: defaultImageUrl 
            };

            const response = await axios.post('http://localhost:5000/api/user/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data && response.data.error) {
                throw new Error(response.data.error);
            }

            console.log('✅ ¡Perfil creado con éxito! Redireccionando...');
            
            // Lógica de redirección basada en el rol
            if (data.role === 'DOCTOR') {
                 // Redirige al Doctor a su Dashboard
                navigate('/doctor/dashboard');
            } else {
                // Redirige al Paciente a la lista de doctores
                navigate('/doctors'); 
            }
            
        } catch (processError) {
            const errorMessage = processError?.response?.data?.error
                                 || processError?.message
                                 || 'Ocurrió un error en el registro. Inténtalo de nuevo.';
            
            console.error('Error en el proceso de registro:', errorMessage);

            // Manejo de errores amigables para el usuario
            let friendlyError = errorMessage;
            if (errorMessage.includes('Network')) {
                friendlyError = 'Error de conexión con el servidor. Asegúrate de que esté activo en el puerto correcto (ej: 5000).';
            } else if (errorMessage.includes('409') || errorMessage.toLowerCase().includes('duplicate')) {
                friendlyError = 'El correo electrónico ya está registrado. Por favor, utiliza otro.';
            }

            setError(friendlyError);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        // Contenedor principal
        <div className="min-h-screen flex items-center justify-center bg-gray-50/70 p-4 sm:p-8 lg:p-12 font-sans transition-all duration-300">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden">
                
                {/* Lado Izquierdo: Información y Banner */}
                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4 sm:mb-6 mt-16 md:mt-0 transition-colors">
                        <UserIcon className="inline mr-3 h-8 w-8 sm:h-10 sm:w-10 text-blue-600"/>
                        Agenda tu Cita Médica
                    </h1>
                    
                    {/* 👇 ESTA ES LA LÍNEA CORREGIDA (de </d> a </p>) 👇 */}
                    <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
                        Regístrate y accede a nuestra red de especialistas de forma rápida y segura.
                    </p> 
                    {/* 👆 FIN DE LA CORRECCIÓN 👆 */}
                    
                    <p className="text-gray-500 text-sm">
                        ¿Ya tienes una Cuenta?
                        <Link 
                            to="/login" 
                            className="text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-200 border-b border-blue-600/50 hover:border-blue-800/80"
                        >
                            Inicia Sesión aquí
                        </Link>
                    </p>
                </div>

                {/* Lado Derecho: Formulario de Registro */}
                <div className="w-full md:w-1/2 pt-6 md:pt-0 border-t md:border-t-0 md:border-l md:border-l-2 border-blue-100/50 md:pl-10 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Cuenta</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Campo Nombre */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2 font-medium text-gray-700 text-sm">Primer Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full"
                                placeholder="Ingresa tu nombre..."
                                {...register('name', { required: 'Este campo es obligatorio' })}
                            />
                            {errors.name && <span className="text-red-600 text-sm mt-1 font-medium">{errors.name.message}</span>}
                        </div>

                        {/* Campo Email */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium text-gray-700 text-sm">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full"
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

                        {/* Campo Contraseña */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-2 font-medium text-gray-700 text-sm">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full"
                                placeholder="Ingresa tu contraseña..."
                                {...register('password', { required: 'Este campo es obligatorio', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
                            />
                            {errors.password && <span className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</span>}
                        </div>

                        {/* Campo Tipo de Cuenta (Rol) */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="role" className="mb-2 font-medium text-gray-700 text-sm">Tipo de Cuenta</label>
                            <select
                                id="role"
                                className="border border-gray-300/60 p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full bg-white"
                                {...register('role', { required: 'Debes seleccionar un tipo de cuenta' })}
                            >
                                <option value="PATIENT">Soy un Cliente / Paciente</option>
                                <option value="DOCTOR">Soy un Doctor</option>
                            </select>
                            {errors.role && <span className="text-red-600 text-sm mt-1 font-medium">{errors.role.message}</span>}
                        </div>
                        
                        {/* Mensaje de Error */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 font-semibold text-sm">
                                {error}
                            </div>
                        )}

                        {/* Botón de Envío */}
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
                                'Registrarse'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;