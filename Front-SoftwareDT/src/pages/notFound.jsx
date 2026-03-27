import { useNavigate } from "react-router-dom";
import BogotaAir1 from "../assets/images/BogotaAir1.mp4";

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <div className="bg-main antialiased min-h-screen relative flex items-center justify-center overflow-hidden">
      
      {/* VIDEO DE FONDO CON OPACIDAD REDUCIDA PARA EL ERROR */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover z-0 opacity-40 grayscale"
        src={BogotaAir1}
      />

      {/* OVERLAY OSCURO */}
      <div className="absolute inset-0 bg-black/60 z-[1]"></div>

      {/* CONTENIDO DE ERROR */}
      <div className="relative z-[10] text-center px-6">
        <h1 className="text-[12rem] md:text-[18rem] font-black text-white/10 leading-none select-none">
          404
        </h1>
        
        <div className="mt-[-4rem] md:mt-[-8rem]">
          <h2 className="text-white text-3xl md:text-5xl font-black uppercase tracking-[0.3em] mb-4">
            Ruta no <span className="text-gold">encontrada</span>
          </h2>
          <p className="text-white/60 text-lg md:text-xl font-medium max-w-lg mx-auto mb-10 tracking-wide">
            Parece que te has desviado del código. La página que buscas no existe o ha sido movida.
          </p>

          <button 
            onClick={() => navigate("/")}
            className="px-12 py-5 bg-gold text-black font-black uppercase tracking-[0.2em] 
                       rounded-full hover:bg-white transition-all duration-500 
                       shadow-[0_20px_50px_rgba(255,215,0,0.3)] active:scale-95 scale-110"
          >
            Volver al Inicio
          </button>
        </div>
      </div>

      {/* DECORACIÓN LATERAL */}
      <div className="absolute bottom-10 right-10 z-[10]">
        <p className="text-white/20 font-black uppercase tracking-[0.5em] text-xs vertical-text">
          Software DT // 2025
        </p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .vertical-text {
          writing-mode: vertical-rl;
          transform: rotate(180deg);
        }
      `}} />
    </div>
  );
};

export default NotFoundPage;