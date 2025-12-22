import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
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

  return (
    <header className="bg-white/10 backdrop-blur-2xl shadow-sm sticky top-0 z-[100] border-b border-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          
          {/* LOGO */}
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={handleLogoClick}>
            <h2 className="text-black text-2xl font-black uppercase tracking-tighter transition-all duration-300 group-hover:text-[#FEB60D] drop-shadow-[0_0_8px_rgba(255,215,0,0.6)]">
              Software D T
            </h2>
          </div>

          {/* INDICADOR CENTRAL: PUNTO VERDE (Solo si está logueado) */}
          {isLoggedIn && (
            <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center justify-center">
              <Link 
                to="/client-appointments" 
                className="relative flex items-center justify-center group"
                title="Panel Cliente Activo"
              >
                {/* Efecto de Pulso Verde */}
                <span className="absolute inline-flex h-4 w-4 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-green-500 border-2 border-white shadow-[0_0_10px_rgba(34,197,94,0.8)] group-hover:scale-125 transition-transform duration-300"></span>
                
                {/* Tooltip pequeño para indicar que es el panel */}
                <span className="absolute top-6 opacity-0 group-hover:opacity-100 transition-opacity bg-black text-white text-[8px] font-black px-2 py-0.5 rounded uppercase tracking-widest whitespace-nowrap">
                  Panel Live
                </span>
              </Link>
            </div>
          )}

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-6 items-center text-sm">
            <Link to="/" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Inicio</Link>
            <Link to="/services" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Servicios</Link>
            <Link to="/doctors" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Escoje Servicio</Link>
            <Link to="/clients" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Clientes</Link>
            
            {isLoggedIn ? (
              <div className="flex items-center gap-4">
                <Link to="/client-appointments" className="text-black hover:text-[#FEB60D] font-black transition-colors bg-main/50 px-3 py-1 rounded-lg border border-black/5">
                  Panel Cliente
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-black hover:text-red-600 font-black transition-colors border-none bg-transparent p-0 uppercase text-[11px]"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-black font-black hover:text-[#FEB60D]">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-[#FEB60D] hover:text-black transition-all font-black text-[11px] uppercase tracking-widest">Registro</Link>
              </div>
            )}
          </nav>

          {/* MOBILE TOGGLE */}
          <div className="flex items-center md:hidden">
            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-3xl border-t border-black/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4 flex flex-col items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-black transition-colors duration-300 hover:text-[#FFD700]">Inicio</Link>
              <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-lg font-black transition-colors duration-300 hover:text-[#FFD700]">Servicios</Link>
              
              {isLoggedIn && (
                <Link to="/client-appointments" onClick={() => setIsMenuOpen(false)} className="text-lg font-black text-green-600 transition-colors duration-300 hover:text-[#FFD700]">
                  Panel Cliente (Activo)
                </Link>
              )}

              <Link to="/doctors" onClick={() => setIsMenuOpen(false)} className="text-lg font-black transition-colors duration-300 hover:text-[#FFD700]">Escoje Servicio</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-black transition-colors duration-300 hover:text-[#FFD700]">Contacto</Link>
              
              {isLoggedIn ? (
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                  className="text-lg font-black text-red-600 transition-colors duration-300 hover:text-[#FFD700] uppercase"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <div className="flex flex-col items-center gap-4 pt-4">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-black transition-colors duration-300 hover:text-[#FFD700]">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="px-8 py-3 bg-black text-[#FEB60D] rounded-full font-black uppercase tracking-widest transition-colors duration-300 hover:bg-[#FFD700] hover:text-black">Registro</Link>
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