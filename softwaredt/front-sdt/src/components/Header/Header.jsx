import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";

// 🛠️ CORRECCIÓN DE IMPORTACIONES:
// Eliminamos extensiones (.js/.jsx) para evitar errores de resolución del bundler (Vite/Webpack).
// Asegúrate de que estas carpetas existan en tu estructura 'src'.
import useOnClickOutside from "../../hooks/useOnClickOutside"; 
import { UserContext } from "../../context/UserContext"; 
import { axiosAuth } from "../../API/api"; 
import Profile from "../../features/Profile";

const navLinks = [
    { path: "/", name: "Inicio" },
    { path: "/services", name: "Servicios" },
    { path: "/doctors", name: "Proyectos" }, // Nota: El nombre 'Proyectos' apunta a la ruta '/doctors'
    { path: "/contact", name: "Contacto" },
];

const Header = () => {
    const { user, handleLogout } = useContext(UserContext); 
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false); 
    
    const headerRef = useRef(null);
    const profileRef = useRef(null); 

    // Cierra Profile al hacer clic fuera
    useOnClickOutside(profileRef, () => {
        if (profileOpen) setProfileOpen(false);
    });

    const handleMobileMenu = () => {
        setOpenMenu((prev) => !prev);
        if (profileOpen) setProfileOpen(false);
    };
    
    const handleScroll = () => {
        if (!headerRef.current) return;
        
        if (document.body.scrollTop > 80 || document.documentElement.scrollTop > 80) {
            headerRef.current.classList.add("sticky-nav");
        } else {
            headerRef.current.classList.remove("sticky-nav");
        }
        // UX: Cerrar menús al hacer scroll
        setOpenMenu(false);
        setProfileOpen(false); 
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); 
    
    const handleLogOutAction = async () => {
        setProfileOpen(false);
        
        try {
            const logoutPath = user?.role === 'doctor' ? '/doctor/logout' : '/user/logout';
            await axiosAuth.post(logoutPath);
        } catch (error) {
            console.error("Error al cerrar sesión:", error);
        } finally {
            // Limpieza local obligatoria
            handleLogout(); 
            navigate("/login"); 
        }
    };

    const handleProfileToggle = () => {
        setProfileOpen(prev => !prev);
        if (openMenu) setOpenMenu(false);
    };

    return (
        <nav ref={headerRef} className="header bg-transparent absolute flex items-center justify-center top-4 left-0 w-full h-16 z-10 transition-all duration-300 ease-out">
            <div className="md:container flex items-center justify-between gap-2 w-full mx-12">
                
                {/* Logo */}
                <Link to="/" className="max-w-full flex items-center gap-2 cursor-pointer">
                    <img src="/logo.png" alt="logo" className="h-20 w-25 sm:h-30 pb-1" />
                </Link>

                {/* Menú Desktop */}
                <div className="hidden md:block">
                    <ul className="flex items-center gap-2">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-blue-700 font-bold text-xl leading-7 transition-colors duration-200"
                                            : "text-gray-900 font-medium text-xl leading-7 hover:text-yellow-400 transition-colors duration-200"
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Zona de Usuario / Perfil */}
                <div className="flex items-center gap-4"> 
                    {user && (
                        <div className="relative flex items-center gap-4" onClick={handleProfileToggle} ref={profileRef}>
                            <img
                                src={user.photo || "https://via.placeholder.com/150"} 
                                alt="user-profile"
                                className="rounded-full h-12 w-12 md:h-16 md:w-16 object-cover cursor-pointer border-2 border-transparent hover:border-blue-700 transition duration-300"
                            />
                            {/* Menú desplegable del perfil */}
                            {profileOpen && <Profile onLogout={handleLogOutAction} />}
                        </div>
                    )}

                    {/* Botón Entrar/Salir (Desktop) */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={user ? handleLogOutAction : () => navigate("/login")}
                            className="bg-blue-700 text-white px-4 py-2 flex items-center rounded-full font-bold shadow-xl transition-transform hover:scale-105 hover:bg-yellow-400 hover:text-gray-900"
                        >
                            {user ? "Log Out" : "Entrar"}
                        </button>
                    </div>
                </div>

                {/* Botón Menú Móvil */}
                <div onClick={handleMobileMenu} className="block md:hidden cursor-pointer">
                    {openMenu ? <FaTimes size={25} /> : <FaBars size={28} />} 
                </div>

                {/* Menú Móvil Desplegable */}
                {openMenu && (
                    <div className="fixed top-[85px] left-0 right-0 bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center gap-6 py-8 shadow-xl md:hidden">
                        {navLinks.map((link, index) => (
                            <NavLink
                                key={index}
                                to={link.path}
                                className="text-2xl font-bold text-gray-800 hover:text-yellow-400" 
                                onClick={handleMobileMenu}
                            >
                                {link.name}
                            </NavLink>
                        ))}
                        <button
                            onClick={() => {
                                user ? handleLogOutAction() : navigate("/login");
                                handleMobileMenu();
                            }}
                            className="bg-blue-700 text-xl text-white px-8 py-2 rounded-full font-bold shadow-lg hover:bg-yellow-400 hover:text-gray-900"
                        >
                            {user ? "Log Out" : "Entrar"}
                        </button>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Header;