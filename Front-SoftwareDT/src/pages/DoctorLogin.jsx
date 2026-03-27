import React, { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// import { AppContext } from '../context/UserContext'; 

const DoctorIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M12 2a3 3 0 0 0-3 3v2a3 3 0 0 0 6 0V5a3 3 0 0 0-3-3z"></path>
        <path d="M10 18h4"></path>
        <path d="M12 22a2 2 0 0 0 2-2v-3h-4v3a2 2 0 0 0 2 2z"></path>
        <path d="M8 15v-1a4 4 0 0 1 8 0v1"></path>
    </svg>
);

const Doctorlogin = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();
    
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const onSubmit = async (data) => {
        setError(null);
        setIsLoading(true);

        try {
            // Simulación de autenticación
            await new Promise(resolve => setTimeout(resolve, 1500)); 
            const mockResponse = {
                data: {
                    accessToken: 'mock_doctor_token_12345',
                    doctorData: { name: 'Dr. Ejemplo', email: data.email, role: 'doctor' }
                }
            };
            localStorage.setItem('accessToken', mockResponse.data.accessToken); 
            navigate('/doctor/dashboard', { replace: true });
        } catch (processError) {
            setError('Credenciales de especialista inválidas o error de servidor.');
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
                        <h1 className="text-4xl lg:text-6xl font-black text-headingColor uppercase tracking-tighter leading-none mb-4">
                            Portal <br />
                            <span className="text-gold">Especialista</span>
                        </h1>
                        <div className="h-2 w-20 bg-gold rounded-full"></div>
                    </div>

                    <p className='text-lg text-textColor font-medium opacity-80 mb-8 leading-relaxed'>
                        Gestiona tus citas y pacientes con la tecnología de vanguardia de Software DT.
                    </p>

                    <div className="space-y-4">
                        <p className='text-sm font-bold uppercase tracking-widest text-gray-400'>
                            ¿Nuevo en la plataforma?
                        </p>
                        <Link 
                            to="/doctor/signup" 
                            className='inline-block text-black hover:text-gold font-black text-xl transition-all duration-300 underline decoration-gold decoration-4 underline-offset-4'
                        >
                            Crear cuenta de Especialista
                        </Link>
                    </div>

                    <div className="mt-12 pt-8 border-t border-main">
                        <Link to="/login" className="text-sm font-bold text-gray-400 hover:text-black transition-colors uppercase tracking-widest">
                            ← Iniciar sesión como Cliente
                        </Link>
                    </div>
                </div>

                {/* LADO DERECHO: Formulario Limpio */}
                <div className="w-full md:w-1/2 p-10 lg:p-16 bg-main/30 flex flex-col justify-center">
                    <div className="mb-10 flex items-center gap-3">
                        <div className="bg-black p-3 rounded-2xl shadow-lg">
                            <DoctorIcon className="text-gold h-6 w-6"/>
                        </div>
                        <h2 className="text-2xl font-black text-headingColor uppercase tracking-tight">Acceso Seguro</h2>
                    </div>

                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                        {/* Email */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-black text-headingColor text-xs uppercase tracking-widest">Correo Electrónico</label>
                            <input
                                type="email"
                                className="bg-white border-2 border-transparent p-4 rounded-2xl focus:border-gold transition-all duration-300 shadow-sm outline-none w-full font-medium"
                                placeholder="doctor@softwaredt.com"
                                {...register('email', { required: 'El email es obligatorio' })}
                            />
                            {errors.email && <span className="text-red-500 text-xs mt-2 font-bold uppercase tracking-tighter">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div className="flex flex-col">
                            <label className="mb-2 font-black text-headingColor text-xs uppercase tracking-widest">Contraseña</label>
                            <input
                                type="password"
                                className="bg-white border-2 border-transparent p-4 rounded-2xl focus:border-gold transition-all duration-300 shadow-sm outline-none w-full font-medium"
                                placeholder="••••••••"
                                {...register('password', { required: 'La contraseña es obligatoria' })}
                            />
                            {errors.password && <span className="text-red-500 text-xs mt-2 font-bold uppercase tracking-tighter">{errors.password.message}</span>}
                        </div>

                        {error && (
                            <div className="bg-red-50 border-l-4 border-red-500 text-red-700 p-4 rounded-xl text-sm font-bold">
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
                                'Entrar al Sistema'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Doctorlogin;