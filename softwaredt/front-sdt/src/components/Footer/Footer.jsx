
import BogotaAir2 from "../../assets/images/MonserrateDron1.mp4"; // Adjust path as needed

const Footer = () => {
  return (
    <footer className="relative min-h-screen w-full bg-black text-white flex items-center justify-center">
      <video
        autoPlay
        loop
        muted
        className="absolute inset-0 w-full h-full object-cover opacity-50"
        src={BogotaAir2}
      />
      <div className="relative z-10 container mx-auto px-6 py-12 flex flex-col items-center text-center">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight mb-8">Software D T</h2>
        <div className="w-48 h-16 md:w-64 md:h-20 mb-6 bg-gray-800"></div>
        <div className="flex flex-col md:flex-row justify-center items-center gap-12 md:gap-24">
          <div className="flex flex-col items-center">
            <ul className="text-2xl font-light tracking-wide">
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Proyectos</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Servicios</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Contacto</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="mailto:doradotech@outlook.com">doradotech@outlook.com</a></li>
            </ul>
          </div>
          <div className="flex flex-col items-center">
            <ul className="text-2xl font-light tracking-wide">
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Facebook</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Twitter</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">LinkedIn</a></li>
              <li className="py-3 hover:text-yellow-300 transition-colors"><a href="#">Instagram</a></li>
            </ul>
            <p className="mt-8 text-xl font-light">Copyright 2025</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;