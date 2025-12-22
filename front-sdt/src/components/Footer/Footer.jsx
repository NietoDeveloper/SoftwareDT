import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Estilo base para forzar blanco y eliminar sombras extrañas
  const whiteForce = { color: '#FFFFFF', textShadow: 'none' };

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
          className="h-20 w-auto transition-all hover:scale-110 duration-500 cursor-pointer" 
        />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] px-6 py-16 flex flex-col items-center text-center mt-20">
        
        {/* Títulos con Hover Gold */}
        <div className="mb-12">
          <h1 style={whiteForce} className="text-4xl sm:text-5xl font-black uppercase tracking-[0.3em] group cursor-default">
            Software <span className="transition-colors duration-300 hover:text-[#FFD700]">D T</span>
          </h1>
          <h2 style={whiteForce} className="text-lg sm:text-xl font-bold uppercase tracking-[0.5em] mt-4 transition-colors duration-300 hover:text-[#FFD700] cursor-default">
            Dorado Technologies
          </h2>
          <div className="w-24 h-[3px] bg-white mx-auto mt-6 transition-colors duration-300 group-hover:bg-[#FFD700]"></div>
        </div>

        {/* Eslogan */}
        <h3 style={whiteForce} className="text-2xl sm:text-3xl font-black uppercase tracking-widest mb-16 italic transition-colors duration-300 hover:text-[#FFD700] cursor-default">
          "Codificamos Para Servir"
        </h3>

        {/* Links Grid */}
        <div className="flex flex-col md:flex-row justify-center items-start gap-12 md:gap-32 mb-20">
          <div className="flex flex-col items-center md:items-start">
            <ul className="text-lg sm:text-xl font-bold uppercase tracking-widest space-y-6">
              {[
                { name: 'Servicios', href: '/servicios' },
                { name: 'Productos', href: '/productos' },
                { name: 'Contacto', href: '/contacto' },
                { name: 'softwaredt@outlook.com', href: 'mailto:softwaredt@outlook.com' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    style={whiteForce} 
                    className="transition-all duration-300 hover:!text-[#FFD700]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisor lateral */}
          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-white pt-8 md:pt-0 md:pl-16">
            <ul className="text-lg sm:text-xl font-bold uppercase tracking-widest space-y-6">
              {[
                { name: 'Proyectos', href: 'https://github.com/NietoDeveloper?tab=repositories' },
                { name: 'Investigación', href: 'https://committers.top/colombia#NietoDeveloper' },
                { name: 'Sobre Software DT', href: '/sobre-nosotros' },
                { name: 'Trabaja con nosotros', href: '/vacantes' }
              ].map((link) => (
                <li key={link.name}>
                  <a 
                    href={link.href} 
                    target={link.href.startsWith('http') ? "_blank" : "_self"}
                    rel="noreferrer"
                    style={whiteForce} 
                    className="transition-all duration-300 hover:!text-[#FFD700]"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info Inferior */}
        <div className="mt-12 pt-10 border-t border-white w-full max-w-5xl flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center gap-10 text-xl sm:text-2xl font-black uppercase tracking-[0.2em]">
            
            <p 
              style={whiteForce} 
              className="hover:!text-[#FFD700] transition-colors duration-300 cursor-default"
            >
              Copyright 2025 © Software DT
            </p>

            <div className="flex items-center gap-4 py-2 group cursor-default">
              <span className="w-4 h-4 bg-[#FFD700] rounded-full animate-pulse"></span>
              <p 
                style={whiteForce} 
                className="group-hover:!text-[#FFD700] transition-colors duration-300 font-black tracking-tighter"
              >
                {currentDateTime} — BOGOTÁ, COLOMBIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;