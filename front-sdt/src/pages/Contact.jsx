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
        text: "¡Mensaje enviado con éxito!",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatusMessage({
        type: "error",
        text: "Por favor, completa todos los campos.",
      });
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfcfc] font-sans antialiased">
      
      {/* SECCIÓN 1: FORMULARIO DE CONTACTO - ESTILO DT */}
      <section className="min-h-screen flex items-center justify-center py-20 px-6">
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-16 lg:gap-32">
          
          {/* Texto de Bienvenida */}
          <div className="w-full lg:w-5/12 text-center lg:text-left space-y-8">
            <div className="inline-flex items-center gap-3">
              <div className="w-12 h-[2px] bg-amber-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.5em] text-gray-400">Communication Hub</span>
            </div>
            <h1 className="text-5xl sm:text-7xl font-black text-black uppercase tracking-tighter leading-[0.9]">
              Ponte en <br />
              <span className="text-amber-500">Contacto</span>
            </h1>
            <p className="text-gray-500 font-bold text-lg max-w-md mx-auto lg:mx-0 leading-relaxed">
              Estamos listos para escalar tu infraestructura. Cuéntanos sobre tu próximo gran proyecto.
            </p>
          </div>

          {/* Tarjeta Formulario Refinada */}
          <div className="w-full max-w-xl lg:w-7/12">
            <div className="bg-white border-[3px] border-black rounded-[45px] p-8 sm:p-12 shadow-[30px_30px_0px_0px_rgba(0,0,0,0.03)] relative">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-amber-500 shadow-xl rotate-12">
                <Mail size={28} strokeWidth={2.5} />
              </div>

              <h2 className="text-2xl font-black text-black uppercase tracking-tight mb-10">Envía un Ticket</h2>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Nombre</label>
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-amber-500 outline-none transition-all font-bold text-black placeholder:text-gray-300"
                      placeholder="Identificación de cliente"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Email Corporativo</label>
                    <input
                      type="email"
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-amber-500 outline-none transition-all font-bold text-black placeholder:text-gray-300"
                      placeholder="dev@empresa.com"
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="text-[9px] font-black text-gray-400 uppercase tracking-[0.2em] ml-2">Mensaje / Especificaciones</label>
                  <textarea
                    name="message"
                    rows="5"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-5 rounded-3xl focus:border-amber-500 outline-none transition-all font-bold text-black resize-none placeholder:text-gray-300"
                    placeholder="Describe el requerimiento técnico..."
                  ></textarea>
                </div>

                {statusMessage && (
                  <div className={`p-4 rounded-xl text-[10px] font-black uppercase tracking-widest border ${
                    statusMessage.type === "success" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                  }`}>
                    {statusMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-black text-white rounded-2xl font-black text-[11px] uppercase tracking-[0.3em] transition-all duration-500 hover:bg-amber-500 hover:text-black hover:-translate-y-1 hover:shadow-[0_20px_40px_rgba(0,0,0,0.15)] flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>Desplegar Mensaje <Send size={16} strokeWidth={3} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: UBICACIÓN Y WHATSAPP - OSCURO / MINIMAL */}
      <section className="py-24 bg-black text-white px-6">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">
          
          <div className="space-y-12 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tighter leading-none">
                Soporte <br />
                <span className="text-amber-500">High-Priority</span>
              </h2>
              <p className="text-gray-500 font-bold uppercase text-[10px] tracking-[0.4em]">Latencia mínima en comunicación.</p>
            </div>

            <div className="bg-zinc-900 border border-zinc-800 p-10 rounded-[40px] flex flex-col items-center sm:items-start gap-8 transition-all hover:border-amber-500/30">
              <div className="flex items-center gap-6">
                <div className="w-14 h-14 bg-green-500 rounded-2xl flex items-center justify-center text-black shadow-[0_10px_30px_rgba(34,197,94,0.2)]">
                  <MessageCircle size={28} strokeWidth={2.5} />
                </div>
                <div>
                  <p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.3em] mb-1">WhatsApp Directo</p>
                  <p className="text-3xl font-black tracking-tight">{whatsappNumber}</p>
                </div>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-10 py-4 bg-white text-black rounded-full font-black text-[10px] uppercase tracking-[0.2em] hover:bg-amber-500 transition-all duration-500 hover:-translate-y-1 text-center"
              >
                Abrir Canal de Chat
              </a>
            </div>

            <div className="flex items-start gap-5 p-8 border-l-2 border-amber-500 bg-zinc-900/30 rounded-r-3xl">
              <MapPin className="text-amber-500 shrink-0 mt-1" size={24} />
              <div className="space-y-1">
                <p className="text-[9px] font-black uppercase text-gray-500 tracking-[0.3em]">HQ Location</p>
                <p className="text-base font-bold text-gray-200">Carrera 72 # 2 - 50, Piso 5, Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
             <div className="relative w-full aspect-video rounded-[50px] overflow-hidden border-8 border-zinc-900 shadow-2xl">
                <iframe
                  title="Ubicación de Software DT"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9!2d-74.1!3d4.6!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnMDAuMCJOIDc0wrAwNicwMC4wIlc!5e0!3m2!1ses!2sco!4v1"
                  className="absolute inset-0 w-full h-full grayscale invert opacity-60 hover:opacity-100 transition-all duration-1000"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
             </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: REVIEWS - LIMPIA */}
      <section className="py-32 bg-white px-6">
        <div className="w-full max-w-4xl mx-auto">
           <div className="text-center mb-16 space-y-4">
              <h2 className="text-4xl font-black uppercase tracking-tighter text-black">
                Feedback de <span className="text-amber-500">Clientes</span>
              </h2>
              <div className="w-16 h-[3px] bg-black mx-auto"></div>
           </div>
          <ReviewForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;