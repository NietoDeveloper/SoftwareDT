<div align="center">

<!-- ANIMATED HEADER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=Software%20DT&fontSize=80&fontColor=FFD700&fontAlignY=38&desc=Enterprise%20Full-Stack%20MERN%20Booking%20Solution&descAlignY=60&descColor=DCDCDC&animation=fadeIn" width="100%"/>

<!-- BADGES -->
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
</p>

<br/>

> **Software DT** — Un ecosistema digital de clase mundial diseñado y desarrollado en Bogotá, Colombia.
> Plataforma Full-Stack de nivel empresarial que conecta proveedores de servicios con clientes a través de una arquitectura de booking escalable, segura y de alto rendimiento.

<br/>

---

</div>

## 🏗️ Arquitectura del Proyecto — Monorepo

```text
SoftwareDT/                     ← Monorepo Root
├── client/                     ← Frontend (React + Vite + Tailwind CSS)
│   ├── src/
│   │   ├── components/         ← UI Atómicos & Componentes Reutilizables
│   │   ├── pages/              ← Services → Doctors → Booking → Communications
│   │   ├── hooks/              ← Custom Hooks & WebSocket Listeners
│   │   ├── store/              ← Estado Global (Zustand)
│   │   └── assets/             ← Estilos Globales & Brand Identity (Gainsboro)
│   ├── tailwind.config.js
│   └── package.json
│
├── server/                     ← Backend (Node.js + Express + MongoDB Atlas)
│   ├── src/
│   │   ├── models/             ← Mongoose Schemas (Users, Bookings, Services)
│   │   ├── routes/             ← RESTful API Endpoints Protegidos
│   │   ├── controllers/        ← Business Logic & Auth Controllers
│   │   ├── sockets/            ← Socket.io — Sincronización en Tiempo Real
│   │   └── config/             ← Database & Cloud Connections
│   ├── .env.example
│   └── package.json
│
├── docker-compose.yml          ← Orquestación Dev/Prod
└── README.md
```

---

## ✨ Flujo Técnico Principal

```mermaid
flowchart LR
    A([🧑 Cliente]) -->|Filtra servicios| B[Services.jsx]
    B -->|Matching inteligente| C[Doctors.jsx]
    C -->|Confirmación segura| D[BookingPage.jsx]
    D -->|⚡ WebSocket| E([🔔 Proveedor])
    D -->|JWT Auth| F[(MongoDB Atlas)]
    F -->|Dual Cluster| G[🔄 Alta Disponibilidad]
```

---

## 🔐 Seguridad & Control de Acceso

```mermaid
graph TD
    Login([🔑 Login]) --> JWT[JWT Multi-Device]
    JWT --> RBAC{RBAC Engine}
    RBAC -->|Cliente| ClientUI[Dashboard Cliente]
    RBAC -->|Proveedor| ProviderUI[Panel Proveedor]
    RBAC -->|Admin| AdminUI[Control Total]
```

---

## ⚡ Features del Dashboard Interno

<div align="center">

| Módulo | Descripción | Tecnología |
|:---|:---|:---:|
| 📅 **Booking Manager** | Tracking en tiempo real: Activo → En Progreso → Completado | Socket.io |
| 📜 **Historial** | Archivo centralizado para auditoría y re-booking | MongoDB |
| 🔄 **Live Status** | UI se actualiza automáticamente sin recargar | WebSockets |
| 💬 **Chat en Tiempo Real** | Canal directo cliente ↔ proveedor baja latencia | Socket.io |
| 🗂️ **Historial de Mensajes** | Persistencia de conversaciones para control de calidad | MongoDB |
| 🎛️ **HUD Interactivo** | Botones de acción rápida e historial de soporte | React |

</div>

---

## 🛠️ Stack Tecnológico

<div align="center">

| Capa | Tecnologías | Enfoque |
|:---|:---|:---|
| 🎨 **Frontend** | React • Vite • Tailwind CSS | SPA optimizada con el New React Compiler |
| ⚙️ **Backend** | Node.js • Express | Clean Architecture & RESTful API Escalable |
| ⚡ **Real-Time** | Socket.io (WebSockets) | Sincronización instantánea de bookings y mensajes |
| 🗄️ **Database** | MongoDB Atlas | Dual Cluster para Alta Disponibilidad |
| 🧠 **State** | Zustand | Estado global ligero y de alto rendimiento |
| 🐳 **Infra** | Docker Compose | Entornos de dev y producción consistentes |

</div>

---

## 🎨 Design System Oficial — Software DT

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        gainsboro:    "#DCDCDC",  // 🩶 Base Background — Minimalismo Corporativo
        gold:         "#FFD700",  // 🟡 Primary Accent — Identidad de Marca
        yellowColor:  "#FEB60D",  // 🟠 Secondary Accent
        headingColor: "#000000",  // ⚫ Tipografía Principal
        textColor:    "#000000",  // ⚫ Cuerpo de Texto
      },
      backgroundColor: {
        'main': '#DCDCDC',        // Fondo base global
        'card': '#FFFFFF',        // Cards y paneles
      },
    },
  },
}
```

---

## 🚀 Filosofía de Ingeniería

```text
╔══════════════════════════════════════════════════════════════╗
║                                                              ║
║   "Every line of code is optimized for performance          ║
║    and security. Production-ready by default."              ║
║                                                              ║
║                              — NietoDeveloper Standard      ║
╚══════════════════════════════════════════════════════════════╝
```

- 🏆 **NietoDeveloper Standard** — Cada línea de código optimizada para rendimiento y seguridad
- 🌐 **Infraestructura Escalable** — MongoDB Atlas con estrategia Dual Cluster
- 🎯 **Production-Ready** — Workflows reales de booking con zero downtime
- ⚡ **Real-Time First** — Sincronización instantánea como core del sistema

---

## 🔗 Links & Conectividad

<div align="center">

[![Live App](https://img.shields.io/badge/🌐%20Live%20App-softwaredt.vercel.app-FFD700?style=for-the-badge&logoColor=000)](https://softwaredt.vercel.app)
[![GitHub](https://img.shields.io/badge/📂%20GitHub-NietoDeveloper-000000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![#1 Colombia](https://img.shields.io/badge/🏆%20%231%20Committer-Colombia-DCDCDC?style=for-the-badge)](https://committers.top/colombia)
[![#4 LATAM](https://img.shields.io/badge/🏆%20%234%20Committer-South%20%26%20Central%20Am

