import { useState, useCallback } from 'react';

const UserIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
        <circle cx="12" cy="7" r="4" />
    </svg>
);

const isRequired = (value) => value && value.trim() !== '';
const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
const isPasswordLongEnough = (password) => password.length >= 6;

const validateField = (field, value) => {
    switch (field) {
        case 'name':
            return isRequired(value) ? '' : 'Este campo es obligatorio';
        case 'email':
            if (!isRequired(value)) return 'Este campo es obligatorio';
            return isValidEmail(value) ? '' : 'Formato de email incorrecto';
        case 'password':
            if (!isRequired(value)) return 'Este campo es obligatorio';
            return isPasswordLongEnough(value) ? '' : 'La contraseña debe tener al menos 6 caracteres';
        case 'role':
            return isRequired(value) ? '' : 'Debes seleccionar un tipo de cuenta';
        default:
            return '';
    }
};

const App = () => {
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
        Object.keys(formData).forEach(key => {
            const error = validateField(key, formData[key]);
            if (error) {
                newErrors[key] = error;
            }
        });

        if (Object.keys(newErrors).length > 0) {
            setValidationErrors(newErrors);
            return;
        }

        setIsLoading(true);

        const defaultImageUrl = 'https://placehold.co/400x400/EBF4FF/76A9FA?text=Perfil'; 
        const finalData = {
            ...formData, 
            photo: defaultImageUrl 
        };
        
        const apiUrl = 'http://localhost:5000/api/user/register'; 

        try {
            const response = await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(finalData),
            });

            let result;
            try {
                result = await response.json();
            } catch (jsonError) {
                if (!response.ok) {
                     throw new Error(`Error ${response.status}: ${response.statusText}`);
                }
                result = {}; 
            }

            if (!response.ok || result.error) {
                const errorText = result.error || response.statusText || 'Error desconocido del servidor.';
                throw new Error(errorText);
            }

            console.log('✅ ¡Perfil creado con éxito!');
            const roleText = finalData.role === 'DOCTOR' ? 'Doctor(a)' : 'Paciente';
            setSuccessMessage(`¡Registro exitoso! Serás redirigido al dashboard de ${roleText} (simulado).`);
            setFormData({ name: '', email: '', password: '', role: 'PATIENT' }); 
            setValidationErrors({});
            
        } catch (processError) {
            const errorMessage = processError.message || 'Ocurrió un error en el registro. Inténtalo de nuevo.';
            
            let friendlyError = errorMessage;
            if (errorMessage.includes('fetch') || errorMessage.includes('Network') || errorMessage.includes('Failed to fetch')) {
                friendlyError = 'Error de conexión con el servidor. Asegúrate de que tu backend esté activo en el puerto correcto (ej: 5000).';
            } else if (errorMessage.toLowerCase().includes('duplicate') || errorMessage.includes('409')) {
                friendlyError = 'El correo electrónico ya está registrado. Por favor, utiliza otro.';
            }

            console.error('Error en el proceso de registro:', friendlyError);
            setApiError(friendlyError);

        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/70 p-4 sm:p-8 lg:p-12 font-sans transition-all duration-300">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden">

                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4 sm:mb-6 mt-16 md:mt-0 transition-colors">
                        <UserIcon className="inline mr-3 h-8 w-8 sm:h-10 sm:w-10 text-blue-600"/>
                        Agenda tu Cita Médica
                    </h1>
                    
                    <p className="text-base sm:text-lg text-gray-700 mb-6 sm:mb-8">
                        Regístrate y accede a nuestra red de especialistas de forma rápida y segura.
                    </p> 
                    
                    <p className="text-gray-500 text-sm">
                        ¿Ya tienes una Cuenta?
                        <span 
                            className="text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-200 border-b border-blue-600/50 hover:border-blue-800/80 cursor-pointer"
                            onClick={() => console.log('Simulating navigation to /login')}
                        >
                            Inicia Sesión aquí
                        </span>
                    </p>
                </div>

                <div className="w-full md:w-1/2 pt-6 md:pt-0 border-t md:border-t-0 md:border-l md:border-l-2 border-blue-100/50 md:pl-10 mt-6 md:mt-0">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Cuenta</h2>
                    
                    {successMessage && (
                        <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded-lg relative mb-4 font-semibold text-sm">
                            {successMessage}
                            <button className="float-right font-bold" onClick={() => setSuccessMessage(null)}>x</button>
                        </div>
                    )}

                    <form onSubmit={onSubmit}>
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2 font-medium text-gray-700 text-sm">Primer Nombre</label>
                            <input
                                type="text"
                                id="name"
                                value={formData.name}
                                onChange={handleChange}
                                className={`border ${validationErrors.name ? 'border-red-500' : 'border-gray-300/60'} p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full`}
                                placeholder="Ingresa tu nombre..."
                            />
                            {validationErrors.name && <span className="text-red-600 text-sm mt-1 font-medium">{validationErrors.name}</span>}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium text-gray-700 text-sm">Email</label>
                            <input
                                type="email"
                                id="email"
                                value={formData.email}
                                onChange={handleChange}
                                className={`border ${validationErrors.email ? 'border-red-500' : 'border-gray-300/60'} p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full`}
                                placeholder="Ingresa tu email..."
                            />
                            {validationErrors.email && <span className="text-red-600 text-sm mt-1 font-medium">{validationErrors.email}</span>}
                        </div>

                        {/* Campo de Contraseña */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-2 font-medium text-gray-700 text-sm">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                value={formData.password}
                                onChange={handleChange}
                                className={`border ${validationErrors.password ? 'border-red-500' : 'border-gray-300/60'} p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full`}
                                placeholder="Ingresa tu contraseña..."
                            />
                            {validationErrors.password && <span className="text-red-600 text-sm mt-1 font-medium">{validationErrors.password}</span>}
                        </div>

                        {/* Campo de Rol */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="role" className="mb-2 font-medium text-gray-700 text-sm">Tipo de Cuenta</label>
                            <select
                                id="role"
                                value={formData.role}
                                onChange={handleChange}
                                className={`border ${validationErrors.role ? 'border-red-500' : 'border-gray-300/60'} p-3 rounded-xl focus:ring-blue-500 focus:border-blue-500 transition duration-200 shadow-inner hover:border-blue-400/50 outline-none w-full bg-white`}
                            >
                                <option value="PATIENT">Soy un Cliente / Paciente</option>
                                <option value="DOCTOR">Soy un Doctor</option>
                            </select>
                            {validationErrors.role && <span className="text-red-600 text-sm mt-1 font-medium">{validationErrors.role}</span>}
                        </div>

                        {/* Mensaje de Error de API */}
                        {apiError && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded-lg relative mb-4 font-semibold text-sm">
                                {apiError}
                            </div>
                        )}

                        {/* Botón de Envío */}
                        <button
                            type="submit"
                            disabled={isLoading}
                            className={`w-full py-3.5 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-blue-500/30 transition-all duration-300 flex items-center justify-center ${
                                isLoading 
                                ? 'opacity-70 cursor-not-allowed' 
                                : 'hover:bg-blue-700 hover:shadow-blue-600/50 transform hover:-translate-y-0.5'
                            }`}
                        >
                            {isLoading ? (
                                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                </svg>
                            ) : (
                                'Registrarse'
                            )}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default App;