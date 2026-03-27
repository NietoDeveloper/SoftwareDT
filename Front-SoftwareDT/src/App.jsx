/* eslint-disable react-hooks/exhaustive-deps */
import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate, Navigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import { useUser } from "./context/UserContext";
import { setupInterceptors } from "./API/api";

// Components & Layout
import Header from "./components/Header/Header.jsx";
import Footer from "./components/Footer/Footer.jsx"; 
import PrivateRoutes from "./utils/PrivateRoutes.jsx";

// Pages
import Home from "./pages/Home.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Products from "./pages/Products.jsx";
import Investigations from "./pages/Investigations.jsx";
import Contact from "./pages/Contact.jsx";
import OurClients from "./pages/OurClients.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Payment from "./components/Checkout/Payment.jsx";
import ClientPanel from "./pages/ClientAppointmentsPanel.jsx";
import AppointmentConfirmation from "./pages/AppointmentConfirmation.jsx";

import "./App.css";

function App() {
  const { pathname } = useLocation();
  const navigate = useNavigate();
  const { handleLogout, getAccessToken, setToken, loading } = useUser();

  // 🛡️ HANDSHAKE DE RED & INTERCEPTORES
  useEffect(() => {
    const onAuthFailure = () => {
      handleLogout();
      navigate("/login", { replace: true });
    };
    setupInterceptors(getAccessToken, setToken, onAuthFailure);
  }, [getAccessToken, setToken, handleLogout]);

  // 🔝 SCROLL TO TOP
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  // ⏳ PANTALLA DE CARGA INDUSTRIAL
  if (loading) {
    return (
      <div className="min-h-screen bg-[#DCDCDC] flex items-center justify-center">
        <div className="flex flex-col items-center gap-4">
          <div className="w-10 h-10 border-4 border-black/10 border-t-[#FEB60D] rounded-full animate-spin" />
          <p className="text-[10px] font-black uppercase tracking-[0.3em] text-black">
            Sincronizando Datacenter <span className="text-[#FEB60D]">DT</span>
          </p>
        </div>
      </div>
    );
  }

  const isHome = pathname === "/";

  return (
    <div className="min-h-screen bg-[#DCDCDC] font-sans antialiased text-black flex flex-col selection:bg-[#FFD700] selection:text-black">
      
      {/* 🔔 SISTEMA DE NOTIFICACIONES */}
      <Toaster 
        position="top-right"
        toastOptions={{
          duration: 4000,
          style: {
            background: '#000000',
            color: '#FFD700',
            border: '2px solid #FEB60D',
            borderRadius: '0px', 
            fontSize: '11px',
            fontWeight: '900',
            textTransform: 'uppercase',
            letterSpacing: '0.1em'
          },
        }}
      />
      
      {/* 🧭 NAVEGACIÓN SUPERIOR */}
      <Header />
      
      {/* 🏗️ CONTENEDOR DE NODO CENTRAL */}
      <main className={`flex-grow w-full ${!isHome ? 'pt-16 pb-10' : 'pt-0'}`}>
        <Routes key={pathname}>
          
          {/* 🌐 Rutas Públicas */}
          <Route path="/" element={<Home />} />
          <Route path="/products" element={<Products />} />
          <Route path="/investigations" element={<Investigations />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/clients" element={<OurClients />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* 🔒 Rutas Privadas */}
          <Route element={<PrivateRoutes />}>
            
            {/* Rutas de Dashboard (Todas apuntan al mismo panel unificado) */}
            <Route path="/users/profile/me" element={<ClientPanel />} />
            <Route path="/client/dashboard" element={<ClientPanel />} />
            <Route path="/client-appointments" element={<ClientPanel />} />
            
            {/* 🎯 Ajuste del flujo de agendamiento: /booking simple para enlazar con el dashboard */}
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/book-appointment/:serviceId" element={<BookingPage />} />
            
            <Route path="/checkout" element={<Payment />} />
            <Route path="/appointment-confirmation" element={<AppointmentConfirmation />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>

      {/* 🏁 PIE DE PÁGINA */}
      <Footer />
      
    </div>
  );
}

export default App;