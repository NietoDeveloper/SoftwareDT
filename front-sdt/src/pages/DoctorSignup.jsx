import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
import { axiosAuth } from '../API/api'; 
import { toast } from 'react-toastify'; 

const RegisterIcon = (props) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        className="h-6 w-6" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        {...props}
        aria-hidden="true"
    >
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
        <polyline points="14 2 14 8 20 8"></polyline>
        <line x1="16" y1="13" x2="8" y2="13"></line>
        <line x1="16" y1="17" x2="8" y2="17"></line>
        <line x1="10" y1="9" x2="8" y2="9"></line>
    </svg>
);

const DoctorSignup = () => {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState(false);
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

        try {
            const response = await axiosAuth.post('/doctor/signup', data);
            const successMsg = response.data.message || '¡Registro exitoso! Redirigiendo...';
            toast.success(successMsg);
            reset();
            setTimeout(() => navigate('/doctor/login'), 2000);
        } catch (processError) {
            let errorMessage = 'Error al registrar especialista.';
            if (processError.response) {
                errorMessage = processError.response.data.message || processError.response.data.error || errorMessage;
            } else if (processError.request) {
                errorMessage = "Fallo de red. Servidor no disponible.";
            }
            toast.error(errorMessage);
            setError(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-main p-4 sm:p-8 transition-all duration-300">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-card shadow-[0_20px_50px_rgba(0,0,0,0.1)] rounded-[2.5rem] overflow-hidden border border-white/50">
                
                {/* LADO IZQUIERDO: Branding NietoDeveloper Style */}
                <div className="w-full md:w-1/2 p-10 lg:p-16 flex flex-col justify-center bg-white">
                    <div className="mb-8">
                        <h1 className="text-4xl lg:text-5xl font-black text-headingColor uppercase tracking-tighter leading-none mb-4">
                            Únete al <br />
                            <span className="text-gold">Equipo DT</span>
                        </h1>
                        <div className="h-2 w-20 bg-gold rounded-full"></div>
                    </div>

                    <p className='text-lg text-textColor font-medium opacity-80 mb-8 leading-relaxed'>
                        Portal exclusivo para desarrolladores y especialistas de Software DT. 
                    </p>

                    <div className="space-y-4">
                        <p className='text-sm font-bold uppercase tracking-widest text-gray-400'>
                            ¿Ya eres parte?
                        </p>
                        <Link 
                            to="/doctor/login" 
                            className='inline-block text-black hover:text-gold font-black text-xl transition-all duration-300 underline decoration-gold decoration-4 underline-offset-4'
                        >
                            Inicia sesión aquí
                        </Link>
                    </div>
                </div>

                {/* LADO DERECHO: Formulario de Registro */}
                <div className="w-full md:w-1/2 p-10 lg:p-16 bg-main/30 flex flex-col justify-center">
                    <div className="mb-8 flex items-center gap-3">
                        <div className="bg-black p-3 rounded-2xl shadow-lg">
                            <RegisterIcon className="text-gold h-6 w-6"/>
                        </div>
                        <h2 className="text-2xl font-black text-headingColor uppercase tracking-tight">Crear Perfil</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                        {/* Nombre */}
                        <div className="flex flex-col">
                            <label className="mb-1.5 font-black text-headingColor text-xs uppercase tracking-widest">Nombre Completo</label>
                            <input
                                type="text"
                                className="bg-white border-2 border-transparent p-4 rounded-2xl focus:border-gold transition-all duration-300 shadow-sm outline-none w-full font-medium"
                                placeholder="Tu nombre y apellido"
                                {...register('name', { required: 'El nombre es obligatorio' })}
                            />
                            {errors.name && <span className="text-red-500 text-xs mt-1.5 font-bold uppercase tracking-tighter">{errors.name.message}</span>}
                        </div>

                        {/* Email Corporativo */}
                        <div className="flex flex-col">
                            <label className="mb-1.5 font-black text-headingColor text-xs uppercase tracking-widest">Email Corporativo</label>
                            <input
                                type="email"
                                className="bg-white border-2 border-transparent p-4 rounded-2xl focus:border-gold transition-all duration-300 shadow-sm outline-none w-full font-medium"
                                placeholder="ejemplo@software-dt.com"
                                {...register('email', { 
                                    required: 'El email es obligatorio', 
                                    pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i, message: "Email inválido" } 
                                })}
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-1.5 font-bold uppercase tracking-tighter">{errors.email.message}</span>}
                        </div>

                        {/* Contraseña */}
                        <div className="flex flex-col">
                            <label className="mb-1.5 font-black text-headingColor text-xs uppercase tracking-widest">Contraseña</label>
                            <input
                                type="password"
                                className="bg-white border-2 border-transparent p-4 rounded-2xl focus:border-gold transition-all duration-300 shadow-sm outline-none w-full font-medium"
                                placeholder="••••••••"
                                {...register('password', { 
                                    required: 'La contraseña es obligatoria', 
                                    minLength: { value: 6, message: 'Mínimo 6 caracteres' } 
                                })}
                            />
                            {errors.password && <span className="text-red-500 text-xs mt-1.5 font-bold uppercase tracking-tighter">{errors.password.message}</span>}
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl text-xs font-bold uppercase tracking-tighter">
                                {error}
                            </div>
                        )}

                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-5 bg-black text-white rounded-2xl font-black uppercase tracking-[0.2em] shadow-xl transition-all duration-500 flex items-center justify-center ${
                                isLoading 
                                ? 'opacity-50 cursor-not-allowed' 
                                : 'hover:bg-gold hover:text-black hover:shadow-gold/20 transform hover:-translate-y-1'
                            }`}
                        >
                            {isLoading ? (
                                <div className="h-6 w-6 border-4 border-white border-t-transparent rounded-full animate-spin"></div>
                            ) : (
                                'Registrar Especialista'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default DoctorSignup;