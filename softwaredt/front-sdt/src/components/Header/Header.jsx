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
        <header className="bg-white shadow-md sticky top-0 z-50">
            <div className="container mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-16">
                    
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => navigate('/')}>
                        <span className="text-green-600 text-2xl font-bold">Software<span className="text-gray-800">DT</span></span>
                    </div>

                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Inicio</Link>
                        <Link to="/doctors" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Especialistas</Link>
                        <Link to="/contact" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Contacto</Link>
                        <Link to="/#about" className="text-gray-600 hover:text-green-600 font-medium transition-colors">About</Link>
                        <Link to="/appointment" className="text-gray-600 hover:text-green-600 font-medium transition-colors">Agenda Cita</Link>
                        
                        {isLoggedIn ? (
                            <button 
                                onClick={handleLogout}
                                className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <div className="flex items-center space-x-4">
                                <Link to="/doctor/login" className="text-green-600 font-medium hover:text-green-700">
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
                            className="text-gray-500 hover:text-gray-700 focus:outline-none p-2"
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
                <div className="md:hidden bg-white border-t border-gray-100">
                    <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
