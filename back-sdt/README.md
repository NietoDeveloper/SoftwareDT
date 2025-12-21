Markdown

# ⚙️ Software DT | Backend & API Infrastructure

## 🚀 Enterprise-Grade Node.js Engineering by NietoDeveloper

This is the robust **RESTful API** core of **Software DT**. Engineered in Bogotá, this backend leverages a highly modular architecture designed for high availability, secure identity management, and multi-database synchronization.

---

## 📈 Technical Momentum & Leadership

* **Daily Excellence:** Built under a strict philosophy of constant optimization—**140+ consecutive days of commits**.
* **Top Ranking:** Developed by **NietoDeveloper**, currently **#3 Top Committer in Colombia** (Targeting #1 by Q1 2026).
* **Reliability:** Production-ready architecture currently powering active client ecosystems.

---

## 🛠️ The Professional Backend Stack

| Layer | Technology | Engineering Focus |
| :--- | :--- | :--- |
| **Runtime** | Node.js | Non-blocking I/O for high-concurrency handling. |
| **Framework** | Express.js | Modular routing and middleware-driven logic. |
| **Database** | MongoDB Atlas | **Double Cluster strategy** (Users & Appointments). |
| **Security** | JWT & Cookie-Parser | Secure multi-device session management. |
| **Logging** | Morgan | Real-time traffic monitoring and debugging. |

---

## ✨ Advanced Technical Features

### 📊 1. Double Cluster Synchronization

Unlike standard setups, this API manages a **Dual Connection Logic** (`userDB` and `citaDB`). The server uses a synchronized startup sequence (`Promise.all`) ensuring that both high-availability clusters are active before accepting traffic.

### 🔐 2. Hybrid Access Control Middleware

The architecture implements a sophisticated three-tier security layer:

* **Public Access:** Standard endpoints for registration and authentication.
* **Optional Access:** Context-aware routes (`optionalAccess`) that adapt based on the presence of credentials.
* **Protected Core:** A global `verifyAccess` (JWT) barrier that shields all private user and doctor updates.

### 🐳 3. Scalable Routing Strategy

The system uses a **Centralized Route Registry** with preventive validation. Each module (Users, Doctors, Appointments, Reviews) is isolated, allowing the application to scale without creating "God objects" or bottleneck files.

### 🛡️ 4. Robust Error Handling

* **Centralized Error Handler:** A dedicated middleware to standardize API responses during failures.
* **Graceful Shutdown:** Preventive checks on startup to ensure all route exports are valid functions.

---

## ⚙️ Quick Start

### 1. Environment Configuration

Create a `.env` file in the root directory:

```env
PORT=5000
DATABASE_URI_USERS=your_mongodb_atlas_uri
DATABASE_URI_CITAS=your_mongodb_atlas_uri
ACCESS_TOKEN_SECRET=your_jwt_secret
REFRESH_TOKEN_SECRET=your_jwt_refresh_secret
2. Installation & Run
Bash

npm install
node server.js
🤝 Remote Collaboration & Global Hiring
This backend is a testament to disciplined software engineering. Its lead developer, NietoDeveloper, is open for Remote Opportunities worldwide, offering 5.5+ years of technical expertise and a 8/10 English proficiency.

Lead Developer: Manuel Nieto (NietoDeveloper)

GitHub Profile: @NietoDeveloper

Technical Ranking: #3 Top Committer Colombia
