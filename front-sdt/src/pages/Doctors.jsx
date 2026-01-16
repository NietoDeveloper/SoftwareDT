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

          ))}
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default DoctorList;