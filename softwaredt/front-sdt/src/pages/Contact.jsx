import React, { useState } from 'react';

// Componente principal de contacto
const App = () => {
  // Estado para los datos del formulario de correo
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Número de WhatsApp (ejemplo, reemplaza con el número real de Software DT, sin símbolos, solo dígitos y código de país)
  const whatsappNumber = "+57 300 123 4567";
  const rawNumber = "573001234567"; // Número en formato internacional sin +, -, ni espacios.
  const whatsappLink = `https://wa.me/${rawNumber}?text=Hola,%20me%20comunico%20desde%20la%20App%20Software%20DT%20para%20solicitar%20soporte/información.`;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
    setStatusMessage(null);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatusMessage(null);

    // --- LÓGICA DE ENVÍO (Simulación) ---
    // Aquí iría la llamada a tu API backend (ej: fetch('/api/contact', { method: 'POST', body: JSON.stringify(formData) }))
    
    // Simulación de espera de API
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    console.log("Datos enviados (simulados):", formData);

    // Muestra un mensaje de éxito/error simulado
    if (formData.name && formData.email && formData.message) {
      setStatusMessage({ type: 'success', text: '¡Mensaje enviado con éxito! Nos pondremos en contacto pronto.' });
      setFormData({ name: '', email: '', message: '' }); // Limpiar formulario
    } else {
      setStatusMessage({ type: 'error', text: 'Por favor, complete todos los campos requeridos.' });
    }
    
    setIsSubmitting(false);
    // ------------------------------------
  };

  // Icono de Mail (Inline SVG para evitar dependencias externas)
  const MailIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <rect width="20" height="16" x="2" y="4" rx="2"/>
      <path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.06 0L2 7"/>
    </svg>
  );

  // Icono de WhatsApp (Inline SVG para evitar dependencias externas) - Usaremos un icono de mensaje genérico.
  const MessageCircleIcon = (props) => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8L3 21Z"/>
    </svg>
  );

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl overflow-hidden p-6 md:p-12 border border-gray-100">
        
        {/* Encabezado */}
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">
          Hablemos
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Estamos listos para impulsar tus proyectos. Elige la mejor forma de contactarnos.
        </p>

        {/* Contenido principal: Formulario + Opciones */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Columna 1 & 2: Formulario de Correo Electrónico */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MailIcon className="w-6 h-6 text-indigo-500 mr-3" /> 
              Envíanos un Mensaje
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campo Nombre */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                  Tu Nombre
                </label>
                <input
                  type="text"
                  name="name"
                  id="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="Ej: Juan Pérez"
                />
              </div>

              {/* Campo Correo Electrónico */}
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                  Tu Correo Electrónico
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150"
                  placeholder="ejemplo@softwaredt.com"
                />
              </div>

              {/* Campo Mensaje */}
              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Mensaje
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="5"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
                  placeholder="Cuéntanos cómo te podemos ayudar..."
                ></textarea>
              </div>
              
              {/* Mensaje de estado */}
              {statusMessage && (
                <div className={`p-3 rounded-lg text-sm font-medium ${
                  statusMessage.type === 'success' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                }`}>
                  {statusMessage.text}
                </div>
              )}

              {/* Botón de Envío */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-md text-base font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
              </button>
            </form>
          </div>

          {/* Columna 3: Opciones de Contacto Directo */}
          <div className="lg:col-span-1 space-y-8 mt-6 lg:mt-0">
            
            {/* Tarjeta de WhatsApp */}
            <div className="bg-green-50 border border-green-200 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300">
              <h3 className="text-xl font-bold text-gray-800 mb-4 flex items-center">
                <MessageCircleIcon className="w-6 h-6 text-green-600 mr-3" />
                Soporte por WhatsApp
              </h3>
              <p className="text-gray-600 mb-4">
                La forma más rápida de obtener ayuda o hacer consultas rápidas. Te responderemos en minutos.
              </p>
              
              <div className="font-semibold text-green-700 text-lg mb-4">
                {whatsappNumber}
              </div>

              <a
                href={whatsappLink}
                target="_blank"
                rel="noopener noreferrer"
                className="w-full inline-flex justify-center items-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-base font-medium text-white bg-green-500 hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-400 transition duration-200"
              >
                {/* Icono de WhatsApp simple (simulando marca) */}
                <svg className="w-5 h-5 mr-2 fill-white" viewBox="0 0 24 24" aria-hidden="true"><path d="M12.039 2.01c-5.518 0-9.991 4.473-9.991 9.991 0 1.644.402 3.203 1.155 4.594L2.01 22.039l5.51-1.45c1.32.747 2.861 1.15 4.519 1.15 5.518 0 9.991-4.473 9.991-9.991S17.557 2.01 12.039 2.01zm4.33 13.567c-.201.528-1.189 1.056-1.637 1.056-.448 0-.96-.188-1.55-.412-2.185-1.077-3.646-3.784-3.76-3.957-.114-.173-.896-1.15-.36-1.928.536-.778 1.189-.877 1.58-.877s.69.018 1.01.761c.32.742.61 1.484.71 1.628.1.144.188.358.074.636-.114.277-.188.421-.36.636-.201.277-.421.502-.63.708-.209.207-.448.484-.25.753.19.27.674.877 1.348 1.43.673.553 1.258.742 1.58.93.32.188.51.15.698-.05.188-.201.815-.992 1.03-1.348.216-.358.374-.412.63-.412.256 0 1.628.188 2.067.96.438.778.295 1.47-.114 2.185z"/></svg>
                Chatea con Software DT
              </a>
            </div>
            
            {/* Tarjeta de Información General */}
            <div className="bg-indigo-50 border border-indigo-200 p-6 rounded-xl shadow-lg">
              <h3 className="text-xl font-bold text-gray-800 mb-4">
                Información Adicional
              </h3>
              <div className="space-y-3">
                <p className="text-gray-600">
                  <span className="font-semibold text-indigo-700">Email Directo:</span>
                  <br/>
                  info@softwaredt.com (Ejemplo)
                </p>
                <p className="text-gray-600">
                  <span className="font-semibold text-indigo-700">Horario de Soporte:</span>
                  <br/>
                  Lunes a Viernes, 9:00am - 5:00pm
                </p>
              </div>
            </div>

          </div>
        </div>
        {/* Footer para la marca */}
        <div className="mt-12 pt-6 border-t border-gray-100 text-center text-sm text-gray-400">
          Desarrollado para la aplicación Software DT.
        </div>
      </div>
    </div>
  );
};

export default App;

import ReviewForm from "../features/rating"

const Contact = () => {
  return (
    <div>
    
        <ReviewForm/>
    </div>
  )
}

export default Contact