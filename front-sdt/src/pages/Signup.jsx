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

0px] lg:w-[480px] order-1 lg:order-2">

                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;