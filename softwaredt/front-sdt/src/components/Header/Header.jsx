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
                        <span className="text-black text-2xl font-bold">Software<span className="text-black">DT</span></span>
                    </div>

                    <nav className="hidden md:flex space-x-8 items-center">
                        <Link to="/" className="text-black hover:text-yellow-500 font-medium transition-colors">Inicio</Link>
                        <Link to="/doctors" className="text-black hover:text-yellow-500 font-medium transition-colors">Especialistas</Link>
                        <Link to="/contact" className="text-black hover:text-yellow-500 font-medium transition-colors">Contacto</Link>
