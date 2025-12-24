import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from "lucide-react";
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';

const isRequired = (value) => value && value.trim() !== '';
const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
const isPasswordLongEnough = (password) => password.length >= 6;

const validateField = (field, value) => {
    switch (field) {
        case 'name': return isRequired(value) ? '' : 'Nombre requerido';
        case 'email':
            if (!isRequired(value)) return 'Email requerido';
            return isValidEmail(value) ? '' : 'Email inválido';
        case 'password':
            if (!isRequired(value)) return 'Password requerido';
            return isPasswordLongEnough(value) ? '' : 'Mínimo 6 caracteres';
        default: return '';
    }
};

const Signup = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useContext(UserContext);

    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'patient' 
    });
    
    const [validationErrors, setValidationErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        if (validationErrors[id]) {
            setValidationErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
        }
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);
        
        let newErrors = {};
        ['name', 'email', 'password'].forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) newErrors[key] = error;
        });

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        setIsLoading(true);
        try {
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            
            // 1. PETICIÓN AL BACKEND
            const response = await fetch(`${apiUrl}/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, photo: 'https://placehold.co/400x400?text=SDT' }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.message || 'Error al registrar');

            // 2. EXTRACCIÓN Y SANEAMIENTO DE DATA
            const rawToken = result.token || result.accessToken;
            if (rawToken) {
                const cleanToken = String(rawToken).replace(/['"]+/g, '').replace(/Bearer\s+/i, '').trim();
                const userData = result.data || result.user || result.doctor;

                // 3. PERSISTENCIA ATÓMICA (Disco + Contexto al mismo tiempo)
                localStorage.setItem('token', cleanToken);
                localStorage.setItem('user', JSON.stringify(userData));
                
                // Actualizamos el contexto de una vez
                setToken(cleanToken);
                setUser(userData);

                toast.success("🚀 ¡Datacenter Sincronizado!");

                // 4. LÓGICA DE REDIRECCIÓN INTELIGENTE
                const returnPath = localStorage.getItem('sdt_return_path');
                const pendingAppt = localStorage.getItem('sdt_pending_appointment');

                if (returnPath || pendingAppt) {
                    // Si el usuario venía de agendar una cita, lo regresamos allá con sus datos listos
                    navigate(returnPath || '/booking', { replace: true });
                } else {
                    navigate('/users/profile/me', { replace: true });
                }
            } else {
                // Si el registro no devuelve token (flujo de confirmación por email), mandamos a login
                toast.info("Registro exitoso. Por favor inicia sesión.");
                navigate('/login');
            }
            
        } catch (err) {
            setApiError(err.message);
            toast.error(`Error de Datacenter: ${err.message}`);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] p-4 sm:p-6 lg:p-10 font-sans antialiased">
            <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                
                {/* LADO IZQUIERDO: BRANDING (SoftwareDT Style) */}
                <div className="w-full max-w-lg lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-[#FEB60D]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Bogotá, Colombia</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                        Software<span className="text-[#FEB60D]">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-gray-800 tracking-tight">Capa de Registro</span>
                    </h1>

                    <p className="text-black font-medium text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 opacity-80">
                        Sincroniza tu perfil con el Datacenter #1 de commits en Colombia. Gestiona arquitectura y servicios en tiempo real.
                    </p>

                    <div className="flex flex-col items-center lg:items-start gap-3">
                        <p className="text-gray-400 font-black uppercase text-[10px] tracking-widest">¿Ya eres parte?</p>
                        <Link 
                            to="/login" 
                            className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1"
                        >
                            Acceder al Sistema
                        </Link>
                    </div>
                </div>

                {/* LADO DERECHO: FORMULARIO */}
                <div className="w-full sm:w-[420px] lg:w-[480px] order-1 lg:order-2">
                    <div className="bg-white border-[3px] border-black rounded-[40px] p-6 sm:p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
                        
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-black uppercase tracking-tight">Nuevo Usuario</h2>
                            <div className="p-2.5 bg-[#FEB60D] rounded-xl text-black">
                                <UserPlus size={20} strokeWidth={3} />
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nombre Completo</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-100'} p-3.5 rounded-xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-black text-sm transition-all`}
                                    placeholder="Nombre del arquitecto"
                                />
                                {validationErrors.name && <p className="text-[8px] text-red-500 font-bold mt-1 uppercase ml-1">{validationErrors.name}</p>}
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Datacenter</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-100'} p-3.5 rounded-xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-black text-sm transition-all`}
                                    placeholder="dev@softwaredt.com"
                                />
                                {validationErrors.email && <p className="text-[8px] text-red-500 font-bold mt-1 uppercase ml-1">{validationErrors.email}</p>}
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.password ? 'border-red-500' : 'border-gray-100'} p-3.5 rounded-xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-black text-sm transition-all`}
                                    placeholder="••••••••"
                                />
                                {validationErrors.password && <p className="text-[8px] text-red-500 font-bold mt-1 uppercase ml-1">{validationErrors.password}</p>}
                            </div>

                            {apiError && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-[9px] font-bold uppercase border border-red-100">
                                    {apiError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-4 py-4 bg-black text-white rounded-full font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-400 hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1.5 hover:shadow-[0_0_20px_rgba(254,182,13,0.4)] flex items-center justify-center disabled:opacity-50"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Sincronizar y Entrar"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;