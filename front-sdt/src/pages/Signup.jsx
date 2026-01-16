import { useState, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { UserPlus } from "lucide-react";
import { UserContext } from '../context/UserContext';
import { toast } from 'react-toastify';
import axios from 'axios';

// Validaciones alineadas con el Backend (Mongoose 8 chars)
const isRequired = (value) => value && value.trim() !== '';
const isValidEmail = (email) => /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(email);
const isPasswordLongEnough = (password) => password.length >= 8;


const Signup = () => {
    const navigate = useNavigate();
    const { setToken, setUser } = useContext(UserContext);




        setIsLoading(true);
        try {
            // Ajuste de URL para evitar "/auth/auth" duplicados
            const apiUrl = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';
            const endpoint = `${apiUrl}/auth/register`;
            
            const response = await axios.post(endpoint, {
                ...formData,
                photo: 'https://placehold.co/400x400?text=SDT'
            });

            const { accessToken, user, success } = response.data;

           

               
         
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#DCDCDC] p-4 sm:p-6 lg:p-10 font-sans antialiased">
            <div className="w-full max-w-[1400px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
                
                {/* BRANDING SOFTWARE DT */}
                <div className="w-full max-w-lg text-center lg:text-left">
                    <div className="inline-flex items-center gap-2 mb-4">
                        <div className="w-8 h-[2px] bg-[#FEB60D]"></div>
                        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-gray-500">Colombia Dev Hub</span>
                    </div>
                    
                    <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter leading-none mb-6">
                        Software<span className="text-[#FEB60D]">DT</span> <br />
                        <span className="text-2xl sm:text-3xl text-gray-800 tracking-tight">Capa de Registro</span>
                    </h1>

                    <p className="text-black font-medium text-sm sm:text-base max-w-md mx-auto lg:mx-0 mb-8 opacity-90 leading-relaxed">
                        Únete al ecosistema de ingeniería consistente. Evolución condensada en herramientas tecnológicas.
                    </p>

                    <div className="flex flex-col items-center lg:items-start gap-4">
                        <p className="text-gray-400 font-bold uppercase text-[9px] tracking-[0.2em]">¿Ya tienes una Cuenta?</p>
                        <Link 
                            to="/login" 
                            className="px-10 py-3.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-[#FEB60D] hover:text-black hover:-translate-y-1"
                        >
                            Ingresar al Panel
                        </Link>
                    </div>
                </div>

                {/* FORMULARIO */}
                <div className="w-full max-w-[480px]">
                    <div className="bg-white border-[3px] border-black rounded-[40px] p-8 sm:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
                        <div className="flex items-center justify-between mb-10">
                            <h2 className="text-2xl font-black text-black uppercase tracking-tighter">Registro</h2>
                            <div className="p-3 bg-[#FEB60D] rounded-2xl text-black">
                                <UserPlus size={24} strokeWidth={3} />
                            </div>
                        </div>

                        <form onSubmit={onSubmit} className="space-y-5">
                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Nombre</label>
                                <input
                                    id="name"
                                    type="text"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.name ? 'border-red-500' : 'border-gray-100'} p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-black text-sm transition-all`}
                                    placeholder="Tu Nombre"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Email</label>
                                <input
                                    id="email"
                                    type="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.email ? 'border-red-500' : 'border-gray-100'} p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-black text-sm transition-all`}
                                    placeholder="@"
                                />
                            </div>

                            <div>
                                <label className="block text-[10px] font-black text-gray-400 uppercase tracking-widest mb-2 ml-1">Password</label>
                                <input
                                    id="password"
                                    type="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    className={`w-full bg-gray-50 border-2 ${validationErrors.password ? 'border-red-500' : 'border-gray-100'} p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-black text-sm transition-all`}
                                    placeholder="Mínimo 8 caracteres"
                                />
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-5 bg-black text-white rounded-full font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-[#FEB60D] hover:text-black hover:shadow-xl flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Sincronizar Y Entrar"}
                            </button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Signup;