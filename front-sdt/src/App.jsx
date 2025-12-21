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
      <Header />
      <Routes
        future={{
          v7_startTransition: true,
          v7_relativeSplatPath: true,
        }}
      >
        {/* --- Rutas Públicas --- */}
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />
        <Route path="/ourclients" element={<OurClients />} />
        
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/signup" element={<Doctorsignup />} />
        <Route path="/doctor/login" element={<Doctorlogin />} />
        
        {/* --- Rutas Privadas / Protegidas --- */}
        <Route element={<PrivateRoutes />}>
          <Route path="/client/dashboard" element={<ClientPanel />} />
          <Route path="/client-appointments" element={<ClientPanel />} />
          
          {/* AJUSTE DE FLUJO: 
              Esta ruta recibe la info de ServicesCard.jsx.
              He cambiado el parámetro a :serviceId para que sea más descriptivo
              aunque el componente BookingPage podrá leer la data completa 
              desde el objeto 'state' que enviamos.
          */}
          <Route path="/book-appointment/:serviceId" element={<BookingPage />} />
          
          <Route path="/checkout" element={<Payment />} />
          
          <Route 
            path="/appointment-confirmation" 
            element={<AppointmentConfirmation />} 
          />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;