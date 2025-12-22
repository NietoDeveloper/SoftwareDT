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

        
                  <a 
           
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