import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { Lock } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; 

const Login = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    
    const { setToken, setUser } = useContext(UserContext); 
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // Lógica de redirección mejorada
    const from = location.state?.from?.pathname || localStorage.getItem('sdt_return_path') || "/users/profile/me";

    const onSubmit = async (data) => {
        setError(null);
        setIsLoading(true);
        try {
            // El endpoint debe ser consistente con tu backend ajustado (/api/auth/login)
            const response = await axios.post(`${API_BASE_URL}/auth/login`, data);
            
            const result = response.data;
            // Soporte para diferentes estructuras de respuesta
            const rawToken = result.token || result.accessToken;
            const userData = result.data || result.user || result.userData;
            
            if (!rawToken) throw new Error("No se recibió token del servidor.");

            // --- SANEAMIENTO DE TOKEN (Evita errores 401 por formato) ---
            const cleanToken = String(rawToken)
                .replace(/['"]+/g, '')
                .replace(/Bearer\s+/i, '')
                .trim();
            
            // 1. Persistencia Física (Disco)
            localStorage.setItem('token', cleanToken);
            localStorage.setItem('user', JSON.stringify(userData));
            localStorage.setItem('role', userData.role);

            // 2. Sincronización Inmediata del Estado Global (React)
            setToken(cleanToken); 
            setUser(userData); 

            toast.success(`👋 ¡Sincronizado, ${userData.name || 'Developer'}!`);
            
            // 3. Limpieza de metadatos de flujo y navegación
            localStorage.removeItem('sdt_return_path');
            
            // Pequeño delay de 150ms para asegurar que el ContextProvider procesó el cambio
            setTimeout(() => {
                navigate(from, { replace: true }); 
            }, 150);

        } catch (processError) {
            console.error("Login Error:", processError);
            const errorMessage = processError?.response?.data?.message || 'Error de credenciales en Software DT.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] p-4 sm:p-6 lg:p-10 font-sans antialiased">
            <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                
                {/* Lado Izquierdo: Branding */}
                <div className="w-full max-w-lg lg:w-1/2 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-[#FEB60D]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Security Access</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                        Software<span className="text-[#FEB60D]">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-gray-800">Ingresa A Tu Cuenta</span>
                    </h1>

                    <p className="text-black font-medium text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-12 opacity-80">
                        Accede a tu perfil de Software DT y gestiona toda la información, citas y comunicación directa desde el Panel de Usuario.
                    </p>

                    <div className="flex flex-col items-center lg:items-start gap-4 pt-4 border-t border-gray-200 lg:border-none">
                        <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">¿Nuevo en la plataforma?</p>
                        <Link 
                            to="/signup" 
                            className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-full transition-all duration-400 hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(254,182,13,0.6)]"
                        >
                            Registrarse
                        </Link>
                    </div>
                </div>

                {/* Lado Derecho: La Tarjeta */}
                <div className="w-full sm:w-[400px] lg:w-[450px]">
                    <div className="bg-white border-[3px] border-black rounded-[40px] p-6 sm:p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)] relative transition-all duration-500 hover:shadow-[30px_30px_0px_0px_rgba(0,0,0,0.15)]">
                        
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-black uppercase tracking-tight">Login</h2>
                            <div className="p-2.5 bg-[#FEB60D] rounded-xl text-black shadow-[0_0_15px_rgba(254,182,13,0.4)]">
                                <Lock size={20} strokeWidth={3} />
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Client Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 rounded-xl focus:border-[#FEB60D] focus:bg-white outline-none transition-all font-bold text-black placeholder:text-gray-300 text-sm"
                                    placeholder="nieto@softwaredt.com"
                                    {...register('email', { required: 'Email requerido' })}
                                />
                                {errors.email && <span className="text-red-500 text-[9px] font-black uppercase mt-1 block">{errors.email.message}</span>}
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 rounded-xl focus:border-[#FEB60D] focus:bg-white outline-none transition-all font-bold text-black placeholder:text-gray-300 text-sm"
                                    placeholder="••••••••"
                                    {...register('password', { required: 'Contraseña requerida' })}
                                />
                                {errors.password && <span className="text-red-500 text-[9px] font-black uppercase mt-1 block">{errors.password.message}</span>}
                            </div>

                            {error && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-[9px] font-bold uppercase border border-red-100">
                                    {error}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-4 py-4 bg-black text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-400 active:scale-95 
                                           hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1.5 
                                           hover:shadow-[0_0_25px_rgba(254,182,13,0.7)] flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Acceder al Panel"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                            <Link to="/" className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-[#FEB60D] transition-colors duration-300">
                                Volver a la Home
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;