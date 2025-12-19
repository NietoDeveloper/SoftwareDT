import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4";
import Logo from "../../assets/images/logo.png";

const Footer = () => {
  const currentDateTime = new Date().toLocaleString('en-US', {
    timeZone: 'America/Bogota',
    dateStyle: 'medium',
    timeStyle: 'short',
  });

  return (
    <footer className="relative min-h-screen w-full bg-black text-white flex items-center justify-center overflow-hidden">
      {/* Video de Fondo con Overlay */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-40"
        src={BogotaAir2}
      />
      <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-transparent to-black/80 z-0"></div>

      {/* Logo Superior */}
      <div className="absolute top-10 left-1/2 transform -translate-x-1/2 z-20">
        <img src={Logo} alt="logo" className="h-16 w-auto grayscale brightness-200 opacity-80" />
      </div>

      {/* Tarjeta Pequeña Transparente (Glassmorphism) */}
      <div className="relative z-10 w-full max-w-[90%] sm:max-w-[1800px] mx-auto flex items-center justify-center px-4">
        <div className="backdrop-blur-md bg-white/5 border border-white/10 p-8 sm:p-12 rounded-[40px] w-full max-w-4xl shadow-2xl">
          
          {/* Header del Footer - Fuentes más pequeñas */}
          <div className="text-center mb-10">
            <h1 className="text-2xl sm:text-3xl font-black uppercase tracking-[0.3em] text-white mb-2">
              Software <span className="text-amber-500">DT</span>
            </h1>
            <p className="text-[10px] sm:text-xs font-bold uppercase tracking-[0.5em] text-gray-400">
              Dorado Technologies
            </p>
            <div className="w-12 h-[1px] bg-amber-500 mx-auto mt-4"></div>
          </div>

          {/* Enlaces con Hover Gold y Movimiento */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-16 gap-y-8 mb-12">
            <div className="flex flex-col items-center sm:items-end text-center sm:text-right">
              <ul className="space-y-3">
                {['Servicios', 'Productos', 'Contacto'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-amber-500 hover:translate-x-2 inline-block transition-all duration-300 uppercase tracking-widest">
                      {item}
                    </a>
                  </li>
                ))}
                <li>
                  <a href="mailto:softwaredt@outlook.com" className="text-xs font-bold text-amber-500/80 hover:text-amber-500 transition-colors">
                    softwaredt@outlook.com
                  </a>
                </li>
              </ul>
            </div>

            <div className="flex flex-col items-center sm:items-start text-center sm:text-left">
              <ul className="space-y-3">
                {['Proyectos', 'Investigacion', 'Sobre Software DT', 'Trabaja con nosotros'].map((item) => (
                  <li key={item}>
                    <a href="#" className="text-sm font-medium text-gray-300 hover:text-amber-500 hover:-translate-x-2 inline-block transition-all duration-300 uppercase tracking-widest">
                      {item}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* Barra Inferior (Metadata) */}
          <div className="border-t border-white/10 pt-8 flex flex-col items-center justify-center gap-4">
            <p className="text-[10px] font-black uppercase tracking-[0.2em] text-amber-500">
              Codificamos Para Servir
            </p>
            <div className="flex flex-col sm:flex-row items-center gap-2 sm:gap-6 text-gray-500 font-medium text-[10px] uppercase tracking-widest">
              <span>© 2025 Copyright</span>
              <span className="hidden sm:block text-white/20">|</span>
              <span>{currentDateTime}</span>
              <span className="hidden sm:block text-white/20">|</span>
              <span className="text-gray-400">Bogotá, Colombia</span>
            </div>
          </div>

        </div>
      </div>
    </footer>
  );
};

export default Footer;