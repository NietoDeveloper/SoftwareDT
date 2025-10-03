import React from 'react';
import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4"; 

const Footer = () => {
  return (
    <footer className="relative min-h-screen w-full bg-black text-white flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src={BogotaAir2}
      />
      <div className="absolute top-8 left-1/2 transform -translate-x-1/2 z-20">
        <div className="w-24 h-10 sm:w-32 sm:h-12 md:w-40 md:h-14 lg:w-48 lg:h-16 bg-gray-800"></div>
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 sm:px-8 sm:py-20 flex flex-col items-center text-center mt-20">
        <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mt-15 mb-4">Software D T</h1>
        <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4">Dorado Technologies</h2>
        <h3 className="text-2xl sm:text-3xl font-light tracking-wide mb-8">Codificamos Para Servir</h3>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-8 sm:gap-12 md:gap-24">
          <div className="flex flex-col items-center">
            <ul className="text-xl sm:text-2xl font-light tracking-wide">
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Proyectos</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Servicios</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Contacto</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="mailto:doradotech@outlook.com">doradotech@outlook.com</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <ul className="text-xl sm:text-2xl font-light tracking-wide">
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Facebook</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Twitter</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">LinkedIn</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Instagram</a></li>
            </ul>
            <p className="mt-8 text-lg sm:text-xl font-light">Copyright 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;