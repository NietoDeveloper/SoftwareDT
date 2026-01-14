import { useState, useContext } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { UserContext } from "../../context/UserContext";

// COMPONENTE AUXILIAR PARA EL MENÚ MÓVIL (MANTENIDO)
const MenuButton = ({ isOpen, onClick }) => {
  const variantTop = { closed: { rotate: 0, y: 0 }, opened: { rotate: 45, y: 8 } };
  const variantCenter = { closed: { opacity: 1, x: 0 }, opened: { opacity: 0, x: -20 } };
  const variantBottom = { closed: { rotate: 0, y: 0 }, opened: { rotate: -45, y: -8 } };

  return (
    <button
      onClick={onClick}
      className="relative z-50 p-2 bg-transparent border-none outline-none focus:outline-none group transition-all duration-300 active:scale-90 flex items-center justify-center"
      aria-label="Menu"
    >
      <div className="w-7 h-5 flex flex-col justify-between items-center relative">
        <motion.span
          variants={variantTop}
          animate={isOpen ? "opened" : "closed"}
          className="w-full h-1 bg-[#FEB60D] rounded-full group-hover:bg-black transition-colors duration-300"
        />
        <motion.span
          variants={variantCenter}
          animate={isOpen ? "opened" : "closed"}
          className="w-full h-1 bg-[#FEB60D] rounded-full group-hover:bg-black transition-colors duration-300"
        />
        <motion.span
          variants={variantBottom}
          animate={isOpen ? "opened" : "closed"}
          className="w-full h-1 bg-[#FEB60D] rounded-full group-hover:bg-black transition-colors duration-300"
        />
      </div>
    </button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  
  const { token, handleLogout: contextLogout } = useContext(UserContext);
  const isLoggedIn = !!token;

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    contextLogout(); 
    setIsMenuOpen(false);
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Informacion Servicios", path: "/services" },
    { name: "Escoge Servicio", path: "/doctors" },
    { name: "Clientes", path: "/clients" },
    { name: "Contacto", path: "/contact" }
  ];

  return (
    <header className="bg-white/90 backdrop-blur-2xl sticky top-0 z-[100] border-b border-black w-full shadow-[0_4px_20px_rgba(254,182,13,0.2)]">
      <div className="max-w-[1900px] min-w-[310px] mx-auto px-4 sm:px-6 lg:px-12">
        <div className="flex justify-between items-center h-20 relative">
          
          {/* LOGO SOFTWARE DT - HOVER GOLD FLOTANTE ACENTUADO */}
          <div 
            className="flex items-center gap-2 cursor-pointer group transition-all duration-500 transform-gpu hover:-translate-y-1" 
            onClick={handleLogoClick}
          >
            <h2 className="text-black text-xl sm:text-2xl lg:text-3xl font-black uppercase tracking-tighter transition-all duration-500 group-hover:text-[#FEB60D] drop-shadow-[0_2px_5px_rgba(254,182,13,0.3)] group-hover:drop-shadow-[0_0_20px_rgba(254,182,13,0.8)]">
              Software D T
            </h2>

            {isLoggedIn && (
              <Link 
                to="/users/profile/me" 
                className="relative flex items-center justify-center ml-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              </Link>
            )}
          </div>

          {/* DESKTOP NAV - CENTRADO Y ALINEADO */}
          <nav className="hidden md:flex space-x-6 lg:space-x-10 items-center justify-center flex-grow text-[11px] lg:text-sm">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-black uppercase tracking-widest transition-all duration-300 relative group py-2 ${
                  isActive(link.path) ? "text-[#FEB60D]" : "text-black hover:text-[#FEB60D]"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FEB60D] transition-transform duration-300 shadow-[0_0_10px_#FEB60D] ${
                  isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </Link>
            ))}
          </nav>
          
          {/* ACCIONES DE LOGIN/PERFIL */}
          <div className="hidden md:flex items-center gap-4 lg:gap-6 ml-4">
            {isLoggedIn ? (
              <>
                <Link 
                  to="/users/profile/me" 
                  className={`px-5 py-2 rounded-lg border border-black font-black uppercase text-[10px] transition-all duration-300 shadow-[4px_4px_0px_#000000] hover:shadow-[0_0_20px_rgba(254,182,13,0.6)] hover:-translate-y-1 ${
                    isActive("/users/profile/me") 
                      ? "bg-[#FEB60D] text-black" 
                      : "bg-[#FFD700] text-black hover:bg-[#FEB60D]"
                  }`}
                >
                  Panel Cliente
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-black hover:text-red-600 font-black uppercase text-[10px] transition-all hover:scale-105"
                >
                  Salir
                </button>
              </>
            ) : (
              <div className="flex items-center space-x-4">
                <Link 
                  to="/login" 
                  className={`font-black uppercase transition-all duration-300 hover:scale-105 ${
                    isActive("/login") ? "text-[#FEB60D]" : "text-black hover:text-[#FEB60D]"
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className={`px-6 py-2 rounded-full border border-black transition-all duration-300 font-black text-[10px] uppercase tracking-widest hover:shadow-[0_0_20px_rgba(254,182,13,0.5)] hover:-translate-y-1 ${
                    isActive("/signup") 
                      ? "bg-[#FFD700] text-black" 
                      : "bg-black text-white hover:bg-[#FFD700] hover:text-black"
                  }`}
                >
                  Registro
                </Link>
              </div>
            )}
          </div>

          {/* MOBILE BUTTON */}
          <div className="flex items-center md:hidden">
            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>

      {/* MOBILE MENU - ESTILO SOFTWARE DT */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="md:hidden bg-white border-t border-black overflow-hidden shadow-[0_10px_30px_rgba(254,182,13,0.3)]"
          >
            <div className="px-8 py-10 space-y-6 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`text-sm font-black uppercase tracking-widest transition-all ${
                    isActive(link.path) ? "text-[#FEB60D] scale-110" : "text-black hover:text-[#FEB60D]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              <div className="w-full h-[1px] bg-black/10"></div>

              {!isLoggedIn ? (
                <div className="w-full space-y-4 flex flex-col items-center">
                  <Link 
                    to="/login" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`text-sm font-black uppercase tracking-widest transition-colors ${
                      isActive("/login") ? "text-[#FEB60D]" : "text-black hover:text-[#FEB60D]"
                    }`}
                  >
                    Login
                  </Link>
                  <Link 
                    to="/signup" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`w-full py-4 rounded-xl border border-black text-xs font-black uppercase text-center transition-all shadow-[0_5px_15px_rgba(254,182,13,0.2)] ${
                      isActive("/signup") 
                        ? "bg-[#FEB60D] text-black" 
                        : "bg-black text-white hover:bg-[#FEB60D] hover:text-black"
                    }`}
                  >
                    Registro
                  </Link>
                </div>
              ) : (
                <div className="w-full space-y-4 flex flex-col items-center">
                  <Link 
                    to="/users/profile/me" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`w-full py-4 rounded-xl border border-black text-black text-xs font-black uppercase text-center shadow-[0_5px_15px_rgba(254,182,13,0.3)] ${
                      isActive("/users/profile/me") ? "bg-[#FEB60D]" : "bg-[#FFD700]"
                    }`}
                  >
                    Panel Activo
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full py-2 text-red-600 font-black uppercase text-[11px] tracking-widest hover:scale-105 transition-all"
                  >
                    Cerrar Sesión
                  </button>
                </div>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;