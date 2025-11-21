import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import useOnClickOutside from "../../hooks/useOnClickOutside.js"; // Añadido .js por precaución
import { UserContext } from "../../context/UserContext.js"; // Añadido .js por precaución
import { axiosAuth } from "../../API/api.js"; // Añadido .js por precaución
import Profile from "../../features/Profile.jsx"; // Asegura la extensión del componente

const navLinks = [
    { path: "/", name: "Inicio" },
    { path: "/services", name: "Servicios" },
    { path: "/doctors", name: "Proyectos" },
    { path: "/contact", name: "Contacto" },
];

const Header = () => {
    const { user, handleLogout } = useContext(UserContext); 
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [profileOpen, setProfileOpen] = useState(false); 
    
    const headerRef = useRef(null);
    const profileRef = useRef(null); 

    // 1. Manejo del perfil: Cierra Profile al hacer clic fuera
    // Si la referencia profileRef envuelve todo el área clickable (imagen + Profile), esto funciona.
    useOnClickOutside(profileRef, () => {
        if (profileOpen) { // Solo si está abierto
            setProfileOpen(false);
        }
    });

    const handleMobileMenu = () => {
        setOpenMenu((prev) => !prev);
        // 💡 Mejoras: Cierra el menú de perfil si abres/cierras el menú móvil.
        if (profileOpen) {
            setProfileOpen(false);
        }
    };
    
    // Función para el 'sticky-nav'
    const handleScroll = () => {
        if (!headerRef.current) return; // Validación para evitar errores si el ref es null
        
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            headerRef.current.classList.add("sticky-nav");
        } else {
            headerRef.current.classList.remove("sticky-nav");
        }
        
        // 💡 Mejora de UX: Cerramos el menú móvil y el perfil si el usuario hace scroll
        setOpenMenu(false);
        setProfileOpen(false); 
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); 
    
    const handleLogOut = async () => {
        setProfileOpen(false); // Cerramos el menú de perfil inmediatamente
        
        try {
            const logoutPath = user?.role === 'doctor' ? '/doctor/logout' : '/user/logout';
            
            await axiosAuth.post(logoutPath);
            
        } catch (error) {
            // El servidor puede devolver 401 si el token expiró. Limpiamos localmente de todas formas.
            console.error("Logout error (Puede ser token expirado). Forzando limpieza local.", error);
        } finally {
            // Limpieza local y navegación, independientemente del éxito del backend.
            handleLogout(); 
            navigate("/login"); 
        }
    };

    // 💡 Función para alternar el perfil y cerrar el menú móvil si está abierto
    const handleProfileToggle = () => {
        setProfileOpen(prev => !prev);
        if (openMenu) {
            setOpenMenu(false);
        }
    };

    return (
        <nav ref={headerRef} className="header bg-transparent absolute flex items-center justify-center top-4 left-0 w-full h-16 z-10 transition-all duration-300 ease-out">
            <div className="md:container flex items-center justify-between gap-2 w-full mx-12">
                
                {/* Logo */}
                <Link
                    to="/"
                    className="max-w-full flex items-center gap-2 cursor-pointer "
                >
                    {/* 🛠️ RUTA DEL LOGO: Si 'logo.png' está en la carpeta 'public', la ruta es correcta. Si no, ajústala. */}
                    <img src="./logo.png" alt="logo" className="h-20 w-25 sm:h-30 pb-1" />
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
                                            ? "text-blue-700 font-bold text-xl leading-7 transition-colors duration-200" // 🛠️ Cambié a un color más consistente (blue-700)
                                            : "text-gray-900 font-medium text-xl leading-7 hover:text-yellow-400 transition-colors duration-200" // 🛠️ Usé font-medium y color más oscuro para inactivos
                                    }
                                >
                                    {link.name}
                                </NavLink>
                            </li>
                        ))}
                    </ul>
                </div>

                {/* Zona de Perfil/Usuario */}
                <div className="flex items-center gap-4"> 
                    {user && (
                        // 🛠️ CORRECCIÓN CLAVE: El ref DEBE estar en el elemento que envuelve la imagen Y el componente 'Profile'
                        <div
                            className="relative flex items-center gap-4"
                            onClick={handleProfileToggle} 
                            ref={profileRef} 
                        >
                            <img
                                src={user.photo} // Se asume que user.photo tiene la URL de la imagen
                                alt="user-profile"
                                className="rounded-full h-12 w-12 md:h-16 md:w-16 object-cover cursor-pointer border-2 border-transparent hover:border-blue-700 transition duration-300"
                            />
                            
                            {/* Renderizar Profile si está abierto */}
                            {profileOpen && 
                                // 💡 MEJORA: Pasamos handleLogOut al componente Profile
                                <Profile onLogout={handleLogOut} onNavigate={navigate} user={user} />
                            }
                        </div>
                    )}

                    {/* Botón de Entrar/Salir (Desktop) */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={user ? handleLogOut : () => navigate("/login")}
                            className="bg-blue-700 text-white px-4 py-2 flex items-center
                            rounded-full font-bold shadow-2xl 
                            transition-all duration-300 ease-in-out transform
                            hover:bg-yellow-400 hover:text-gray-900 hover:scale-105 hover:shadow-glow-xl
                            focus:outline-none focus:ring-4 focus:ring-blue-500 focus:ring-opacity-50"
                            style={{
                                boxShadow: "0 10px 25px rgba(0, 0, 0, 0.5)", 
                                "--tw-shadow-glow-xl":
                                    "0 0 25px rgba(252, 211, 77, 0.8), 0 0 50px rgba(252, 211, 77, 0.6)", 
                            }}
                        >
                            {user ? "Log Out" : "Entrar"}
                        </button>
                    </div>
                </div>


                {/* Menú Móvil */}
                <div
                    onClick={handleMobileMenu}
                    className="block md:hidden cursor-pointer"
                >
                    {openMenu ? <FaTimes size={25} className="text-black" /> : <FaBars size={28} className="text-black" />} 
                </div>

                {/* Contenido del Menú Móvil */}
                {openMenu && (
                    // 🛠️ Ajuste de clases para mejor visibilidad y cierre
                    <div
                        className="fixed top-[85px] left-0 right-0 h-auto bg-white/95 backdrop-blur-sm z-50 flex flex-col items-center gap-4 py-8 shadow-xl md:hidden transition-all duration-300"
                    >
                        <ul className="flex flex-col items-center justify-between gap-6 w-full">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className="text-2xl font-extrabold text-gray-800 hover:text-yellow-400 transition-colors duration-200" 
                                        onClick={handleMobileMenu} // Cierra el menú al hacer clic
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        {/* Botón de Entrar/Salir (Móvil) */}
                        <button
                            onClick={() => {
                                user ? handleLogOut() : navigate("/login");
                                handleMobileMenu(); // Cierra el menú móvil después de la acción
                            }}
                            className="bg-blue-700 text-2xl text-white px-6 py-2 mt-4 
                             rounded-full font-extrabold shadow-2xl 
                             transition-all duration-300 ease-in-out transform
                             hover:bg-yellow-400 hover:text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-500"
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