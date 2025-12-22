import React from 'react';
// Importa tu configuración de EmailJS aquí cuando estés listo
// import emailjs from '@emailjs/browser';

const Dashboard = () => {
  
  // Función placeholder para el sistema de mensajes (EmailJS)
  const handleDirectMessage = () => {
    console.log("Iniciando sistema de mensajes vía EmailJS...");
    // Aquí integrarás: emailjs.send(serviceID, templateID, templateParams, publicKey)
  };

  return (
    <div className="bg-main min-h-screen p-4">
      
      {/* SECCIÓN: BOTÓN NUEVA CITA */}
      {/* Se redujo el padding (py-2 px-4) para bajar el tamaño del botón sin afectar la fuente */}
      <div className="mb-8">
        <button className="bg-yellowColor text-headingColor font-bold py-2 px-4 rounded-lg shadow-md hover:opacity-90 transition-all">
          Nueva Cita
        </button>
      </div>

      {/* SECCIÓN 3: COMUNICACIONES (Profile Card) */}
      <div className="bg-card rounded-xl p-6 shadow-lg max-w-sm">
        <h2 className="text-headingColor text-xl font-bold mb-4">Comunicaciones</h2>
        
        {/* Espacio para la foto */}
        <div className="w-24 h-24 bg-gainsboro rounded-full mx-auto mb-3 flex items-center justify-center">
          <span className="text-gray-500 text-xs">Foto</span>
        </div>

        {/* Ajuste de etiqueta debajo de la foto */}
        <p className="text-textColor text-center text-sm font-medium mb-6">
          Ingeniero De Software Asignado
        </p>

        <div className="flex flex-col gap-3">
          {/* Botón con apariencia de WhatsApp */}
          <button 
            className="flex items-center justify-center gap-2 bg-[#25D366] text-white py-2 rounded-md font-semibold hover:bg-[#20ba5a] transition-colors"
            onClick={() => window.open('https://wa.me/tu_numero', '_blank')}
          >
            {/* Puedes usar un icono de WhatsApp aquí */}
            <span>WhatsApp</span>
          </button>

          {/* Botón Mensaje Directo - Preparado para EmailJS */}
          <button 
            onClick={handleDirectMessage}
            className="bg-headingColor text-white py-2 rounded-md font-semibold hover:opacity-90 transition-all"
          >
            Mensaje Directo
          </button>
        </div>
      </div>

    </div>
  );
};

export default Dashboard;