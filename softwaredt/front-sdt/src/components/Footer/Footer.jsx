import React from 'react';
import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";

const Footer = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

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
        <img src="./logo.png" alt="logo" className="h-20 w-25 min-[700px]:h-30 min-[700px]:w-35 sm:h-30 pb-1" />
      </div>
      <div className="relative z-10 container mx-auto px-6 py-16 sm:px-8 sm:py-20 flex flex-col items-center text-center mt-20">
        <h1 className="text-4xl min-[700px]:text-5xl font-bold tracking-tight mt-15 mb-4 min-[700px]:mb-6">Software D T</h1>
        <h2 className="text-2xl min-[700px]:text-3xl font-semibold tracking-tight mb-4 min-[700px]:mb-6">Dorado Technologies</h2>
        <h3 className="text-xl min-[700px]:text-2xl font-light tracking-wide mb-8 min-[700px]:mb-12">Codificamos Para Servir</h3>
        <div className="flex flex-col min-[700px]:flex-row justify-center items-center gap-8 min-[700px]:gap-16">
          <div className="flex flex-col items-center">
            <ul className="text-xl min-[700px]:text-2xl font-light tracking-wide">
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="#">Servicios</a></li>
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="#">Productos</a></li>
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="#">Contacto</a></li>
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="mailto:softwaredt@outlook.com">softwaredt@outlook.com</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <ul className="text-xl min-[700px]:text-2xl font-light tracking-wide">
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="#">Proyectos</a></li>
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="#">Investigacion</a></li>
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="#">Sobre Software DT</a></li>
              <li className="py-3 min-[700px]:py-4 hover:text-yellow-300 transition-colors"><a href="#">Trabaja en Software DT</a></li>
            </ul>
          </div>
        </div>
        <div className="mt-8 flex flex-col items-center justify-center gap-2 min-[700px]:flex-row min-[700px]:gap-6 min-[700px]:justify-center">
          <p className="text-lg min-[700px]:text-xl font-light">Copyright 2025</p>
          <p className="text-lg min-[700px]:text-xl font-light"> {currentDateTime} - Bogotá, Colombia</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;