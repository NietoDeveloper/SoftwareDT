import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
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
import OurClients from "./pages/OurClients.jsx"; // Agregado para la ruta /clients

// Componente simple para Not Found (puedes moverlo a un archivo separado si prefieres)
const NotFound = () => (
  <div className="text-center py-20">
    <h1 className="text-4xl font-bold text-red-600">Página No Encontrada</h1>
    <p className="mt-4 text-black">Lo sentimos, la ruta solicitada no existe.</p>
  </div>
);

function App() {
  return (
    <UserProvider>
      <Router>
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
          <Route path="/clients" element={<OurClients />} /> {/* Agregada la ruta para OurClients */}
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/doctor/signup" element={<Doctorsignup />} />
          <Route path="/doctor/login" element={<Doctorlogin />} />
          
          <Route element={<PrivateRoutes />}>
            <Route path="/user/profile" element={<UserProfile />} /> 
            <Route path="/client/dashboard" element={<ClientPanel />} />
            <Route path="/appointment" element={<ClientPanel />} /> {/* Agregada para resolver el error de ruta no encontrada */}
            <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
            <Route path="/checkout" element={<Payment />} />
            <Route 
              path="/appointment-confirmation/:appointmentId" 
              element={<AppointmentConfirmation />} 
            />
          </Route>

          <Route path="*" element={<NotFound />} /> {/* Catch-all para rutas no definidas */}
        </Routes>
      </Router>
    </UserProvider>
  );
}

export default App;