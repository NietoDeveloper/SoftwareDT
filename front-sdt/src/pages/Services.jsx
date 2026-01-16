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

      
      <Footer />
    </div>
  );
};

export default ServicesList;