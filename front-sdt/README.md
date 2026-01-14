# 🖥️ Software DT | Frontend Engineering

## 🚀 High-Performance UI by NietoDeveloper

**Software DT** is the professional-grade User Interface layer of a world-class Full-Stack booking solution. Engineered in Bogotá, this frontend is built with a radical focus on **User Experience (UX)**, **optimized rendering speeds**, and a **scalable architecture** using React and Vite.

---

## 📈 Technical

* **Clean Architecture:** Implementation of modular, reusable components designed for long-term maintainability and enterprise growth.

---

## 📂 Frontend Structure & Logic

The frontend follows a logical data flow to ensure a seamless booking experience:

```text
src/
├── assets/         # Images, icons, and global CSS
├── components/     # Reusable UI (Buttons, Cards, Modals)
├── layout/         # Header, Footer, and Page wrappers
├── pages/          # Main views:
│   ├── Services.jsx    # 1. Service selection & data capture
│   ├── Doctors.jsx     # 2. Provider filtering
│   └── BookingPage.jsx # 3. Final appointment scheduling
├── routes/         # RBAC (Role-Based Access Control) Protected Routes
└── utils/          # Formaters, validators, and constants

```

## 🛠️ Frontend Tech Stack

| Technology | Purpose |
| --- | --- |
| **React (Vite)** | High-performance SPA with ultra-fast Hot Module Replacement (HMR). |
| **Tailwind CSS** | Custom Design System for a consistent corporate identity. |
| **React Router** | Advanced client-side routing and navigation guards. |
| **Firebase** | Cloud storage for high-speed delivery of media assets. |

---

## 🎨 Official Design System

The visual identity is enforced via `tailwind.config.js` to maintain professional consistency:

```javascript
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
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

---

## ⚙️ Installation & Development

1. **Install Dependencies:**

```bash
npm install

```

1. **Start Development Server:**

```bash
npm run dev

```

1. **Build for Production:**

```bash
npm run build

```

## 🤝 Remote Collaboration

* **Lead Developer**: [NietoDeveloper](https://github.com/NietoDeveloper)
* **Location**: Bogotá, Colombia
* **Live App**: [softwaredt.vercel.app](https://softwaredt.vercel.app)
* **Technical Ranking**: #1 Top Committer Colombia
