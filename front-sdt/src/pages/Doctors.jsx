/* eslint-disable react/no-unescaped-entities */
import { useNavigate, useLocation } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { toast } from "react-toastify";
import axios from "axios";
import { motion } from "framer-motion";
import Footer from "../components/Footer/Footer";
import { ArrowRight } from "lucide-react";

const DoctorList = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
iceData: selectedServiceInfo


  return (
    <div className="min-h-screen bg-main font-sans antialiased overflow-x-hidden">
      <div className="mx-auto px-4 sm:px-6 py-12 sm:py-20 max-w-[1800px]">


      -y-2 cursor-pointer"
            >
              {/* STATUS INDICATOR */}
              <div className="absolute top-6 right-6">
                <div className="w-2 h-2 bg-gold rounded-full shadow-[0_0_8px_rgba(255,215,0,0.6)]"></div>
              </div>

              {/* INFO PRINCIPAL */}
              <div className="w-full flex flex-col items-center pt-4">
                <h3 className="text-2xl sm:text-3xl font-black text-headingColor uppercase tracking-tighter group-hover:text-gold transition-colors duration-300">
                  {doctor.name}
                </h3>
                <div className="h-1 w-12 bg-gold/30 mt-2 group-hover:w-24 transition-all duration-500"></div>
                <span className="text-[10px] font-black text-textColor/40 uppercase tracking-[0.2em] mt-4">
                  {doctor.specialization || "Senior Software Engineer"}
                </span>
              </div>


             
                <div className="w-10 h-10 sm:w-12 sm:h-12 rounded-xl bg-black flex items-center justify-center 
                                transition-all duration-500 group-hover:bg-gold shadow-lg shadow-black/10">
                  <ArrowRight className="w-5 h-5 text-white group-hover:text-black transition-colors" />
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorList;