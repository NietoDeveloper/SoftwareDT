# Software DT | Enterprise-Grade MERN Booking Solution

## 🚀 Engineered by NietoDeveloper

**Software DT** is a world-class digital ecosystem designed for high-performance service management. This full-stack application leverages the **MERN** stack and cloud-native infrastructure to provide a seamless, secure, and scalable booking and review environment for global providers and clients.

---

## 📈 Technical Engineering & Consistency

Developed with a focus on technical excellence and continuous delivery:

* **Author:** [NietoDeveloper](https://github.com/NietoDeveloper), currently ranked **#3 Top Committer in Colombia**.
* **Performance:** Built with a philosophy of daily technical evolution and high-velocity coding.
* **Reliability:** Successfully managing active clients in production environments.
* **Global Ready:** Advanced English proficiency (8/10) for international collaboration and remote environments.

---

## ✨ System Architecture & Features

Software DT is engineered to handle complex business logic through a modular and secure architecture:

### 🔐 1. Advanced Security (JWT)
Implements a multi-device **JSON Web Token** strategy. This allows users to manage active sessions independently, ensuring that security remains tight across multiple platforms without interrupting the user experience.

### 👥 2. Role-Based Access Control (RBAC)
Distinct, secure workflows for **Clients** and **Employees (Service Providers)**. Each role accesses a specialized interface tailored to their specific operational needs.

### 📅 3. Real-Time Booking Engine
A high-precision scheduling system designed to manage appointments with zero-latency, preventing conflicts and optimizing provider availability.

### ☁️ 4. Cloud-Native Infrastructure & Data
* **MongoDB Atlas:** Distributed cloud database for high availability and elastic scaling.
* **Firebase Storage:** Ultra-fast asset delivery for profile rendering and media management.

### 🐳 5. Containerization with Docker
The entire ecosystem is **Dockerized**, ensuring environment parity between development, staging, and production. This facilitates rapid deployment and architectural consistency.

---

## 🛠️ Technology Stack

| Layer | Technologies | Implementation |
| :--- | :--- | :--- |
| **Backend** | Node.js & Express | Scalable RESTful API with Clean Architecture. |
| **Database** | **MongoDB Atlas** | Distributed NoSQL cloud hosting. |
| **Frontend** | React & Vite | Lightning-fast SPAs with optimized build times. |
| **Infrastructure** | **Docker** | Container-based deployment and orchestration. |
| **Styling** | Tailwind CSS | Custom-built Corporate Design System. |

---

## 🎨 Design System Specifications

Software DT utilizes a strictly defined visual identity for professional clarity:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        gainsboro: "#DCDCDC", // bg-main
        gold: "#FFD700",      // Accent
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
⚙️ Installation & Deployment
Development Environment
Clone & Navigate:

Bash

git clone [https://github.com/NietoDeveloper/SoftwareDT](https://github.com/NietoDeveloper/SoftwareDT) && cd SoftwareDT
Docker Setup (Recommended):

Bash

docker-compose up --build
Manual Setup: Ensure you have Node.js and MongoDB Atlas credentials configured, then run:

Bash

npm install && npm run dev
🤝 Collaboration & Contact
Software DT is maintained by NietoDeveloper, a lead developer based in Bogotá, Colombia, focused on delivering high-impact code 365 days a year.

Lead Developer: Manuel Nieto

GitHub Profile: @NietoDeveloper

Live Application: softwaredt.vercel.app

Ranking: Top Committers Colombia