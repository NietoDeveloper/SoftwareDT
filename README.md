
</div>
                  ← Monorepo Root
│
# Frontend — API endpoints
cp Front-SoftwareDT/.env.example Front-SoftwareDT/.env
```

```env
# Back-SoftwareDT/.env  (fill in your values)
MONGO_URI_USERS=mongodb+

```
🤖 What Docker does automatically:
S
   🖥️  Frontend  →  http://localhost:5173
   🛰️  Backend   →  http://localhost:8080
```

---

### 🏭 Environment Configurations

#### Development — HMR Enabled

```dockerfile
# Front-SoftwareDT/Dockerfile.dev
FROM node:20-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 
      - "8080:8080"
    env_file:
      - ./Back-SoftwareDT/.env
    depends_on:
      - fron.json ./
RUN npm cease all ports
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

---

## 🎨 Official Design System

> Industrial high-end aesthetic · Dark-first · Gold-accented precision

```javascript
/** tailwind.config.js — Software DT Design Tokens */
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

---

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
│       └──► AWS / Railway (Backend) → Container deploy   │
│            api.softwaredt.com:8080                      │
└─────────────────────────────────────────────────────────┘
```

| Environment | Frontend | Backend |
|:------------|:---------|:--------|
| **Development** | `http://localhost:5173` | `http://localhost:8080` |
| **Production** | [softwaredt.vercel.app](https://softwaredt.vercel.app) | AWS / Railway |

---

## 🔗 Links & Resources

<div align="center">

| Resource | Link |
|:---------|:-----|
| 🌐 **Live Application** | [softwaredt.vercel.app](https://softwaredt.vercel.app) |
| 📂 **GitHub Repository** | [github.com/NietoDeveloper/softwaredt](https://github.com/NietoDeveloper/softwaredt) |
| 👤 **Developer Profile** | [github.com/NietoDeveloper](https://github.com/NietoDeveloper) |
| 🏆 **#1 Colombia Ranking** | [committers.top/colombia](https://committers.top/colombia) |
| 🌎 **Top LATAM Ranking** | [committers.top](https://committers.top) |
| 🐳 **Docker Desktop** | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) |

</div>

---

<div align="center">

[![Live App](https://img.shields.io/badge/🌐_Live_App-softwaredt.vercel.app-FFD700?style=for-the-badge)](https://softwaredt.vercel.app)
[![GitHub Profile](https://img.shields.io/badge/GitHub-NietoDeveloper-000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![#1 Colombia](https://img.shields.io/badge/🥇_%231_Committer-Colombia-FFD700?style=for-the-badge)](https://committers.top/colombia)
[![LATAM Top](https://img.shields.io/badge/🌎_Top_2-South_%26_Central_America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Every line of code is optimized for performance              ║
║    and security. Production-ready by default."                  ║
║                                                                  ║
║                               — NietoDeveloper Standard         ║
╚══════════════════════════════════════════════════════════════════╝
```

*Software DT — Built by **NietoDeveloper · Manuel Nieto***

*Developed with technical rigor in* 📍 **Bogotá, Colombia** 🇨🇴

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
