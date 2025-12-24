import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from "lucide-react";
import { UserContext } from '../context/UserContext';

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
        role: 'PATIENT'
    });
    
    const [validationErrors, setValidationErrors] = useState({});
    const [apiError, setApiError] = useState(null);
    const [successMessage, setSuccessMessage] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handleChange = (e) => {
        const { id, value } = e.target;
        setFormData(prev => ({ ...prev, [id]: value }));
        setValidationErrors(prev => ({ ...prev, [id]: validateField(id, value) }));
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        setApiError(null);
        setSuccessMessage(null);

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
            const response = await fetch('http://localhost:5000/api/user/register', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ ...formData, photo: 'https://placehold.co/400x400?text=User' }),
            });

            const result = await response.json();
            if (!response.ok) throw new Error(result.error || 'Error al registrar');

            // --- LÓGICA DE AUTO-LOGIN CORREGIDA ---
            if (result.token) {
                // Limpieza de token (importante para evitar errores de autenticación)
                const cleanToken = result.token.replace(/['"]+/g, '').replace(/Bearer\s+/i, '').trim();
                
                // Actualizamos Contexto
                setToken(cleanToken);
                setUser(result.data);
                
                // Persistimos en LocalStorage
                localStorage.setItem('token', cleanToken);
                localStorage.setItem('user', JSON.stringify(result.data));
                localStorage.setItem('role', result.data.role);

                setSuccessMessage("¡Cuenta creada y sesión iniciada!");
                
                // Redirección inmediata al perfil
                setTimeout(() => {
                    navigate('/users/profile/me');
                }, 500);
            }
            
        } catch (err) {
            setApiError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] p-4 sm:p-6 lg:p-10 font-sans antialiased">
            <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                
                <div className="w-full max-w-lg lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-[#FEB60D]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Bienvenido</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                        Software<span className="text-[#FEB60D]">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-gray-800">Cuenta Nueva</span>
                    </h1>

                    <p className="text-gray-600 font-medium text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8">
                        Crea tu perfil Interactivo para acceder a servicios de arquitectura de software y consultoría.
                    </p>

                    <div className="flex flex-col items-center lg:items-start gap-3">
                        <p className="text-black font-black uppercase text-[10px] tracking-widest">¿Ya eres parte de Software DT?</p>
                        <Link 
                            to="/login" 
                            className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-xl transition-all duration-300 hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1"
                        >
                            Ir al Login
                        </Link>
                    </div>
                </div>

                <div className="w-full sm:w-[420px] lg:w-[480px] order-1 lg:order-2">
                    <div className="bg-white border-[3px] border-black rounded-[30px] p-6 sm:p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] relative">
                        
                        <div className="flex items-center justify-between mb-8">
                            <h2 className="text-xl font-black text-black uppercase tracking-tight">Registro</h2>
                            <div className="p-2 bg-[#FEB60D] rounded-lg text-black">
                                <UserPlus size={20} strokeWidth={3} />
                            </div>
                        </div>

                        {successMessage && (
                            <div className="bg-green-50 text-green-700 p-3 rounded-lg text-[10px] font-black uppercase mb-4 border border-green-100">
                                {successMessage}
                            </div>
                        )}

                        <form onSubmit={onSubmit} className="space-y-4">
                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Nombre Completo</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-100'} p-3.5 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-black text-sm`}
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>

                            <div>
                                <label className="block text-[9px] font-black text-gray-400 uppercase tracking-widest mb-1.5 ml-1">Email Cliente</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-100'} p-3.5 rounded-xl focus:border-[#FEB60D] outline-none font-bold text-black text-sm`}
                                    placeholder="usuario@dominio.com"
                                />
                            </div>

                            <div>
             
                                className="w-full mt-4 py-4 bg-black text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Crear Perfil"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;