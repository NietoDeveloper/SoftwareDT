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
// Sugerencia: Importa un contexto para las citas si aún no lo tienes
// import { AppointmentProvider } from "./context/AppointmentContext.jsx"; 
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import BookingPage from "./pages/BookingPage.jsx";
import Contact from "./pages/Contact.jsx";
import Payment from "./components/Checkout/Payment.jsx";
import ClientPanel from "./pages/ClientAppointmentsPanel.jsx";
import OurClients from "./pages/OurClients.jsx";

function App() {
  return (
    <UserProvider>
      {/* <AppointmentProvider> <-- Envuelve aquí para persistir la selección de servicios */}
        <Header />
        <Routes
          future={{
            v7_startTransition: true,
            v7_relativeSplatPath: true,
          }}
        >
          {/* Rutas Públicas - Todas en minúsculas por estándar */}
          <Route path="/" element={<Home />} />
          <Route path="/doctors" element={<DoctorList />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/services" element={<Services />} />
          <Route path="/clients" element={<OurClients />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          
          {/* Rutas de Doctor */}
          <Route path="/doctor/signup" element={<Doctorsignup />} />
          <Route path="/doctor/login" element={<Doctorlogin />} />
          
          {/* Rutas Privadas / Protegidas */}
          <Route element={<PrivateRoutes />}>
            {/* Unificamos el dashboard del cliente */}
            <Route path="/client/dashboard" element={<ClientPanel />} />
            
            {/* Esta ruta es la que usas en el Header corregido */}
            <Route path="/client-appointments" element={<ClientPanel />} />
            
            <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
            <Route path="/checkout" element={<Payment />} />
            
            <Route 
              path="/appointment-confirmation" 
              element={<AppointmentConfirmation />} 
            />
          </Route>
        </Routes>
      {/* </AppointmentProvider> */}
    </UserProvider>
  );
}

export default App;