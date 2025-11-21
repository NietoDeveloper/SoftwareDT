import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
// 🛠️ Importación de un hook personalizado para manejar clics fuera
import useOnClickOutside from "../../hooks/useOnClickOutside"; // Asume que tienes este hook
import { UserContext } from "../../context/UserContext"; 
import { axiosAuth } from "../../API/api";
import Profile from "../../features/Profile";

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
    const [profileOpen, setProfileOpen] = useState(false); // 💡 Cambiado a profileOpen
    
    const headerRef = useRef(null);
    const profileRef = useRef(null); // 💡 Nuevo ref para el contenedor de Profile

    // 1. Manejo del perfil (Cierra Profile al hacer clic fuera de su contenedor)
    // Asume que Profile está dentro del div que maneja la apertura/cierre.
    useOnClickOutside(profileRef, () => setProfileOpen(false));

    const handleMobileMenu = () => {
        setOpenMenu((prev) => !prev);
    };
    
    // Función para el 'sticky-nav' (sin cambios, ya era correcto)
    const handleScroll = () => {
        if (
            document.body.scrollTop > 80 ||
            document.documentElement.scrollTop > 80
        ) {
            headerRef.current.classList.add("sticky-nav");
        } else {
            headerRef.current.classList.remove("sticky-nav");
        }
    };

    useEffect(() => {
        window.addEventListener("scroll", handleScroll);
        // 💡 Mejoras: Aseguramos que el menú móvil y el perfil se cierren al hacer scroll
        setOpenMenu(false);
        setProfileOpen(false); 
        return () => window.removeEventListener("scroll", handleScroll);
    }, []); // ⚠️ useEffect sin dependencias solo se ejecuta al montar/desmontar. Esto está bien para el scroll.
    
    // Si queremos un efecto de cierre al cambiar de ruta o interactuar:
    // useEffect(() => {
    //     setOpenMenu(false);
    //     setProfileOpen(false);
    // }, [user, navigate]); // Dependencias si queremos que reaccione al contexto o navegación

    const handleLogOut = async () => {
        setProfileOpen(false); // Cerramos el menú de perfil inmediatamente
        
        try {
            // Se asume que /user/logout y /doctor/logout existen
            const logoutPath = user?.role === 'doctor' ? '/doctor/logout' : '/user/logout';
            
            // 💡 No necesitamos verificar el status 204. La acción de limpieza local es lo crucial.
            await axiosAuth.post(logoutPath);
            
            // Si la llamada al backend fue exitosa o falló (pero queremos limpiar igual)
            handleLogout(); 
            navigate("/login"); 

        } catch (error) {
            // El servidor pudo haber fallado o el refresh token expiró (ej: 401/403)
            // Si hay un error, limpiamos el estado local de todas formas para no dejar la app en un estado roto.
            console.error("Error al cerrar sesión o token inválido. Limpiando estado local.", error);
            handleLogout();
            navigate("/login");
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
                                            ? "text-black font-bold text-xl leading-7"
                                            : "text-black font-semi-bold text-xl leading-7 hover:text-yellow-400"
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
                        <div
                            className="relative flex items-center gap-4"
                            onClick={() => setProfileOpen((prev) => !prev)} // 💡 Usa profileOpen
                            ref={profileRef} // 💡 Asigna el ref para el clic fuera
                        >
                            <img
                                src={user.photo}
                                alt="user-profile"
                                className="rounded-full h-12 w-12 md:h-16 md:w-16 object-cover cursor-pointer"
                            />
                            {/* Renderizar Profile si está abierto */}
                            {profileOpen && <Profile />}
                        </div>
                    )}

                    {/* Botón de Entrar/Salir */}
                    <div className="hidden md:flex items-center">
                        <button
                            onClick={user ? handleLogOut : () => navigate("/login")}
                            // ... (Clases Tailwind CSS sin cambios, ya eran muy detalladas)
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

                {openMenu && (
                    <div
                        className="fixed inset-0 backdrop-blur bg-opacity-95 z-10 flex flex-col items-center gap-4 py-6 transition-transform transform shadow-md"
                        style={{ top: "85px" }}
                    >
                        <ul className="flex flex-col items-center justify-between gap-4 h-[10rem]">
                            {navLinks.map((link, index) => (
                                <li key={index}>
                                    <NavLink
                                        to={link.path}
                                        className="text-2xl font-medium text-black hover:text-yellow-400" 
                                        onClick={handleMobileMenu} // Cierra el menú al hacer clic
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={() => {
                                user ? handleLogOut() : navigate("/login");
                                handleMobileMenu(); // Cierra el menú móvil después de la acción
                            }}
                            // ... (Clases Tailwind CSS sin cambios, ya eran muy detalladas)
                             className="bg-blue-700 text-[24px] text-white px-6 py-2 mt-4 flex items-center
                             rounded-full font-extrabold shadow-2xl 
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
                )}
            </div>
        </nav>
    );
};

export default Header;