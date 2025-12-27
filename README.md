# Software DT | Enterprise Full-Stack MERN Booking Solution

Software DT is a world-class digital ecosystem engineered in Bogotá, Colombia. This platform is a professional Full-Stack MERN (MongoDB, Express, React, Node.js) solution designed to bridge the gap between service providers and clients through a seamless, highly scalable booking and management architecture.

## 🏗️ Project Architecture & Directory Mapping

This repository is structured as a Monorepo to ensure seamless integration between the client-side experience and the server-side logic.

```
SoftwareDT/
├── client/                # Frontend: React + Vite + Tailwind CSS
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Services, Doctors, Booking, Dashboard
│   │   └── assets/        # Global styles and branding
│   └── package.json
├── server/                # Backend: Node.js + Express + MongoDB
│   ├── models/            # Mongoose Schemas (Users, Bookings, Reviews)
│   ├── routes/            # RESTful API Endpoints
│   ├── controllers/       # Business logic and Auth handlers
│   └── package.json
├── docker-compose.yml     # Container orchestration for Dev/Prod
└── README.md              # Main Project Documentation (Current)
```

## 🚀 Engineering Excellence & Vision

- **Continuous Innovation**: Built under a philosophy of daily technical excellence. The codebase undergoes constant optimization for security and performance.
- **Top-Tier Momentum**: Developed by NietoDeveloper, currently ranked among the Top Committers in Colombia, with a roadmap to reach #1 by early 2026.
- **Production Proven**: Currently powering active workflows for production-level clients, demonstrating stability and real-world utility.

## ✨ Core Features & Infrastructure

### 🔄 Intelligent Booking Flow

The application implements a logical data stream to minimize friction:

- **Service Selection**: Users select specialized services in `Services.jsx`.
- **Provider Matching**: Filtered providers are presented in `Doctors.jsx`.
- **Finalization**: Secure data hand-off to `BookingPage.jsx` for appointment confirmation.

### 🔐 Advanced Security & RBAC

- **JWT Authentication**: Multi-device session management strategy.
- **Role-Based Access Control (RBAC)**: Distinct interfaces for Clients (Booking/Reviews) and Providers (Dashboard/Availability).

### 📊 Scalable Data Strategy

- **MongoDB Atlas**: High-availability cloud clustering.
- **Double Cluster Architecture**: Implemented for superior redundancy, zero-downtime, and data integrity under high traffic.

### 🐳 Deployment & DevOps

- **Dockerized Environment**: Standardized containers for consistent behavior across development and production.
- **Firebase Integration**: Specialized cloud storage for ultra-fast asset delivery.

## 🛠️ The Professional Stack

| Layer     | Technologies              | Engineering Focus                          |
|-----------|---------------------------|--------------------------------------------|
| Backend   | Node.js & Express         | Clean Architecture & Scalable RESTful APIs |
| Database  | MongoDB Atlas             | Dual-cluster strategy for maximum uptime   |
| Frontend  | React & Vite              | Optimized SPA with high-performance rendering |
| Styling   | Tailwind CSS              | Custom-built Corporate Design System       |

## 🎨 Official Design System

The visual identity is strictly governed by the following Tailwind configuration to ensure brand consistency:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gainsboro: "#DCDCDC",
        gold: "#FFD700",
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
  plugins: [],
}
```

## ⚙️ Installation & Setup

### Clone & Navigate

```bash
git clone https://github.com/NietoDeveloper/SoftwareDT && cd SoftwareDT
```

### Containerize (Recommended)

```bash
docker-compose up --build
```

### Manual Setup

Navigate to both `/client` and `/server` folders to install dependencies:

```bash
npm install && npm run dev
```

## 🤝 Contact & Collaboration

Software DT is a showcase of high-level software engineering from Bogotá. NietoDeveloper (Manuel Nieto) is available for global remote opportunities, bringing 5.5+ years of dedicated technical expertise to world-class projects.

- **Lead Developer**: NietoDeveloper
- **Live App**: [softwaredt.vercel.app](https://softwaredt.vercel.app)
- **Technical Ranking**: Top Committers Colombia

## (<https://github.com/NietoDeveloper>)

### NietoDeveloper 2026
