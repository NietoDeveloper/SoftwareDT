import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './firebaseConfig'; 
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer } from 'react-toastify';
import { UserProvider } from './context/UserContext.jsx'; 

// Configuración de QueryClient optimizada para Software DT
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, // Evita recargas innecesarias al cambiar de pestaña
      retry: 1,
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter 
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <QueryClientProvider client={queryClient}>
        {/* El UserProvider envuelve la app para gestionar el Datacenter de identidad */}
        <UserProvider>
          <ToastContainer 
            theme="colored" // "colored" se adapta mejor a los colores Gold/Yellow de SDT
            position="top-right"
            autoClose={2000} // Más rápido para una UX fluida
            closeOnClick
            pauseOnHover={false}
            draggable
            hideProgressBar={false}
          />
          <App />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)