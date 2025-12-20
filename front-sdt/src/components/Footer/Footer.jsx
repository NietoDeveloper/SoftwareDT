import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <footer className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden">
      {/* Background Video con opacidad controlada */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src={BogotaAir2}
      />
      
      {/* Logo superior con efecto de iluminación */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
        <img 
          src={Logo} 
          alt="logo" 
          className="h-16 w-auto transition-all hover:scale-110 duration-500 drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" 
        />
      </div>

      {/* Content Container: Responsive 320px a 1800px */}
      <div className="relative z-10 w-full max-w-[1800px] px-6 py-16 flex flex-col items-center text-center mt-20">
        
        {/* Títulos ajustados con tu configuración gold */}
        <div className="mb-12">
          <h1 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-[0.3em] drop-shadow-[2px_2px_0px_rgba(0,0,0,1)]">
            Software <span className="text-gold">D T</span>
          </h1>
          <h2 className="text-sm sm:text-base font-bold text-gray-300 uppercase tracking-[0.5em] mt-2">
            Dorado Technologies
          </h2>
          {/* Línea decorativa usando bg-gold oficial */}
          <div className="w-12 h-[2px] bg-gold mx-auto mt-4 shadow-[0_0_10px_#FFD700]"></div>
        </div>

        {/* Eslogan con sombra */}
        <h3 className="text-lg sm:text-xl font-black text-white uppercase tracking-widest mb-12 italic drop-shadow-md">
          "Codificamos Para Servir"
        </h3>

        {/* Links Grid: Ajustados a text-gold y hover suave */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-24 mb-16">
          <div className="flex flex-col items-center md:items-start">
            <ul className="text-sm sm:text-base font-bold text-white uppercase tracking-tighter space-y-4">
              <li className="group">
                <a href="#" className="transition-all duration-300 group-hover:text-gold group-hover:translate-x-2 inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  Servicios
                </a>
              </li>
              <li className="group">
                <a href="#" className="transition-all duration-300 group-hover:text-gold group-hover:translate-x-2 inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  Productos
                </a>
              </li>
              <li className="group">
                <a href="#" className="transition-all duration-300 group-hover:text-gold group-hover:translate-x-2 inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  Contacto
                </a>
              </li>
              <li className="group">
                <a href="mailto:softwaredt@outlook.com" className="text-gold transition-all duration-300 group-hover:text-white group-hover:scale-105 inline-block font-black">
                  softwaredt@outlook.com
                </a>
              </li>
            </ul>
          </div>

          {/* Divisor lateral usando el color gold con opacidad */}
          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-gold/30 pt-8 md:pt-0 md:pl-12">
            <ul className="text-sm sm:text-base font-bold text-white uppercase tracking-tighter space-y-4">
              <li className="group">
                <a href="#" className="transition-all duration-300 group-hover:text-gold group-hover:translate-x-2 inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  Proyectos
                </a>
              </li>
              <li className="group">
                <a href="#" className="transition-all duration-300 group-hover:text-gold group-hover:translate-x-2 inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  Investigacion
                </a>
              </li>
              <li className="group">
                <a href="#" className="transition-all duration-300 group-hover:text-gold group-hover:translate-x-2 inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  Sobre Software DT
                </a>
              </li>
              <li className="group">
                <a href="#" className="transition-all duration-300 group-hover:text-gold group-hover:translate-x-2 inline-block drop-shadow-[1px_1px_0px_rgba(0,0,0,1)]">
                  Trabaja con nosotros
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Info Inferior con badge de tiempo en Bogotá */}
        <div className="mt-8 pt-8 border-t border-white/10 w-full max-w-2xl flex flex-col items-center gap-4">
          <div className="flex flex-col sm:flex-row gap-4 sm:gap-8 text-[10px] font-black uppercase tracking-[0.2em] text-gray-400">
            <p className="hover:text-gold transition-colors duration-300 cursor-default">
              Copyright 2025 © Software DT
            </p>
            <div className="flex items-center gap-2 text-white bg-black/60 px-4 py-1.5 rounded-full border border-gold/20 shadow-lg backdrop-blur-sm">
              <span className="w-2 h-2 bg-gold rounded-full animate-pulse"></span>
              <p>{currentDateTime} — Bogotá, Colombia</p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;