import React, { useState, useContext, createContext } from "react";
import { Routes, Route, Outlet, Link } from "react-router-dom";
import "./App.css";

// 1. Contexto de Usuario (Placeholder)
const UserContext = createContext(null);

// 2. UserProvider (Placeholder)
const UserProvider = ({ children }) => {
  const [user, setUser] = useState({ isAuthenticated: true, name: "Invitado" });
  
  // En un entorno real, aquí irían las funciones de login/logout
  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};

const PrivateRoutes = () => {
  const { user } = useContext(UserContext);

  if (user && user.isAuthenticated) {
    return <Outlet />;
  } else {
    // En una aplicación real, se usaría Navigate
    return (
      <div className="p-8 text-center text-red-600 bg-red-50 border-red-200 border rounded-lg m-4">
        Acceso Denegado. Por favor, inicia sesión.
        <div className="mt-4"><Link to="/login" className="text-blue-600 underline">Ir a Iniciar Sesión</Link></div>
      </div>
    );
  }
};

const NavButton = ({ to, children }) => (
    <Link to={to} className="px-3 py-2 text-white transition duration-200 hover:bg-indigo-600 rounded-lg">
        {children}
    </Link>
);

const Header = () => (
    <header className="bg-indigo-700 shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3 flex justify-between items-center">
            <Link to="/" className="text-2xl font-bold text-white tracking-wide">
                MediApp
            </Link>
            <nav className="flex space-x-4">
                <NavButton to="/">Inicio</NavButton>
                <NavButton to="/doctors">Doctores</NavButton>
                <NavButton to="/services">Servicios</NavButton>
                <NavButton to="/contact">Contacto</NavButton>
                <NavButton to="/login" className="bg-green-500 hover:bg-green-600">Login</NavButton>
            </nav>
        </div>
    </header>
);

const Home = () => (
    <div className="p-8 text-center bg-gray-100 min-h-screen">
        <h1 className="text-4xl font-extrabold text-indigo-800 mb-4">Bienvenido a MediApp</h1>
        <p className="text-xl text-gray-600">Tu solución para citas médicas en línea.</p>
    </div>
);
const DoctorList = () => <div className="p-8"><h2 className="text-3xl text-indigo-700">Listado de Doctores</h2><p>Aquí verás a todos los especialistas disponibles.</p></div>;
const Services = () => <div className="p-8"><h2 className="text-3xl text-indigo-700">Nuestros Servicios</h2><p>Explora nuestras especialidades médicas.</p></div>;
const Contact = () => <div className="p-8"><h2 className="text-3xl text-indigo-700">Contáctanos</h2><p>Envíanos un mensaje.</p></div>;

const Signup = () => <div className="p-8"><h2 className="text-3xl text-indigo-700">Registro de Pacientes</h2><p>Crea tu cuenta de paciente.</p></div>;
const Login = () => <div className="p-8"><h2 className="text-3xl text-indigo-700">Inicio de Sesión (Paciente)</h2><p>Accede a tu historial y citas.</p></div>;
const Doctorsignup = () => <div className="p-8"><h2 className="text-3xl text-indigo-700">Registro de Doctores</h2><p>Únete a nuestra plataforma.</p></div>;
const Doctorlogin = () => <div className="p-8"><h2 className="text-3xl text-indigo-700">Inicio de Sesión (Doctor)</h2><p>Accede a tu panel de control.</p></div>;

const BookingPage = () => <div className="p-8 bg-blue-50 m-4 rounded-lg"><h2 className="text-3xl text-indigo-700">Reservar Cita</h2><p>Proceso de selección de fecha y hora.</p></div>;
const Payment = () => <div className="p-8 bg-green-50 m-4 rounded-lg"><h2 className="text-3xl text-indigo-700">Página de Pago</h2><p>Confirma los detalles del pago.</p></div>;
const AppointmentConfirmation = () => <div className="p-8 bg-yellow-50 m-4 rounded-lg"><h2 className="text-3xl text-indigo-700">Confirmación de Cita</h2><p>Tu cita ha sido agendada con éxito.</p></div>;


function App() {
  return (
    <UserProvider>
      <Header />

      <main className="max-w-7xl mx-auto">
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
            <Route path="/book-appointment/:doctorId" element={<BookingPage />} />
            <Route path="/checkout" element={<Payment />} />
            <Route 
              path="/appointment-confirmation/:appointmentId" 
              element={<AppointmentConfirmation />} 
            />
          </Route>
        </Routes>
      </main>
    </UserProvider>
  );
}

export default App;