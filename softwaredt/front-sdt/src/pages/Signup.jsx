import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import { initializeApp } from 'firebase/app';
import { getStorage, ref, uploadBytesResumable, getDownloadURL } from 'firebase/storage';
import { v4 } from 'uuid';

const firebaseConfig = {
  apiKey: "AIzaSyCAh9zfi_utySugSQI_qcW54xf67A4X0oU",
  authDomain: "software-dt.firebaseapp.com",
  projectId: "software-dt",
  storageBucket: "software-dt.appspot.com",
  messagingSenderId: "739796107685",
  appId: "1:739796107685:web:6652ea0c94a15b6aee684c"
};

const app = initializeApp(firebaseConfig);
const storage = getStorage(app);

const Signup = () => {
    const [isUploading, setIsUploading] = useState(false);
    const [uploadProgress, setUploadProgress] = useState(0);
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const { register, handleSubmit, formState: { errors } } = useForm();

    const onSubmit = async (data) => {
        setError(null);
        setIsUploading(true);
        setUploadProgress(0);

        try {
            const imageFile = data.photo[0];
            const imageRef = ref(storage, `user_photos/${imageFile.name}-${v4()}`);
            const uploadTask = uploadBytesResumable(imageRef, imageFile);

            const imageUrl = await new Promise((resolve, reject) => {
                uploadTask.on('state_changed',
                    (snapshot) => {
                        const progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
                        setUploadProgress(progress);
                    },
                    (storageError) => {
                        console.error('Upload failed:', storageError);
                        reject('Error al subir la imagen a Firebase. Verifica tu conexión o las reglas de Storage.');
                    },
                    async () => {
                        try {
                            const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
                            resolve(downloadURL);
                        } catch (urlError) {
                            console.error('Error al obtener la URL:', urlError);
                            reject('Error al obtener la URL de descarga.');
                        }
                    }
                );
            });
            
            const formData = {
                name: data.name,
                email: data.email,
                password: data.password,
                photo: imageUrl
            };

            const response = await axios.post('http://localhost:8080/api/user/register', formData, {
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.data && response.data.error) {
                throw new Error(response.data.error);
            }

            setIsUploading(false);
            navigate('/login');

        } catch (processError) {
            console.error('Error en el proceso de registro:', processError.message);
            setError(
                processError.message.includes('Firebase') || 
                processError.message.includes('Network') ||
                processError.message.includes('axios') 
                ? processError.message 
                : 'Ocurrió un error en el registro. Inténtalo de nuevo.'
            ); 
            setIsUploading(false);
            setUploadProgress(0);
        }
    };

    return (
        <div className="container mx-auto px-4 py-8 min-h-screen flex items-center justify-center bg-gray-50">
            <div className="w-full max-w-4xl flex flex-col md:flex-row gap-10 bg-white shadow-2xl rounded-xl p-8 transform transition duration-500 hover:shadow-3xl">
                
                {/* Left Side: Marketing/Info */}
                <div className="w-full md:w-1/2 p-6 flex flex-col justify-center">
                    <h1 className="text-4xl font-extrabold text-blue-600 mb-4">Agenda tu Cita Médica</h1>
                    <p className="text-lg text-gray-700 mb-6">
                        Regístrate como Cliente y accede a nuestra red de especialistas.
                    </p>
                    <p className="text-gray-500 text-sm">
                        ¿Ya tienes una Cuenta? 
                        <Link to="/login" className="text-blue-600 hover:text-blue-800 font-bold ml-1 transition duration-150 border-b border-blue-600 hover:border-blue-800">
                            Inicia Sesión aquí
                        </Link>
                    </p>
                </div>

                {/* Right Side: Registration Form */}
                <div className="w-full md:w-1/2 p-6 border-l md:border-l-2 border-blue-100">
                    <h2 className="text-2xl font-bold text-gray-800 mb-6">Registro de Cliente</h2>
                    <form onSubmit={handleSubmit(onSubmit)}>
                        
                        {/* Name Input */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="name" className="mb-2 font-medium text-gray-700">Primer Nombre</label>
                            <input
                                type="text"
                                id="name"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                                placeholder="Ingresa tu nombre..."
                                {...register('name', { required: 'Este campo es obligatorio' })}
                            />
                            {errors.name && <span className="text-red-600 text-sm mt-1 font-medium">{errors.name.message}</span>}
                        </div>

                        {/* Email Input */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="email" className="mb-2 font-medium text-gray-700">Email</label>
                            <input
                                type="email"
                                id="email"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                                placeholder="Ingresa tu email..."
                                {...register('email', { 
                                    required: 'Este campo es obligatorio',
                                    pattern: {
                                        value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                        message: "Formato de email incorrecto"
                                    }
                                })}
                            />
                            {errors.email && <span className="text-red-600 text-sm mt-1 font-medium">{errors.email.message}</span>}
                        </div>

                        {/* Password Input */}
                        <div className="flex flex-col mb-4">
                            <label htmlFor="password" className="mb-2 font-medium text-gray-700">Contraseña</label>
                            <input
                                type="password"
                                id="password"
                                className="border border-gray-300 p-3 rounded-lg focus:ring-blue-500 focus:border-blue-500 outline-none transition duration-150"
                                placeholder="Ingresa tu contraseña..."
                                {...register('password', { required: 'Este campo es obligatorio', minLength: { value: 6, message: 'La contraseña debe tener al menos 6 caracteres' } })}
                            />
                            {errors.password && <span className="text-red-600 text-sm mt-1 font-medium">{errors.password.message}</span>}
                        </div>

                        {/* Photo Upload Input */}
                        <div className="flex flex-col mb-6">
                            <label htmlFor="photo" className="mb-2 font-medium text-gray-700">Imagen De Perfil</label>
                            <input
                                type="file"
                                id="photo"
                                className="file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100 cursor-pointer"
                                accept="image/*"
                                {...register('photo', { required: 'Debes seleccionar una imagen' })}
                            />
                            {errors.photo && <span className="text-red-600 text-sm mt-1 font-medium">{errors.photo.message}</span>}
                        </div>

                        {/* Upload Progress Indicator */}
                        {isUploading && (
                            <div className="mb-4">
                                <div className="text-blue-600 font-medium mb-1">Cargando imagen: {uploadProgress.toFixed(1)}%</div>
                                <div className="w-full bg-gray-200 rounded-full h-2.5">
                                    <div 
                                        className="bg-blue-600 h-2.5 rounded-full transition-all duration-300" 
                                        style={{ width: `${uploadProgress}%` }}
                                    ></div>
                                </div>
                            </div>
                        )}
                        
                        {/* Error Message */}
                        {error && (
                            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative mb-4 font-semibold text-sm">
                                {error}
                            </div>
                        )}

                        {/* Submit Button */}
                        <button 
                            type="submit" 
                            disabled={isUploading} 
                            className="w-full bg-blue-600 text-white p-3 rounded-lg font-semibold shadow-md hover:bg-blue-700 transition duration-300 disabled:bg-blue-400 disabled:cursor-not-allowed flex items-center justify-center"
                        >
                            {isUploading ? (
                                <>
                                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                    </svg>
                                    Subiendo y Registrando...
                                </>
                            ) : 'Registrarse'}
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Signup;