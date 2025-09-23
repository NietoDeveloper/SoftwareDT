import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import App from './pages/App.jsx'
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
    <BrowserRouter>
    <Routes>
      <Route path="/App" element={<App />} />
      <Route path="/Contact" element={<Contact />} />
    </Routes>


  </BrowserRouter>
)
