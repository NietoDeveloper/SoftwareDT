import React from "react";
import { Routes, Route } from "react-router-dom";
import AppointmentConfirmation from "./pages/AppointmentConfirmation.jsx"; 
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import DoctorList from "./pages/Doctors.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Services from "./pages/Services.jsx";
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Contact from "./pages/Contact.jsx";
import Payment from "./components/Checkout/Payment.jsx";
import ClientPanel from "./pages/ClientAppointmentsPanel.jsx";
import OurClients from "./pages/OurClients.jsx";

// 1. IMPORTAR TOASTER (Protocolo Software DT)
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <>
      {/* CONFIGURACIÓN GLOBAL ESTILO SOFTWARE DT */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#000000',
            color: '#FFD700',
            border: '2px solid #FEB60D',
            borderRadius: '12px',
            fontSize: '12px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          },
        }}
      />
      
      <Header />
      
      <Routes>
        {/* --- SECCIÓN PÚBLICA --- */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clients" element={<OurClients />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* --- SECCIÓN PROTEGIDA (DATACENTER / MVP) --- */}
        <Route element={<PrivateRoutes />}>
          {/* Panel de Control - Punto 1 y 4 del MVP */}
          <Route path="/users/profile/me" element={<ClientPanel />} />
          <Route path="/client/dashboard" element={<ClientPanel />} />
          <Route path="/client-appointments" element={<ClientPanel />} />
          
          {/* Flujo de Citas - Punto 1 del MVP */}
          <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
          <Route path="/checkout" element={<Payment />} />
          <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
        </Route>

        {/* Fallback de seguridad al Home */}
        <Route path="*" element={<Home />} />
      </Routes>
    </>
  );
}

export default App;