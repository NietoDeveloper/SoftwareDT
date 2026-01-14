import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";
import { useState } from "react";

const Footer = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

 
  const forceWhite = { color: '#FFFFFF !important', textShadow: 'none' };
  const forceGold = { color: '#FFD700 !important', textShadow: 'none' };

  // Estado para manejar hovers manualmente ya que el CSS global está bloqueando las clases
  const [hoveredItem, setHoveredItem] = useState(null);


  const getStyle = (id) => (hoveredItem === id ? { color: '#FFD700', textShadow: '0 0 10px #FFD700' } : { color: '#FFFFFF' });

  return (
  
      <echnologies
          


     ' },
                { id: 'f4', name: 'softwaredt@outlook.com', href: 'mailto:softwaredt@outlook.com' }
              ].map((link) => (
                <li key={link.id}>
                  <a href={link.href}
                     onMouseEnter={() => handleMouseEnter(link.id)} onMouseLeave={handleMouseLeave}
                     style={getStyle(link.id)}
                     className="transition-all duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start border-t md:border-t-0 md:border-l border-white pt-8 md:pt-0 md:pl-16">
            <ul className="text-lg sm:text-xl font-bold uppercase tracking-widest space-y-6">
              {[
                { id: 'f5', name: 'Proyectos', href: 'https://github.com/NietoDeveloper' },
                { id: 'f6', name: 'Investigación', href: 'https://committers.top/colombia' },
                { id: 'f7', name: 'Sobre Software DT', href: '/sobre-nosotros' },
                { id: 'f8', name: 'Trabaja con nosotros', href: '/vacantes' }
              ].map((link) => (
                <li key={link.id}>
                  <a href={link.href} target="_blank" rel="noreferrer"
                     onMouseEnter={() => handleMouseEnter(link.id)} onMouseLeave={handleMouseLeave}
                     style={getStyle(link.id)}
                     className="transition-all duration-300">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-white/30 w-full max-w-6xl flex flex-col items-center">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8 lg:gap-0">
            <p onMouseEnter={() => handleMouseEnter('copy')} onMouseLeave={handleMouseLeave}
               style={getStyle('copy')}
               className="transition-colors duration-300 cursor-default text-lg sm:text-xl font-black uppercase tracking-[0.2em]">
              Copyright 2025 © Software DT
            </p>

            <div className="flex items-center gap-4 py-2 cursor-default"
                 onMouseEnter={() => handleMouseEnter('date')} onMouseLeave={handleMouseLeave}>
              <span className="w-3 h-3 bg-[#FFD700] rounded-full animate-pulse shadow-[0_0_10px_#FFD700]"></span>
              <p style={getStyle('date')} className="transition-colors duration-300 text-lg sm:text-xl font-black uppercase tracking-tighter">
                {currentDateTime} <span style={{opacity: 0.5, color: '#FFF'}}>|</span> BOGOTÁ, COLOMBIA
              </p>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;