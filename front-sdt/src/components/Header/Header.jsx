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

  // CORRECCIÓN: Usar navigate para no recargar la app
  const handleLogoClick = () => {
    navigate("/");
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="bg-white/10 backdrop-blur-2xl shadow-sm sticky top-0 z-[100] border-b border-black/5">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          <div className="flex-shrink-0 flex items-center cursor-pointer group" onClick={handleLogoClick}>
            <span className="text-black text-xl sm:text-2xl font-black uppercase tracking-tighter transition-colors duration-300 group-hover:text-[#FEB60D]">
              Software D T
            </span>
          </div>

          <nav className="hidden md:flex space-x-6 items-center text-sm">
            <Link to="/" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Inicio</Link>
            {/* CORRECCIÓN: /services en minúscula para coincidir con App.jsx */}
            <Link to="/services" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Información Servicios</Link>
            <Link to="/doctors" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Escoje Servicio</Link>
            <Link to="/clients" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Nuestros Clientes</Link>
            <Link to="/contact" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Contacto</Link>
            
            {isLoggedIn && (
              <Link to="/client-appointments" className="text-black hover:text-[#FEB60D] font-bold transition-colors">Panel Cliente</Link>
            )}

            {isLoggedIn ? (
              <button 
                onClick={handleLogout} 
                className="text-black hover:text-[#FEB60D] font-black transition-colors border-none bg-transparent p-0"
              >
                Cerrar Sesión
              </button>
            ) : (
              <div className="flex items-center space-x-4">
                <Link to="/login" className="text-black font-black hover:text-[#FEB60D]">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-[#FEB60D] hover:text-black transition-all">Registro</Link>
              </div>
            )}
          </nav>

          <div className="flex items-center md:hidden">
            <MenuButton isOpen={isMenuOpen} onClick={() => setIsMenuOpen(!isMenuOpen)} />
          </div>
        </div>
      </div>

      {/* Mobile Menu con AnimatePresence para suavidad */}
      <AnimatePresence>
        {isMenuOpen && (
          <motion.div 
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-white/95 backdrop-blur-3xl border-t border-black/5 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-4 flex flex-col items-center">
              <Link to="/" onClick={() => setIsMenuOpen(false)} className="text-lg font-black">Inicio</Link>
              <Link to="/services" onClick={() => setIsMenuOpen(false)} className="text-lg font-black">Información Servicios</Link>
              <Link to="/doctors" onClick={() => setIsMenuOpen(false)} className="text-lg font-black">Escoje Servicio</Link>
              <Link to="/clients" onClick={() => setIsMenuOpen(false)} className="text-lg font-black">Nuestros Clientes</Link>
              <Link to="/contact" onClick={() => setIsMenuOpen(false)} className="text-lg font-black">Contacto</Link>
              {isLoggedIn ? (
                <button onClick={() => { handleLogout(); setIsMenuOpen(false); }} className="text-lg font-black text-red-600">Cerrar Sesión</button>
              ) : (
                <>
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-lg font-black">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="text-lg font-black text-[#FEB60D]">Registro</Link>
                </>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;