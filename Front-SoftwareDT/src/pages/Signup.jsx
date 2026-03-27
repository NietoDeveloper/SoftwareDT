import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-hot-toast";
import { useUser } from "../context/UserContext";
import { axiosPublic } from "../API/api"; 
import { UserPlus } from "lucide-react";

const Signup = () => {
    const navigate = useNavigate();
    const { handleLogin } = useUser();
    const [loading, setLoading] = useState(false);

    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (loading) return;
        
        setLoading(true);

        try {
            /**
             * 🛰️ PROTOCOLO DE REGISTRO - SOFTWARE DT (Nivel S+)
             */
            const payload = {
                name: formData.name.trim(),
                email: formData.email.toLowerCase().trim(),
                password: formData.password,
                photo: `https://ui-avatars.com/api/?name=${encodeURIComponent(formData.name)}&background=FEB60D&color=000&bold=true`,
            };

            const response = await axiosPublic.post("/user/register", payload);

            if (response.data.success) {
                const { user, accessToken, token } = response.data;
                const finalToken = accessToken || token;

                handleLogin(user, finalToken);

                toast.success("🚀 NODO CREADO: BIENVENIDO AL ECOSISTEMA DT", {
                    style: { background: '#000', color: '#FEB60D', fontWeight: '900', fontSize: '10px' }
                });
                
                setTimeout(() => {
                    navigate("/client/dashboard", { replace: true });
                }, 200);
            }
        } catch (error) {
            console.error("❌ [SDT_AUTH_ERROR]:", error);
            const message = error.response?.data?.message || "ERROR EN EL PROTOCOLO DE REGISTRO";
            
            toast.error(message.toUpperCase(), {
                style: { background: '#000', color: '#FF4B4B', fontWeight: '900', fontSize: '10px' }
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col bg-[#DCDCDC] font-sans antialiased">
            {/* Reducimos el padding superior para pegarlo más al navbar */}
            <main className="flex-grow flex items-center justify-center p-4 pt-4 pb-12">
                <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-10">
                    
                    {/* Branding Section */}
                    <div className="w-full max-w-lg text-center lg:text-left">
                        <div className="inline-flex items-center gap-2 mb-3">
                            <div className="w-8 h-[2px] bg-[#FEB60D]"></div>
                            <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-black/60">Software DT Standard</span>
                        </div>
                        <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter leading-none mb-4">
                            Software<span className="text-[#FEB60D]">DT</span> <br />
                            <span className="text-2xl sm:text-3xl text-black/80 font-bold">Identidad Digital</span>
                        </h1>
                        <p className="text-black font-medium text-sm max-w-md mx-auto lg:mx-0 mb-6 opacity-90 leading-relaxed">
                            Cree su nodo de ingeniero para acceder a la red <span className="font-black">SOFTWARE DT</span>. 
                            Incorpore su arquitectura al Datacenter centralizado.
                        </p>
                        <Link to="/login" className="inline-flex items-center justify-center px-10 py-3.5 bg-black text-white text-[11px] font-black uppercase tracking-widest rounded-full hover:bg-[#FEB60D] hover:text-black transition-all duration-300">
                            Ya tengo una identidad
                        </Link>
                    </div>

                    {/* Form Card */}
                    <div className="w-full max-w-[450px]">
                        <div className="bg-white border-[3px] border-black rounded-[40px] p-8 sm:p-12 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.1)]">
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-black uppercase tracking-tighter">Registro</h2>
                                <div className="p-3 bg-[#FEB60D] rounded-2xl shadow-lg">
                                    <UserPlus size={22} strokeWidth={3} />
                                </div>
                            </div>

                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label className="block text-[10px] font-black text-black/40 uppercase tracking-widest mb-1.5 ml-2">Nombre Completo</label>
                                    <input
                                        required
                                        type="text"
                                        name="name"
                                        autoComplete="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        className="w-full bg-[#DCDCDC]/20 border-2 border-[#DCDCDC] p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-sm transition-all text-black"
                                        placeholder="MANUEL NIETO"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-black/40 uppercase tracking-widest mb-1.5 ml-2">Email del Ingeniero</label>
                                    <input
                                        required
                                        type="email"
                                        name="email"
                                        autoComplete="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        className="w-full bg-[#DCDCDC]/20 border-2 border-[#DCDCDC] p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-sm transition-all text-black"
                                        placeholder="admin@softwaredt.com"
                                    />
                                </div>

                                <div>
                                    <label className="block text-[10px] font-black text-black/40 uppercase tracking-widest mb-1.5 ml-2">Password</label>
                                    <input
                                        required
                                        type="password"
                                        name="password"
                                        autoComplete="new-password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        className="w-full bg-[#DCDCDC]/20 border-2 border-[#DCDCDC] p-4 rounded-2xl focus:border-[#FEB60D] focus:bg-white outline-none font-bold text-sm transition-all text-black"
                                        placeholder="••••••••"
                                    />
                                </div>

                                <button 
                                    type="submit" 
                                    disabled={loading} 
                                    className="w-full mt-4 py-5 bg-black text-white rounded-full font-black text-[12px] uppercase tracking-[0.2em] hover:bg-[#FEB60D] hover:text-black transition-all flex items-center justify-center disabled:opacity-50 shadow-xl active:scale-95"
                                >
                                    {loading ? "Sincronizando Datacenter..." : "Crear Identidad DT"}
                                </button>
                            </form>
                        </div>
                    </div>

                </div>
            </main>
        </div>
    );
};

export default Signup;