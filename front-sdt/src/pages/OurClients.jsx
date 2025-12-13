// eslint-disable-next-line no-unused-vars
import React from 'react';
import Footer from "../components/Footer/Footer";

const clientData = [





];

const OurClients = () => {
  return (
    <div>
    <section className="flex flex-col items-center p-4 sm:p-8 md:p-12 min-h-screen">
      <h2 className="text-4xl sm:text-5xl font-extrabold text-black mb-12 text-center">
        Nuestros Clientes
      </h2>

      <div className="w-full max-w-[1400px]">
   
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-8 sm:gap-10 justify-items-center">
          {clientData.map((client) => (
            <a
              key={client.id}
              href={client.website}
              target="_blank"
              rel="noopener noreferrer"
              className="group w-full max-w-sm flex flex-col items-center bg-white border border-gray-100 rounded-xl shadow-lg 
                         p-6 transition-all duration-300 ease-in-out cursor-pointer 
                         hover:shadow-2xl hover:border-yellow-400 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
              style={{ minHeight: '320px' }} 
            >
              <div className="flex-shrink-0 w-32 h-32 mb-4">
        
                  <img
                      src={client.imageUrl || "/images/placeholder-logo.png"} // Placeholder si imageUrl está vacío
                      alt={`Logo de ${client.title}`}
                      className="w-full h-full object-contain rounded-full border-4 border-gray-100 group-hover:border-yellow-500 transition-colors duration-300"
                  />
              </div>

              <h3 className="text-xl font-semibold text-black mb-2 text-center group-hover:text-yellow-600 transition-colors duration-300">
                {client.title}
              </h3>

              <p className="text-gray-700 text-center flex-grow">
                {client.description}
              </p>
              
              <div className="mt-4 text-sm font-medium text-gray-500 group-hover:text-yellow-500 transition-colors duration-300">
                Visitar Web &rarr;
              </div>
            </a>
          ))}
        </div>
      </div>
        <Footer />
    </section>
    </div>
  );
};

export default OurClients;