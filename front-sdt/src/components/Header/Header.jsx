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

            </div>
            {isMenuOpen && (
                <div className={`md:hidden bg-transparent backdrop-blur-3xl border-t border-gray-100 max-h-[50vh] overflow-auto transition-all duration-300 ease-in-out ${isMenuOpen ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4'}`}>
                    <div className="px-2 pt-2 pb-3 space-y-0.5 sm:px-3">




                        {isLoggedIn ? (
                             <button
                                onClick={() => { handleLogout(); setIsMenuOpen(false); }}
                                className="w-full block px-3 py-2 rounded-md text-base font-medium text-black hover:text-yellow-500 hover:bg-yellow-50 text-center transition-colors"
                            >
                                Cerrar Sesión
                            </button>
                        ) : (
                            <>
                               
 
                            </>
                        )}
                    </div>
                </div>
            )}
        </header>
    );
};
export default Header;