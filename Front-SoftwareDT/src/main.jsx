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
