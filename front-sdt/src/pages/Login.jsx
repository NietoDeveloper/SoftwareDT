import { useState, useContext } from 'react';
import { useForm } from 'react-hook-form';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { UserContext } from '../context/UserContext.jsx';
import { toast } from 'react-toastify';
import axios from 'axios'; 
import { Lock } from "lucide-react";

    };
    
    return (
        <div className="min-h-screen flex items-center justify-center bg-main p-4 font-sans antialiased">
            <div className="w-full max-w-[1200px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12">
                
                
                            className="group relative inline-flex items-center justify-center px-10 py-3.5 bg-headingColor text-white text-[11px] font-black uppercase tracking-widest rounded-full transition-all duration-300 hover:bg-yellowColor hover:text-black hover:-translate-y-1 hover:shadow-lg"
                        >
                            Registrarme Ahora
                        </Link>
                    </div>
                </div>

               
                                {errors.password && <span className="text-red-500 text-[10px] font-black uppercase mt-2 block">{errors.password.message}</span>}
                            </div>

                            <button
                                type="submit"
                                disabled={isLoading}
                                className="w-full mt-6 py-5 bg-headingColor text-white rounded-full font-black text-[12px] uppercase tracking-[0.2em] transition-all duration-300 hover:bg-yellowColor hover:text-black hover:shadow-xl active:scale-95 flex items-center justify-center"
                            >
                                {isLoading ? (
                                    <div className="w-5 h-5 border-3 border-white border-t-transparent rounded-full animate-spin"></div>
                                ) : "Autenticar Entrada"}
                            </button>
                        </form>

                        <div className="mt-10 pt-6 border-t border-gainsboro text-center">
                            <Link to="/" className="text-[10px] font-black text-textColor/40 uppercase tracking-[0.2em] hover:text-yellowColor transition-colors">
                                ← Regresar al Inicio
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;