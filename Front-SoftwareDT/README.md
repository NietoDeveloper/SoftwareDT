<div align="center">

<!-- ANIMATED HEADER BANNER -->
<img src="https://capsule-render.vercel.app/api?type=venom&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=Software%20DT%20API&fontSize=60&fontColor=FFD700&animation=twinkling&fontAlignY=55&desc=High-Performance%20MERN%20Backend%20Engine&descSize=18&descAlignY=75&descColor=AAAAAA" width="100%"/>

<!-- TYPING ANIMATION -->
<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=22&pause=1000&color=FFD700&center=true&vCenter=true&width=600&lines=Built+for+Scale.+Built+for+Production.;Clean+Architecture+%E2%80%A2+MERN+Stack;JWT+Security+%E2%80%A2+Real-Time+Sockets;Bogot%C3%A1%2C+Colombia+%F0%9F%87%A8%F0%9F%87%B4" alt="Typing SVG" />
</a>

<br/>

<!-- BADGES -->
![Status](https://img.shields.io/badge/Status-Production%20Ready-FFD700?style=for-the-badge&logo=checkmarx&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=FFD700)

<!-- ACTIVITY GRAPH -->
<img src="https://github-readme-activity-graph.vercel.app/graph?username=NietoDeveloper&bg_color=0d1117&color=FFD700&line=FFD700&point=ffffff&area=true&hide_border=true" width="100%" />

</div>

---

## `01` — Overview

> **Software DT Backend** is the high-performance processing core designed to manage booking and health ecosystems. Built under **Clean Architecture** principles, it guarantees scalability, security, and real-time synchronization across every layer of the stack.

<div align="center">
<img src="https://github-profile-trophy.vercel.app/?username=NietoDeveloper&theme=darkhub&no-frame=true&no-bg=true&margin-w=4&row=1&column=6" width="100%"/>
</div>

---

## `02` — Elite Technology Stack

<div align="center">

| Component | Technology | Purpose |
| :---: | :---: | :--- |
| ⚡ **Runtime** | `Node.js` | Asynchronous and scalable execution |
| 🚂 **Framework** | `Express.js` | Robust RESTful architecture |
| 🔷 **Language** | `TypeScript / JS` | Strong typing and data integrity |
| 🍃 **Database** | `MongoDB Atlas` | NoSQL persistence, high availability |
| 🔐 **Auth** | `JWT & Bcrypt` | Bank-grade security |
| 🐳 **DevOps** | `Docker / Vercel` | Orchestration and continuous deployment |
| ⚡ **Real-Time** | `Socket.io` | Live notifications and events |

</div>

---

## `03` — System Architecture

```
┌─────────────────────────────────────────────────┐
│                   src/                          │
├── config/       ⚙️  DB Connections & Variables  │
├── controllers/  🧠  Business Logic              │
├── middleware/   🛡️  Security (Helmet, CORS)     │
├── models/       📑  Schemas (Users, Bookings)   │
├── routes/       🚦  RESTful Endpoints           │
├── sockets/      ⚡  Real-Time with Socket.io    │
├── utils/        🧰  Helpers & Error Handling    │
└── app.js        🚀  Main Entry Point            │
└─────────────────────────────────────────────────┘
```

---

## `04` — Core Business Flow

```mermaid
flowchart LR
    A[🔍 GET /api/services] -->|Dynamic catalog| B[👨‍⚕️ GET /api/doctors]
    B -->|Smart filtering| C[📅 POST /api/bookings]
    C -->|Validated booking| D[⚡ Socket.io Trigger]
    D -->|Instant alert| E[🖥️ Admin Dashboard]

    style A fill:#FFD700,color:#000
    style B fill:#1a1a2e,color:#FFD700
    style C fill:#1a1a2e,color:#FFD700
    style D fill:#FFD700,color:#000
    style E fill:#1a1a2e,color:#FFD700
```

---

## `05` — Security & Optimization

<div align="center">

```
╔══════════════════════════════════════════════════════╗
║  🔁  DUAL CLUSTER      │  Redundant connectivity     ║
║  🛡️  HELMET ACTIVE     │  Secure HTTP headers        ║
║  🧼  NoSQL SANITIZER   │  Anti-injection on inputs   ║
║  ⏱️  RATE LIMITING     │  Active anti-brute force    ║
╚══════════════════════════════════════════════════════╝
```

</div>

---

## `06` — Setup & Configuration

**① Clone & Install**

```bash
git clone https://github.com/NietoDeveloper/softwaredt-backend.git
cd softwaredt-backend
npm install
```

**② Environment Variables** — create `.env` from `.env.example`

```env
PORT=5000
MONGO_URI=mongodb+srv://<user>:<password>@cluster.mongodb.net/SoftwareDT
JWT_SECRET=your_master_secret_dt
NODE_ENV=production
```

**③ Run**

```bash
# Development mode
npm run dev

# Production mode
npm start
```

---

## `07` — Roadmap MVP · `May 6, 2026`

<div align="center">

![Roadmap](https://img.shields.io/badge/TARGET-May%206%2C%202026-FF4444?style=for-the-badge)

</div>

- [ ] 💬 **Pro Messaging** — Real-time chat history refactor
- [ ] 🗓️ **Auto-Status** — Automated logic for closing completed appointments
- [ ] 📊 **Real-Time Dash** — WebSocket optimization for live metrics
- [ ] 🎛️ **Control Panel** — Final integration of the admin panel

---

<div align="center">

<!-- WAVE FOOTER -->
<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer&text=Manuel%20Nieto&fontSize=28&fontColor=FFD700&animation=fadeIn&fontAlignY=65" width="100%"/>

<!-- PROFILE VIEWS + SOCIALS -->
![Profile Views](https://komarev.com/ghpvc/?username=NietoDeveloper&color=FFD700&style=for-the-badge)
[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-181717?style=for-the-badge&logo=github)](https://github.com/NietoDeveloper)

**Senior Software Architect & Full-Stack Engineer**

📍 Bogotá, Colombia 🇨🇴

</div>
