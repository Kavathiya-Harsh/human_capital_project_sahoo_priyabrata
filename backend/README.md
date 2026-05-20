<div align="center">

<img src="../assets/logo.png" alt="Human Capital Analytics Logo" width="180" style="border-radius: 20px; margin-bottom: 20px;"/>

# 🌟 Human Capital Analytics | Backend Engine

**High-Performance RESTful API & Data Aggregation Server**

<p align="center">
  <a href="https://nodejs.org/"><img src="https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white" alt="NodeJS" /></a>
  <a href="https://expressjs.com/"><img src="https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white" alt="Express.js" /></a>
  <a href="https://www.mongodb.com/"><img src="https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white" alt="MongoDB" /></a>
  <a href="https://redis.io/"><img src="https://img.shields.io/badge/Redis-DC382D?style=for-the-badge&logo=redis&logoColor=white" alt="Redis" /></a>
  <a href="https://jwt.io/"><img src="https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white" alt="JWT" /></a>
  <a href="https://documenter.getpostman.com/view/50839186/2sBXqRiGpA"><img src="https://img.shields.io/badge/Postman-FF6C37?style=for-the-badge&logo=postman&logoColor=white" alt="Postman" /></a>
</p>

> _Empowering the Human Capital Platform with secure, scalable, and real-time data processing capabilities._

---

</div>

## 🎯 System Overview

The **Human Capital Analytics Backend** is built using a modern **Node.js** and **Express.js** architecture. It serves as the core engine that powers our frontend applications, handling everything from strict Role-Based Access Control (RBAC) to complex native **MongoDB Aggregation Pipelines**. With an emphasis on speed and security, it seamlessly manages large datasets of global economic intelligence.

<br>

## 💎 Tech Stack & Engineering

| Category | Technologies | Description |
| :--- | :--- | :--- |
| ⚡ **Core** | `Node.js`, `Express.js (v5)` | Event-driven, non-blocking I/O runtime. |
| 🗄️ **Database** | `MongoDB`, `Mongoose` | NoSQL document storage with strict modeling. |
| 🚀 **Caching** | `Redis` | In-memory data structure store for speed. |
| 🔐 **Security** | `JWT`, `Bcrypt.js`, `Helmet` | Stateless auth & HTTP header protection. |
| 🛡️ **Defense** | `CORS`, `Rate Limit`, `XSS` | Cross-origin & brute-force attack mitigation. |
| ✨ **Quality** | `Zod`, `ESLint`, `Jest` | Strict payload validation and test suites. |

<br>

## 🧩 Architectural Blueprint

Our strictly decoupled MVC architecture ensures modularity and rapid feature development.

```text
src/
├── ⚙️ config/           # Database, Redis, and environment setups
├── 🎮 controllers/      # Request handlers and business logic execution
├── 🛡️ middlewares/      # Interceptors (Auth, Error Handling, Rate Limiting)
├── 📦 models/           # Mongoose schemas and compound indexes
├── 🛣️ routes/           # Versioned API route definitions (e.g., /api/v1)
├── 📜 scripts/          # Utility scripts for database seeding & migrations
├── 🛠️ services/         # Reusable core business logic
├── 🔧 utils/            # Helper utilities and shared functions
├── ✅ validators/       # Zod schemas ensuring strict input validation
├── 🚀 app.js            # Express application configuration
└── 🏁 server.js         # Entry point & server bootstrapping
```

<br>

## ⚡ Quick Start Guide

> [!TIP]
> **Pro Tip:** Ensure MongoDB and Redis are running on your machine before starting the application to avoid connection timeouts.

### 1️⃣ Installation
Clone the repository and install the dependencies:
```bash
npm install
```

### 2️⃣ Environment Configuration
Create a `.env` file in the root of the `backend` directory.
```env
# Server Configuration
NODE_ENV=development
PORT=5000

# Database Connection
MONGODB_URI=mongodb://localhost:27017/human_capital

# Security Credentials
JWT_SECRET=your_super_secret_jwt_key
JWT_EXPIRES_IN=7d
```

### 3️⃣ Launch the Server
Spin up the development server with hot-reloading:
```bash
npm run dev
```

<br>

## 🕹️ Command Reference

| Command | Environment | Description |
| :--- | :--- | :--- |
| `npm start` | **Production** | Boots the optimized server. |
| `npm run dev` | **Development** | Runs via Nodemon for auto-restarts. |
| `npm run lint` | **Quality** | Scans codebase for styling issues. |
| `npm run format`| **Quality** | Formats code via Prettier. |
| `npm run test` | **Testing** | Executes the Jest testing suite. |

<br>

## 🌐 Core API Modules

Our API is fully versioned (`v1`) and documented. Key modules include:

*   **🔐 Auth Module:** Secure JWT-based login, registration, and OTPs.
*   **📊 Prices Data:** CRUD functionality with advanced filtering, sorting, and pagination.
*   **🌍 Geo/Countries:** Macroeconomic stats, history, and geographical references.
*   **📈 Analytics Engine:** High-velocity MongoDB aggregations for real-time metrics.

<div align="center">

### 📖 Comprehensive API Documentation

[![View Postman Docs](https://img.shields.io/badge/View_Interactive_Documentation-FF6C37?style=for-the-badge&logo=postman&logoColor=white&logoSize=large)](https://documenter.getpostman.com/view/50839186/2sBXqRiGpA)

<br>

<i>Built with ❤️ for scalable data intelligence.</i>

</div>
