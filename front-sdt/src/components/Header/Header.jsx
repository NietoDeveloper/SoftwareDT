import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/login');
    };

    // Función para redirigir y recargar la aplicación al oprimir el logo
    const handleLogoClick = () => {
        window.location.href = '/'; 
    };

    return (
        <header className="bg-white/10 backdrop-blur-2xl shadow-sm sticky top-0 z-50 border-b border-black/5">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  
                    <div 
                        className="flex-shrink-0 flex items-center cursor-pointer group transition-all duration-300" 
                        onClick={handleLogoClick}
                    >
                        <span className="text-black text-xl sm:text-2xl font-black uppercase tracking-tighter group-hover:text-gold">
                            Software D T
                        </span>
                    </div>

                    <nav className="hidden md:flex space-x-6 items-center text-sm">
                        <Link to="/" className="text-black hover:text-gold font-bold transition-colors">Inicio</Link>
                        <Link to="/Services" className="text-black hover:text-gold font-bold transition-colors">Información Servicios</Link>
                        <Link to="/doctors" className="text-black hover:text-gold font-bold transition-colors">Escoje Servicio</Link>
                        <Link to="/clients" className="text-black hover:text-gold font-bold transition-colors">Nuestros Clientes</Link>
                        <Link to="/contact" className="text-black hover:text-gold font-bold transition-colors">Contacto</Link>
                        <Link to="/client-appointments" className="text-black hover:text-gold font-bold transition-colors">Panel Cliente</Link>
                      
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="text-black hover:text-gold font-black transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/login" className="text-black font-black hover:text-gold transition-colors">
                                    Login
                                </Link>
                                <Link to="/signup" className="text-black font-black hover:text-gold transition-colors">
                                    Registro
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Mobile Menu Button: Negro, contorno transparente, hover gold */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-black hover:text-gold focus:outline-none p-2 transition-colors duration-300"
                        >
                            <svg className="h-7 w-7" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Navigation Menu */}
            {isMenuOpen && (
                <div className="md:hidden bg-white/20 backdrop-blur-3xl border-t border-black/5 max-h-[80vh] overflow-auto transition-all duration-300">
                    <div className="px-6 pt-4 pb-8 space-y-4 flex flex-col items-center justify-center">
                        {/* Links de navegación estándar */}
                        {["Inicio", "Información Servicios", "Escoje Servicio", "Nuestros Clientes", "Contacto", "Panel Cliente"].map((item, index) => (
                            <Link
                                key={index}
                                to={item === "Inicio" ? "/" : `/${item.replace(/\s+/g, '')}`}
                                className="w-full text-center py-2 text-lg font-black text-black hover:text-gold transition-colors"
                                onClick={() => setIsMenuOpen(false)}
                            >
                                {item}
                            </Link>
                        ))}

                        <div className="w-full h-[1px] bg-black/10 my-2"></div>

                        {isLoggedIn ? (
                             <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="w-full text-center py-3 text-lg font-black text-black hover:text-gold transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="w-full flex flex-col items-center space-y-4 px-4">
                                {/* Login y Registro con contorno Gold, letra negra y efecto click */}
                                <Link
                                    to="/login"
                                    className="w-full text-center py-3 text-lg font-black text-black border-2 border-gold rounded-xl transition-all active:scale-95 hover:bg-gold/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/signup"
                                    className="w-full text-center py-3 text-lg font-black text-black border-2 border-gold rounded-xl transition-all active:scale-95 hover:bg-gold/10"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Registro
                                </Link>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;