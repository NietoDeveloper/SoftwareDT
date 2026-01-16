import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { Lock } from "lucide-react";

const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:5000/api"; 

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    
    // Extraemos handleLogin del contexto optimizado
    const { handleLogin } = useContext(UserContext); 
    const navigate = useNavigate();
    const location = useLocation();



    // Lógica de redirección mejorada
    const from = location.state?.from?.pathname || localStorage.getItem('sdt_return_path') || "/users/profile/me";

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/auth/login`, data, {
                withCredentials: true 
            });
            
            const result = response.data;
            
            // Verificamos la estructura de respuesta del Backend
            const rawToken = result.accessToken || result.token;
            const userData = result.user || result.data;
            
            if (!rawToken) {
                throw new Error("El servidor no proporcionó un token de acceso.");
            }

            // Usamos la función centralizada del Contexto
            // Esto guarda en localStorage y actualiza el estado de una vez
            handleLogin(userData, rawToken);

            toast.success(`🚀 ¡Bienvenido al Datacenter, ${userData.name.split(' ')[0]}!`);
            
            localStorage.removeItem('sdt_return_path');
            
            // Navegación inmediata tras el éxito
            navigate(from, { replace: true }); 

        } catch (err) {
            console.error("Software DT Login Error:", err);
            const msg = err.response?.data?.message || 'Credenciales inválidas para Software DT.';
            toast.error(msg);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-main p-4 font-sans antialiased">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
                
                {/* Lado Izquierdo: Branding */}
                <div className="w-full max-w-lg text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-yellowColor"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-textColor/60">Standard de Ingeniería</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl font-black text-headingColor uppercase tracking-tighter leading-none mb-6">
                        Software<span className="text-yellowColor">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-headingColor/80">Control de Acceso</span>
                    </h1>

                    <p className="text-textColor font-medium text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 opacity-90 leading-relaxed">
                        Accede a la plataforma líder de ingenieros en Colombia. Gestiona tus proyectos y soporte técnico con eficiencia.
                    </p>

                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <p className="text-textColor/40 font-bold uppercase text-[9px] tracking-[0.2em]">¿No tienes cuenta?</p>
                        <Link 
                            to="/signup" 
                            className="group relative inline-flex items-center justify-center px-10 py-3.5 bg-headingColor text-white text-[11px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-yellowColor hover:text-black hover:-translate-y-1 hover:shadow-lg"
                        >
                            Registrarme Ahora
                        </Link>
                    </div>
                </div>

                {/* Lado Derecho: Formulario */}
                <div className="w-full max-w-[450px]">
                    <div className="bg-card border-[3px] border-headingColor rounded-[40px] p-8 sm:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
                        
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-headingColor uppercase tracking-tighter">Login</h2>
                            <div className="p-3 bg-yellowColor rounded-2xl text-headingColor">
                                <Lock size={22} strokeWidth={3} />
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-black text-textColor/40 uppercase tracking-widest mb-2 ml-1">Email del Cliente</label>
                                <input
                                    type="email"
                                    className="w-full bg-main/20 border-2 border-gainsboro p-4 rounded-2xl focus:border-yellowColor focus:bg-white outline-none transition-all font-bold text-headingColor text-sm"
                                    placeholder="correo@ejemplo.com"
                                    {...register('email', { 
                                        required: 'El email es obligatorio',
                                        pattern: { value: /^\S+@\S+\.\S+$/, message: 'Formato de email inválido' }
                                    })}
                                />
                                {errors.email && <span className="text-red-500 text-[10px] font-black uppercase mt-2 block">{errors.email.message}</span>}
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-textColor/40 uppercase tracking-widest mb-2 ml-1">Contraseña</label>
                                <input
                                    type="password"
                                    className="w-full bg-main/20 border-2 border-gainsboro p-4 rounded-2xl focus:border-yellowColor focus:bg-white outline-none transition-all font-bold text-headingColor text-sm"
                                    placeholder="••••••••"
                                    {...register('password', { required: 'La contraseña es obligatoria' })}
                                />
                                {errors.password && <span className="text-red-500 text-[10px] font-black uppercase mt-2 block">{errors.password.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-5 bg-headingColor text-white rounded-full font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-yellowColor hover:text-black hover:shadow-xl active:scale-95 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Autenticar Entrada"}
                            </button>
                        </form>

                        <div className="mt-10 pt-6 border-t border-gainsboro text-center">
                            <Link to="/" className="text-[10px] font-black text-textColor/40 uppercase tracking-[0.2em] hover:text-yellowColor transition-colors">
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