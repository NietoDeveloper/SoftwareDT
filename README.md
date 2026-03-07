# Software DT | Enterprise Full-Stack MERN Booking Solution


## 🏗️ Project Architecture and Directory Structure


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
- **🏆**: Committers.top/Colombia 
