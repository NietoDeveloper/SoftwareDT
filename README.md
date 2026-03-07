<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=220&section=header&text=Software%20DT&fontSize=85&fontColor=FFD700&fontAlignY=40&desc=Enterprise%20Full-Stack%20MERN%20Booking%20Solution%20🚀&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

<p align="center">
  <img src="https://img.shields.io/badge/Status-Production%20Ready-FFD700?style=for-the-badge&logo=checkmarx&logoColor=000000"/>
  <img src="https://img.shields.io/badge/Stack-MERN-000000?style=for-the-badge&logo=mongodb&logoColor=FFD700"/>
  <img src="https://img.shields.io/badge/Real--Time-Socket.io-010101?style=for-the-badge&logo=socket.io&logoColor=FFD700"/>
  <img src="https://img.shields.io/badge/Bogotá-Colombia%20🇨🇴-DCDCDC?style=for-the-badge"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?style=for-the-badge&logo=react&logoColor=000"/>
  <img src="https://img.shields.io/badge/Node.js-Express-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Compose-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-State-FF6B35?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-Frontend-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
</p>

<br/>

> **Software DT** is a digital ecosystem designed and developed in Bogotá, Colombia.
> A professional-level Full-Stack **MERN** solution engineered to connect service providers and clients
> through a scalable, secure, and high-performance booking architecture.
>
> *Inspired by the technical — modular, robust, production-ready.*

<br/>

</div>

---

## 🏗️ Project Architecture & Monorepo Structure

```text
SoftwareDT/                     ← Monorepo Root
├── client/                     ← Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         ← Reusable UI & Atomic Components
│   │   ├── pages/              ← Services → Doctors → Booking → Communications
│   │   ├── hooks/              ← Custom React Hooks & WebSocket Listeners
│   │   ├── store/              ← Global State Management (Zustand)
│   │   └── assets/             ← Global Styles & Brand Identity (Gainsboro Theme)
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     ← Backend (Node.js + Express + MongoDB Atlas)
│   ├── src/
│   │   ├── models/             ← Mongoose Schemas (Users, Bookings, Services)
│   │   ├── routes/             ← Protected RESTful API Endpoints
│   │   ├── controllers/        ← Business Logic & Auth Controllers
│   │   ├── sockets/            ← Socket.io Logic for Real-Time Updates
│   │   └── config/             ← Database & Cloud Connections
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml          ← Orchestration for Dev/Prod Environments
└── README.md                   ← Engineering Documentation
```

---

## 🚀 Engineering Excellence & Vision

```text
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Every line of code is optimized for performance              ║
║    and security. Production-ready by default."                  ║
║                                                                  ║
║                                   — NietoDeveloper Standard     ║
╚══════════════════════════════════════════════════════════════════╝
```

- 🏆 **NietoDeveloper Standard** — Built under the philosophy of the **#1 Committer in Colombia**. Every line of code is optimized for performance and security.
- 🌐 **Scalable Infrastructure** — Hybrid approach with MongoDB Atlas **(Dual Cluster Strategy)** for maximum uptime.
- 🎯 **Global Reference** — Developed with elite technical standards to serve as a global benchmark for high-level software engineering.
- ⚡ **Production-Ready** — Manages real-world workflows for active booking services with zero downtime and real-time synchronization.

---

## ✨ Core Features & Technical Flow

### 🔄 Intelligent Booking & Service Logic

```mermaid
flowchart LR
    A([🧑 Client]) -->|Filter & Select| B[Services.jsx]
    B -->|Intelligent Matching| C[selectservice.jsx]
    C -->|Secure Hand-off| D[BookingPage.jsx]
    D -->|⚡ WebSocket Trigger| E([🔔 Provider Notified])
    D -->|JWT Validation| F[(MongoDB Atlas)]
    F -->|Dual Cluster| G[🔄 High Availability]

    style A fill:#FFD700,color:#000
    style E fill:#FFD700,color:#000
    style F fill:#47A248,color:#fff
    style G fill:#DCDCDC,color:#000
```

- **Service Selection** — Users filter and choose specialized services in `Services.jsx`
- **Provider Matching** — Data is contextually transferred to `.jsx` to match with specialists
- **Finalization** — Secure hand-off to `BookingPage.jsx` for appointment confirmation and real-time validation
- **Automation** — Once a service is booked, the system triggers instant notifications via WebSockets to the provider

---

### 🔐 Security & RBAC

```mermaid
graph TD
    Login([🔑 Login Request]) --> JWT[JWT Multi-Device Auth]
    JWT --> RBAC{⚙️ RBAC Engine}
    RBAC -->|Client Role| ClientUI[🧑 Client Dashboard]
    RBAC -->|Provider Role| ProviderUI[🛠️ Provider Panel]
    RBAC -->|Admin Role| AdminUI[👑 Full Control]

    style Login fill:#FFD700,color:#000
    style RBAC fill:#000,color:#FFD700
    style AdminUI fill:#FFD700,color:#000
```

- **JWT Authentication** — Advanced multi-device session management strategy
- **Role-Based Access Control (RBAC)** — Differentiated interfaces and permissions for Clients and Service Providers/Admins

---

## 🖥️ Internal Client Control Panel

> Software DT provides a high-end Internal Dashboard where users manage their digital interactions **in real-time without refreshing the browser**, powered by Socket.io.

<div align="center">

| Module | Description | Tech |
|:---|:---|:---:|
| 📅 **Booking Management** | Track **Active → In-Progress → Completed** appointments instantly | Socket.io |
| 📜 **Appointment History** | Centralized archive for audit, reviews, and re-booking | MongoDB |
| 🔄 **Instant Status Updates** | UI updates automatically when a provider changes service status | WebSockets |
| 💬 **Real-Time Chat** | Direct low-latency communication between clients and providers | Socket.io |
| 🗂️ **Messaging History** | Persistent storage of conversations for service quality tracking | MongoDB |
| 🎛️ **Interactive HUD** | Quick-action buttons for common inquiries and support history | React |

</div>

---

## 🛠️ The Professional Stack

<div align="center">

| Layer | Technologies | Engineering Focus |
|:---|:---|:---|
| 🎨 **Frontend** | React • Vite • Tailwind CSS | Optimized SPA with the New React Compiler |
| ⚙️ **Backend** | Node.js • Express | Clean Architecture & Scalable RESTful API Design |
| ⚡ **Real-Time** | Socket.io (WebSockets) | Instant data sync for bookings and messages |
| 🗄️ **Database** | MongoDB Atlas | Dual Cluster Architecture for High Availability |
| 🧠 **State** | Zustand | Lightweight and performant global state management |
| 🐳 **Infrastructure** | Docker Compose | Consistent development and production environments |

</div>

---

## 🎨 Official Design System — Software DT Style

> The visual identity follows a **corporate, minimalist aesthetic** defined by our custom Tailwind configuration:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        gainsboro:    "#DCDCDC",  // 🩶 Base Background — Corporate Minimalism
        gold:         "#FFD700",  // 🟡 Primary Accent — Brand Identity
        yellowColor:  "#FEB60D",  // 🟠 Secondary Accent
        headingColor: "#000000",  // ⚫ Main Typography
        textColor:    "#000000",  // ⚫ Body Text
      },
      backgroundColor: {
        'main': '#DCDCDC',        // Global base background
        'card': '#FFFFFF',        // Cards and panels
      },
    },
  },
}
```

---

## 🔗 Leadership & Connectivity

<div align="center">

[![Live App](https://img.shields.io/badge/🌐%20Live%20App-softwaredt.vercel.app-FFD700?style=for-the-badge&logoColor=000)](https://softwaredt.vercel.app)
[![GitHub](https://img.shields.io/badge/📂%20GitHub-NietoDeveloper-000000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![#1 Colombia](https://img.shields.io/badge/🏆%20%231%20Committer-Colombia-DCDCDC?style=for-the-badge)](https://committers.top/colombia)
[![#4 LATAM](https://img.shields.io/badge/🏆%20%234%20Committer-South%20%26%20Central%20America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

*Software DT is a flagship project by* **NietoDeveloper — Manuel Nieto**

*Developed with technical rigor to be the best in Colombia.*

📍 Bogotá, Colombia 🇨🇴

</div>

---

<div align="center">
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>
</div>
