import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom'; // Importamos useLocation
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { Lock } from "lucide-react";

const API_BASE_URL = "http://localhost:5000/api/user"; 

const Login = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const { setToken, setUser } = useContext(UserContext); 
    const navigate = useNavigate();
    const location = useLocation(); // Capturamos la ubicación actual (y el estado 'from')

    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    // Determinamos a dónde enviar al usuario:
    // 1. Si viene de un redirect (PrivateRoutes), 'from' tendrá la ruta previa.
    // 2. Si entró directamente a login, irá a '/doctors' por defecto.
    const from = location.state?.from || { pathname: "/doctors" };

    const onSubmit = async (data) => {
        setError(null);
        setIsLoading(true);
        try {
            const response = await axios.post(`${API_BASE_URL}/login`, data);
            const { token, userData } = response.data;
            
            // Guardamos sesión
            localStorage.setItem('token', `Bearer ${token}`); 
            setToken(`Bearer ${token}`); 
            setUser(userData); 
            
            toast.success(`👋 ¡Bienvenido, ${userData.name || 'Usuario'}!`);
            
            // REDIRECCIÓN INTELIGENTE:
            // Usamos 'from' para devolver al usuario a donde intentaba entrar.
            // Si venía de Services -> Booking, 'from' conserva la URL y el state del doctor.
            navigate(from, { replace: true }); 
            
            reset();
        } catch (processError) {
            const errorMessage = processError?.response?.data?.message || 'Error de acceso.';
            setError(errorMessage);
            toast.error(errorMessage);
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-4 sm:p-6 lg:p-10 font-sans antialiased">
            <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                
                {/* Lado Izquierdo: Branding */}
                <div className="w-full max-w-lg lg:w-1/2 text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-amber-500"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Security Access</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                        Software<span className="text-amber-500">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-gray-800">Ingresa A Tu Cuenta</span>
                    </h1>

                    <p className="text-gray-600 font-medium text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-12">
                        Ingresa a tu ecosistema de desarrollo y gestión de proyectos de arquitectura de software.
                    </p>

                    <div className="flex flex-col items-center lg:items-start gap-4 pt-4 border-t border-gray-100 lg:border-none">
                        <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">¿No tienes cuenta?</p>
                        <Link 
                            to="/signup" 
                            className="group relative inline-flex items-center justify-center px-5 py-2.5 bg-white border-2 border-black text-black text-[10px] font-black uppercase tracking-widest rounded-lg transition-all duration-300 hover:bg-black hover:text-white hover:-translate-y-1"
                        >
                            Registrarse ahora
                        </Link>
                    </div>
                </div>

                {/* Lado Derecho: La Tarjeta */}
                <div className="w-full sm:w-[400px] lg:w-[450px]">
                    <div className="bg-white border-[3px] border-black rounded-[30px] p-6 sm:p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] relative">
                        
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-black uppercase tracking-tight">Login</h2>
                            <div className="p-2 bg-amber-500 rounded-lg text-black">
                                <Lock size={20} strokeWidth={3} />
                            </div>
                        </div>
                        
                        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Client Email</label>
                                <input
                                    type="email"
                                    className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-black placeholder:text-gray-300 text-sm"
                                    placeholder="dev@softwaredt.com"
                                    {...register('email', { required: 'Email requerido' })}
                                />
                                {errors.email && <span className="text-red-500 text-[9px] font-black uppercase mt-1 block">{errors.email.message}</span>}
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                <input
                                    type="password"
                                    className="w-full bg-gray-50 border-2 border-gray-100 p-3.5 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-black placeholder:text-gray-300 text-sm"
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
                                className="w-full mt-4 py-4 bg-black text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-amber-500 hover:text-black hover:shadow-lg flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Acceder al Panel"}
                            </button>
                        </form>

                        <div className="mt-8 pt-6 border-t border-gray-50 text-center">
                            <Link to="/" className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] hover:text-amber-600 transition-colors">
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