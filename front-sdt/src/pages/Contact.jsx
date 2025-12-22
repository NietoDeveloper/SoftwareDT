import { useState } from "react";
import ReviewForm from "../features/rating";
import Footer from "../components/Footer/Footer";
import { Mail, MessageCircle, MapPin, Send } from "lucide-react";

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
  const whatsappLink = `https://wa.me/${rawNumber}?text=Hola,%20quisiera%20saber%20más%20sobre%20Software%20DT.`;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setStatusMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    if (formData.name && formData.email && formData.message) {
      setStatusMessage({
        type: "success",
        text: "¡Ticket desplegado con éxito!",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatusMessage({
        type: "error",
        text: "Error: Campos incompletos.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfcfc] font-sans antialiased overflow-x-hidden">
      
      {/* SECCIÓN 1: FORMULARIO DE CONTACTO */}
      <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-10 lg:px-20">
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-24">
          
          {/* Lado Izquierdo: Copy de Ingeniería */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-[2px] bg-amber-500"></div>
              <span className="text-[10px] sm:text-[11px] font-black uppercase tracking-[0.5em] text-gray-400">Communication Hub</span>
            </div>
            
            <h1 className="text-4xl sm:text-5xl md:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9] break-words">
              Ponte en <br />
              <span className="text-amber-500">Contacto</span>
            </h1>
            
            <p className="text-gray-500 font-bold text-base sm:text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              Estamos listos para escalar tu infraestructura. Cuéntanos sobre tu próximo gran proyecto.
            </p>

            {/* Punto decorativo discreto */}
            <div className="hidden lg:flex items-center gap-4">
               <div className="w-3 h-3 bg-black rounded-full"></div>
               <div className="w-20 h-[1px] bg-gray-200"></div>
            </div>
          </div>

          {/* Tarjeta Formulario (Software DT Style) */}
          <div className="w-full max-w-lg lg:w-1/2">
            <div className="bg-white border-[3px] border-black rounded-[2.5rem] p-6 sm:p-12 shadow-[15px_15px_0px_0px_rgba(0,0,0,0.08)] relative">
              
              {/* Icono flotante discreto */}
              <div className="absolute -top-5 -right-5 w-14 h-14 bg-black rounded-2xl flex items-center justify-center text-amber-500 shadow-xl hidden sm:flex">
                <Mail size={24} strokeWidth={3} />
              </div>

              <h2 className="text-lg font-black text-black uppercase tracking-widest mb-10 border-b-2 border-gray-50 pb-4">
                Envía un Ticket
              </h2>

              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-black text-sm"
                    placeholder="NOMBRE DEL LÍDER TÉCNICO"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Corporate Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-black text-sm"
                    placeholder="DEV@COMPANY.COM"
                  />
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-1">Technical Message</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-xl focus:border-amber-500 outline-none transition-all font-bold text-black resize-none text-sm"
                    placeholder="DESCRIBE EL ALCANCE DEL PROYECTO..."
                  ></textarea>
                </div>

                {statusMessage && (
                  <div className={`p-4 rounded-xl text-[9px] font-black uppercase border animate-pulse ${
                    statusMessage.type === "success" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                  }`}>
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

      {/* SECCIÓN 2: UBICACIÓN Y WHATSAPP (Soporte High-Priority) */}
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
             <div className="relative w-full aspect-video rounded-[3rem] overflow-hidden border-2 border-white/10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.5)]">
                <iframe
                  title="Ubicación de Software DT"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.84!2d-74.13!3d4.62!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzcnMTIuMCJOIDc0wrAwNyc0OC4wIlc!5e0!3m2!1ses!2sco!4v123456789"
                  className="absolute inset-0 w-full h-full grayscale invert opacity-70 hover:opacity-100 transition-opacity duration-700"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
             </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: REVIEWS (Feedback de Clientes) */}
      <section className="py-28 bg-[#fcfcfc] px-6 flex flex-col items-center">
        <div className="w-full max-w-4xl">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tight text-black">
                Feedback de <span className="text-amber-500">Clientes</span>
              </h2>
              <div className="w-16 h-[3px] bg-black mx-auto shadow-[0_5px_15px_rgba(0,0,0,0.1)]"></div>
           </div>
          <div className="bg-white border-2 border-black/5 rounded-[3rem] p-2 sm:p-8 shadow-sm">
             <ReviewForm />
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;