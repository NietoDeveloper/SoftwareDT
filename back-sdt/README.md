# ⚙️ Software DT | Backend & API Infrastructure

## 🚀 Enterprise-Grade Node.js Engineering by NietoDeveloper

This is the robust RESTful API core of Software DT. Engineered in Bogotá, this backend leverages a highly modular architecture designed for high availability, secure identity management, and multi-database synchronization.

## 📈 Technical Momentum & Leadership

- **Daily Excellence**: Built under a strict philosophy of constant optimization—140+ consecutive days of commits.
- **Top Ranking**: Developed by NietoDeveloper, currently #3 Top Committer in Colombia (Targeting #1 by Q1 2026).
- **Reliability**: Production-ready architecture currently powering active client ecosystems.

## 📂 Backend Architecture Map

The server is organized following the Separation of Concerns principle to ensure the API remains maintainable as it scales:

```
server/
├── config/             # Database connection logic (Dual Cluster)
├── controllers/        # Request handlers & Business logic
├── middleware/         # Security (JWT), Access Control, & Logging
├── models/             # Mongoose Schemas (User, Cita, Review)
├── routes/             # Centralized Route Registry
├── utils/              # Helper functions (Token generation, etc.)
└── server.js           # Entry point & Synchronization
```

## 🛠️ The Professional Backend Stack

| Layer     | Technology          | Engineering Focus                          |
|-----------|---------------------|--------------------------------------------|
| Runtime   | Node.js             | Non-blocking I/O for high-concurrency handling |
| Framework | Express.js          | Modular routing and middleware-driven logic |
| Database  | MongoDB Atlas       | Double Cluster strategy (Users & Appointments) |
| Security  | JWT & Cookie-Parser | Secure multi-device session management     |
| Logging   | Morgan              | Real-time traffic monitoring and debugging |

## ✨ Advanced Technical Features

### 📊 1. Double Cluster Synchronization

Unlike standard setups, this API manages a Dual Connection Logic (userDB and citaDB). The server uses a synchronized startup sequence (Promise.all) ensuring that both high-availability clusters are active before accepting traffic, providing superior data isolation.

### 🔐 2. Hybrid Access Control Middleware

The architecture implements a sophisticated three-tier security layer:

- **Public Access**: Standard endpoints for registration and authentication.
- **Optional Access**: Context-aware routes (optionalAccess) that adapt based on the presence of credentials.
- **Protected Core**: A global verifyAccess (JWT) barrier that shields private user and doctor updates.

### 🛡️ 3. Error Handling & Stability

- **Centralized Error Handler**: A dedicated middleware to standardize API responses during failures.
- **Graceful Shutdown**: Preventive checks on startup to ensure all route exports are valid functions before the server listens.

## ⚙️ Quick Start

### 1. Environment Configuration

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

```

### 2. Installation & Execution

```bash
npm install
npm start
```

## 🤝 Remote Collaboration 

- **Lead Developer**: NietoDeveloper
- **Live App**: [softwaredt.vercel.app](https://softwaredt.vercel.app)
- **Technical Ranking**: Top Committers Colombia

### Technical Ranking: #2 Top Committer Colombia

## (<https://github.com/NietoDeveloper>)

### NietoDeveloper 2026