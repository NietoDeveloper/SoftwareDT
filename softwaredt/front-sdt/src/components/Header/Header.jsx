import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const navigate = useNavigate();

    const isLoggedIn = !!localStorage.getItem('token');

    const handleLogout = () => {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/doctor/login');
    };

    return (
        <header className="bg-transparent backdrop-blur-3xl shadow-lg sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                  
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-black text-2xl font-bold">Software<span className="text-black">DT</span></span>
                    </div>
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-black hover:text-yellow-500 font-medium transition-colors">Inicio</Link>
                        <Link to="/doctors" className="text-black hover:text-yellow-500 font-medium transition-colors">Especialistas</Link>
                        <Link to="/clients" className="text-black hover:text-yellow-500 font-medium transition-colors">Nuestros Clientes</Link>
                        <Link to="/contact" className="text-black hover:text-yellow-500 font-medium transition-colors">Contacto</Link>
                        <Link to="/#about" className="text-black hover:text-yellow-500 font-medium transition-colors">About</Link>
                        <Link to="/appointment" className="text-black hover:text-yellow-500 font-medium transition-colors">Agenda Cita</Link>
                      
                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/doctor/login" className="text-black font-medium hover:text-yellow-500 transition-colors">
                                    Login
                                </Link>
                                <Link to="/doctor/signup" className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg font-medium transition-colors">
                                    Registro
                                </Link>
                            </div>
                        )}
                    </nav>
                    <div className="flex items-center md:hidden">
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="text-black hover:text-yellow-500 focus:outline-none p-2 transition-colors"
                        >
                            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                {isMenuOpen ? (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                                ) : (
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                                )}
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
            {isMenuOpen && (
                <div className={`md:hidden bg-transparent backdrop-blur-3xl border-t border-gray-100 max-h-[50vh] overflow-auto transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-0.5 sm:px-3">
                        <Link
                            to="/"
                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Inicio
                        </Link>
                        <Link
                            to="/doctors"
                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Servicios
                        </Link>
                        <Link
                            to="/clients"
                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Nuestros Clientes
                        </Link>
                        <Link
                            to="/contact"
                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Contacto
                        </Link>
                        <Link
                            to="/#about"
                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            About
                        </Link>
                        <Link
                            to="/appointment"
                            className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                            onClick={() => setIsMenuOpen(false)}
                        >
                            Agenda Cita
                        </Link>
                        {isLoggedIn ? (
                             <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="w-full text-left block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-yellow-50 text-center transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <>
                                <Link
                                    to="/doctor/login"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                                    onClick={() => setIsMenuOpen(false)}
                                >
                                    Login
                                </Link>
                                <Link
                                    to="/doctor/signup"
                                    className="block px-3 py-2 rounded-md text-base font-medium text-black hover:bg-yellow-50 font-bold text-center transition-colors"
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