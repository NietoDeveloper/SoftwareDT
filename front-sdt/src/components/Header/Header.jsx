import { useState } from "react";
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
  const isLoggedIn = !!localStorage.getItem("token");

  const isActive = (path) => location.pathname === path;

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
      <div className="container mx-auto px-3 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 relative">
          
          {/* LOGO + INDICADOR VERDE */}
          <div className="flex items-center gap-1.5 sm:gap-3 cursor-pointer group min-w-fit" onClick={handleLogoClick}>
            <h2 className="text-black text-lg sm:text-2xl font-black uppercase tracking-tighter transition-all duration-300 group-hover:text-[#FEB60D] drop-shadow-[0_0_8px_rgba(255,215,0,0.3)]">
              Software D T
            </h2>

            {isLoggedIn && (
              <Link 
                to="/client-appointments" 
                className="relative flex items-center justify-center group/dot ml-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-white shadow-[0_0_10px_rgba(34,197,94,0.6)] group-hover/dot:scale-125 transition-transform duration-300"></span>
              </Link>
            )}
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center text-[10px] lg:text-sm">
            {[
              { name: "Inicio", path: "/" },
              { name: "Servicios", path: "/services" },
              { name: "Escoje Servicio", path: "/doctors" },
              { name: "Clientes", path: "/clients" }
            ].map((link) => (
              <Link 
                key={link.path}
                to={link.path} 
                className={`font-black uppercase tracking-widest transition-all duration-300 relative group py-1 ${
                  isActive(link.path) ? "text-[#FEB60D]" : "text-black hover:text-[#FEB60D]"
                }`}
              >
                {link.name}
                <span className={`absolute bottom-0 left-0 w-full h-0.5 bg-[#FEB60D] transition-transform duration-300 ${
                  isActive(link.path) ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                }`}></span>
              </Link>
            ))}
            
            {isLoggedIn ? (
              <div className="flex items-center gap-3 lg:gap-4">
                <Link 
                  to="/client-appointments" 
                  className={`px-3 lg:px-4 py-1.5 rounded-lg border-2 border-[#FFD700] font-black uppercase text-[9px] lg:text-[10px] transition-all duration-300 active:translate-x-0.5 active:translate-y-0.5 ${
                    isActive("/client-appointments") 
                      ? "bg-[#FFD700] text-black shadow-[3px_3px_0px_0px_rgba(255,215,0,0.6),0_0_15px_rgba(255,215,0,0.4)]" 
                      : "bg-[#FFD700] text-black hover:bg-[#FEB60D] shadow-[3px_3px_0px_0px_rgba(255,182,13,0.4)]"
                  }`}
                >
                  Panel Cliente
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-black hover:text-red-600 font-black transition-colors border-none bg-transparent p-0 uppercase text-[9px] lg:text-[10px] tracking-tighter"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 lg:space-x-4">
                <Link to="/login" className="text-black font-black uppercase hover:text-[#FEB60D] transition-colors">Login</Link>
                <Link to="/signup" className="px-4 py-2 bg-black text-white rounded-full hover:bg-[#FFD700] hover:text-black transition-all font-black text-[10px] uppercase tracking-widest">Registro</Link>
              </div>
            )}
          </nav>

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
            className="md:hidden bg-white/98 backdrop-blur-3xl border-t border-black/10 overflow-hidden"
          >
            <div className="px-6 py-8 space-y-5 flex flex-col items-center">
              {[
                { name: "Inicio", path: "/" },
                { name: "Servicios", path: "/services" },
                { name: "Escoje Servicio", path: "/doctors" },
                { name: "Contacto", path: "/contact" }
              ].map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`text-sm font-black uppercase tracking-widest transition-all duration-300 ${
                    isActive(link.path) ? "text-[#FFD700]" : "text-black hover:text-[#FFD700]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {isLoggedIn && (
                <Link 
                  to="/client-appointments" 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`px-6 py-2 rounded-lg border-2 border-[#FFD700] text-sm font-black transition-all duration-300 uppercase ${
                    isActive("/client-appointments") 
                    ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(255,215,0,0.4)]" 
                    : "bg-transparent text-[#FFD700]"
                  }`}
                >
                  Panel Activo
                </Link>
              )}

              <div className="w-full h-px bg-black/5 my-1"></div>
              
              {isLoggedIn ? (
                <button 
                  onClick={() => { handleLogout(); setIsMenuOpen(false); }} 
                  className="text-xs font-black text-red-600 uppercase tracking-widest"
                >
                  Cerrar Sesión
                </button>
              ) : (
                <div className="flex flex-col items-center gap-4 w-full pt-2">
                  <Link to="/login" onClick={() => setIsMenuOpen(false)} className="text-sm font-black uppercase">Login</Link>
                  <Link to="/signup" onClick={() => setIsMenuOpen(false)} className="w-full py-3 bg-black text-[#FFD700] text-center rounded-xl text-xs font-black uppercase tracking-widest shadow-lg">Registro</Link>
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