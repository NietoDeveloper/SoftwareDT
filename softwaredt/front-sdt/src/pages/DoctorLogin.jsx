import { useForm } from 'react-hook-form';
import { axiosAuth } from '../API/api'; // ⬅️ CORRECCIÓN: Usar axiosAuth para el Login
import {Link, useNavigate} from 'react-router-dom'
import { useContext } from 'react';
import { AppContext } from '../context/UserContext'; // Asumo que necesitas el contexto

const Doctorlogin = () => {
    // Es CRUCIAL que uses el contexto para guardar el token y el usuario/doctor.
    const { setToken, setUser } = useContext(AppContext);
    
    const navigate = useNavigate();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const onSubmit = async (data) => {
        try {
            // Usar axiosAuth y la ruta de login del doctor.
            const response = await axiosAuth.post('/doctor/login', data); 
            
            // Guardar el Access Token y el perfil del doctor
            localStorage.setItem('accessToken', response.data.accessToken); 
            setToken(response.data.accessToken);
            setUser(response.data.doctorData); // Almacenar los datos del doctor en el contexto/estado
            
            navigate('/', { replace: true });

        } catch (error) {
            console.error("Doctor Login failed", error);
            // Implementa manejo de error visual para el usuario (ej. un toast)
        }
    };
    
    return (
        <div className="container">
            <div className="flex flex-col md:flex-row gap-20">
                {/* Sign up icons */}
                <div className=" w-full md:w-1/2 p-6">
                    <h1 className="heading">Programador&apos; Log In</h1>
                    <p>No Tienes Una Cuenta? <Link to="/doctor/signup" className='text-blue-600'>Sign up </Link> instead</p>
                    <p className="text_para">Quieres Agendar Una Cita? Log in <Link to="/login" className='text-blue-600'>Clientes</Link></p>
                </div>

                <div className="w-full md:w-1/2 p-6">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border-2 p-2 outline-none"
                                placeholder="Enter email..."
                                {...register('email', { required: 'This field is required' })}
                            />
                            {errors.email && <span className="text-red-600">{errors.email.message}</span>}
                        </div>

                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-2">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="border-2 p-2 outline-none"
                                placeholder="Enter password..."
                                {...register('password', { required: 'This field is required' })}
                            />
                            {errors.password && <span className="text-red-600">{errors.password.message}</span>}
                        </div>

                        <button type="submit" className="btn bg-blue-600 text-white p-2 rounded">Log in</button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Doctorlogin;