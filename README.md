# Software DT | Enterprise Full-Stack MERN Booking Solution 🚀

**Software DT** is a world-class digital ecosystem designed and developed in Bogotá, Colombia.  
This platform represents a professional-level Full-Stack **MERN** (MongoDB, Express, React, Node.js) solution, engineered to connect service providers and clients through a scalable, secure, and high-performance booking architecture.

Inspired by the technical excellence of Drone DT, this project follows a modular and robust philosophy to ensure production-ready stability and extreme performance.

---

## 🏗️ Project Architecture & Monorepo Structure

Software DT is organized as a high-performance monorepo to ensure seamless integration between the client experience and server logic.

```text
SoftwareDT/  ← Monorepo Root
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
├── docker-compose.yml   ← Orchestration for n: Users filter and choose specialized services in Services.jsx.Provider Matching: Data is contextually transferred to Doctors.jsx (or selectservice.jsx) to match with specialists.Finalization: Secure hand-off to BookingPage.jsx for appointment confirmation and real-time validation.Automation: Once a service is booked, the system triggers instant notifications via WebSockets to the provider.🔐 Security & RBACJWT Authentication: Advanced multi-device session management strategy.Role-Based Access Control (RBAC): Differentiated interfaces and permissions for Clients and Service Providers/Admins.🖥️ Internal Client Control Panel (User Experience)Software DT provides a high-end Internal Dashboard where users manage their digital interactions in real-time without refreshing the browser, powered by Socket.io.📅 Booking ManagementReal-Time Tracking: Monitor "Active", "In-Progress", and "Completed" appointments instantly.Appointment History: Centralized archive of past services for audit, reviews, and re-booking.Instant Status Updates: UI components update automatically via WebSockets when a provider changes the status of a service.💬 Messaging & CommunicationReal-Time Chat: Direct, low-latency communication channel between clients and providers.Messaging History: Persistent storage of conversations for service quality tracking.Interactive HUD: Quick-action buttons for common inquiries and support history.🛠️ The Professional StackLayerTechnologiesEngineering FocusFrontendReact • Vite • Tailwind CSSOptimized SPA with the New React CompilerBackendNode.js • ExpressClean Architecture & Scalable RESTful API DesignReal-TimeSocket.io (WebSockets)Instant data synchronization for bookings and messagesDatabaseMongoDB AtlasDual Cluster Architecture for High AvailabilityStateZustandLightweight and performant global state managementInfrastructureDocker ComposeConsistent development and production environments🎨 Official Design System (Software DT Style)The visual identity follows a corporate, minimalist aesthetic defined by our custom Tailwind configuration:JavaScript/** @type {import('tailwindcss').Config} */
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