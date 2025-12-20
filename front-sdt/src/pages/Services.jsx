// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link } from "react-router-dom";
import Footer from "../components/Footer/Footer";

const ServicesList = () => {
  const functionalPlaceholder =
    "https://placehold.co/150x150/EEEEEE/313131?text=Servicio";

  const services = [






  ];

  return (
:border-yellow-400 hover:scale-[1.03] focus:outline-none focus:ring-4 focus:ring-yellow-500/50"
                style={{ minHeight: '320px' }} 
              >
                <div className="flex-shrink-0 w-32 h-32 mb-4">
                  <img
                    src={service.photo}
                    alt={service.title}
                    className="w-full h-full object-contain rounded-full border-4 border-gray-100 group-hover:border-yellow-500 transition-colors duration-300"
                  />
                </div>
                <h2 className="text-2xl font-extrabold text-black mb-2 text-center group-hover:text-yellow-600 transition-colors duration-300">
                  {service.title}
                </h2>
                <h3 className="text-md font-semibold text-black mb-3 uppercase tracking-wider group-hover:text-yellow-600 transition-colors duration-300">
                  {service.subtitle}
                </h3>
                <p className="text-gray-700 text-center flex-grow">
                  {service.description}
                </p>
                <div className="mt-auto pt-3 border-t w-full text-center">
                  <p className="text-xl font-black text-black group-hover:text-yellow-500 transition-colors duration-300">
                    {service.price}
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <div className="mt-4">
        <Footer />
      </div>
    </div>
  );
};

export default ServicesList;