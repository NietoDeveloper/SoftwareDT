import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
// 🛠️ CORRECCIÓN CLAVE: Cambiado de AppContext a UserContext
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

    // 🛠️ Corrección: Usar UserContext al consumir el contexto
    const { user, handleLogout } = useContext(UserContext); 
    const navigate = useNavigate();
    const [openMenu, setOpenMenu] = useState(false);
    const [profile, setProfile] = useState(false);
    const headerRef = useRef(null);

    const handleMobileMenu = () => {
        setOpenMenu((prev) => !prev);
    };
    
    // Función para cerrar el perfil si se hace clic fuera de él
    const handleClickOutside = (event) => {
        if (headerRef.current && !headerRef.current.contains(event.target) && profile) {
            // Esta lógica no es ideal para un menú flotante,
            // pero si necesitas una forma simple de cerrar el perfil,
            // debes escuchar los clics en el documento
            // (Para Profile, es mejor usar la propiedad 'onBlur' en el contenedor del perfil o un hook useOnClickOutside)
        }
    };
    
    // Este hook de efecto ya está funcionando bien para el 'sticky-nav'
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
        // Si quieres cerrar el perfil al hacer scroll, podrías añadir lógica aquí
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleLogOut = async () => {
        try {
            const logoutPath = user?.role === 'doctor' ? '/doctor/logout' : '/user/logout';
            const response = await axiosAuth.post(logoutPath);

            if (response.status === 204) {
                handleLogout(); // Limpia el estado y el localStorage
                navigate("/login"); // 💡 Sugerencia: Redirigir a /login es más común que a /
            } else {
                console.log("Error logging out with status:", response.status);
                // Si la API devuelve un error que no es 204, limpiamos localmente por seguridad
                handleLogout();
                navigate("/login");
            }
        } catch (error) {
            console.error("Error logging out, cleaning local state.", error); // Usar console.error
            handleLogout();
            navigate("/login");
        }
        setProfile(false); // Aseguramos que el menú de perfil se cierre
    };

    return (
        <nav ref={headerRef} className="header bg-transparent absolute flex items-center justify-center top-4 left-0 w-full h-16 z-10 transition-all duration-300 ease-out">
            <div className="md:container flex items-center justify-between gap-2 w-full mx-12">
                <Link
                    to="/"
                    className="max-w-full flex items-center gap-2 cursor-pointer "
                >
                    <img src="./logo.png" alt="logo" className="h-20 w-25 sm:h-30 pb-1" />
                </Link>

                <div className="hidden md:block">
                    <ul className="flex items-center gap-2">
                        {navLinks.map((link, index) => (
                            <li key={index}>
                                <NavLink
                                    to={link.path}
                                    className={({ isActive }) =>
                                        isActive
                                            ? "text-black font-bold text-xl leading-7" // 👈 Activo: Negro
                                            : "text-black font-semi-bold text-xl leading-7 hover:text-yellow-400" // 👈 Por defecto: Negro | Hover: Dorado
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
                            onClick={() => setProfile((prev) => !prev)}
                        >
                            <img
                                src={user.photo}
                                alt="user-profile"
                                className="rounded-full h-12 w-12 md:h-16 md:w-16 object-cover cursor-pointer"
                            />
                            {/* 💡 Sugerencia: El componente Profile debe manejar su propio cierre (ej. al hacer clic fuera) */}
                            {profile && <Profile />}
                        </div>
                    )}

                    {/* Botón de Entrar/Salir */}
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
                    {/* 💡 Sugerencia: Ajusta el color de los iconos FaTimes y FaBars aquí si es necesario, 
                         por ejemplo: <FaTimes size={25} className="text-black" /> */}
                    {openMenu ? <FaTimes size={25} /> : <FaBars size={28} />}
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
                                        // 👈 Aquí se aplica: Por defecto: Negro | Hover: Dorado
                                        className="text-2xl font-medium text-black hover:text-yellow-400" 
                                        onClick={handleMobileMenu}
                                    >
                                        {link.name}
                                    </NavLink>
                                </li>
                            ))}
                        </ul>
                        <button
                            onClick={user ? handleLogOut : () => navigate("/login")}
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