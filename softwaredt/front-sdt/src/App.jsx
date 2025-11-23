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
import UserProfile from "./pages/UserProfile.jsx";

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
        <Route path="/" element={<Home />} />
        <Route path="/doctors" element={<DoctorList />} />
        <Route path="/contact" element={<Contact />} />
        
        <Route path="/services" element={<Services />} />

        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/doctor/signup" element={<Doctorsignup />} />
        <Route path="/doctor/login" element={<Doctorlogin />} />

        <Route element={<PrivateRoutes />}>
          
          <Route path="/user/profile" element={<UserProfile />} /> 

          <Route path="/client/dashboard" element={<ClientPanel />} />

          <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
          
          <Route path="/checkout" element={<Payment />} />

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