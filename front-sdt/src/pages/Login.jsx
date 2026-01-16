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
    );
};

export default Login;