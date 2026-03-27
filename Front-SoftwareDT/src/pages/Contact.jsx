/* eslint-disable react/no-unescaped-entities */
import { useState } from "react";
import { MessageCircle, MapPin, Send, ShieldCheck, Cpu } from "lucide-react";

const Contact = () => {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // 🛰️ SDT WHATSAPP CANAL (Para Chatbot posterior)
  const rawNumber = "573115456209"; // Número administrativo real
  const whatsappLink = `https://wa.me/${rawNumber}?text=${encodeURIComponent(
    `Hola Software DT, soy ${formData.name || "un cliente"}. Requiero soporte de despliegue técnico.`
  )}`;

  const playClick = () => {
    const audioCtx = new (window.AudioContext || window.webkitAudioContext)();
    const oscillator = audioCtx.createOscillator();
    const gainNode = audioCtx.createGain();
     oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(800, audioCtx.currentTime);
    gainNode.gain.setValueAtTime(0.05, audioCtx.currentTime);
    oscillator.connect(gainNode);
    gainNode.connect(audioCtx.destination);
    oscillator.start();
    oscillator.stop(audioCtx.currentTime + 0.05);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    playClick();
    setIsSubmitting(true);

    // 📩 PREPARADO PARA EMAIL_JS (Sin habilitar todavía)
    // emailjs.sendForm('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', e.target, 'YOUR_PUBLIC_KEY')
    //   .then(() => { toast.success("Enlace establecido."); })
    //   .catch(() => { toast.error("Fallo de enlace."); });

    setTimeout(() => {
      setIsSubmitting(false);
      setFormData({ name: "", email: "", message: "" });
    }, 2000);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-main font-sans antialiased selection:bg-gold selection:text-black">
      
      {/* SECCIÓN 1: DESPLIEGUE DE COMUNICACIÓN (Ajustada contra el Navbar) */}
      <section className="pt-24 pb-20 px-4 sm:px-6 max-w-[1600px] mx-auto w-full">
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-start">
          
          <div className="w-full lg:w-1/2 space-y-8 md:space-y-10">
            <div className="flex items-center gap-4">
              <div className="h-[2px] w-12 md:w-16 bg-gold"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-black/40">Encryption Node Active</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl lg:text-9xl font-black text-headingColor uppercase tracking-tighter leading-[0.85] break-words">
              Contacto <br />
              <span className="text-gold">Directo SDT </span>
            </h1>

            <div className="flex items-center gap-4 p-6 bg-white/50 border-l-4 border-black group hover:border-gold transition-all duration-300">
              <ShieldCheck className="text-gold" size={32} />
              <p className="text-[10px] font-black uppercase tracking-widest leading-tight">
                Protocolo de seguridad militar end-to-end <br /> 
                <span className="opacity-40">Ready for Fintech & Gov Systems</span>
              </p>
            </div>
          </div>

          {/* Formulario Estilo SpaceX Terminal */}
          <div className="w-full lg:w-1/2">
            <div className="bg-black p-1 shadow-[0_20px_40px_rgba(254,182,13,0.15)] group hover:shadow-[0_20px_40px_rgba(254,182,13,0.4)] transition-all duration-500">
              <div className="bg-white p-6 md:p-12 border-2 border-black">
                <div className="flex justify-between items-center mb-10 border-b-2 border-black pb-4">
                  <h2 className="text-xs font-black uppercase tracking-[0.3em]">Message_Terminal.exe</h2>
                  <Cpu size={18} className="text-gold animate-pulse" />
                </div>

                <form onSubmit={handleSubmit} className="space-y-8">
                  {['name', 'email'].map((field) => (
                    <div key={field} className="relative group">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        name={field}
                        value={formData[field]}
                        onChange={(e) => setFormData({...formData, [field]: e.target.value})}
                        required
                        className="w-full bg-transparent border-b-2 border-black/20 p-4 focus:border-gold outline-none transition-all font-bold text-black placeholder:text-black/30 uppercase text-xs tracking-widest"
                        placeholder={field === 'name' ? "IDENTIDAD_USUARIO" : "EMAIL_DE_ENLACE"}
                      />
                    </div>
                  ))}

                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    required
                    className="w-full bg-black/5 border-2 border-black/10 p-6 focus:border-gold outline-none transition-all font-bold text-black resize-none uppercase text-xs tracking-widest placeholder:text-black/30"
                    placeholder="ESPECIFICACIONES_DEL_SISTEMA..."
                  ></textarea>

                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full py-5 bg-black text-white font-black uppercase text-[10px] sm:text-[11px] tracking-[0.4em] transition-all hover:bg-gold hover:text-black hover:shadow-[0_10px_30px_rgba(254,182,13,0.5)] flex items-center justify-center gap-4 hover:-translate-y-1 active:scale-95"
                  >
                    {isSubmitting ? "SYNCING..." : "Ejecutar Envío"} <Send size={14} className="group-hover:translate-x-1" />
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: SOPORTE DE ALTA DISPONIBILIDAD */}
      <section className="py-24 md:py-32 bg-black text-white px-4 sm:px-6">
        <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center">
          <div className="space-y-10 md:space-y-12">
            <h2 className="text-5xl md:text-8xl font-black uppercase tracking-tighter leading-none break-words">
              High-Priority <br /><span className="text-gold">Channels</span>
            </h2>

            <div className="group border-2 border-white/10 p-8 md:p-10 transition-all hover:border-gold relative overflow-hidden hover:-translate-y-1 duration-500">
              <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-100 transition-opacity duration-500">
                <MessageCircle size={80} className="text-gold" />
              </div>
              <p className="text-[10px] font-black uppercase text-gold tracking-[0.4em] mb-4 underline">Línea Encriptada WhatsApp</p>
              <p className="text-3xl md:text-5xl font-black tracking-tighter mb-8">+57 311 545 6209</p>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-8 md:px-10 py-5 bg-gold text-black font-black uppercase text-[10px] tracking-[0.3em] transition-all hover:scale-105 hover:shadow-[0_20px_40px_rgba(254,182,13,0.4)]"
              >
                Open Connection
              </a>
            </div>

            <div className="flex items-start gap-6 md:gap-8 border-l-2 border-gold pl-6 md:pl-8 py-4">
              <MapPin className="text-gold shrink-0" size={32} />
              <div>
                <p className="text-[10px] font-black uppercase text-gold tracking-[0.4em] mb-2">Base Operativa_</p>
                <p className="text-lg md:text-xl font-bold tracking-widest uppercase leading-tight">Bogotá, Colombia <br /> <span className="text-xs md:text-sm opacity-50 font-medium">CRA 72 # 2 - 50, PISO 5</span></p>
              </div>
            </div>
          </div>

          {/* MAPA BRUTALISTA RESPONSIVO */}
          <div className="relative group w-full h-[400px] md:h-[500px]">
            <div className="absolute -inset-2 bg-gold/10 blur-2xl group-hover:bg-gold/25 transition-all duration-700"></div>
            <div className="relative h-full border-4 border-white grayscale hover:grayscale-0 transition-all duration-1000 overflow-hidden">
               <iframe 
                title="Map Software DT" 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d127254.84507119253!2d-74.15049377488314!3d4.648283713088037!2m3!1f0!2f0!3f0!3m2!1i1024!2i1024!4f13.1!3m3!1m2!1s0x8e3f9bfd2da62029%3A0x3921f59856247f44!2zQm9nb3TDoSwgQ29sb21iaWE!5e0!3m2!1ses-419!2sus!4v1700000000000!5m2!1ses-419!2sus" 
                className="absolute inset-0 w-full h-full scale-110 group-hover:scale-100 transition-transform duration-[2s]" 
                allowFullScreen="" 
                loading="lazy"
              ></iframe>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Contact;