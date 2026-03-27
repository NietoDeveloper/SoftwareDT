import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext'; 
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 

import App from './App'; 

/**
 * 🛰️ SOFTWARE DT - OPTIMIZED QUERY CLIENT
 * Configuración de caché y re-intentos para alta disponibilidad.
 */
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false, 
      retry: 1, 
      staleTime: 1000 * 60 * 5, 
    },
  },
});

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("SDT CRITICAL ERROR: Nodo 'root' no encontrado en el DOM.");
}

/**
 * 🚀 MAIN ENTRY POINT - PRODUCTION STABLE
 * Jerarquía de Providers optimizada para el ecosistema Software DT.
 */
ReactDOM.createRoot(rootElement).render(
  <React.StrictMode>
    <UserProvider>
      <QueryClientProvider client={queryClient}>
        <BrowserRouter 
          future={{ 
            v7_startTransition: true, 
            v7_relativeSplatPath: true 
          }}
        >
          {/* 🔔 SISTEMA DE NOTIFICACIONES INDUSTRIAL */}
          <ToastContainer 
            theme="dark"
            position="top-right"
            autoClose={3000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            toastStyle={{ 
              backgroundColor: '#000000',
              color: '#FFFFFF',
              border: '1px solid #FEB60D', 
              borderRadius: '0px',
              textTransform: 'uppercase', 
              fontSize: '10px',
              fontWeight: '900',
              fontFamily: 'sans-serif'
            }}
          />
          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);