import { useState } from "react";
import ReviewForm from "../features/rating";
import Footer from "../components/Footer/Footer";

const MailIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <rect width="20" height="16" x="2" y="4" rx="2" />
    <path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.06 0L2 7" />
  </svg>
);
const MessageCircleIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8L3 21Z" />
  </svg>
);
const MapPinIcon = (props) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="24"
    height="24"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    {...props}
  >
    <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
    <circle cx="12" cy="10" r="3" />
  </svg>
);

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
    await new Promise((resolve) => setTimeout(resolve, 2000));
    if (formData.name && formData.email && formData.message) {
      setStatusMessage({
        type: "success",
        text: "¡Mensaje enviado! Te respondemos en breve.",
      });
      setFormData({ name: "", email: "", message: "" });
    } else {
      setStatusMessage({
        type: "error",
        text: "Por favor, completa Nombre, Correo y Mensaje.",
      });
    }

    setIsSubmitting(false);
  };
  return (
    <div className="flex flex-col w-full min-h-screen bg-gray-50">
      <section className="min-h-screen flex items-center justify-center py-16 px-4 sm:px-8">
        <div className="w-full max-w-4xl p-6 md:p-12 bg-white rounded-2xl shadow-2xl border border-gray-100 mt-[30px]">
          <div className="mb-10 pt-[22px]">
            <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight text-center">
              Ponte en Contacto
            </h1>
            <p className="text-gray-600 text-lg text-center max-w-2xl mx-auto">
              Estamos aquí para responder todas tus preguntas sobre **Software
              DT**.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-12">
            <div className="col-span-1">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center justify-center">
                <MailIcon className="w-6 h-6 text-indigo-500 mr-3" />
                Envía tu Consulta por Correo
              </h2>

              <form
                onSubmit={handleSubmit}
                className="space-y-4 max-w-xl mx-auto"
              >
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="Tu Nombre"
                  aria-label="Tu Nombre"
                />
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="Tu Correo Electrónico"
                  aria-label="Tu Correo Electrónico"
                />
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
                  placeholder="Escribe tu mensaje o pregunta..."
                  aria-label="Mensaje"
                ></textarea>
                {statusMessage && (
                  <div
                    className={`p-3 rounded-lg text-sm font-medium ${
                      statusMessage.type === "success"
                        ? "bg-green-100 text-green-700"
                        : "bg-red-100 text-red-700"
                    }`}
                  >
                    {statusMessage.text}
                  </div>
                )}
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full flex justify-center items-center py-3 px-4 rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? "Enviando..." : "Enviar Mensaje"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </section>

      <section className="min-h-screen flex items-center justify-center bg-gray-100 py-16 px-4 sm:px-8">
        <div className="w-full max-w-6xl p-6 md:p-12 bg-white rounded-2xl shadow-2xl border border-gray-200">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">
            <MapPinIcon className="w-7 h-7 text-indigo-500 inline-block mr-3 mb-1" />
            Nuestra Ubicación y Soporte Rápido
          </h2>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
            <div className="col-span-1 flex flex-col justify-center">
              <div className="bg-green-50 border border-green-200 p-8 rounded-xl shadow-lg">
                <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center justify-center">
                  <MessageCircleIcon className="w-6 h-6 text-green-600 mr-3" />
                  Soporte Rápido (WhatsApp)
                </h3>
                <p className="text-gray-600 text-center mb-4">
                  ¿Necesitas ayuda inmediata? Contáctanos
                </p>
                <div className="font-semibold text-green-700 text-2xl mb-6 text-center">
                  {whatsappNumber}
                </div>
                <a
                  href={whatsappLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full inline-flex justify-center items-center py-3 px-4 rounded-lg shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-200"
                >
                  <svg
                    className="w-5 h-5 mr-2 fill-white"
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.039 2.01c-5.518 0-9.991 4.473-9.991 9.991 0 1.644.402 3.203 1.155 4.594L2.01 22.039l5.51-1.45c1.32.747 2.861 1.15 4.519 1.15 5.518 0 9.991-4.473 9.991-9.991S17.557 2.01 12.039 2.01zm4.33 13.567c-.201.528-1.189 1.056-1.637 1.056-.448 0-.96-.188-1.55-.412-2.185-1.077-3.646-3.784-3.76-3.957-.114-.173-.896-1.15-.36-1.928.536-.778 1.189-.877 1.58-.877s.69.018 1.01.761c.32.742.61 1.484.71 1.628.1.144.188.358.074.636-.114.277-.188.421-.36.636-.201.277-.421.502-.63.708-.209.207-.448.484-.25.753.19.27.674.877 1.348 1.43.673.553 1.258.742 1.58.93.32.188.51.15.698-.05.188-.201.815-.992 1.03-1.348.216-.358.374-.412.63-.412.256 0 1.628.188 2.067.96.438.778.295 1.47-.114 2.185z" />
                  </svg>
                  Abrir Chat
                </a>
              </div>
            </div>

            <div className="col-span-1">
              <p className="text-gray-600 mb-4 text-center">
                Encuéntranos en nuestra oficina principal. ¡Te esperamos!
              </p>

              <div
                className="relative w-full overflow-hidden rounded-xl shadow-xl border border-gray-300"
                style={{ paddingBottom: "40%", height: 0 }}
              >
                <iframe
                  title="Ubicación de Software DT"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3976.62002570087!2d-74.07720932573215!3d4.664402693240212!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8e3909772c9183d5%3A0x7d2864c3c3a7a92!2sBogot%C3%A1%2C%20Colombia!5e0!3m2!1ses!2s!4v1678886400000!5m2!1ses!2s"
                  loading="lazy"
                  className="absolute top-0 left-0 w-full h-full border-none"
                  allowFullScreen=""
                  aria-hidden="false"
                  tabIndex="0"
                ></iframe>
              </div>
              <div className="mt-6 p-4 bg-indigo-50 rounded-lg text-center">
                <p className="font-semibold text-indigo-700">Dirección:</p>
                <p className="text-gray-700">
                  Carrera 72 # 2 - 50, Piso 5, Bogotá, Colombia
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section className="min-h-screen flex flex-col justify-center items-center bg-white py-16 px-4 sm:px-8">
        <div className="w-full max-w-4xl">
          <ReviewForm />
        </div>
      </section>
      <Footer />
    </div>
  );
};
export default Contact;
