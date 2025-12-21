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
      {/* Background Video - Opacidad ajustada para que el blanco resalte */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30"
        src={BogotaAir2}
      />
      
      {/* Logo superior */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
        <img 
          src={Logo} 
          alt="logo" 
          className="h-20 w-auto transition-all hover:scale-110 duration-500" 
        />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] px-6 py-16 flex flex-col items-center text-center mt-20">
        
        {/* Títulos: Blanco puro, Sin Sombras */}
        <div className="mb-12">
          <h1 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-[0.3em] drop-shadow-none">
            Software <span className="text-white hover:text-gold transition-colors duration-300">D T</span>
          </h1>
          <h2 className="text-lg sm:text-xl font-bold text-white uppercase tracking-[0.5em] mt-4 drop-shadow-none">
            Dorado Technologies
          </h2>
          <div className="w-24 h-[3px] bg-white mx-auto mt-6"></div>
        </div>

        {/* Eslogan: Blanco puro */}
        <h3 className="text-2xl sm:text-3xl font-black text-white uppercase tracking-widest mb-16 italic drop-shadow-none">
          "Codificamos Para Servir"
        </h3>

        {/* Links Grid: Texto más grande y Blanco Puro */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-32 mb-20">
          <div className="flex flex-col items-center md:items-start">
            <ul className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest space-y-6">
              <li className="group">
                <a href="/servicios" className="transition-all duration-300 group-hover:text-gold">
                  Servicios
                </a>
              </li>
              <li className="group">
                <a href="/productos" className="transition-all duration-300 group-hover:text-gold">
                  Productos
                </a>
              </li>
              <li className="group">
                <a href="/contacto" className="transition-all duration-300 group-hover:text-gold">
                  Contacto
                </a>
              </li>
              <li className="group">
                <a href="mailto:softwaredt@outlook.com" className="transition-all duration-300 hover:text-gold font-black text-white">
                  softwaredt@outlook.com
                </a>
              </li>
            </ul>
          </div>

          {/* Divisor lateral Blanco */}
          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-white pt-8 md:pt-0 md:pl-16">
            <ul className="text-lg sm:text-xl font-bold text-white uppercase tracking-widest space-y-6">
              <li className="group">
                <a href="https://github.com/NietoDeveloper?tab=repositories" target="_blank" rel="noreferrer" className="transition-all duration-300 group-hover:text-gold">
                  Proyectos
                </a>
              </li>
              <li className="group">
                <a href="https://committers.top/colombia#NietoDeveloper" target="_blank" rel="noreferrer" className="transition-all duration-300 group-hover:text-gold">
                  Investigación
                </a>
              </li>
              <li className="group">
                <a href="/sobre-nosotros" className="transition-all duration-300 group-hover:text-gold">
                  Sobre Software DT
                </a>
              </li>
              <li className="group">
                <a href="/vacantes" className="transition-all duration-300 group-hover:text-gold">
                  Trabaja con nosotros
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Info Inferior: Ajuste final de visibilidad blanca */}
        <div className="mt-12 pt-10 border-t border-white w-full max-w-5xl flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center gap-10 text-lg sm:text-xl font-black uppercase tracking-[0.2em] text-white">
            
            <p className="hover:text-gold transition-colors duration-300 cursor-default">
              Copyright 2025 © Software DT
            </p>



      </div>
    </footer>
  );
};

export default Footer;