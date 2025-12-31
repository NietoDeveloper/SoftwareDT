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

### Configuring the `.env` File for the Backend

The `.env` file in the `backend/` directory is essential for setting up environment variables that control the application's behavior, such as database connections, ports, allowed CORS origins, and security secrets. **Do not include sensitive values (like passwords or secret keys) in public repositories**. Use a `.env.example` file as a template to guide other developers.

#### Steps to Configure the `.env`
1. **Create the File**: In the `backend/` folder, create a file named `.env` (or copy `.env.example` if it exists).
2. **Edit the Variables**: Open the file in a text editor and assign appropriate values. Below is an explanation of each variable:
   - **`PORT`**: The port on which the backend server runs. Default value: `5000`. Change it if there are conflicts with other local services.
   - **`NODE_ENV`**: The execution environment. Use `development` for local development (enables detailed logs) or `production` for deployments on Railway.
   - **`CLIENT_URL`**: URL of the admin panel frontend (e.g., Vite on port 5173 for development). Example: `http://localhost:5173`.
   - **`ALLOWED_ORIGINS`**: Comma-separated list of allowed origins for CORS. Include URLs for the frontend shop (Next.js on port 3000), admin panel, and production domain (e.g., `https://softwaredt.vercel.app`). Use `${CLIENT_URL}` to reference previous variables.
   - **`MONGODB_URI_USUARIOS`**: Connection URI to MongoDB Atlas for the users cluster (collections: users, services, reviews). Obtain this URI from your MongoDB Atlas account. Format: `mongodb+srv://<username>:<password>@<cluster>.mongodb.net/<db>?retryWrites=true&w=majority`.
   - **`MONGODB_URI_CITAS`**: Connection URI to MongoDB Atlas for the appointments cluster (collections: appointments). Similar to the above, but for a separate cluster if using multiple databases.
   - **`ACCESS_TOKEN_SECRET`**: A long, random secret string for signing JWT access tokens. Generate one using tools like `openssl rand -hex 32`. Do not share it.
   - **`REFRESH_TOKEN_SECRET`**: A similar secret string for JWT refresh tokens. It must be different from the access token secret.
   - **`ADMIN_EMAIL`**: Email address for the initial administrator. Example: `admin@softwaredt.com`.
   - **`ADMIN_PASSWORD`**: Secure password for the initial administrator. Use a password manager to generate one (minimum 12 characters, including uppercase, numbers, and symbols).
   - **`ADMIN_NAME`**: Name of the initial administrator. Example: `"SoftwareDT Administrator"`.

3. **Security and Best Practices**:
   - **Do Not Commit the `.env`**: Add `.env` to your `.gitignore` to prevent exposure of secrets.
   - **Sensitive Variables**: In production (e.g., Railway), configure these variables directly in the deployment panel instead of using a file.
   - **Secret Generation**: Use commands like `node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"` to create secure strings.
   - **Testing**: After configuration, start the backend with `npm run dev` and check logs for connection errors.

#### Example `.env.example` Template
To share with collaborators, create a `.env.example` with placeholders:

```
PORT=5000
NODE_ENV=development
CLIENT_URL=http://localhost:5173
ALLOWED_ORIGINS=${CLIENT_URL},http://localhost:3000,https://your-app.vercel.app
MONGODB_URI_USUARIOS=<your-mongodb-users-uri>
MONGODB_URI_CITAS=<your-mongodb-appointments-uri>
ACCESS_TOKEN_SECRET=<access-secret-string>
REFRESH_TOKEN_SECRET=<refresh-secret-string>
ADMIN_EMAIL=<admin-email>
ADMIN_PASSWORD=<admin-password>
ADMIN_NAME=<admin-name>
```

If you encounter errors related to environment variables, ensure the `dotenv` package is installed and loaded in the backend's `index.ts`.


## 🤝 Contact & Collaboration.

- **Lead Developer**: NietoDeveloper
- **Live App**: [softwaredt.vercel.app](https://softwaredt.vercel.app)
- **Technical Ranking**: Top Committers Colombia

### Technical Ranking: #1 Top Committer Colombia

## (<https://github.com/NietoDeveloper>)

### NietoDeveloper 2026
