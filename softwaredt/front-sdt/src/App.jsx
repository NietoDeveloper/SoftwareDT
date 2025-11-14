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
import ClientPanel from "./pages/ClientPanel.jsx";
// Suponemos que tienes un componente para la página de perfil
import UserProfile from "./pages/UserProfile.jsx"; // <<< Asumo la existencia de este componente

function App() {
  return (
    <UserProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/signup" element={<Doctorsignup />} />
        <Route path="/doctor/login" element={<Doctorlogin />} />

        {/* Rutas Protegidas (Requieren autenticación) */}
        <Route element={<PrivateRoutes />}>
          
          {/* RUTA AÑADIDA: Perfil de Usuario para corregir el log "No routes matched" */}
          <Route path="/user/profile" element={<UserProfile />} /> 
          
          {/* Panel del Cliente (Dashboard) */}
          <Route path="/client/dashboard" element={<ClientPanel />} />

          {/* Cita de un Doctor específico */}
          <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
          
          {/* Página de Pago */}
          <Route path="/checkout" element={<Payment />} />

          {/* Ruta de Confirmación de Cita */}
          <Route 
            path="/appointment-confirmation/:appointmentId" 
            element={<AppointmentConfirmation />} 
          />
        </Route>
      </Routes>
    </UserProvider>
  );
}

export default App;