// eslint-disable-next-line no-unused-vars
import React from "react";
import { Link, useNavigate } from "react-router-dom"; // Añadido useNavigate
import Footer from "../components/Footer/Footer";

const ArrowRightIcon = (props) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" {...props}>
    <line x1="5" y1="12" x2="19" y2="12"></line>
    <polyline points="12 5 19 12 12 19"></polyline>
  </svg>
);

const ServicesList = () => {
  const navigate = useNavigate(); // Hook para navegación programática

  const services = [

  ];
}
              onClick={() => handleServiceSelection(service)}
              className="group bg-white border-[4px] border-black rounded-[30px] p-6 transition-all duration-300 ease-out cursor-pointer 

              <div className="w-full flex flex-col items-center mt-auto flex-shrink-0">
                <div className="w-12 h-[2px] bg-gold mb-4 shadow-[0_0_4px_#FFD700]"></div>
                
                <div className="flex items-center justify-between w-full px-4 mb-2">
                  <div className="text-left">
                    <p className="text-[9px] font-black text-gray-400 uppercase tracking-widest">Inversión</p>
                    <p className="text-[13px] font-black text-black uppercase">{service.price}</p>
                  </div>
                  
                  <div className="w-12 h-12 rounded-full border-[3px] border-black flex items-center justify-center 
                                  bg-transparent transition-all duration-300 ease-in-out
                                  shadow-[0_8px_15px_rgba(0,0,0,0.15)] 
                                  group-hover:bg-gold group-hover:border-gold group-hover:shadow-[0_10px_25px_rgba(255,215,0,0.4)] 
                                  group-hover:scale-110">
                    <ArrowRightIcon className="w-6 h-6 text-black group-hover:text-white transition-colors duration-300" />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
      
      <Footer />
    </div>
  );
};

export default ServicesList;