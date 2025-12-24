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

            // --- LÓGICA DE AUTO-LOGIN ROBUSTA ---
            if (result.token) {
                const cleanToken = result.token.replace(/['"]+/g, '').replace(/Bearer\s+/i, '').trim();
                const userData = result.data || result.user; // Asegurar compatibilidad con el backend

                // 1. Persistencia física inmediata (Crucial para rutas protegidas)
                localStorage.setItem('token', cleanToken);
                localStorage.setItem('user', JSON.stringify(userData));
                localStorage.setItem('role', userData.role);

                // 2. Sincronización del estado global
                setToken(cleanToken);
                setUser(userData);

                setSuccessMessage("¡Cuenta creada y sesión iniciada!");
                
                // 3. Redirección con un pequeño delay para permitir que el Context se estabilice
                setTimeout(() => {
                    navigate('/users/profile/me', { replace: true });
                }, 400);
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
