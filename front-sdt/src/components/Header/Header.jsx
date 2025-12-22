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

              )}
   
        )}
      </AnimatePresence>
    </header>
  );
};

export default Header;