import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const Footer = () => {
  const [currentDateTime, setCurrentDateTime] = useState("");

  useEffect(() => {
    const updateTime = () => {
      const now = new Date().toLocaleString('en-US', {
        timeZone: 'America/Bogota',
        dateStyle: 'medium',
        timeStyle: 'short',
      });
      setCurrentDateTime(now);
    };
    updateTime();
    const timer = setInterval(updateTime, 60000);
    return () => clearInterval(timer);
  }, []);

  const [hoveredItem, setHoveredItem] = useState(null);

  const handleMouseEnter = (id) => setHoveredItem(id);
  const handleMouseLeave = () => setHoveredItem(null);

  const getStyle = (id) => (
    hoveredItem === id 
      ? { color: '#FEB60D', textShadow: '0 0 15px #FEB60D', transition: 'all 0.3s ease' } 
      : { color: '#FFFFFF', transition: 'all 0.3s ease' }
  );

  return (
    <footer className="relative min-h-screen w-full bg-black flex items-center justify-center overflow-hidden border-t-4 border-[#FEB60D]">
      <video
        autoPlay loop muted playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-30 grayscale-[50%]"
        src={BogotaAir2}
      />
      
      <div className="absolute top-12 left-1/2 transform -translate-x-1/2 z-20">
        <Link to="/">
          <img src={Logo} alt="Software DT Logo" className="h-20 w-auto transition-all hover:scale-110 duration-500 cursor-pointer drop-shadow-[0_0_15px_rgba(254,182,13,0.5)]" />
        </Link>
      </div>

      <div className="relative z-10 w-full max-w-[1800px] px-6 py-16 flex flex-col items-center text-center mt-20">
        
        <div className="mb-12 group">
          <h1 style={getStyle('title')} onMouseEnter={() => handleMouseEnter('title')} onMouseLeave={handleMouseLeave}
              className="text-4xl sm:text-6xl font-black uppercase tracking-[0.4em] cursor-default transition-all duration-300">
            Software <span style={{ color: hoveredItem === 'title' ? '#FEB60D' : '#FFFFFF' }}>D T</span>
          </h1>
          <h2 style={getStyle('subtitle')} onMouseEnter={() => handleMouseEnter('subtitle')} onMouseLeave={handleMouseLeave}
              className="text-sm sm:text-base font-bold uppercase tracking-[0.8em] mt-4 opacity-70 cursor-default transition-all duration-300 text-white">
            Dorado Technologies
          </h2>
          <div className="w-32 h-[3px] mx-auto mt-8 transition-all duration-500" 
               style={{ backgroundColor: hoveredItem === 'title' ? '#FEB60D' : '#FFFFFF', width: hoveredItem === 'title' ? '200px' : '80px' }}></div>
        </div>

        <h3 style={getStyle('slogan')} onMouseEnter={() => handleMouseEnter('slogan')} onMouseLeave={handleMouseLeave}
            className="text-xl sm:text-2xl font-black uppercase tracking-[0.2em] mb-20 italic cursor-default transition-all duration-300 text-white">
          "Codificamos Para Servir"
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-40 mb-20 text-center md:text-left">
          <div className="flex flex-col items-center md:items-start">
            <h4 className="text-[#FEB60D] font-black text-xs uppercase tracking-[0.3em] mb-8 border-b border-[#FEB60D] pb-2">Sistema Base</h4>
            <ul className="text-lg font-bold uppercase tracking-widest space-y-6">
              {[
                { id: 'f2', name: 'Productos', href: '/products' },
                { id: 'f3', name: 'Investigaciones', href: '/investigations' },
                { id: 'f4', name: 'Contacto', href: '/contact' },
                { id: 'f7', name: 'Clientes', href: '/clients' }
              ].map((link) => (
                <li key={link.id}>
                  <Link to={link.href}
                       onMouseEnter={() => handleMouseEnter(link.id)} onMouseLeave={handleMouseLeave}
                       style={getStyle(link.id)}
                       className="transition-all duration-300 hover:pl-4 inline-block">
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col items-center md:items-start">
             <h4 className="text-[#FEB60D] font-black text-xs uppercase tracking-[0.3em] mb-8 border-b border-[#FEB60D] pb-2">Ecosistema Elite</h4>
            <ul className="text-lg font-bold uppercase tracking-widest space-y-6">
              {[
                { id: 'f5', name: 'Trabaja con Software DT', href: 'mailto:softwaredt@outlook.com' },
                { id: 'f6', name: 'Committers Top', href: 'https://committers.top/colombia' },
                { id: 'f8', name: 'Email Central', href: 'mailto:softwaredt@outlook.com' }
              ].map((link) => (
                <li key={link.id}>
                  <a href={link.href} target="_blank" rel="noreferrer"
                     onMouseEnter={() => handleMouseEnter(link.id)} onMouseLeave={handleMouseLeave}
                     style={getStyle(link.id)}
                     className="transition-all duration-300 hover:pl-4 inline-block">
                    {link.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-10 border-t border-white/20 w-full max-w-7xl">
          <div className="flex flex-col lg:flex-row items-center justify-between w-full gap-8">
            <p onMouseEnter={() => handleMouseEnter('copy')} onMouseLeave={handleMouseLeave}
               style={getStyle('copy')}
               className="text-sm font-black uppercase tracking-[0.4em]">
              Copyright 2026 © Software DT | Bogotá
            </p>

            <div className="flex items-center gap-4 py-3 px-6 bg-white/5 border border-white/10 rounded-none cursor-default"
                 onMouseEnter={() => handleMouseEnter('date')} onMouseLeave={handleMouseLeave}>
              <span className="w-2 h-2 bg-[#FEB60D] rounded-full animate-ping shadow-[0_0_10px_#FEB60D]"></span>
              <p style={getStyle('date')} className="text-sm font-black uppercase tracking-widest">
                {currentDateTime} <span className="mx-2 opacity-30">|</span> 4.45.0-STABLE
              </p>
            </div>
          </div>

          <div className="mt-10 pt-4 border-t border-[#FEB60D]/30">
            <a 
              href="https://github.com/NietoDeveloper" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-[#FEB60D] text-[10px] sm:text-xs font-black uppercase tracking-[0.5em] hover:text-white transition-all duration-500 hover:drop-shadow-[0_0_10px_#FEB60D]"
            >
              Manuel Nieto <span className="mx-2 text-white/40">|</span> Founder & Principal Engineer
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;