import { Link, NavLink, useNavigate } from "react-router-dom";
import { FaTimes, FaBars } from "react-icons/fa";
import { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../../context/UserContext";
import { axiosAuth } from "../../API/api"; // ⬅️ CORRECCIÓN: Usar axiosAuth para Logout
import Profile from "../../features/Profile";

const navLinks = [
  { path: "/", name: "Inicio" },
  { path: "/services", name: "Servicios" },
  { path: "/doctors", name: "Proyectos" },
  { path: "/contact", name: "Contacto" },
];

const Header = () => {
  const { user, setUser, setToken } = useContext(AppContext);
  const navigate = useNavigate();
  const [openMenu, setOpenMenu] = useState(false);
  const [profile, setProfile] = useState(false);
  const headerRef = useRef(null);

  const handleMobileMenu = () => {
    setOpenMenu((prev) => !prev);
  };

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
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogOut = async () => {
    try {
      // Usamos axiosAuth, que tiene withCredentials: true. 
      // La ruta debe ser /user/logout o /doctor/logout, no solo /logout
      const logoutPath = user?.role === 'doctor' ? '/doctor/logout' : '/user/logout';
      const response = await axiosAuth.post(logoutPath); 
      
      if (response.status === 204) {
        setUser(null);
        setToken(null);
        localStorage.removeItem('accessToken'); // Limpiar el token de acceso
        navigate("/");
      } else {
        console.log("Error logging out with status:", response.status);
      }
    } catch (error) {
      // Si hay un error (ej. la cookie ya no existe), limpiamos el estado local de todos modos.
      console.log("Error logging out, cleaning local state.", error); 
      setUser(null);
      setToken(null);
      localStorage.removeItem('accessToken');
      navigate("/");
    }
  };

  return (
    <nav ref={headerRef} className="header bg-transparent absolute flex items-center justify-center top-4 left-0 w-full h-16 z-10 transition-all duration-300 ease-out">
      <div className="md:container flex items-center justify-between gap-2 w-full mx-12">
        {/* Logo and Site Title */}
        <Link
          to="/"
          className="max-w-full flex items-center gap-2 cursor-pointer "
        >
          <img src="./logo.png" alt="logo" className="h-20 w-25 sm:h-30 pb-1" />
        </Link>

        {/* Desktop Navigation Links */}
        <div className="hidden md:block">
          <ul className="flex items-center gap-2">
            {navLinks.map((link, index) => (
              <li key={index}>
                <NavLink
                  to={link.path}
                  className={({ isActive }) =>
                    isActive
                      ? "text-black font-bold text-xl leading-7"
                      : "text-withe font-semi-bold text-xl leading-7 hover:text-yellow-400"
                  }
                >
                  {link.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>

        {/* Mobile and Desktop Avatar */}
        {user && (
          <div
            className="flex items-center gap-4"
            onClick={() => setProfile(!profile)}
          >
            <img
              src={user.photo}
              alt="user-profile"
              className="rounded-full h-12 w-12 md:h-16 md:w-16 object-cover cursor-pointer"
            />
            {profile && <Profile />}
          </div>
        )}

        {/* Log Out/Log In Button */}
        <div className="hidden md:flex items-center gap-4">
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

        {/* Mobile Menu Icon */}
        <div
          onClick={handleMobileMenu}
          className="block md:hidden cursor-pointer"
        >
          {openMenu ? <FaTimes size={25} /> : <FaBars size={28} />}
        </div>

        {/* Mobile Menu */}
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
                    className="text-2xl font-medium text-blue hover:text-yellow-400"
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