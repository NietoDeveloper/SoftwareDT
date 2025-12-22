import { useState, useEffect } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";

const MenuButton = ({ isOpen, onClick }) => {
  const variantTop = { closed: { rotate: 0, y: 0 }, opened: { rotate: 45, y: 8 } };
  const variantCenter = { closed: { opacity: 1, x: 0 }, opened: { opacity: 0, x: -20 } };
  const variantBottom = { closed: { rotate: 0, y: 0 }, opened: { rotate: -45, y: -8 } };

  return (
    <button
      onClick={onClick}
      className="relative z-50 p-2 bg-transparent border-none outline-none focus:outline-none group transition-all duration-300 active:scale-90"
      aria-label="Menu"
    >
      <div className="w-7 h-5 flex flex-col justify-between items-center relative">
        <motion.span
          variants={variantTop}
          animate={isOpen ? "opened" : "closed"}
          className="w-full h-1 bg-[#FFD700] rounded-full group-hover:bg-black transition-colors duration-300 shadow-[0_0_8px_#FFD700]"
        />
        <motion.span
          variants={variantCenter}
          animate={isOpen ? "opened" : "closed"}
          className="w-full h-1 bg-[#FFD700] rounded-full group-hover:bg-black transition-colors duration-300 shadow-[0_0_8px_#FFD700]"
        />
        <motion.span
          variants={variantBottom}
          animate={isOpen ? "opened" : "closed"}
          className="w-full h-1 bg-[#FFD700] rounded-full group-hover:bg-black transition-colors duration-300 shadow-[0_0_8px_#FFD700]"
        />
      </div>
    </button>
  );
};

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // Para detectar en qué parte del flujo estamos
  const isLoggedIn = !!localStorage.getItem("token");

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/login");
  };

  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Función para determinar si el link está activo
  const isActive = (path) => location.pathname === path;

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Servicios", path: "/services" },
    { name: "Escoje Servicio", path: "/doctors" },
    { name: "Clientes", path: "/clients" },
  ];

  return (
    <header className="bg-white/10 backdrop-blur-2xl shadow-sm sticky top-0 z-[100] border-b border-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20 relative">
          
          {/* LOGO + INDICADOR VERDE */}
          <div className="flex items-center gap-3 cursor-pointer group" onClick={handleLogoClick}>
            <h2 className="text-black text-2xl font-black uppercase tracking-tighter transition-all duration-300 group-hover:text-[#FFD700] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
              Software D T
            </h2>

            {isLoggedIn && (
              <Link 
                to="/client-appointments" 
                className="relative flex items-center justify-center group/dot ml-1"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-white shadow-[0_0_10px_rgba(34,197,94,0.8)] group-hover/dot:scale-125 transition-transform duration-300"></span>
              </Link>
            )}
          </div>

          {/* DESKTOP NAV con Indicador de Flujo */}
          <nav className="hidden md:flex space-x-8 items-center text-[11px] uppercase tracking-[0.2em] font-black">
            {navLinks.map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`transition-all duration-300 relative py-1 ${
                  isActive(link.path) ? "text-[#FFD700]" : "text-black hover:text-[#FFD700]"
                }`}
              >
                {link.name}
                {isActive(link.path) && (
                  <motion.div layoutId="underline" className="absolute -bottom-1 left-0 w-full h-0.5 bg-[#FFD700] shadow-[0_0_8px_#FFD700]" />
                )}
              </Link>
            ))}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-6 pl-4 border-l-2 border-black/10">
                {/* BOTÓN PANEL CLIENTE: GOLD con Hover Intenso */}
                <Link 
                  to="/client-appointments" 
                  className={`px-5 py-2.5 rounded-xl border-[3px] border-black font-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] active:translate-x-1 active:translate-y-1 active:shadow-none ${
                    isActive("/client-appointments") 
                    ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.5)]" 
                    : "bg-[#FFD700] text-black hover:bg-[#FFC400] hover:shadow-[0_0_20px_rgba(255,196,0,0.6)]"
                  }`}
                >
                  Panel Cliente
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-black hover:text-red-600 transition-colors uppercase text-[10px]"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-black hover:text-[#FFD700]">Login</Link>
                <Link to="/signup" className="px-5 py-2.5 bg-black text-white rounded-xl hover:bg-[#FFD700] hover:text-black transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]">Registro</Link>
              </div>
            )}
          </nav>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center md:hidden">
            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>

      {/* MOBILE MENU con Indicador de Flujo */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white border-t-4 border-black overflow-hidden shadow-2xl"
          >
            <div className="px-8 py-10 space-y-6 flex flex-col items-center">
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`text-xl font-black uppercase tracking-widest ${
                    isActive(link.path) ? "text-[#FFD700] scale-110" : "text-black"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {isLoggedIn ? (
                <>
                  <Link 
                    to="/client-appointments" 
                    onClick={() => setIsMenuOpen(false)} 
                    className="w-full text-center py-4 bg-[#FFD700] border-4 border-black rounded-2xl font-black text-lg shadow-[6px_6px_0px_0px_rgba(0,0,0,1)]"
                  >
                    PANEL CLIENTE
                  </Link>
                  <button 
                    onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                    className="text-red-600 font-black uppercase pt-4"
                  >
                    Cerrar Sesión
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-6 w-full pt-6">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-xl font-black">LOGIN</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full text-center py-4 bg-black text-[#FFD700] border-4 border-black rounded-2xl font-black text-lg shadow-[6px_6px_0px_0px_rgba(255,215,0,0.3)]">REGISTRO</Link>
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