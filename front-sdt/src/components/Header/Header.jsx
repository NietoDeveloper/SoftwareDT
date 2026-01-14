import { useState, useContext } from "react"; 
import { Link, useNavigate, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
// CORRECCIÓN DE RUTA: Subimos dos niveles para llegar a src/context
import { UserContext } from "../../context/UserContext"; 

// COMPONENTE AUXILIAR PARA EL MENÚ MÓVIL
const MenuButton = ({ isOpen, onClick }) => {
  const variantTop = { closed: { rotate: 0, y: 0 }, opened: { rotate: 45, y: 8 } };
  const variantCenter = { closed: { opacity: 1, x: 0 }, opened: { opacity: 0, x: -20 } };
  const variantBottom = { closed: { rotate: 0, y: 0 }, opened: { rotate: -45, y: -8 } };


};



  return (
   xt-black text-lg sm:text-2xl font-black uppercase tracking-tighter transition-all duration-500 group-hover:text-[#FEB60D] drop-shadow-[0_4px_10px_rgba(254,182,13,0.3)] group-hover:drop-shadow-[0_0_25px_rgba(254,182,13,1)] group-hover:-translate-y-1.5 transform-gpu">
              Software D T
            </h2>

            {/* PUNTO VERDE REACTIVO AL CONTEXTO */}
            {isLoggedIn && (
              <Link 
                to="/users/profile/me" 
                className="relative flex items-center justify-center ml-0.5"
                onClick={(e) => e.stopPropagation()}
              >
                <span className="absolute inline-flex h-3 w-3 rounded-full bg-green-400 opacity-75 animate-ping"></span>
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-500 border-2 border-white shadow-[0_0_10px_rgba(34,197,94,0.5)]"></span>
              </Link>
            )}
          </div>

          {/* DESKTOP NAV */}
          <nav className="hidden md:flex space-x-4 lg:space-x-8 items-center text-[10px] lg:text-sm">
            {navLinks.map((link) => (
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
              <div className="flex items-center gap-3 lg:gap-4 ml-4">
                <Link 
                  to="/users/profile/me" 
                  className={`px-3 lg:px-4 py-1.5 rounded-lg border-2 border-[#FFD700] font-black uppercase text-[9px] lg:text-[10px] transition-all shadow-sm ${
                    isActive("/users/profile/me") 
                      ? "bg-[#FEB60D] text-black shadow-[0_0_15px_rgba(254,182,13,0.4)]" 
                      : "bg-[#FFD700] text-black hover:bg-[#FEB60D] hover:shadow-[0_0_15px_rgba(254,182,13,0.4)]"
                  }`}
                >
                  Panel Cliente
                </Link>
                <button 
                  onClick={handleLogout} 
                  className="text-black hover:text-red-600 font-black uppercase text-[9px] lg:text-[10px] transition-colors"
                >
                  Salir
                </button>
              </div>
            ) : (
              <div className="flex items-center space-x-3 lg:space-x-4 ml-4">
                <Link 
                  to="/login" 
                  className={`font-black uppercase transition-colors ${
                    isActive("/login") ? "text-[#FEB60D]" : "text-black hover:text-[#FEB60D]"
                  }`}
                >
                  Login
                </Link>
                <Link 
                  to="/signup" 
                  className={`px-4 py-2 rounded-full transition-all font-black text-[10px] uppercase tracking-widest ${
                    isActive("/signup") 
                      ? "bg-[#FFD700] text-black shadow-[0_0_15px_rgba(254,182,13,0.4)]" 
                      : "bg-black text-white hover:bg-[#FFD700] hover:text-black"
                  }`}
                >
                  Registro
                </Link>
              </div>
            )}
          </nav>

          {/* MOBILE BUTTON */}
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
              {navLinks.map((link) => (
                <Link 
                  key={link.path}
                  to={link.path} 
                  onClick={() => setIsMenuOpen(false)} 
                  className={`text-sm font-black uppercase tracking-widest transition-colors ${
                    isActive(link.path) ? "text-[#FEB60D]" : "text-black hover:text-[#FEB60D]"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              
              {!isLoggedIn ? (
                <>
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
                    className={`w-full py-3 rounded-xl border-2 text-xs font-black uppercase text-center transition-all ${
                      isActive("/signup") 
                        ? "bg-[#FEB60D] border-[#FEB60D] text-black" 
                        : "bg-black border-black text-white hover:bg-[#FEB60D] hover:border-[#FEB60D] hover:text-black"
                    }`}
                  >
                    Registro
                  </Link>
                </>
              ) : (
                <div className="w-full space-y-4 flex flex-col items-center">
                  <Link 
                    to="/users/profile/me" 
                    onClick={() => setIsMenuOpen(false)} 
                    className={`w-full py-3 rounded-xl border-2 border-[#FFD700] text-black text-xs font-black uppercase text-center ${
                      isActive("/users/profile/me") ? "bg-[#FEB60D]" : "bg-[#FFD700]"
                    }`}
                  >
                    Panel Activo
                  </Link>
                  
                  <button 
                    onClick={handleLogout}
                    className="w-full py-2 text-red-600 font-black uppercase text-[10px] tracking-widest hover:text-red-700 transition-colors"
                  >
                    Salir
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