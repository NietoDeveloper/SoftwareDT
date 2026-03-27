<div align="center">

<img src="https://capsule-render.vercel.app/api?type=venom&color=gradient&customColorList=0,2,2,5,30&height=200&section=header&text=Software%20DT%20API&fontSize=60&fontColor=FFD700&animation=twinkling&fontAlignY=55&desc=High-Performance%20Backend%20Engine%20%E2%80%A2%20Clean%20Architecture&descSize=18&descAlignY=75&descColor=AAAAAA" width="100%"/>

<a href="https://git.io/typing-svg">
  <img src="https://readme-typing-svg.demolab.com?font=JetBrains+Mono&weight=700&size=20&pause=1000&color=FFD700&center=true&vCenter=true&width=650&lines=Built+for+Scale.+Built+for+Production.;Routes+%E2%86%92+Controllers+%E2%86%92+Services+%E2%86%92+Models;JWT+Security+%E2%80%A2+Real-Time+Sockets+%E2%80%A2+Docker;Bogot%C3%A1%2C+Colombia+%F0%9F%87%A8%F0%9F%87%B4" alt="Typing SVG" />
</a>

<br/><br/>

![Status](https://img.shields.io/badge/Status-Production%20Ready-FFD700?style=for-the-badge&logo=checkmarx&logoColor=black)
![Node](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-47A248?style=for-the-badge&logo=mongodb&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/PostgreSQL-4169E1?style=for-the-badge&logo=postgresql&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![JWT](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=jsonwebtokens&logoColor=FFD700)
![Socket.io](https://img.shields.io/badge/Socket.io-010101?style=for-the-badge&logo=socketdotio&logoColor=white)
![AWS](https://img.shields.io/badge/AWS-232F3E?style=for-the-badge&logo=amazonaws&logoColor=FFD700)

<img src="https://github-readme-activity-graph.vercel.app/graph?username=NietoDeveloper&bg_color=0d1117&color=FFD700&line=FFD700&point=ffffff&area=true&hide_border=true" width="100%" />

</div>

---

## `01` — Overview

> **Software DT Backend** is a high-performance service engine designed to be scalable, secure, and modular. It fully decouples business logic from the UI layer, enabling multiple clients — user frontends and admin panels — to consume data fast and reliably.
>
> Built under **Clean Layer Architecture** principles: `Routes → Controllers → Services → Models`, ensuring separation of concerns at every level of the stack.

<div align="center">
<img src="https://github-profile-trophy.vercel.app/?username=NietoDeveloper&theme=darkhub&no-frame=true&no-bg=true&margin-w=4&row=1&column=6" width="100%"/>
</div>

---

## `02` — Technology Stack

<div align="center">

| Component | Technology | Purpose |
| :---: | :---: | :--- |
| ⚡ **Runtime** | `Node.js + Express` | Async execution, robust RESTful architecture |
| 🔷 **Language** | `TypeScript / JavaScript` | Strong typing, runtime error prevention |
| 🍃 **NoSQL DB** | `MongoDB (Mongoose)` | Flexible persistence — bookings, logs, messaging |
| 🐘 **SQL DB** | `PostgreSQL / MySQL` | High-integrity relational transactions |
| 🔐 **Auth** | `JWT + Bcrypt` | Bank-grade security on every endpoint |
| 🐳 **DevOps** | `Docker (Alpine) + AWS` | Containerization and elastic cloud deployment |
| ⚡ **Real-Time** | `Socket.io` | Live notifications and events to admin dashboard |

</div>

---

## `03` — System Architecture

```
┌──────────────────────────────────────────────────────┐
│                      src/                            │
├── config/        ⚙️  DB connections & env variables  │
├── routes/        🚦  RESTful endpoints — entry layer │
├── controllers/   🧠  Business logic & orchestration  │
├── models/        📑  Mongoose schemas (Users, Bookings)│
├── middleware/    🛡️  Helmet, CORS, rate limit, sanitize│
├── sockets/       ⚡  Socket.io real-time events       │
├── utils/         🧰  Helpers, error handling, metrics │
└── app.js         🚀  Main entry point — server bootstrap
└──────────────────────────────────────────────────────┘
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

**Request lifecycle:**

1. **Booking Management** — Receives data from the frontend, validates availability and business rules, persists to the database.
2. **Admin Broadcast** — Once saved, the booking is immediately available to all admin dashboards via Socket.io.
3. **Lifecycle States** — Exposes endpoints to update appointment status (`Pending → Completed → Cancelled`) and retrieve full history.
4. **Dynamic Frontend Updates** — Dedicated service endpoints allow admins to override public UI content (titles, texts, sections) without touching code.

---

## `05` — Security & Performance

<div align="center">

```
╔══════════════════════════════════════════════════════════╗
║  🔁  DUAL CLUSTER       │  Admin traffic isolated from  ║
║                         │  end-user traffic             ║
╠═════════════════════════╪═══════════════════════════════╣
║  🛡️  HELMET ACTIVE      │  Secure HTTP headers on       ║
║                         │  every server response        ║
╠═════════════════════════╪═══════════════════════════════╣
║  🧼  NOSQL SANITIZER    │  Anti-injection on all        ║
║                         │  incoming inputs              ║
╠═════════════════════════╪═══════════════════════════════╣
║  ⏱️  RATE LIMITING      │  Anti-brute force active      ║
║                         │  on auth routes               ║
╠═════════════════════════╪═══════════════════════════════╣
║  📊  REAL-TIME METRICS  │  DB aggregation pipelines     ║
║                         │  per day / month / year       ║
╠═════════════════════════╪═══════════════════════════════╣
║  🐳  DOCKER HARDENED    │  Node-Alpine, devDeps removed ║
║                         │  in production image          ║
╚══════════════════════════════════════════════════════════╝
```

</div>

---

## `06` — Docker Infrastructure

**Development** — Hot-reload via volume binding:

```bash
# Lightweight Node-Alpine image
# Exposes API port, binds local volume
# Code changes trigger automatic server restart
docker compose up --watch
```

**Production** — Optimized and hardened:

```bash
# Compiles to optimized native code
# Strips all devDependencies
# Minimal attack surface, lightweight final image
docker compose -f docker-compose.prod.yml up -d
```

---

## `07` — Setup & Configuration

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
# Development mode (hot-reload)
npm run dev

# Production mode (optimized build)
npm start
```

---

## `08` — Roadmap MVP · `May 6, 2026`

<div align="center">

![Target](https://img.shields.io/badge/TARGET-May%206%2C%202026-FF4444?style=for-the-badge&logo=target&logoColor=white)

</div>

- [ ] 💬 **Pro Messaging** — Real-time chat history refactor with persistent socket rooms
- [ ] 🗓️ **Auto-Status** — Automated cron logic for closing completed appointments
- [ ] 📊 **Real-Time Dash** — WebSocket optimization for live operational metrics
- [ ] 🎛️ **Control Panel** — Final integration of the full admin management panel

---

<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=120&section=footer&text=Manuel%20Nieto%20%C2%B7%20NietoDeveloper&fontSize=24&fontColor=FFD700&animation=fadeIn&fontAlignY=65" width="100%"/>

![Profile Views](https://komarev.com/ghpvc/?username=NietoDeveloper&color=FFD700&style=for-the-badge)
[![GitHub](https://img.shields.io/badge/GitHub-NietoDeveloper-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/NietoDeveloper)

**Senior Software Architect & Full-Stack Engineer**

📍 Bogotá, Colombia 🇨🇴

</div>
