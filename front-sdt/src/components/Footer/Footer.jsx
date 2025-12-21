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
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src={BogotaAir2}
      />
      
      {/* Logo superior */}
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
        <img 
          src={Logo} 
          alt="logo" 
          className="h-16 w-auto transition-all hover:scale-110 duration-500" 
        />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] px-6 py-16 flex flex-col items-center text-center mt-20">
        
        {/* Títulos: Blanco puro sin sombras */}
        <div className="mb-12">
          <h1 className="text-3xl sm:text-4xl font-black text-white uppercase tracking-[0.3em]">
            Software <span className="text-white group-hover:text-gold transition-colors">D T</span>
          </h1>
          <h2 className="text-base sm:text-lg font-bold text-white uppercase tracking-[0.5em] mt-2">
            Dorado Technologies
          </h2>
          <div className="w-16 h-[2px] bg-white mx-auto mt-4 transition-colors hover:bg-gold"></div>
        </div>

        {/* Eslogan: Blanco y sin sombras */}
        <h3 className="text-xl sm:text-2xl font-black text-white uppercase tracking-widest mb-12 italic">
          "Codificamos Para Servir"
        </h3>

        {/* Links Grid: Texto Blanco, Hover Gold, Sin Sombras */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-24 mb-16">
          <div className="flex flex-col items-center md:items-start">
            <ul className="text-base sm:text-lg font-bold text-white uppercase tracking-tighter space-y-4">
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
                <a href="mailto:softwaredt@outlook.com" className="transition-all duration-300 hover:text-gold font-black">
                  softwaredt@outlook.com
                </a>
              </li>
            </ul>
          </div>

          {/* Divisor lateral Blanco */}
          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-white/50 pt-8 md:pt-0 md:pl-12">
            <ul className="text-base sm:text-lg font-bold text-white uppercase tracking-tighter space-y-4">
              <li className="group">
                {/* Link lógico a tu sección de proyectos */}
                <a href="https://github.com/NietoDeveloper?tab=repositories" target="_blank" rel="noreferrer" className="transition-all duration-300 group-hover:text-gold">
                  Proyectos
                </a>
              </li>
              <li className="group">
                <a href="https://committers.top/colombia#NietoDeveloper" target="_blank" rel="noreferrer" className="transition-all duration-300 group-hover:text-gold">
                  Investigación (Ranking)
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

        {/* Info Inferior: Blanca, fuente más grande y sin sombras */}
       {/* Info Inferior: Blanco Puro, Sin Sombras y Fuente Grande */}
<div className="mt-8 pt-10 border-t border-white/40 w-full max-w-4xl flex flex-col items-center gap-8">

  );
};

export default Footer;