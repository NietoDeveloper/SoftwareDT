import React, { useState } from 'react';

// --- Placeholder: ReviewForm (Simulación de Componente de Rating) ---
// En tu aplicación real, este sería el componente importado de "../features/rating".
const ReviewFormPlaceholder = () => {
  return (
    <div className="mt-16 pt-10 border-t border-gray-200 bg-gray-50 p-8 rounded-2xl shadow-inner">
      <h2 className="text-3xl font-extrabold text-gray-800 mb-4 text-center">
        ¿Cómo te fue con Software DT?
      </h2>
      <p className="text-gray-600 text-center mb-6 max-w-xl mx-auto">
        Tu opinión nos ayuda a mejorar. Por favor, déjanos una calificación y un breve comentario sobre tu experiencia.
      </p>
      
      {/* Simulación del formulario de calificación */}
      <div className="flex flex-col items-center space-y-4">
        <div className="text-4xl">
          {/* Estrellas de Calificación (Ejemplo estático) */}
          <span role="img" aria-label="star" className="text-yellow-400">★</span>
          <span role="img" aria-label="star" className="text-yellow-400">★</span>
          <span role="img" aria-label="star" className="text-yellow-400">★</span>
          <span role="img" aria-label="star" className="text-yellow-400">★</span>
          <span role="img" aria-label="star" className="text-gray-300">★</span>
        </div>
        <textarea
            rows="3"
            placeholder="Escribe tu comentario aquí..."
            className="w-full max-w-lg px-4 py-2 border border-gray-300 rounded-lg focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none"
        ></textarea>
        <button className="py-2 px-6 rounded-lg font-medium text-white bg-indigo-600 hover:bg-indigo-700 transition duration-200">
          Enviar Calificación
        </button>
      </div>
    </div>
  );
};

// --- Iconos SVG (Para evitar dependencias) ---
const MailIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <rect width="20" height="16" x="2" y="4" rx="2"/>
    <path d="m22 7-8.97 5.7a1.83 1.83 0 0 1-2.06 0L2 7"/>
  </svg>
);

const MessageCircleIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8L3 21Z"/>
  </svg>
);
// ---------------------------------------------


// --- Componente Principal (Contact + Review) ---
const App = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState(null);

  // Reemplaza con el número real de Software DT, sin símbolos.
  const whatsappNumber = "+57 300 123 4567";
  const rawNumber = "573001234567"; 
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

    // LÓGICA DE ENVÍO DE FORMULARIO (Mantenemos la simulación)
    await new Promise(resolve => setTimeout(resolve, 2000)); 

    if (formData.name && formData.email && formData.message) {
      setStatusMessage({ type: 'success', text: '¡Mensaje enviado con éxito! Te contactaremos pronto.' });
      setFormData({ name: '', email: '', message: '' }); 
    } else {
      setStatusMessage({ type: 'error', text: 'Por favor, completa todos los campos requeridos.' });
    }
    
    setIsSubmitting(false);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center p-4 sm:p-8">
      <div className="bg-white shadow-2xl rounded-2xl w-full max-w-6xl overflow-hidden p-6 md:p-12 border border-gray-100">
        
        {/* ==================================== */}
        {/* SECCIÓN 1: CONTACTO Y WHATSAPP */}
        {/* ==================================== */}
        
        {/* Encabezado */}
        <h1 className="text-4xl font-extrabold text-indigo-700 mb-2 tracking-tight">
          Hablemos
        </h1>
        <p className="text-gray-600 mb-10 text-lg">
          Estamos listos para impulsar tus proyectos. Elige la mejor forma de contactarnos.
        </p>

        {/* Contenido principal: Formulario + Opciones (Grid Responsive) */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

          {/* Columna 1 & 2: Formulario de Correo Electrónico */}
          <div className="lg:col-span-2">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center">
              <MailIcon className="w-6 h-6 text-indigo-500 mr-3" /> 
              Envíanos un Mensaje
            </h2>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Campos */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Tu Nombre</label>
                <input type="text" name="name" id="name" value={formData.name} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" placeholder="Ej: Juan Pérez"/>
              </div>

              <div>
                <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Tu Correo Electrónico</label>
                <input type="email" name="email" id="email" value={formData.email} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150" placeholder="ejemplo@softwaredt.com"/>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">Mensaje</label>
                <textarea name="message" id="message" rows="5" value={formData.message} onChange={handleChange} required className="w-full px-4 py-2.5 border border-gray-300 rounded-lg shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition duration-150 resize-none" placeholder="Cuéntanos cómo te podemos ayudar..."></textarea>
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
              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center items-