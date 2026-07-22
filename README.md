<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=SOFTWARE%20DT&fontSize=90&fontColor=FFD700&fontAlignY=42&desc=⚡%20Enterprise%20MERN%20Ecosystem%20·%20Digital%20Twin%20Architecture%20·%20Docker%20Powered&descAlignY=62&descColor=DCDCDC&animation=fadeIn" width="100%"/>

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=700&size=20&duration=2800&pause=900&color=FFD700&center=true&vCenter=true&width=750&lines=⚡+Production-Grade+MERN+Ecosystem;🐳+Fully+Dockerized+%7C+Zero+Local+Dependencies;🔒+Dual-Cluster+MongoDB+Atlas+Architecture;📊+Real-Time+Admin+Dashboard+%7C+Socket.io;☁️+AWS+S3+Centralized+Media+%7C+Dynamic+Rendering;🚀+AWS+ECS%2FFargate+%2B+Vercel+%7C+CI%2FCD+via+Git;🏆+%231+GitHub+Committer+in+Colombia)](https://git.io/typing-svg)

<br/>

<p align="center">
  <a href="https://committers.top/colombia">
    <img src="https://img.shields.io/badge/🥇_No._1_Committer-Colombia-FFD700?style=for-the-badge&logoColor=000000"/>
  </a>
  <a href="https://committers.top">
    <img src="https://img.shields.io/badge/🏆_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge&logoColor=000000"/>
  </a>
  <img src="https://img.shields.io/badge/Status-Production_Ready-00D26A?style=for-the-badge&logo=checkmarx&logoColor=white"/>
  <img src="https://img.shields.io/badge/Security-Level_S%2B-FF0000?style=for-the-badge&logoColor=white"/>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-19-61DAFB?style=for-the-badge&logo=react&logoColor=000"/>
  <img src="https://img.shields.io/badge/Node.js-22_LTS-339933?style=for-the-badge&logo=node.js&logoColor=white"/>
  <img src="https://img.shields.io/badge/TypeScript-5.7-3178C6?style=for-the-badge&logo=typescript&logoColor=white"/>
  <img src="https://img.shields.io/badge/MongoDB-Atlas-47A248?style=for-the-badge&logo=mongodb&logoColor=white"/>
  <img src="https://img.shields.io/badge/Docker-Build_Cloud-2496ED?style=for-the-badge&logo=docker&logoColor=white"/>
  <img src="https://img.shields.io/badge/Zustand-State-FF6B35?style=for-the-badge&logo=react&logoColor=white"/>
  <img src="https://img.shields.io/badge/Socket.io-Real--Time-010101?style=for-the-badge&logo=socket.io&logoColor=white"/>
  <img src="https://img.shields.io/badge/Vite-6-646CFF?style=for-the-badge&logo=vite&logoColor=white"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-4-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS-ECS%2FFargate-FF9900?style=for-the-badge&logo=amazonaws&logoColor=white"/>
  <img src="https://img.shields.io/badge/AWS_S3-Media_CDN-FF9900?style=for-the-badge&logo=amazons3&logoColor=white"/>
</p>

<p align="center">
  <a href="https://softwaredt.vercel.app">
    <img src="https://img.shields.io/badge/🌐_Live_App-softwaredt.vercel.app-FFD700?style=for-the-badge"/>
  </a>
  <a href="https://github.com/NietoDeveloper/softwaredt">
    <img src="https://img.shields.io/badge/📂_Source-NietoDeveloper%2FSoftwareDT-000000?style=for-the-badge&logo=github&logoColor=FFD700"/>
  </a>
</p>

<br/>

> **Software DT Ecosystem:** *La plataforma de e-commerce, agendamiento y pagos que conecta clientes con asesorías técnicas y productos de software — el motor de transacciones, comunicación y booking detrás de nuestro ecosistema unificado de Digital Twin.*

> 🐳 Software DT: Client Bookings. A high-performance, enterprise-grade platform built with the MERN stack, TypeScript, and Docker. State-of-the-art architecture for real-time asset monitoring, agendamiento de citas, pago de asesorías y venta de productos de software
> a través de tecnología **Digital Twin**. Un monorepo Full-Stack **MERN** de nivel productivo
> que conecta proveedores de servicio y clientes vía una arquitectura escalable, segura y Dockerizada.
>
> *Modular · Robust · Obsessively Production-Ready · Built in Bogotá 🇨🇴*

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

</div>

---

## 🏗️ System Architecture

```
╔══════════════════════════════════════════════════════════════════════╗
║                        SOFTWARE DT ECOSYSTEM                         ║
╠══════════════════════════════════════════════════════════════════════╣
║                                                                      ║
║   ┌─────────────────────┐       ┌──────────────────────────────┐     ║
║   │   CLIENT CLUSTER    │       │       ADMIN CLUSTER          │     ║
║   │                     │       │                              │     ║
║   │  React 19 + Vite 6  │◄─────►│  Real-Time Dashboard         │     ║
║   │  Tailwind 4 + Zustand│      │  Socket.io · Live Metrics    │     ║
║   │  Port: 5173         │       │  RBAC · JWT Guard            │     ║
║   └──────────┬──────────┘       └─────────────┬────────────────┘     ║
║              │                                │                      ║
║              └──────────────┬─────────────────┘                      ║
║                             ▼                                        ║
║              ┌──────────────────────────────┐                        ║
║              │  Node.js 22 LTS + Express     │                       ║
║              │  Modular Services · JWT       │                       ║
║              │  Socket.io · Port: 8080       │                       ║
║              └──────────────┬───────────────┘                        ║
║                             │                                        ║
║           ┌─────────────────┼─────────────────┐                      ║
║           ▼                 ▼                 ▼                      ║
║   ┌───────────────────┐ ┌──────────────┐ ┌───────────────────────┐   ║
║   │  MongoDB Atlas    │ │  MongoDB     │ │  AWS S3               │   ║
║   │  Cluster · USERS  │ │  Atlas ·     │ │  software-dt-assets   │   ║
║   │  High Availability│ │  BOOKINGS    │ │  -2026 (Media CDN)    │   ║
║   └───────────────────┘ └──────────────┘ └───────────────────────┘   ║
╚══════════════════════════════════════════════════════════════════════╝
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## 📂 Monorepo Structure

```text
SoftwareDT/                         ← Monorepo Root
│
├── 🔵 Front-SoftwareDT/            ← Frontend (React 19 + Vite 6 + Tailwind 4)
│   ├── src/
│   │   ├── components/             ← Atomic & Reusable UI Components
│   │   ├── pages/                  ← Services → Booking → Dashboard → Comms
│   │   │   └── Products.jsx        ← Renderizado dinámico imagen/video (S3)
│   │   ├── hooks/                  ← Custom React Hooks & WS Listeners
│   │   ├── store/                  ← Zustand Global State Stores
│   │   └── assets/                 ← Brand Identity & Global Styles
│   ├── Dockerfile                  ← Dev: HMR on :5173 · Prod: Nginx Alpine
│   ├── .dockerignore
│   ├── tailwind.config.js
│   └── package.json
│
├── 🟢 Back-SoftwareDT/             ← Backend (Node.js 22 LTS + Express + MongoDB)
│   ├── src/
│   │   ├── models/                 ← Mongoose Schemas (Users · Bookings · Services · Media)
│   │   ├── routes/                 ← Protected RESTful API Endpoints
│   │   ├── controllers/            ← Business Logic & Auth Controllers
│   │   ├── sockets/                ← Socket.io Real-Time Event Logic
│   │   └── config/                 ← DB Connections & AWS S3 Config
│   ├── Dockerfile                  ← Node:22-Alpine Container
│   ├── .dockerignore
│   ├── .env.example
│   └── package.json
│
├── 🤖 docker-compose.yml           ← Master Orchestrator (Dev + Prod)
└── 📖 README.md
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## 🛠️ Unified Technology Stack

<div align="center">

| Layer | Technologies | Engineering Focus |
|:------|:-------------|:------------------|
| 🎨 **Frontend** | React 19 · Vite 6 · Tailwind CSS 4 · TypeScript 5.7 | Server Components & Actions · React Compiler |
| 🧠 **State** | Zustand | Lightweight global state · Zero re-renders |
| ⚙️ **Backend** | Node.js 22 LTS · Express | Modular services · Clean Architecture |
| ⚡ **Real-Time** | Socket.io (WebSockets) | Live booking sync · Instant notifications |
| 🗄️ **Database** | MongoDB Atlas (Dual Cluster) | Users cluster + Bookings cluster |
| ☁️ **Media CDN** | AWS S3 (`software-dt-assets-2026`) | Video/imagen centralizados · Bucket Policy pública |
| 🔑 **Auth** | JWT · RBAC | Multi-device sessions · Role isolation |
| 🐳 **DevOps** | Docker · Docker Build Cloud · Alpine Linux | Container-first · Accelerated CI/CD builds |
| ☁️ **Cloud** | Vercel · AWS ECS/Fargate · Railway | CI/CD via Git · Elastic serverless scaling |

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## ✨ Core Features & Technical Flow

### 🔄 Intelligent Booking Pipeline

```mermaid
flowchart LR
    A([👤 Client]) -->|Filter & Select| B[Services.jsx]
    B -->|Smart Match| C[selectservice.jsx]
    C -->|Secure Hand-off| D[BookingPage.jsx]
    D -->|⚡ WebSocket Event| E([🔔 Provider Alert])
    D -->|JWT Validated| F[(MongoDB Atlas\nBookings Cluster)]
    F -->|Dual Cluster Sync| G[🔄 High Availability]
    G -->|Real-Time Push| H[👑 Admin Dashboard]

    style A fill:#FFD700,color:#000,stroke:#FFD700
    style E fill:#FFD700,color:#000,stroke:#FFD700
    style F fill:#47A248,color:#fff,stroke:#47A248
    style G fill:#DCDCDC,color:#000,stroke:#DCDCDC
    style H fill:#000,color:#FFD700,stroke:#FFD700
```

### 🔐 Security & Role-Based Access Control

```mermaid
graph TD
    R([🔑 Auth Request]) --> V[Input Validation]
    V --> JWT[JWT Engine · Multi-Device]
    JWT --> RBAC{⚙️ RBAC Guard}
    RBAC -->|client| C[🧑 Client Dashboard]
    RBAC -->|provider| P[🛠️ Provider Panel]
    RBAC -->|admin| A[👑 Full Admin Control]
    RBAC -->|unauthorized| X[403 · Access Denied]

    style R fill:#FFD700,color:#000
    style RBAC fill:#0a0a0a,color:#FFD700,stroke:#FFD700
    style A fill:#FFD700,color:#000
    style X fill:#FF0000,color:#fff
```

### 🎬 Dynamic Multimedia Pipeline (AWS S3 → MongoDB → UI)

```mermaid
flowchart LR
    S3[("☁️ AWS S3\nsoftware-dt-assets-2026\n.mp4 · .png/.jpg")] -->|Bucket Policy\nPublic Read| CDN[🌍 Public Delivery]
    CDN -->|URL Reference| DB[(MongoDB Atlas\nProducts Schema)]
    DB -->|mediaType: image | video| API[Back-SoftwareDT API]
    API -->|JSON Payload| UI[Products.jsx]
    UI -->|Conditional Render| IMG[🖼️ Static Image]
    UI -->|Conditional Render| VID[🎥 Looping Video]

    style S3 fill:#FF9900,color:#000,stroke:#FF9900
    style CDN fill:#DCDCDC,color:#000
    style DB fill:#47A248,color:#fff
    style UI fill:#000,color:#FFD700,stroke:#FFD700
    style IMG fill:#FFD700,color:#000
    style VID fill:#FFD700,color:#000
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## ☁️ Últimas Actualizaciones de la Plataforma

<div align="center">

[![Typing SVG](https://readme-typing-svg.demolab.com?font=Share+Tech+Mono&weight=600&size=16&duration=3200&pause=1000&color=DCDCDC&center=true&vCenter=true&width=700&lines=☁️+AWS+S3+Centralized+Assets+Bucket;🎬+Dynamic+Image%2FVideo+Rendering+in+Products.jsx;🔓+Public+Read+Bucket+Policy+%7C+Zero+Blocking;🔄+Live+Catalog+Updates+%7C+No+Redeploy+Required)](https://git.io/typing-svg)

</div>

- ☁️ **Centralización de Assets en la Nube (AWS S3):** migración y estructuración completa de recursos multimedia (videos corporativos `.mp4` e imágenes HD) hacia el bucket centralizado `software-dt-assets-2026`, optimizando tiempos de carga y estandarizando la identidad visual del proyecto.
- 🎬 **Integración Multimedia Dinámica en Productos:** actualización del esquema de datos en MongoDB Atlas y del componente frontend `Products.jsx` para renderizado inteligente de contenido multimedia, alternando de forma nativa entre imágenes estáticas y video en bucle (ej. App Webs E-commerce y Dashboards).
- 🔐 **Seguridad y Políticas de Acceso en Infraestructura:** configuración de `Bucket Policy` de lectura pública en AWS S3 para garantizar entrega fluida y sin bloqueos de los recursos hacia los clientes web.
- 🔄 **Consolidación de Arquitectura Full-Stack:** base de datos centralizada en MongoDB Atlas sincronizada con backend en producción y frontend desplegado, permitiendo actualizar catálogos y multimedia en tiempo real sin redespliegues constantes de código.

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## 🖥️ Real-Time Admin Control Panel

> Live operational intelligence — **no browser refresh required** — powered by Socket.io and dual-cluster MongoDB Atlas.

<div align="center">

| Module | Capability | Tech |
|:-------|:-----------|:----:|
| 📅 **Booking Manager** | Track `Active → In-Progress → Completed` in real-time | Socket.io |
| 📊 **Live Metrics** | Daily · Monthly · Annual KPIs aggregated instantly | MongoDB |
| 📜 **Appointment History** | Full audit trail · Re-booking · Service reviews | MongoDB |
| 🔄 **Status Sync** | UI updates the moment a provider changes service status | WebSockets |
| 💬 **Real-Time Chat** | Low-latency direct messaging: client ↔ provider | Socket.io |
| 🗂️ **Message History** | Persistent conversation storage for quality tracking | MongoDB |
| 🎛️ **Interactive HUD** | Quick-action controls · Support flow · Inquiry history | React |
| 🎬 **Media Manager** | Alta/edición de imágenes y video de producto vía S3 | AWS S3 |

</div>

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## 🐳 Docker Infrastructure Guide

> **Zero local dependencies.** Docker handles Node.js, installs, networking, and port binding. Identical behavior from your laptop to AWS ECS/Fargate.

### Prerequisites

Install **[Docker Desktop](https://www.docker.com/products/docker-desktop/)** and ensure the engine is running. Recommended: enable **Docker Build Cloud** for accelerated multi-arch image builds in CI/CD.

### ⚡ Quick Start — 3 Steps to Full Ecosystem

**Step 1 — Clone the repository**

```bash
git clone https://github.com/NietoDeveloper/softwaredt.git
cd SoftwareDT
```

**Step 2 — Configure environment variables**

```bash
# Backend — MongoDB Atlas URIs + JWT secrets + AWS S3 credentials
cp Back-SoftwareDT/.env.example Back-SoftwareDT/.env

# Frontend — API endpoints
cp Front-SoftwareDT/.env.example Front-SoftwareDT/.env
```

```env
# Back-SoftwareDT/.env  (fill in your values)
MONGO_URI_USERS=mongodb+srv://user:pass@cluster-users.mongodb.net/dt_users
MONGO_URI_BOOKINGS=mongodb+srv://user:pass@cluster-bookings.mongodb.net/dt_bookings
JWT_SECRET=your_ultra_secure_secret_here
JWT_EXPIRES_IN=7d
PORT=8080

# AWS S3 — Centralized Media Bucket
AWS_REGION=us-east-1
AWS_S3_BUCKET=software-dt-assets-2026
AWS_ACCESS_KEY_ID=your-access-key
AWS_SECRET_ACCESS_KEY=your-secret-key
```

**Step 3 — Launch the master orchestrator**

```bash
docker-compose up --build
```

```
🤖 What Docker does automatically:
   ├── Pulls Node:22-alpine images (lightweight, ~50MB)
   ├── Installs all npm dependencies in isolation
   ├── Creates a private virtual network between services
   ├── Mounts volumes for Hot Module Replacement (dev)
   └── Spins up both servers simultaneously

   🖥️  Frontend  →  http://localhost:5173
   🛰️  Backend   →  http://localhost:8080
```

---

### 🏭 Environment Configurations

#### Development — HMR Enabled

```dockerfile
# Front-SoftwareDT/Dockerfile.dev
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

```yaml
# docker-compose.yml (dev excerpt)
services:
  frontend:
    build:
      context: ./Front-SoftwareDT
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - ./Front-SoftwareDT:/app      # HMR: live code reflection
      - /app/node_modules
    environment:
      - NODE_ENV=development

  backend:
    build: ./Back-SoftwareDT
    ports:
      - "8080:8080"
    env_file:
      - ./Back-SoftwareDT/.env
    depends_on:
      - frontend
```

#### Production — Multi-Stage Nginx Build

```dockerfile
# Front-SoftwareDT/Dockerfile (production)
# ── Stage 1: Compile ─────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf       /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 🛑 Operations & Maintenance

```bash
# Stop ecosystem & release all ports
docker-compose down

# Rebuild after package.json changes
docker-compose up --build --force-recreate

# View live logs (all services)
docker-compose logs -f

# Logs for a specific service
docker-compose logs -f frontend
docker-compose logs -f backend

# Check running containers
docker ps

# Clean up unused images & containers
docker system prune -f
```

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## 🎨 Official Design System

> Industrial high-end aesthetic · Dark-first · Gold-accented precision

```javascript
/** tailwind.config.js — Software DT Design Tokens (Tailwind CSS 4) */
export default {
  theme: {
    extend: {
      colors: {
        gainsboro:    "#DCDCDC",   // 🩶 Corporate base background
        gold:         "#FFD700",   // 🟡 Primary brand accent
        yellowColor:  "#FEB60D",   // 🟠 Secondary accent
        headingColor: "#000000",   // ⚫ Display typography
        textColor:    "#000000",   // ⚫ Body text
      },
      backgroundColor: {
        'main':    '#DCDCDC',      // Global base
        'card':    '#FFFFFF',      // Cards & panels
        'surface': '#111111',      // Dark surfaces
      },
    },
  },
}
```

| Token | Hex | Role |
|:------|:----|:-----|
| `gold` | `#FFD700` | Primary accent · CTAs · Brand highlights |
| `gainsboro` | `#DCDCDC` | Base background · Secondary text · Borders |
| `surface` | `#111111` | Dark mode surfaces · Cards · Panels |
| `heading` | `#000000` | Display & heading typography |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## 🚀 Deployment

```
┌─────────────────────────────────────────────────────────┐
│                  CI/CD PIPELINE                         │
│                                                         │
│  git push origin main                                   │
│       │                                                 │
│       ├──► Vercel (Frontend)  → Auto-deploy in ~45s     │
│       │    softwaredt.vercel.app                        │
│       │                                                 │
│       ├──► AWS ECS/Fargate (Backend) → Container deploy │
│       │    api.softwaredt.com:8080                      │
│       │                                                 │
│       └──► AWS S3 → Sync assets (software-dt-assets-2026)│
└─────────────────────────────────────────────────────────┘
```

| Environment | Frontend | Backend |
|:------------|:---------|:--------|
| **Development** | `http://localhost:5173` | `http://localhost:8080` |
| **Production** | [softwaredt.com](https://softwaredt.com) | AWS ECS/Fargate |

<img src="https://capsule-render.vercel.app/api?type=rect&color=gradient&customColorList=0,2,2,5,30&height=3&width=100%25" width="100%"/>

## 🔗 Links & Resources

<div align="center">

| Resource | Link |
|:---------|:-----|
| 🌐 **Live Application** | [softwaredt.com](https://softwaredt.com) |
| 📂 **GitHub Repository** | [github.com/NietoDeveloper/softwaredt](https://github.com/NietoDeveloper/softwaredt) |
| 👤 **Developer Profile** | [github.com/NietoDeveloper](https://github.com/NietoDeveloper) |
| 🏆 **#1 Colombia Ranking** | [committers.top/colombia](https://committers.top/colombia) |
| 🌎 **Top LATAM Ranking** | [committers.top](https://committers.top) |
| 🐳 **Docker Desktop** | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) |

</div>

---

<div align="center">

[![Live App](https://img.shields.io/badge/🌐_Live_App-softwaredt.com-FFD700?style=for-the-badge)](https://softwaredt.com)
[![GitHub Profile](https://img.shields.io/badge/GitHub-NietoDeveloper-000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![#1 Colombia](https://img.shields.io/badge/🥇_%231_Committer-Colombia-FFD700?style=for-the-badge)](https://committers.top/colombia)
[![LATAM Top](https://img.shields.io/badge/🌎_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Every line of code is optimized for performance               ║
║    and security. Production-ready by default."                   ║
║                                                                  ║
║                               — NietoDeveloper Standard          ║
╚══════════════════════════════════════════════════════════════════╝
```

*Software DT — Built by **NietoDeveloper · Manuel Nieto***

*Developed with technical rigor in* 📍 **Bogotá, Colombia** 🇨🇴

Last Updated: July 21, 2026

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
