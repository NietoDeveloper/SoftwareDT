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