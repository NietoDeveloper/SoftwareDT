

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
