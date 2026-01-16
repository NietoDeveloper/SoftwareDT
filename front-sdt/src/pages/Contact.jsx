/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import emailjs from "@emailjs/browser";
import ReviewForm from "../features/rating";
import Footer from "../components/Footer/Footer";
import { Mail, MessageCircle, MapPin, Send, Star, ShieldCheck } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  const whatsappNumber = "+57 300 123 4567";
  const rawNumber = "573001234567";
  
  const whatsappLink = `https://wa.me/${rawNumber}?text=${encodeURIComponent(
    `Hola Software DT, soy ${formData.name || "un nuevo cliente"}. Quisiera consultar sobre un proyecto técnico.`
  )}`;

  // EFECTO DE SONIDO SOFTWARE DT
  const playClick = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.1, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  };

  const mapEmbedLink = "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9!2d-74.1!3d4.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zN8KwMzYnMDAuMCJOIDc0wrAwNicwMC4wIlc!5e0!3m2!1ses!2sco!4v1630000000000!5m2!1ses!2sco";

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    if (statusMessage) setStatusMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick(); // Sonido al enviar
    setIsSubmitting(true);
    setStatusMessage(null);

    try {
      await emailjs.send(
        "YOUR_SERVICE_ID", 
        "YOUR_TEMPLATE_ID", 
        {
          from_name: formData.name,
          reply_to: formData.email,
          message: formData.message,
          to_name: "Software DT Admin",
        },
        "YOUR_PUBLIC_KEY"
      );

      setStatusMessage({
        type: "success",
        text: "¡Ticket desplegado con éxito!",
      });
      setFormData({ name: "", email: "", message: "" });
    } catch (error) {
      setStatusMessage({
        type: "error",
        text: "Error en el despliegue técnico.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-main font-sans antialiased overflow-x-hidden">
      
      {/* SECCIÓN 1: FORMULARIO DE CONTACTO */}
      <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-10 lg:px-20">
        <div className="w-full max-w-[1900px] mx-auto flex flex-col lg:flex-row items-center justify-center gap-12 lg:gap-24">
          
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-3 justify-center lg:justify-start">
              <div className="w-12 h-[1px] bg-gold"></div>
              <span className="text-[11px] font-black uppercase tracking-[0.5em] text-textColor/40">Communication Hub</span>
              <div className="w-12 h-[1px] bg-gold lg:hidden"></div>
            </div>
            
            <h1 className="text-5xl min-[310px]:text-6xl md:text-8xl font-black text-headingColor uppercase tracking-tighter leading-[0.85]">
              Ponte en <br />
              <span className="text-gold">Contacto</span>
            </h1>
          </div>

          {/* Tarjeta Formulario SDT Style */}
          <div className="w-full max-w-xl lg:w-1/2">
            <div className="group w-full bg-card border-[1px] border-headingColor/10 rounded-[3rem] p-8 sm:p-14 transition-all duration-500 
                            hover:-translate-y-4 hover:shadow-[0_30px_70px_rgba(255,215,0,0.2)] hover:border-gold/40 relative">
              
              <h2 className="text-xl font-black text-headingColor uppercase tracking-[0.2em] mb-12 border-b border-headingColor/5 pb-6">
                Envía un <span className="text-gold">Mensaje</span>
              </h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                {['name', 'email'].map((field) => (
                  <div key={field} className="space-y-2 text-left">
                    <label className="text-[10px] font-black text-textColor/30 uppercase tracking-[0.3em] ml-2">{field === 'name' ? 'Nombre Completo' : 'E-mail'}</label>
                    <input
                      type={field === 'email' ? 'email' : 'text'}
                      name={field}
                      value={formData[field]}
                      onChange={handleChange}
                      required
                      className="w-full bg-main/40 border-[1px] border-headingColor/5 p-5 rounded-2xl focus:border-gold outline-none transition-all font-bold text-headingColor text-base"
                      placeholder={field === 'name' ? "Tu Nombre" : "HI@COMPANY.COM"}
                    />
                  </div>
                ))}

                <div className="space-y-2 text-left">
                  <label className="text-[10px] font-black text-textColor/30 uppercase tracking-[0.3em] ml-2">Asunto</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-main/40 border-[1px] border-headingColor/5 p-5 rounded-2xl focus:border-gold outline-none transition-all font-bold text-headingColor resize-none text-base"
                    placeholder="DESCRIBE EL PROYECTO..."
                  ></textarea>
                </div>

                <button
                  type="submit"
                  onClick={playClick}
                  disabled={isSubmitting}
                  className="w-full mt-6 py-6 bg-gold text-headingColor rounded-2xl font-black text-[12px] uppercase tracking-[0.4em] transition-all duration-500 
                             hover:bg-yellowColor hover:-translate-y-2 hover:shadow-[0_20px_40px_rgba(254,182,13,0.5)] flex items-center justify-center gap-4 active:scale-95"
                >
                  {isSubmitting ? <div className="w-6 h-6 border-3 border-headingColor border-t-transparent rounded-full animate-spin"></div> : <> Enviar  Mensaje <Send size={16} /></>}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: UBICACIÓN Y WHATSAPP */}
      <section className="py-24 bg-headingColor text-card px-6 sm:px-12 lg:px-24">
        <div className="max-w-[1900px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12 text-center lg:text-left">
            <h2 className="text-5xl md:text-7xl font-black uppercase tracking-tighter leading-none">
              Soporte <br /><span className="text-gold">High-Priority</span>
            </h2>

            <div className="bg-white/5 border border-white/10 p-10 rounded-[3rem] flex flex-col items-center lg:items-start gap-10 transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_25px_50px_rgba(255,215,0,0.15)] group">
              <div className="flex flex-col sm:flex-row items-center gap-8">
                <div className="w-20 h-20 bg-[#25D366] rounded-[1.5rem] flex items-center justify-center text-white shadow-xl shrink-0 transition-all duration-500 group-hover:bg-gold group-hover:text-black group-hover:rotate-[360deg]">
                  <MessageCircle size={36} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[11px] font-black uppercase text-gainsboro/40 tracking-[0.4em] mb-1">Canal Directo</p>
                  <p className="text-3xl sm:text-4xl font-black tracking-tighter text-gainsboro">{whatsappNumber}</p>
                </div>
              </div>
              <a
                href={whatsappLink}
                onClick={playClick}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-12 py-6 bg-[#25D366] text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-gold hover:text-black hover:shadow-[0_15px_30px_rgba(255,215,0,0.3)] hover:-translate-y-1 text-center"
              >
                Abrir WhatsApp
              </a>
            </div>

            <div className="flex items-start gap-6 p-8 border-l-[6px] border-gold bg-white/5 rounded-r-3xl transition-all duration-500 hover:bg-white/10 group">
              <MapPin className="text-gold shrink-0 transition-transform group-hover:scale-125" size={28} />
              <div>
                <p className="text-[11px] font-black uppercase text-gainsboro/30 tracking-[0.4em] mb-2">H.Q. Bogota</p>
                <p className="text-lg font-bold text-gainsboro tracking-tight leading-tight uppercase">Carrera 72 # 2 - 50, Piso 5, Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          {/* MAPA SIN FILTRO OSCURO */}
          <div className="flex justify-center">
             <div className="relative w-full max-w-2xl aspect-video rounded-[3.5rem] overflow-hidden border-[1px] border-white/10 transition-all duration-700 hover:shadow-[0_40px_80px_rgba(255,215,0,0.2)]">
                <iframe 
                  title="Map" 
                  src={mapEmbedLink} 
                  className="absolute inset-0 w-full h-full transition-all duration-1000 scale-110 hover:scale-100" 
                  allowFullScreen="" 
                  loading="lazy"
                ></iframe>
             </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: FEEDBACK SDT STYLE */}
      <section className="py-32 bg-main px-6 flex flex-col items-center">
        <div className="w-full max-w-[1200px] text-center">
          <h2 className="text-5xl sm:text-7xl font-black uppercase tracking-tighter text-headingColor leading-none mb-20">
            Technical <span className="text-gold">Reviews</span>
          </h2>
          
          <div className="bg-card border-[1px] border-headingColor/10 rounded-[4rem] p-10 sm:p-20 transition-all duration-500 hover:-translate-y-4 hover:shadow-[0_40px_80px_rgba(255,215,0,0.25)] hover:border-gold/40">
            <ReviewForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;