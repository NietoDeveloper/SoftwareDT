import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';

import { BrowserRouter } from 'react-router-dom';
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import { UserProvider } from './context/UserContext'; 
import { ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css"; 

import App from './App'; 




const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error("SDT CRITICAL ERROR: Nodo 'root' no encontrado en el DOM.");
}

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

          <App />
        </BrowserRouter>
      </QueryClientProvider>
    </UserProvider>
  </React.StrictMode>
);