import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  // Estilo común para forzar el blanco y quitar sombras
  const whiteForce = { color: '#FFFFFF', textShadow: 'none' };

  return (
  
          src={Logo} 
          alt="logo" 
          className="h-20 w-auto transition-all hover:scale-110 duration-500" 
        />
      </div>

      <div className="relative z-10 w-full max-w-[1800px] px-6 py-16 flex flex-col items-center text-center mt-20">
        
        {/* Títulos: Blanco puro forzado */}
        <div className="mb-12">
          <h1 style={whiteForce} className="text-4xl sm:text-5xl font-black uppercase tracking-[0.3em]">
            Software <span className="hover:text-gold transition-colors duration-300 cursor-pointer">D T</span>
          </h1>
          <h2 style={whiteForce} className="text-lg sm:text-xl font-bold uppercase tracking-[0.5em] mt-4">
            Dorado Technologies
          </h2>
          <div className="w-24 h-[3px] bg-white mx-auto mt-6"></div>
        </div>

        {/* Eslogan: Blanco puro forzado */}
        <h3 style={whiteForce} className="text-2xl sm:text-3xl font-black uppercase tracking-widest mb-16 italic">
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
                <li key={link.name} className="group">
                  <a 
                    href={link.href} 
                    style={whiteForce} 
                    className="transition-all duration-300 group-hover:!text-gold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Divisor lateral Blanco */}
          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-white pt-8 md:pt-0 md:pl-16">
            <ul className="text-lg sm:text-xl font-bold uppercase tracking-widest space-y-6">
              {[
                { name: 'Proyectos', href: 'https://github.com/NietoDeveloper?tab=repositories' },
                { name: 'Investigación', href: 'https://committers.top/colombia#NietoDeveloper' },
                { name: 'Sobre Software DT', href: '/sobre-nosotros' },
                { name: 'Trabaja con nosotros', href: '/vacantes' }
              ].map((link) => (
                <li key={link.name} className="group">
                  <a 
                    href={link.href} 
                    target={link.href.startsWith('http') ? "_blank" : "_self"}
                    rel="noreferrer"
                    style={whiteForce} 
                    className="transition-all duration-300 group-hover:!text-gold"
                  >
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Info Inferior: Ajuste de Blanco e Interacción */}
        <div className="mt-12 pt-10 border-t border-white w-full max-w-5xl flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center gap-10 text-xl sm:text-2xl font-black uppercase tracking-[0.2em]">
            
            <p 
              style={whiteForce} 
              className="hover:!text-gold transition-colors duration-300 cursor-default"
            >
              Copyright 2025 © Software DT
            </p>

            <div className="flex items-center gap-4 py-2 transition-all group">
              <span className="w-4 h-4 bg-gold rounded-full animate-pulse shadow-none"></span>
              <p 
                style={whiteForce} 
                className="group-hover:!text-gold transition-colors duration-300 font-black tracking-tighter"
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