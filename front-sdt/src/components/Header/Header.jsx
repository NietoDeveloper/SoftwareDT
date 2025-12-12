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
                  
                    <div className="flex-shrink-0 flex items-center cursor-pointer" onClick={() => window.location.href = '/'}>
                        <span className="text-black text-2xl font-bold hover:text-yellow-500 transition-colors">Software<span className="text-black hover:text-yellow-500 transition-colors">D T</span></span>
                    </div>
                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-black hover:text-yellow-500 font-medium transition-colors">Inicio</Link>
                        <Link to="/doctors" className="text-black hover:text-yellow-500 font-medium transition-colors">Escoje Servicio</Link>
                        <Link to="/clients" className="text-black hover:text-yellow-500 font-medium transition-colors">Nuestros Clientes</Link>
                        <Link to="/contact" className="text-black hover:text-yellow-500 font-medium transition-colors">Contacto</Link>
                        <Link to="/#about" className="text-black hover:text-yellow-500 font-medium transition-colors">Sobre Software D T</Link>
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


            )}
        </header>
    );
};
export default Header;