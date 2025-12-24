import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import { BrowserRouter } from 'react-router-dom'
import { QueryClientProvider, QueryClient } from '@tanstack/react-query';
import './firebaseConfig'; 
import "react-toastify/dist/ReactToastify.css"; 
import { ToastContainer } from 'react-toastify';
// IMPORTACIÓN CLAVE
import { UserProvider } from './context/UserContext.jsx'; 

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <BrowserRouter 
      future={{ 
        v7_startTransition: true, 
        v7_relativeSplatPath: true 
      }}
    >
      <QueryClientProvider client={queryClient}>
        {/* EL PROVIDER DEBE ENVOLVER AL APP PARA QUE EL CONTEXTO EXISTA */}
        <UserProvider>
          <ToastContainer 
            theme="dark"
            position="top-right"
            autoClose={3000}
            closeOnClick
            pauseOnHover={false}
          />
          <App />
        </UserProvider>
      </QueryClientProvider>
    </BrowserRouter>
  </React.StrictMode>,
)