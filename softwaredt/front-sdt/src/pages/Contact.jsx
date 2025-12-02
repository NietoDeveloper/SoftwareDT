import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LogIn, LogOut, Menu, X, Phone } from 'lucide-react'; // Usamos íconos para un toque moderno

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    // Se asume que si existe 'token', el usuario está logeado.
    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/doctor/login');
    };

    const navLinkClass = "text-gray-600 hover:text-green-600 font-medium transition-colors p-1 rounded-md hover:bg-gray-50";
    const mobileLinkClass = "block px-3 py-2 rounded-md text-base font-medium text-gray-700 hover:text-green-600 hover:bg-green-50 transition-all";

    return (
        <header className="bg-white shadow-lg sticky top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
                <div className="flex justify-between items-center h-16">
                    
                    {/* Logotipo */}
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-2xl font-extrabold tracking-tight">
                            <span className="text-green-600">Software</span>
                            <span className="text-gray-800">DT</span>
                        </span>
                    </div>

                    {/* Menú de Navegación (Desktop) */}
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className={navLinkClass}>Inicio</Link>
                        <Link to="/doctors" className={navLinkClass}>Especialistas</Link>
                        {/* Nuevo Botón de Contacto */}
                        <Link to="/contact" className={navLinkClass}>
                            <div className='flex items-center space-x-1'>
                                <Phone size={16} className="hidden lg:inline"/>
                                <span>Contacto</span>
                            </div>
                        </Link>
                        
                        {isLoggedIn ? (
                            // Botón de Cerrar Sesión (ROJO)
                            <button 
                                onClick={handleLogout}
                                className="flex items-center space-x-2 bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                            >
                                <LogOut size={18} />
                                <span>Cerrar Sesión</span>
                            </button>
                        ) : (
                            // Botones de Login (AZUL) y Registro (VERDE)
                            <div className="flex items-center space-x-3">
                                <Link 
                                    to="/doctor/login" 
                                    className="flex items-center space-x-2 bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </Link>
                                <Link 
                                    to="/doctor/signup" 
                                    className="hidden lg:inline-flex items-center space-x-2 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-xl font-semibold transition-all shadow-md hover:shadow-lg transform hover:scale-105"
                                >
                                    <span>Registro</span>
                                </Link>
                            </div>
                        )}
                    </nav>

                    {/* Botón de Menú (Mobile) */}
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-gray-500 hover:text-green-600 p-2 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500 transition-colors"
                        >
                            {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Menú Desplegable (Mobile) */}
            {isMenuOpen && (
                <div className="md:hidden bg-white border-t border-gray-100 pb-2 transition-all duration-300 ease-in-out">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
                        <Link 
                            to="/" 
                            className={mobileLinkClass}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link 
                            to="/doctors" 
                            className={mobileLinkClass}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Especialistas
                        </Link>
                        {/* Nuevo Botón de Contacto (Mobile) */}
                        <Link 
                            to="/contact" 
                            className={mobileLinkClass}
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contacto
                        </Link>

                        {isLoggedIn ? (
                             // Botón de Cerrar Sesión (ROJO) - Mobile
                             <button 
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="w-full text-left flex items-center space-x-2 px-3 py-2 mt-2 rounded-md text-base font-semibold text-white bg-red-600 hover:bg-red-700 transition-colors"
                            >
                                <LogOut size={18} />
                                <span>Cerrar Sesión</span>
                            </button>
                        ) : (
                            <>
                                {/* Botón de Login (AZUL) - Mobile */}
                                <Link 
                                    to="/doctor/login" 
                                    className="w-full text-left flex items-center space-x-2 px-3 py-2 rounded-md text-base font-semibold text-white bg-blue-600 hover:bg-blue-700 transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    <LogIn size={18} />
                                    <span>Login</span>
                                </Link>
                                {/* Botón de Registro (VERDE) - Mobile */}
                                <Link 
                                    to="/doctor/signup" 
                                    className="w-full text-left px-3 py-2 rounded-md text-base font-semibold text-green-600 hover:bg-green-50 mt-1"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Registro
                                </Link>
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;