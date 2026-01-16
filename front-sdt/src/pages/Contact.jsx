import { useState, useEffect } from "react";
import emailjs from "@emailjs/browser";
import ReviewForm from "../features/rating";
import Footer from "../components/Footer/Footer";
import { Mail, MessageCircle, MapPin, Send, Star, ShieldCheck } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",




  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfcfc] font-sans antialiased overflow-x-hidden">
      
      {/* SECCIÓN 1: FORMULARIO DE CONTACTO */}
      <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-10 lg:px-20">
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
      
            

        
             

               
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-black resize-none text-sm"
                    placeholder="DESCRIBE EL ALCANCE DEL PROYECTO..."
                  ></textarea>
                </div>

                {statusMessage && (
                  <div className={`p-4 rounded-xl text-[10px] font-black uppercase border flex items-center gap-2 ${
                    statusMessage.type === "success" ? "bg-green-50 text-green-600 border-green-200" : "bg-red-50 text-red-600 border-red-200"
                  }`}>
                    {statusMessage.type === "success" && <ShieldCheck size={16} />}
                    {statusMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full mt-4 py-5 bg-black text-white rounded-xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-amber-500 hover:text-black hover:-translate-y-1 hover:shadow-[0_10px_30px_rgba(255,215,0,0.3)] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-amber-500 rounded-full animate-spin"></div>
                  ) : (
                    <>Desplegar Mensaje <Send size={14} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: UBICACIÓN Y WHATSAPP */}
      <section className="py-24 bg-black text-white px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-10 order-2 lg:order-1 text-center lg:text-left">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter">
                Soporte <span className="text-amber-500">High-Priority</span>
              </h2>
              <p className="text-gray-400 font-bold tracking-wide text-sm sm:text-base">LATENCIA MÍNIMA EN COMUNICACIÓN VÍA WHATSAPP.</p>
            </div>

            <div className="bg-zinc-900 border border-white/5 p-8 rounded-[2.5rem] flex flex-col items-center lg:items-start gap-8 transition-transform hover:scale-[1.01]">
              <div className="flex flex-col sm:flex-row items-center gap-6">
                <div className="w-14 h-14 bg-amber-500 rounded-2xl flex items-center justify-center text-black shadow-[0_0_30px_rgba(255,215,0,0.2)] shrink-0">
                  <MessageCircle size={28} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">Canal Directo</p>
                  <p className="text-2xl sm:text-3xl font-black tracking-tight">{whatsappNumber}</p>
                </div>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-5 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-500 transition-all duration-500 hover:-translate-y-1 text-center"
              >
                Abrir Canal de Chat
              </a>
            </div>

            <div className="flex items-start gap-5 p-6 border-l-4 border-amber-500 bg-white/5 rounded-r-2xl">
              <MapPin className="text-amber-500 shrink-0 mt-1" size={24} />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-[0.3em]">H.Q. Bogota</p>
                <p className="text-sm font-bold text-gray-200 uppercase tracking-widest">Carrera 72 # 2 - 50, Piso 5, Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
             <div className="relative w-full aspect-square lg:aspect-video rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                <iframe
                  title="Ubicación de Software DT"
                  src={mapEmbedLink}
                  className="absolute inset-0 w-full h-full grayscale invert opacity-60 hover:opacity-100 transition-opacity duration-700"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
             </div>
          </div>
        </div>
      </section>

      <section className="py-28 bg-main px-6 flex flex-col items-center">
  <div className="w-full max-w-5xl">
    {/* Encabezado con Estilo de Ingeniería */}
    <div className="flex flex-col items-center text-center mb-16 space-y-4">
      <div className="flex items-center gap-2 px-4 py-1 bg-black rounded-full mb-4">
        <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
        <span className="text-[10px] font-black text-white uppercase tracking-[0.3em]">System Reviews v1.0</span>
      </div>

      <div className="flex gap-1.5 mb-2">
        {[...Array(5)].map((_, i) => (
          <Star key={i} size={22} className="fill-yellowColor text-black stroke-[2.5px]" />
        ))}
      </div>

      <h2 className="text-4xl sm:text-6xl font-black uppercase tracking-tighter text-headingColor leading-none">
        Technical <span className="text-yellowColor">Feedback</span>
      </h2>
      
      <p className="text-gray-600 font-bold uppercase text-[10px] sm:text-[12px] tracking-[0.5em] max-w-prose">
        Validación de infraestructura y despliegue por líderes técnicos
      </p>

      {/* Divisor Neumórfico/Brutalista */}
      <div className="flex items-center gap-3 mt-6">
        <div className="w-12 h-[3px] bg-black"></div>
        <div className="w-3 h-3 border-[3px] border-black rotate-45"></div>
        <div className="w-12 h-[3px] bg-black"></div>
      </div>
    </div>
    
    {/* Contenedor del Formulario (Software DT Card Style) */}
    <div className="relative group">
      {/* Sombra sólida decorativa de fondo */}
      <div className="absolute inset-0 bg-yellowColor rounded-[3.5rem] translate-x-4 translate-y-4 border-[3px] border-black -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300"></div>
      
      <div className="bg-card border-[4px] border-black rounded-[3.5rem] p-6 sm:p-12 overflow-hidden relative shadow-sm">
        {/* Decoración de esquina (Código) */}
        <div className="absolute top-0 right-0 p-6 opacity-10 pointer-events-none hidden md:block">
          <pre className="text-[10px] font-mono font-bold text-black">
            {`{
  status: "verified",
  uptime: "99.9%",
  secure: true
}`}
          </pre>
        </div>

        <ReviewForm />
      </div>
    </div>

    {/* Footer de la sección */}
    <p className="mt-12 text-center text-[9px] font-black text-gray-400 uppercase tracking-[0.6em]">
      End-to-End Encrypted Feedback Loop
    </p>
  </div>
</section>

      <Footer />
    </div>
  );
};

export default Contact;