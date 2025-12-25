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
    
    // Extraemos las funciones del contexto de Software DT
    const { setToken, setUser } = useContext(UserContext); 
    const navigate = useNavigate();
    const location = useLocation();

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    // Lógica de redirección: Prioriza el origen del flujo (ej. venía de Booking)
    const from = location.state?.from?.pathname || localStorage.getItem('sdt_return_path') || "/users/profile/me";

    const onSubmit = async (data) => {
        setError(null);
        setIsLoading(true);
        try {
            // Petición al backend unificado de Software DT
            const response = await axios.post(`${API_BASE_URL}/auth/login`, data, {
                withCredentials: true // Importante para manejar las cookies del Refresh Token
            });
            
            const result = response.data;
            
            // Consistencia con la respuesta del controlador: result.accessToken y result.user
            const rawToken = result.accessToken || result.token;
            const userData = result.user || result.data;
            
            if (!rawToken) throw new Error("Acceso denegado: No se generó token de seguridad.");

            // Saneamiento Pro del Token
            const cleanToken = String(rawToken)
                .replace(/['"]+/g, '')
                .replace(/Bearer\s+/i, '')
                .trim();
            
            // 1. Persistencia en Almacenamiento Local
            localStorage.setItem('token', cleanToken);
            localStorage.setItem('user', JSON.stringify(userData));

            // 2. Actualización del Estado Global de React
            setToken(cleanToken); 
            setUser(userData); 

            toast.success(`🚀 ¡Bienvenido, ${userData.name.split(' ')[0]}!`);
            
            // 3. Limpieza y Navegación
            localStorage.removeItem('sdt_return_path');
            
            // Delay estratégico para que el Context se estabilice antes del cambio de ruta
            setTimeout(() => {
                navigate(from, { replace: true }); 
            }, 100);

        } catch (err) {
            console.error("Software DT Login Error:", err);
            const msg = err.response?.data?.message || 'Error de autenticación. Verifica tus credenciales.';
            setError(msg);
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] p-4 font-sans antialiased">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
                
                {/* Lado Izquierdo: Branding & Status */}
                <div className="w-full max-w-lg text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-[#FEB60D]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Standard de Ingeniería</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter leading-none mb-6">
                        Software<span className="text-[#FEB60D]">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-gray-800">Control de Acceso</span>
                    </h1>

                    <p className="text-black font-medium text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 opacity-90 leading-relaxed">
                        Accede a la plataforma líder de ingenieros en Colombia. Gestiona tus proyectos y soporte técnico con eficiencia.
                    </p>

                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">¿No tienes cuenta?</p>
                        <Link 
                            to="/signup" 
                            className="group relative inline-flex items-center justify-center px-10 py-3.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1 hover:shadow-lg"
                        >
                            Registrarme Ahora
                        </Link>
                    </div>
                </div>

                {/* Lado Derecho: Formulario Estilizado */}
                <div className="w-full max-w-[450px]">
                    <div className="bg-white border-[3px] border-black rounded-[40px] p-8 sm:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
                        
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-black uppercase tracking-tighter">Login</h2>
                            <div className="p-3 bg-[#FEB60D] rounded-2xl text-black">
                                <Lock size={22} strokeWidth={3} />
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email del Cliente</label>
                                <input
                                    type="email"
                                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none transition-all font-bold text-black text-sm"
                                    placeholder="correo@ejemplo.com"
                                    {...register('email', { 
                                        required: 'El email es obligatorio',
                                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Formato de email inválido' }
                                    })}
                                />
                                {errors.email && <span className="text-red-500 text-[10px] font-black uppercase mt-2 block">{errors.email.message}</span>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
                                <input
                                    type="password"
                                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none transition-all font-bold text-black text-sm"
                                    placeholder="••••••••"
                                    {...register('password', { required: 'La contraseña es obligatoria' })}
                                />
                                {errors.password && <span className="text-red-500 text-[10px] font-black uppercase mt-2 block">{errors.password.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-5 bg-black text-white rounded-full font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#FEB60D] hover:text-black hover:shadow-xl active:scale-95 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Autenticar Entrada"}
                            </button>
                        </form>

                        <div className="mt-10 pt-6 border-t border-gray-100 text-center">
                            <Link to="/" className="text-[10px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-[#FEB60D] transition-colors">
                                ← Regresar al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;