import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate } from 'react-router-dom';
// 🛠️ CORRECCIÓN CLAVE: Cambiado de AppContext a UserContext
import { UserContext } from '../context/UserContext.jsx'; 

const LockIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
        <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
        <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
    </svg>
);

const Login = () => {
    const [error, setError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    // 🛠️ Corrección: Usar UserContext al consumir el contexto
    const { setToken, setUser } = useContext(UserContext);

    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors }, reset
    } = useForm();

    const onSubmit = async (data) => {
        setError(null);
        setIsLoading(true);

        try {
            // Simulación de llamada a API (¡Recuerda reemplazar esto con tu llamada real a axios!)
            await new Promise(resolve => setTimeout(resolve, 1500));
            
            // 💡 Nota: Si vas a usar axios, debes importarlo aquí y descomentar la llamada real
            // const response = await axios.post('/auth/login', { email: data.email, password: data.password });

            const mockResponse = {
                data: {
                    accessToken: 'mock_token_12345',
                    userData: { 
                        name: 'Usuario Ejemplo', 
                        email: data.email,
                        photo: 'https://placehold.co/100x100/4F46E5/ffffff?text=U' // Placeholder para que funcione el Header
                    }
                }
            };
            const response = mockResponse;

            const { accessToken, userData } = response.data;
          
            localStorage.setItem('accessToken', accessToken);

            setToken({ accessToken: accessToken }); 
            setUser(userData); 

            console.log(`👋 ¡Hola, ${userData.name || 'Usuario'}! Inicio de sesión exitoso. Redirigiendo a doctores.`);
            
            navigate('/doctors', {replace: true}); 

            reset();
            
        } catch (processError) {
            console.error("Login failed", processError);

            const errorMessage = processError?.response?.data?.error
                                 || processError?.message
                                 || 'Credenciales inválidas o error de servidor.';
            
            setError(
                errorMessage.includes('Network')
                ? 'Error de conexión con el servidor (backend). Asegúrate de que esté activo.'
                : 'Email o Contraseña incorrectos.'
            );
        } finally {
            setIsLoading(false);
        }
    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-50/70 p-4 sm:p-8 lg:p-12 font-sans transition-all duration-300">
            <div className="w-full max-w-5xl flex flex-col md:flex-row bg-white shadow-2xl rounded-2xl p-6 sm:p-10 lg:p-12 transition-all duration-300 overflow-hidden">

                <div className="w-full md:w-1/2 p-4 flex flex-col justify-center text-center md:text-left">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-blue-700 mb-4 sm:mb-6 mt-16 md:mt-0 transition-colors">
                        <LockIcon className="inline mr-3 h-8 w-8 sm:h-10 sm:w-10 text-blue-600"/>
                        Inicio de Sesión
                    </h1>
                    <p className='text-base sm:text-lg text-gray-700 mb-2'>
                        ¿No Tienes Una Cuenta?
                        <Link 
                            to="/signup" 
                            className='text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-200 border-b border-blue-600/50 hover:border-blue-800/80'
                        >
                            Regístrate
                        </Link>
                    </p>
                    <p className='mt-8 text-sm text-gray-500'>
                        ¿Eres Programador Software DT? Inicia sesión
                        <Link 
                            to="/doctor/login" 
                            className='text-blue-600 hover:text-blue-800 font-semibold ml-1 transition duration-20