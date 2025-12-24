import { useState } from 'react';
import { Link } from 'react-router-dom';
import { UserPlus } from "lucide-react";

// Validaciones simples
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
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        role: 'PATIENT' // Forzado a Cliente por defecto
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

            setSuccessMessage("¡Cuenta creada! Redirigiendo...");
            setFormData({ name: '', email: '', password: '', role: 'PATIENT' });
            
        } catch (err) {
            setApiError(err.message);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#fcfcfc] p-4 sm:p-6 lg:p-10 font-sans antialiased">
            {/* Contenedor Principal: 320px a 1800px */}
            <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16">
                
                {/* Lado Izquierdo: Branding */}
                <div className="w-full max-w-lg lg:w-1/2 text-center lg:text-left order-2 lg:order-1">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-amber-500"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Bienvenido</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-5xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                        Software<span className="text-amber-500">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-gray-800">Cuenta Nueva</span>
                    </h1>

    
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-100'} p-3.5 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-black text-sm`}
                                    placeholder="Ej: Juan Pérez"
                                />
                            </div>




                            {apiError && (
                                <div className="bg-red-50 text-red-600 p-3 rounded-lg text-[9px] font-bold uppercase border border-red-100">
                                    {apiError}
                                </div>
                            )}

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-4 py-4 bg-black text-white rounded-xl font-black text-[11px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-amber-500 hover:text-black hover:-translate-y-1 hover:shadow-lg flex items-center justify-center"
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