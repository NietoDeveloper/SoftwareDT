import { Routes, Route } from "react-router-dom";

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

        {/* Ruta para la página de Servicios */}
        <Route path="/services" element={<Services />} />

        {/* Rutas de autenticación de Cliente */}
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />

        {/* Rutas de autenticación de Doctor */}
        <Route path="/doctor/signup" element={<Doctorsignup />} />
        <Route path="/doctor/login" element={<Doctorlogin />} />

        {/* Rutas Protegidas */}
        <Route element={<PrivateRoutes />}>
          <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
          <Route path="/checkout" element={<Payment />} />
        </Route>
        <Route
          path="/book-appointment/:appointmentId"
          element={<BookingPage />}
        />
        <Route 
        path="/appointment-confirmation/:appointmentId" 
        element={<AppointmentConfirmation />} 
    />
      </Routes>
    </UserProvider>
  );
}

export default App;
