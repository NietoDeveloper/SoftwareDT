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
        


export default NotFoundPage;