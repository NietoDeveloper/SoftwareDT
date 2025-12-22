import { Routes, Route } from "react-router-dom";
import AppointmentConfirmation from "./pages/AppointmentConfirmation.jsx"; 
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import "./App.css";
import DoctorList from "./pages/Doctors.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx";
import Doctorsignup from "./pages/DoctorSignup.jsx";
import Doctorlogin from "./pages/DoctorLogin.jsx";
import Services from "./pages/Services.jsx";
import { UserProvider } from "./context/UserContext.jsx"; 
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Contact from "./pages/Contact.jsx";
import Payment from "./components/Checkout/Payment.jsx";
import ClientPanel from "./pages/ClientAppointmentsPanel.jsx";
import OurClients from "./pages/OurClients.jsx";

function App() {
  return (
    <UserProvider>
      {/* Header global: contiene navegación a Servicios y Panel */}
      <Header />
      
      <Routes
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {/* --- SECCIÓN PÚBLICA --- */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/clients" element={<OurClients />} />
        
        {/* Autenticación Usuarios (Clientes) */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        
        {/* Autenticación Especialistas */}
        <Route path="/doctor/signup" element={<Doctorsignup />} />
        <Route path="/doctor/login" element={<Doctorlogin />} />
        
        {/* --- SECCIÓN PROTEGIDA (Solo Logueados) --- */}
        <Route element={<PrivateRoutes />}>
          {/* Dashboard y Panel de Control */}
          <Route path="/client/dashboard" element={<ClientPanel />} />
          <Route path="/client-appointments" element={<ClientPanel />} />
          
          {/* FLUJO DE AGENDAMIENTO: 
              Captura el :doctorId desde la URL (proviene de ServicesCard.jsx)
          */}
          <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
          
          {/* Procesamiento de Pago */}
          <Route path="/checkout" element={<Payment />} />
          
          {/* Ticket Final de Confirmación */}
          <Route 
            path="/appointment-confirmation" 
            element={<AppointmentConfirmation />} 
          />
        </Route>

        {/* Fallback para rutas no encontradas (Opcional) */}
        <Route path="*" element={<Home />} />
      </Routes>
    </UserProvider>
  );
}

export default App;