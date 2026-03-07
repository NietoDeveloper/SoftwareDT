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
│   │   ├── controllers/        ← Business 