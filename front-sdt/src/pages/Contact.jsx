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
    }
    setIsSubmitting(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen bg-[#fcfcfc] font-sans antialiased">
      
      {/* SECCIÓN 1: FORMULARIO DE CONTACTO */}
      <section className="min-h-screen flex items-center justify-center py-20 px-4 sm:px-6">
        <div className="w-full max-w-[1800px] mx-auto flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          
          {/* Texto de Bienvenida */}
          <div className="w-full lg:w-1/2 text-center lg:text-left space-y-6">
            <div className="inline-flex items-center gap-2">
              <div className="w-10 h-1 bg-amber-500"></div>
              <span className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-400">Communication Hub</span>
            </div>
            <h1 className="text-4xl sm:text-6xl font-black text-black uppercase tracking-tighter leading-none">
              Ponte en <br />
              <span className="text-amber-500">Contacto</span>
            </h1>
            <p className="text-gray-500 font-medium text-lg max-w-md mx-auto lg:mx-0">
              Estamos listos para escalar tu infraestructura. Cuéntanos sobre tu próximo gran proyecto.
            </p>
          </div>

          {/* Tarjeta Formulario */}
          <div className="w-full max-w-lg lg:w-1/2">
            <div className="bg-white border-[3px] border-black rounded-[40px] p-8 sm:p-10 shadow-[20px_20px_0px_0px_rgba(0,0,0,0.05)] relative">
              <div className="absolute -top-6 -right-6 w-16 h-16 bg-black rounded-2xl flex items-center justify-center text-amber-500 shadow-lg rotate-12 group-hover:rotate-0 transition-transform">
                <Mail size={30} strokeWidth={2.5} />
              </div>

              <h2 className="text-xl font-black text-black uppercase tracking-tight mb-8">Envía un Ticket</h2>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Nombre</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-black outline-none transition-all font-bold text-black"
                    placeholder="Tu nombre completo"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Email Corporativo</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-black outline-none transition-all font-bold text-black"
                    placeholder="correo@empresa.com"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-[10px] font-black text-gray-400 uppercase tracking-widest ml-1">Mensaje</label>
                  <textarea
                    name="message"
                    rows="4"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    className="w-full bg-gray-50 border-2 border-gray-100 p-4 rounded-2xl focus:border-black outline-none transition-all font-bold text-black resize-none"
                    placeholder="¿En qué podemos ayudarte?"
                  ></textarea>
                </div>

                {statusMessage && (
                  <div className={`p-4 rounded-xl text-[10px] font-black uppercase border ${
                    statusMessage.type === "success" ? "bg-green-50 text-green-600 border-green-100" : "bg-red-50 text-red-600 border-red-100"
                  }`}>
                    {statusMessage.text}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-5 bg-black text-white rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all duration-300 hover:bg-amber-500 hover:text-black hover:-translate-y-1 hover:shadow-xl flex items-center justify-center gap-3"
                >
                  {isSubmitting ? (
                    <div className="w-5 h-5 border-2 border-white border-t-amber-500 rounded-full animate-spin"></div>
                  ) : (
                    <>Desplegar Mensaje <Send size={16} /></>
                  )}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 2: UBICACIÓN Y WHATSAPP */}
      <section className="py-20 bg-black text-white px-4 sm:px-8">
        <div className="max-w-[1800px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="space-y-8 order-2 lg:order-1">
            <div className="space-y-4">
              <h2 className="text-3xl sm:text-4xl font-black uppercase tracking-tighter">
                Soporte <span className="text-amber-500">High-Priority</span>
              </h2>
              <p className="text-gray-400 font-medium">Latencia mínima en comunicación vía WhatsApp.</p>
            </div>

            <div className="bg-zinc-900 border-2 border-zinc-800 p-8 rounded-[30px] flex flex-col items-center sm:items-start gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-green-500 rounded-xl flex items-center justify-center text-black shadow-[0_0_20px_rgba(34,197,94,0.3)]">
                  <MessageCircle size={24} />
                </div>
                <div>
                  <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">WhatsApp Directo</p>
                  <p className="text-2xl font-black tracking-tight">{whatsappNumber}</p>
                </div>
              </div>
              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full sm:w-auto px-8 py-4 bg-white text-black rounded-xl font-black text-[10px] uppercase tracking-widest hover:bg-amber-500 transition-all duration-300 hover:-translate-y-1 text-center"
              >
                Abrir Canal de Chat
              </a>
            </div>

            <div className="flex items-start gap-4 p-6 border-l-4 border-amber-500 bg-zinc-900/50 rounded-r-xl">
              <MapPin className="text-amber-500 shrink-0" />
              <div>
                <p className="text-[10px] font-black uppercase text-gray-500 tracking-widest">HQ Location</p>
                <p className="text-sm font-bold text-gray-200">Carrera 72 # 2 - 50, Piso 5, Bogotá, Colombia</p>
              </div>
            </div>
          </div>

          <div className="order-1 lg:order-2">
             <div className="relative w-full aspect-video rounded-[40px] overflow-hidden border-4 border-zinc-800 shadow-2xl">
                <iframe
                  title="Ubicación de Software DT"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.9241!2d-74.145!3d4.61!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zNMKwMzYnNDAuMCJOIDc0wrAwOCczMC4wIlc!5e0!3m2!1ses!2sco!4v1630000000000"
                  className="absolute inset-0 w-full h-full grayscale invert opacity-80 hover:opacity-100 transition-opacity"
                  allowFullScreen=""
                  loading="lazy"
                ></iframe>
             </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: REVIEWS */}
      <section className="py-24 bg-white px-4 sm:px-8 flex flex-col items-center">
        <div className="w-full max-w-4xl">
           <div className="text-center mb-12">
              <h2 className="text-3xl font-black uppercase tracking-tight text-black">Feedback de <span className="text-amber-500">Clientes</span></h2>
              <div className="w-20 h-1 bg-black mx-auto mt-4"></div>
           </div>
          <ReviewForm />
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Contact;