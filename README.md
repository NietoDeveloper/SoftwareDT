Software DT | Enterprise Full-Stack MERN Booking Solution 🚀Software DT is a world-class digital ecosystem designed and developed in Bogotá, Colombia. This platform represents a professional-level Full-Stack MERN (MongoDB, Express, React, Node.js) solution, engineered to connect service providers and clients through a scalable, secure, and high-performance booking architecture.Inspired by the technical excellence of Drone DT, this project follows a modular and robust philosophy to ensure production-ready stability.🏗️ Project Architecture & Monorepo StructureSoftware DT is organized as a high-performance monorepo to ensure seamless integration between the client experience and server logic.PlaintextSoftwareDT/  ← Monorepo Root
├── client/  ← Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/  ← Reusable UI & Atomic Components
│   │   ├── pages/       ← Flow: Services, Doctors, Booking, Communications
│   │   ├── hooks/       ← Custom React Hooks & WebSocket Listeners
│   │   ├── store/       ← Global State Management (Zustand)
│   │   └── assets/      ← Global Styles & Brand Identity (Gainsboro Theme)
│   ├── tailwind.config.js
│   └── package.json
├── server/  ← Backend (Node.js + Express + MongoDB Atlas)
│   ├── src/
│   │   ├── models/      ← Mongoose Schemas (Users, Bookings, Services)
│   │   ├── routes/      ← Protected RESTful API Endpoints
│   │   ├── controllers/ ← Business Logic & Auth Controllers
│   │   ├── sockets/     ← Socket.io Logic for Real-Time Updates
│   │   └── config/      ← Database & Cloud Connections
│   ├── .env.example
│   └── package.json
├── docker-compose.yml   ← Orchestration for Dev/Prod Environments
└── README.md            ← Engineering Documentation
🚀 Enginion: Secure hand-off to BookingPage.jsx for appointment confirmation.Automation: Once a service is booked, the system automatically triggers notifications via WebSockets to the provider.🔐 Security & RBACJWT Authentication: Advanced multi-device session management.Role-Based Access Control (RBAC): Defined permissions for Clients and Service Providers.🖥️ Internal Client Control Panel (User Experience)Software DT provides a high-end Internal Dashboard for users to manage their digital interactions in real-time without refreshing the browser, thanks to WebSockets (Socket.io) integration.📅 Booking ManagementActive Appointments: Real-time tracking of upcoming services with "In-Progress" status.Appointment History: A centralized archive of "Completed" and "Cancelled" services for audit and re-booking.Status Updates: Automatic UI updates when a provider accepts or completes a service.💬 Messaging & CommunicationReal-Time Chat: Direct communication channel between clients and providers.Messaging History: Persistent storage of conversations for service quality tracking.Interactive Buttons: Quick-action buttons for common inquiries and support.👤 Personalized ProfileData Management: Control over personal information, preferences, and security settings.Dynamic Dashboard: A tailored view that highlights the user's most relevant information and pending tasks.🛠️ The Professional StackLayerTechnologiesEngineering FocusFrontendReact & ViteOptimized SPA with the New React Compiler & Tailwind CSSBackendNode.js & ExpressClean Architecture & Scalable RESTful API DesignReal-TimeSocket.io (WebSockets)Instant data synchronization for bookings and messagesDatabaseMongoDB AtlasDual Cluster Architecture for High AvailabilityStateZustandLightweight and scalable global state management🎨 Official Design System (Software DT Style)The visual identity follows a corporate, minimalist aesthetic defined by our custom Tailwind configuration:JavaScript/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        gainsboro: "#DCDCDC", // Base background
        gold: "#FFD700",      // Primary Accents
        yellowColor: "#FEB60D", 
        headingColor: "#000000",
        textColor: "#000000",
      },
      backgroundColor: {
        'main': '#DCDCDC',
        'card': '#FFFFFF',
      }
    },
  },
}
🔗 Leadership & ConnectivitySoftware DT is a flagship project by NietoDeveloper (Manuel Nieto).🏆 #1 Committer in Colombia: Committers.top/Colombia🏆 #4 Committer in South & Central America: Committers.top📂 GitHub Portfolio: github.com/NietoDeveloper🌐 Live Application: softwaredt.vercel.app📍 Location: Bogotá, Colombia 🇨🇴