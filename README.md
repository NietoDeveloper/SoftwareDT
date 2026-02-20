# Software DT | Enterprise Full-Stack MERN Booking Solution

Software DT is a world-class digital ecosystem designed and developed in Bogotá, Colombia. This platform represents a professional-level Full-Stack MERN (MongoDB, Express, React, Node.js) solution, created to connect service providers and clients through a scalable, secure, and high-performance booking architecture.

## 🏗️ Project Architecture and Directory Structure

The repository uses a monorepo structure to ensure seamless integration between the client experience and server logic.

```
SoftwareDT/
├── client/ # Frontend: React + Vite + Tailwind CSS (Corporate Design)
│ ├── src/
│ │ ├── components/ # Reusable and Atomic UI Components
│ │ ├── pages/ # Core Flow: Info Services, Choose Service, Booking, Dashboard, Comunications.
│ │ └── assets/ # Global Styles and Brand Identity
│ └── package.json
├── server/ # Backend: Node.js + Express + MongoDB (Clean Architecture)
│ ├── models/ # Mongoose Schemas (Users, Bookings, Reviews)
│ ├── routes/ # Protected RESTful API Endpoints
│ ├── controllers/ # Business Logic and Authentication Controllers
│ └── package.json
├── docker-compose.yml # Container Orchestration for Dev/Prod
└── README.md # Main Documentation (Current)
```

## 🚀 Engineering Excellence and Vision

- **Continuous Innovation**: Built under a philosophy of daily technical excellence. The codebase is constantly optimized to ensure extreme security and performance.
- **Production-Tested**: Currently manages real workflows for active clients, demonstrating stability and real-world utility.
- **Elon Musk Goal**: Developed with the highest quality standards to be a global reference application and showcase elite technical capability.

## ✨ Core Features and Infrastructure

### 🔄 Intelligent Booking Flow

The application implements a logical data flow to minimize user friction:

1. **Service Selection**: Users choose specialized services in Services.jsx.
2. **Provider Matching**: Data is transferred to Doctors.jsx to display relevant specialists.
3. **Finalization**: Secure data hand-off to BookingPage.jsx for appointment confirmation.

### 🔐 Advanced Security and RBAC

- **JWT Authentication**: Multi-device session management strategy.
- **Role-Based Access Control (RBAC)**: Differentiated interfaces for Clients (Bookings/Reviews) and Providers/Admins (Control Panel/Availability).

### 📊 Scalable Data Strategy

- **MongoDB Atlas**: High-availability cloud clustering.
- **Dual Cluster Architecture**: Implemented for superior redundancy and zero downtime.

## 🛠️ The Professional Stack

| Layer     | Technologies           | Engineering Focus                              |
|-----------|------------------------|------------------------------------------------|
| Backend   | Node.js & Express      | Clean Architecture & Scalable RESTful APIs     |
| Database  | MongoDB Atlas          | Dual Cluster Strategy for Maximum Uptime       |
| Frontend  | React & Vite           | Optimized SPA with the New React Compiler      |
| Styling   | Tailwind CSS           | Custom Corporate Design System                 |

## 🎨 Official Design System (Software DT Style)

The visual identity is governed by the following Tailwind configuration to ensure brand consistency:

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

## ⚙️ Installation and Setup

### Clone and Navigate

```bash
git clone https://github.com/NietoDeveloper/SoftwareDT && cd SoftwareDT
```

### Containerization (Recommended)

```bash
docker-compose up --build
```

### Manual Setup

Navigate to the /client and /server folders to install dependencies:

```bash
npm install && npm run dev
```

## 🤝 Contact and Collaboration

Software DT is a E-Bussines of high-level software engineering. NietoDeveloper (Manuel Nieto) 

- **Lead Developer**: NietoDeveloper
- **Location**: Bogotá, Colombia 🇨🇴
- **Live App**: softwaredt.vercel.app
- **🏆**: Committer.top/Colombia 
