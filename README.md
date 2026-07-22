<div align="center">

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=240&section=header&text=SOFTWARE%20DT&fontSize=90&fo
### Prerequisites


**Step 1 — Clone the repository**

```bash
ile
# Front-SoftwareDT/Dockerfile.dev
FROM node:22-alpine
WORKDIR /app
COPY package*.json ./
RUN npm install
COPY . .
EXPOSE 5173
CMD ["npm", "run", "dev", "--", "--host"]
```

```yaml
# docker-compose.yml (dev excerpt)
services:
  frontend:
    build:
      context: ./Front-SoftwareDT
      dockerfile: Dockerfile.dev
    ports:
      - "5173:5173"
    volumes:
      - ./Front-SoftwareDT:/app      # HMR: live code reflection
      - /app/node_modules
    environment:
      - NODE_ENV=development

  backend:
    build: ./Back-SoftwareDT
    ports:
      - "8080:8080"
    env_file:
      - ./Back-SoftwareDT/.env
    depends_on:
      - frontend
```

#### Production — Multi-Stage Nginx Build

```dockerfile
# Front-SoftwareDT/Dockerfile (production)
# ── Stage 1: Compile ─────────────────────────────────
FROM node:22-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci --omit=dev
COPY . .
RUN npm run build

# ── Stage 2: Serve ───────────────────────────────────
FROM nginx:alpine AS production
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf       /etc/nginx/nginx.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### 🛑 Operations & Maintenance

```bash
# Stop ecosystem & release all ports
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
/** tailwind.config.js — Software DT Design Tokens (Tailwind CSS 4) */
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
│       └──► AWS ECS/Fargate (Backend) → Container deploy │
│            api.softwaredt.com:8080                      │
└─────────────────────────────────────────────────────────┘
```

| Environment | Frontend | Backend |
|:------------|:---------|:--------|
| **Development** | `http://localhost:5173` | `http://localhost:8080` |
| **Production** | [softwaredt.com](https://softwaredt.com) | AWS ECS/Fargate |

---

## 🔗 Links & Resources

<div align="center">

| Resource | Link |
|:---------|:-----|
| 🌐 **Live Application** | [softwaredt.com](https://softwaredt.com) |
| 📂 **GitHub Repository** | [github.com/NietoDeveloper/softwaredt](https://github.com/NietoDeveloper/softwaredt) |
| 👤 **Developer Profile** | [github.com/NietoDeveloper](https://github.com/NietoDeveloper) |
| 🏆 **#1 Colombia Ranking** | [committers.top/colombia](https://committers.top/colombia) |
| 🌎 **Top LATAM Ranking** | [committers.top](https://committers.top) |
| 🐳 **Docker Desktop** | [docker.com/products/docker-desktop](https://www.docker.com/products/docker-desktop/) |

</div>

---

<div align="center">

[![Live App](https://img.shields.io/badge/🌐_Live_App-softwaredt.com-FFD700?style=for-the-badge)](https://softwaredt.com)
[![GitHub Profile](https://img.shields.io/badge/GitHub-NietoDeveloper-000?style=for-the-badge&logo=github&logoColor=FFD700)](https://github.com/NietoDeveloper)
[![#1 Colombia](https://img.shields.io/badge/🥇_%231_Committer-Colombia-FFD700?style=for-the-badge)](https://committers.top/colombia)
[![LATAM Top](https://img.shields.io/badge/🌎_Top_3-South_%26_Central_America-DCDCDC?style=for-the-badge)](https://committers.top)

<br/>

```
╔══════════════════════════════════════════════════════════════════╗
║                                                                  ║
║   "Every line of code is optimized for performance               ║
║    and security. Production-ready by default."                   ║
║                                                                  ║
║                               — NietoDeveloper Standard          ║
╚══════════════════════════════════════════════════════════════════╝
```

*Software DT — Built by **NietoDeveloper · Manuel Nieto***

*Developed with technical rigor in* 📍 **Bogotá, Colombia** 🇨🇴

Last Updated: July 15, 2026

<br/>

<img src="https://capsule-render.vercel.app/api?type=waving&color=gradient&customColorList=0,2,2,5,30&height=130&section=footer&animation=fadeIn" width="100%"/>

</div>
