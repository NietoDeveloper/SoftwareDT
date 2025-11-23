import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter as Router} from 'react-router-dom'
import {QueryClientProvider, QueryClient} from '@tanstack/react-query';
import './firebaseConfig'; 
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer } from 'react-toastify';

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    {/* Añadimos la propiedad 'future' con las banderas recomendadas 
      para optar por el comportamiento de v7 y silenciar las advertencias.
    */}
    <Router
      future={{
        v7_startTransition: true,
        v7_relativeSplatPath: true,
      }}
    >
      <QueryClientProvider client = {queryClient}>
        <ToastContainer />
        <App />
      </QueryClientProvider>
    </Router>
  </React.StrictMode>,
)