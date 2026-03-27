import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { Lock } from "lucide-react";

const Login = () => {
    const [isLoading, setIsLoading] = useState(false);
    const { handleLogin } = useContext(UserContext); 
    const navigate = useNavigate();
    const location = useLocation();

    const { register, handleSubmit, formState: { errors } } = useForm();

    const BACKEND_URL = import.meta.env.VITE_BACKEND_URL;
    
    // 🚦 Prioridad 1: location.state (si el Guard lo rebotó aquí)
    // 🚦 Prioridad 2: /client/dashboard (flujo normal)
    const from = location.state?.from || location.state?.from?.pathname || "/client/dashboard";

    const onSubmit = async (data) => {
        setIsLoading(true);
        
        try {
            const response = await axios({
                method: 'post',
                url: `${BACKEND_URL}/api/user/login`,
                data: {
                    email: data.email.toLowerCase().trim(),
                    password: data.password
                },
                headers: { 'Content-Type': 'application/json' }
            });
            
            const result = response.data;
            const rawToken = result.accessToken || result.token || result.data?.token;
            const userData = result.user || result.data?.user || result.data;

            if (!rawToken) {
                throw new Error("ERROR DE IDENTIDAD: El nodo no otorgó token de acceso.");
            }

            handleLogin(userData, rawToken);
            
            toast.success(`🚀 ACCESO CONCEDIDO: ${userData.name?.toUpperCase() || 'INGENIERO'}`, {
                style: { background: '#000', color: '#FEB60D', fontWeight: '900', fontSize: '10px' }
            });

            // 🛰️ LÓGICA DE DERIVACIÓN DE FLUJO
            const pendingAppointment = localStorage.getItem('sdt_pending_appointment');

            setTimeout(() => {
                if (pendingAppointment) {
                    // Si seleccionó un producto previo al login, lo mandamos a booking
                    navigate("/booking", { replace: true });
                } else {
                    // Si no, sigue la ruta por defecto (dashboard u otra)
                    navigate(from, { replace: true });
                }
            }, 200);

        } catch (err) {
            console.error("❌ SDT Auth Error:", err);
            
            let msg = 'ERROR DE CONEXIÓN CON EL DATACENTER';
            if (err.response?.status === 401) {
                msg = 'ACCESO DENEGADO: CREDENCIALES INVÁLIDAS';
            } else if (err.code === 'ERR_NETWORK') {
                msg = 'ERROR DE INFRAESTRUCTURA: NODO INALCANZABLE';
            }
            
            toast.error(msg, {
                style: { background: '#000', color: '#FF4B4B', fontWeight: '900', fontSize: '10px' }
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#DCDCDC] font-sans antialiased">
            <main className="flex-grow flex items-center justify-center p-4 pt-4 pb-12">
                <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
                    
                    {/* Branding Section */}
                    <div className="w-full max-w-lg text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="w-8 h-[2px] bg-[#FEB60D]"></div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">Software DT Standard</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                            Software<span className="text-[#FEB60D]">DT</span> <br />
                            <span className="text-2xl sm:text-3xl text-black/80 font-bold">Control de Acceso</span>
                        </h1>
                        <p className="text-black font-medium text-sm max-w-md mx-auto lg:mx-0 mb-6 opacity-90 leading-relaxed">
                            Nodo de autenticación central para el ecosistema <span className="font-black">SOFTWARE DT</span>. 
                            Verifique su identidad para acceder al dashboard.
                        </p>
                        <Link to="/signup" className="inline-flex items-center justify-center px-10 py-3.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-[#FEB60D] hover:text-black transition-all duration-300">
                            Registrar nueva identidad
                        </Link>
                    </div>

                    {/* Form Card */}
                    <div className="w-full max-w-[450px]">
                        <div className="bg-white border-[3px] border-black rounded-[40px] p-8 sm:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-black uppercase tracking-tighter">Login</h2>
                                <div className="p-3 bg-[#FEB60D] rounded-2xl shadow-lg">
                                    <Lock size={22} strokeWidth={3} />
                                </div>
                            </div>
                            
                            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-black/40 uppercase tracking-widest mb-1.5 ml-2">Email del Ingeniero</label>
                                    <input
                                        type="email"
                                        autoComplete="username"
                                        className="w-full bg-[#DCDCDC]/20 border-2 border-[#DCDCDC] p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-sm transition-all text-black"
                                        placeholder="admin@softwaredt.com"
                                        {...register('email', { required: true })}
                                    />
                                    {errors.email && <span className="text-[9px] text-red-500 font-bold uppercase mt-1 ml-2 italic">Campo Obligatorio</span>}
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-black/40 uppercase tracking-widest mb-1.5 ml-2">Password</label>
                                    <input
                                        type="password"
                                        autoComplete="current-password"
                                        className="w-full bg-[#DCDCDC]/20 border-2 border-[#DCDCDC] p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-sm transition-all text-black"
                                        placeholder="••••••••"
                                        {...register('password', { required: true })}
                                    />
                                    {errors.password && <span className="text-[9px] text-red-500 font-bold uppercase mt-1 ml-2 italic">Campo Obligatorio</span>}
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={isLoading} 
                                    className="w-full mt-4 py-5 bg-black text-white rounded-full font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#FEB60D] hover:text-black transition-all flex items-center justify-center disabled:opacity-50 shadow-xl active:scale-95"
                                >
                                    {isLoading ? "Sincronizando..." : "Autenticar Entrada"}
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Login;