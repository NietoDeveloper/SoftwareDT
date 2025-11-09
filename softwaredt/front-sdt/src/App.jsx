import { Routes, Route } from "react-router-dom";
// Se añade la extensión .jsx o .js a todas las importaciones locales para resolver el error.
import Header from "./components/Header/Header.jsx";
import Home from "./pages/Home.jsx";
import './App.css';
import DoctorList from "./pages/Doctors.jsx";
import Signup from "./pages/Signup.jsx";
import Login from "./pages/Login.jsx"
import Doctorsignup from "./pages/DoctorSignup.jsx";
import Doctorlogin from "./pages/DoctorLogin.jsx";
import Services from "./pages/Services.jsx";
import {UserProvider} from './context/UserContext.jsx';
import PrivateRoutes from "./utils/PrivateRoutes.jsx";
import DoctorProfile from "./pages/BookingPage.jsx";
import Contact from "./pages/Contact.jsx";
import Payment from "./components/Checkout/Payment.jsx";


function App() {
  return (
    <UserProvider>
      <Header/>
      
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/doctors" element={<DoctorList/>}/>
        <Route path="/contact" element={<Contact/>}/>
        
        {/* Ruta para la página de Servicios */}
        <Route path="/services" element={<Services />} /> 
        
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/login" element={<Login/>}/>
        
        <Route path="/doctor/signup" element={<Doctorsignup/>}/>
        <Route path="/doctor/login" element={<Doctorlogin/>}/>


        {/* Rutas Protegidas */}
        <Route element={<PrivateRoutes/>}>
          <Route path="/doctors/:doctorId" element={<DoctorProfile/>}/>
          <Route path="/checkout" element={<Payment/>}/>
        </Route>
      </Routes>
    </UserProvider>
  )
}

export default App;