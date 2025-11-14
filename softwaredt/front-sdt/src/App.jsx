import { Routes, Route } from "react-router-dom";
// 1. **ASUME** que el componente está en './pages/'. Corrige la ruta de importación.
//    Si está en otro lugar, ajusta la ruta. Por ejemplo: "./pages/AppointmentConfirmation.jsx"
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

function App() {
  return (
    <UserProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/services" element={<Services />} />

        {/* Rutas de autenticación */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/signup" element={<Doctorsignup />} />
        <Route path="/doctor/login" element={<Doctorlogin />} />

        {/* Rutas Protegidas (Requieren autenticación) */}
        <Route element={<PrivateRoutes />}>
          {/* Cita de un Doctor específico */}
          <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
          
          {/* Página de Pago, movida a la ruta protegida si es necesario */}
          <Route path="/checkout" element={<Payment />} />

          {/* 2. LA RUTA DE CONFIRMACIÓN. La he movido dentro de PrivateRoutes por seguridad. */}
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