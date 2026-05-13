<div align="center">

# 📊 Human Capital Analytics | Full MERN Stack Platform

**Enterprise-Level Dashboard & Predictive Analytics System for Global Economic Intelligence**

[![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)](https://vitejs.dev/)
[![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)](https://reactjs.org/)
[![Redux](https://img.shields.io/badge/redux-%23593d88.svg?style=for-the-badge&logo=redux&logoColor=white)](https://redux.js.org/)
[![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![MUI](https://img.shields.io/badge/MUI-%230081CB.svg?style=for-the-badge&logo=mui&logoColor=white)](https://mui.com/)

[![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white)](https://www.mongodb.com/)
[![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![NodeJS](https://img.shields.io/badge/node.js-6DA55F?style=for-the-badge&logo=node.js&logoColor=white)](https://nodejs.org/)
[![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)](https://jwt.io/)

[Live Demo](#) · [Documentation](#api-endpoints) · [Report Bug](https://github.com/priyabratasahoo780/human_capital_project_sahoo_priyabrata/issues) · [Request Feature](https://github.com/priyabratasahoo780/human_capital_project_sahoo_priyabrata/issues)

</div>

---

## 🌍 Project Vision

> _"Empowering global stakeholders with precision-engineered data visualizations and scalable intelligence architectures to decode the complexities of human capital and economic shifts."_

In an era of data-driven decision-making, the **Human Capital Analytics Platform** serves as a high-fidelity lens into the global economy. By processing over **190,000+ real-world records**, this system provides governments, analysts, and enterprises with the tools to visualize inflation trends, consumer price indices, and demographic shifts through a seamless, interactive, and ultra-responsive full-stack experience.

---

## 📖 Introduction

The **Human Capital Analytics MERN Stack Platform** is an enterprise-grade solution that harmonizes a high-performance **Node.js/Express** backend with a sophisticated **React/Vite** frontend. It is architected for speed, security, and massive data handling.

Unlike standard dashboards, this system utilizes complex **MongoDB Aggregation Pipelines** to deliver real-time analytical insights directly to the user's browser. With built-in Role-Based Access Control (RBAC), a feature-driven frontend architecture, and a strictly decoupled MVC backend, it represents the pinnacle of modern full-stack engineering.

---

## 🛠️ Full Tech Stack Architecture

### 💻 Frontend (Client-Side)

| Technology              | Category         | Purpose                                                     |
| :---------------------- | :--------------- | :---------------------------------------------------------- |
| **React.js (Vite)**     | Core Framework   | Ultra-fast development and optimized production builds      |
| **Redux Toolkit**       | State Management | Predictable state container for complex dashboard data      |
| **Tailwind CSS**        | Styling          | Utility-first CSS for rapid, modern UI construction         |
| **Material UI (MUI)**   | UI Components    | Enterprise-grade component library for interactive elements |
| **Recharts / Chart.js** | Visualization    | High-performance dynamic charting and data graphs           |
| **Formik / Yup**        | Form Logic       | Robust form handling and schema-based validation            |

### ⚙️ Backend (Server-Side)

| Technology             | Category            | Purpose                                                 |
| :--------------------- | :------------------ | :------------------------------------------------------ |
| **Node.js**            | Runtime Environment | Scalable, event-driven JavaScript execution             |
| **Express.js**         | Web Framework       | Minimalist and flexible routing and middleware engine   |
| **MongoDB / Mongoose** | Database & ODM      | NoSQL document storage with strict schema modeling      |
| **JWT / Bcrypt**       | Security            | Secure stateless authentication and password encryption |
| **Morgan / Winston**   | Logging             | Production-level request tracking and error logging     |
| **CORS / Helmet**      | Protection          | Cross-origin security and HTTP header hardening         |

---

## ✨ System Features

### 🎨 Frontend Excellence

- **🔐 Multi-Level Auth**: Separate flows for Admin and User roles with persistent sessions.
- **📈 Real-Time Analytics**: Interactive dashboards with filtering, drill-downs, and dynamic scaling.
- **🌓 Theme Orchestration**: Seamless dark/light mode transition via MUI and Tailwind.
- **📱 Ultra-Responsive**: "Mobile-first" design philosophy ensuring clarity across all device formats.
- **🏗️ Feature-Based Architecture**: Modular frontend structure for extreme maintainability.
- **🔔 Smart Notifications**: Context-aware toast alerts for system feedback and error handling.

### 🛡️ Backend Power

- **📊 Aggregation Engine**: Native MongoDB pipelines for high-velocity data crunching.
- **🔍 Dynamic Querying**: Complex filtering, multi-field sorting, and text-search logic.
- **📜 Advanced Pagination**: Cursor and offset-based logic for handling 190k+ records.
- **🛑 Intelligent Rate Limiting**: Protection against API abuse and brute-force attempts.
- **🩺 Health Monitoring**: Real-time status reporting for all infrastructure components.

---

## 🏗️ System Architecture

```mermaid
graph TD
    A[Client: React/Vite] -->|HTTPS/Axios| B[Nginx/Reverse Proxy]
    B --> C[Backend: Node/Express]
    C -->|Middleware| D{Security Layers}
    D -->|JWT/RBAC| E[Controller Logic]
    E -->|Mongoose| F[MongoDB Atlas]
    F -->|Aggregation| E
    E -->|JSON Response| A
    subgraph "State Management"
    A --- G[Redux Toolkit Store]
    end
```

### Request Lifecycle Flow

1. **Frontend**: Action triggered -> Redux Dispatch -> Axios Interceptor attaches JWT.
2. **Backend**: Express receives request -> Morgan logs -> Rate Limiter checks.
3. **Security**: JWT Verification -> RBAC Check (Admin/User).
4. **Logic**: Controller executes service -> Mongoose performs indexed query/aggregation.
5. **Response**: Formatted JSON sent back with appropriate HTTP status codes.

---

## 📁 Project Structure

### 🖥️ Frontend Architecture

```text
client/
├── public/               # Static assets & SEO files
├── src/
│   ├── components/       # Shared UI components (Atomic design)
│   ├── features/         # Feature-specific logic (Auth, Analytics, Dashboard)
│   ├── layouts/          # Page wrappers (AdminLayout, MainLayout)
│   ├── routes/           # Protected & public route definitions
│   ├── store/            # Redux Toolkit slices & global store
│   ├── hooks/            # Custom reusable React hooks
│   └── services/         # API abstraction layer (Axios instances)
```

### ⚙️ Backend Architecture

```text
server/
├── src/
│   ├── config/           # DB, Passport, and Cloudinary settings
│   ├── controllers/      # Route handler implementations
│   ├── models/           # Mongoose schemas with indexing
│   ├── routes/           # Versioned API route definitions (v1/v2)
│   ├── middlewares/      # Error, Auth, and Log middlewares
│   ├── validators/       # Input validation schemas (Joi/Zod)
│   └── app.js            # Express instance configuration
```

---

## ⚙️ Installation & Setup

### 1. Repository Setup

```bash
git clone https://github.com/priyabratasahoo780/human_capital_project_sahoo_priyabrata.git
cd human_capital_project_sahoo_priyabrata
```

### 2. Backend Configuration

```bash
cd server
npm install
cp .env.example .env
# Configure MONGODB_URI & JWT_SECRET
npm run dev
```

### 3. Frontend Configuration

```bash
cd ../client
npm install
cp .env.example .env
# Configure VITE_API_BASE_URL
npm run dev
```

---

## 🔑 Environment Variables

### 🔒 Backend (.env)

| Variable      | Description       | Example                 |
| :------------ | :---------------- | :---------------------- |
| `NODE_ENV`    | Environment State | `production`            |
| `MONGODB_URI` | Connection String | `mongodb+srv://...`     |
| `JWT_SECRET`  | Auth Token Secret | `your_long_secure_hash` |
| `PORT`        | Server Port       | `5000`                  |

### 🌐 Frontend (.env)

| Variable        | Description      | Example                        |
| :-------------- | :--------------- | :----------------------------- |
| `VITE_API_URL`  | Backend Endpoint | `http://localhost:5000/api/v1` |
| `VITE_APP_NAME` | SEO Brand Name   | `Human Capital Analytics`      |

---

## 🗄️ Database Schema Overview

### 📈 Price Analysis Schema

```javascript
const priceSchema = new mongoose.Schema(
  {
    indicator: { type: String, required: true, index: true },
    country: { type: String, required: true, index: true },
    year: { type: Number, required: true },
    value: { type: Number, required: true },
    metadata: {
      source: String,
      reliability: Number,
    },
  },
  { timestamps: true },
);

// Compound indexing for rapid analytical lookups
priceSchema.index({ country: 1, year: -1 });
```

---

---

## 📡 API Endpoints

### 🔐 Authentication APIs

| Method  | Endpoint                             | Description                        | Access |
| :------ | :----------------------------------- | :--------------------------------- | :----- |
| `POST`  | `/api/v1/auth/register`              | Create a new enterprise account    | Public |
| `POST`  | `/api/v1/auth/login`                 | Authenticate user and return JWT   | Public |
| `POST`  | `/api/v1/auth/logout`                | Invalidate current session         | User   |
| `POST`  | `/api/v1/auth/forgot-password`       | Request password reset link        | Public |
| `PATCH` | `/api/v1/auth/reset-password/:token` | Set new password with token        | Public |
| `POST`  | `/api/v1/auth/refresh-token`         | Renew expired access tokens        | User   |
| `GET`   | `/api/v1/auth/me`                    | Retrieve current user profile      | User   |
| `POST`  | `/api/v1/auth/send-otp`              | Trigger OTP for 2FA/Verification   | User   |
| `POST`  | `/api/v1/auth/verify-otp`            | Validate multi-factor OTP code     | User   |
| `PATCH` | `/api/v1/auth/change-password`       | Update password for logged-in user | User   |

---

### 📦 Prices APIs

| Method   | Endpoint                    | Description                               | Access |
| :------- | :-------------------------- | :---------------------------------------- | :----- |
| `GET`    | `/api/v1/prices`            | Fetch all records with full query support | User   |
| `GET`    | `/api/v1/prices/:id`        | Get detailed view of a single record      | User   |
| `POST`   | `/api/v1/prices`            | Manually insert a new price record        | Admin  |
| `PATCH`  | `/api/v1/prices/:id`        | Update existing price data                | Admin  |
| `DELETE` | `/api/v1/prices/:id`        | Permanent removal of a record             | Admin  |
| `GET`    | `/api/v1/prices/latest`     | Retrieve most recent data entries         | User   |
| `GET`    | `/api/v1/prices/trending`   | List records with highest volatility      | User   |
| `GET`    | `/api/v1/prices/random`     | Get a randomized sample of data           | User   |
| `GET`    | `/api/v1/prices/high-value` | Filter records with top-tier values       | User   |
| `GET`    | `/api/v1/prices/low-value`  | Filter records with bottom-tier values    | User   |

---

### 🌍 Country APIs

| Method | Endpoint                          | Description                          | Access |
| :----- | :-------------------------------- | :----------------------------------- | :----- |
| `GET`  | `/api/v1/countries`               | List all unique countries in dataset | User   |
| `GET`  | `/api/v1/countries/search`        | Search countries by name or code     | User   |
| `GET`  | `/api/v1/countries/:code/stats`   | Macro-economic stats for a country   | User   |
| `GET`  | `/api/v1/countries/:code/history` | Historical price trends by nation    | User   |

---

### 📊 Statistics & Analytics APIs

| Method | Endpoint                       | Description                          | Access |
| :----- | :----------------------------- | :----------------------------------- | :----- |
| `GET`  | `/api/v1/stats/prices`         | General price statistics overview    | User   |
| `GET`  | `/api/v1/stats/highest`        | Global record-high values            | User   |
| `GET`  | `/api/v1/stats/lowest`         | Global record-low values             | User   |
| `GET`  | `/api/v1/stats/monthly-avg`    | Averages grouped by month            | User   |
| `GET`  | `/api/v1/stats/yearly-avg`     | Averages grouped by year             | User   |
| `GET`  | `/api/v1/stats/top-countries`  | Leading countries by indicator value | User   |
| `GET`  | `/api/v1/stats/top-indicators` | Most tracked global indicators       | User   |
| `GET`  | `/api/v1/stats/trending`       | Analytics on trending categories     | User   |
| `GET`  | `/api/v1/stats/count`          | Total record count analytics         | User   |
| `GET`  | `/api/v1/stats/distribution`   | Value distribution frequency data    | User   |

---

### 🔍 Search & Filtering APIs

| Method | Endpoint                       | Description                          | Access |
| :----- | :----------------------------- | :----------------------------------- | :----- |
| `GET`  | `/api/v1/search/prices`        | Text-based search across indicators  | User   |
| `GET`  | `/api/v1/search/countries`     | Optimized country search engine      | User   |
| `GET`  | `/api/v1/search/indicators`    | Indicator name search functionality  | User   |
| `GET`  | `/api/v1/filter/year/:year`    | Quick filter for specific years      | User   |
| `GET`  | `/api/v1/filter/month/:month`  | Quick filter for specific months     | User   |
| `GET`  | `/api/v1/filter/country/:code` | Quick filter for specific countries  | User   |
| `GET`  | `/api/v1/filter/indicator/:id` | Quick filter for specific indicators | User   |
| `GET`  | `/api/v1/filter/range`         | Filter by numeric value ranges       | User   |
| `GET`  | `/api/v1/query/advanced`       | Combined multi-parameter query API   | User   |

---

### 🛡 Protected APIs

| Method | Endpoint                      | Description                     | Access  |
| :----- | :---------------------------- | :------------------------------ | :------ |
| `GET`  | `/api/v1/protected/dashboard` | Secured dashboard data overview | Private |
| `GET`  | `/api/v1/protected/prices`    | Premium price data access       | Private |
| `GET`  | `/api/v1/protected/profile`   | Detailed JWT-protected profile  | Private |
| `GET`  | `/api/v1/protected/admin`     | Admin-only system status        | Admin   |
| `GET`  | `/api/v1/protected/user`      | Standard user-only data portal  | User    |
| `GET`  | `/api/v1/auth/verify-role`    | Backend role verification check | Private |

---

### ⚙️ Admin APIs

| Method | Endpoint                   | Description                         | Access |
| :----- | :------------------------- | :---------------------------------- | :----- |
| `GET`  | `/api/v1/admin/dashboard`  | Global system administration stats  | Admin  |
| `GET`  | `/api/v1/admin/statistics` | User activity and platform metrics  | Admin  |
| `GET`  | `/api/v1/admin/prices`     | Bulk management of price records    | Admin  |
| `GET`  | `/api/v1/admin/analytics`  | Highly sensitive platform analytics | Admin  |

---

### 🧠 Aggregation APIs

| Method | Endpoint                          | Description                         | Access  |
| :----- | :-------------------------------- | :---------------------------------- | :------ |
| `GET`  | `/api/v1/aggregate/top-countries` | Pipeline: Geo-economic clustering   | Private |
| `GET`  | `/api/v1/aggregate/yearly-trends` | Pipeline: Time-series trend mapping | Private |
| `GET`  | `/api/v1/aggregate/monthly`       | Pipeline: Seasonality analytics     | Private |
| `GET`  | `/api/v1/aggregate/distribution`  | Pipeline: Advanced data spread      | Private |
| `GET`  | `/api/v1/aggregate/reports`       | Pipeline: Comprehensive reports     | Private |

---

### ❤️ Health & Monitoring APIs

| Method | Endpoint          | Description                        | Access |
| :----- | :---------------- | :--------------------------------- | :----- |
| `GET`  | `/api/v1/health`  | Service uptime and status check    | Public |
| `GET`  | `/api/v1/metrics` | Real-time performance metrics      | Admin  |
| `GET`  | `/api/v1/status`  | DB and Redis connectivity status   | Public |
| `GET`  | `/api/v1/version` | Current API version and build info | Public |

---

## ⚡ Performance Optimization

- **DB Indexing**: Utilizing B-tree indexes for `O(log n)` lookup performance on 190k+ records.
- **Lean Queries**: Using `.lean()` to bypass Mongoose document hydration where possible.
- **Lazy Loading**: React components and routes are code-split via `React.lazy()` and `Suspense`.
- **Memoization**: Heavy analytical calculations optimized using `useMemo` and `useCallback` to prevent unnecessary re-renders.
- **Pagination & Virtualization**: Only fetching and rendering data relevant to the current viewport.

---

## 🛡️ Authentication & Security Flow

1. **Client**: Submits credentials -> `POST /login`.
2. **Server**: Validates with Bcrypt -> Issues signed JWT.
3. **Client**: Stores token (HTTPOnly Cookie or Secured Redux State).
4. **Server**: `protect` middleware decodes token and injects `req.user`.
5. **Authorization**: `restrictTo('admin')` middleware validates roles before allowing execution.

---

## 🎨 UI / UX Design System

The platform uses a unified design language centered around **clarity** and **efficiency**:

- **Sidebar Navigation**: Collapsible, responsive navigation for deep module access.
- **Data Tables**: Feature-rich grids with sorting, filtering, and export to CSV.
- **Skeleton Loaders**: Custom SVGs providing smooth visual transitions during data fetching.
- **Empty States**: Professional illustrations for scenarios with no data matches.

---

## 📱 SEO Optimization

Utilizing **React Helmet** for dynamic meta-management:

- **Meta Tags**: Page-specific titles and descriptions for search engine indexing.
- **Open Graph**: Rich social media sharing previews.
- **Canonical Links**: Preventing duplicate content penalties.

---

## 💻 API Usage Examples

### Fetching Analytics with Axios (Redux Thunk)

```javascript
export const fetchStats = createAsyncThunk("stats/fetch", async () => {
  const response = await axios.get("/stats/summary", {
    params: { year: 2023, country: "USA" },
  });
  return response.data;
});
```

### Advanced Query (cURL)

```bash
curl -H "Authorization: Bearer <TOKEN>" \
     "https://api.example.com/v1/prices?sort=-value&limit=10&indicator=CPI"
```

---

## ☁️ Deployment

| Platform    | Role               | Command                     |
| :---------- | :----------------- | :-------------------------- |
| **Vercel**  | Frontend Hosting   | `npm run build`             |
| **Railway** | Backend / Database | `npm start`                 |
| **Docker**  | Containerization   | `docker-compose up --build` |

---

## 🔮 Future Enhancements

- **🤖 AI Predictions**: Integrated ML models to forecast inflation trends based on historical data.
- **🌐 Multi-Language**: Full i18n support for global reach.
- **📲 PWA Integration**: Desktop-class mobile experience with offline capabilities.
- **🔔 Real-time Alerts**: Socket.io integration for threshold-based economic triggers.

---

## 🤝 Contributing

Contributions drive the open-source community. Please follow the **Fork-Feature-Pull Request** workflow.

---

## 📜 License

Distributed under the **MIT License**. See `LICENSE` for details.

---

## 👨‍💻 Author

**Priyabrata Sahoo**

- [GitHub](https://github.com/priyabratasahoo780)
- [LinkedIn](https://www.linkedin.com/in/priyabrata-sahoo/)

---

<div align="center">

### 🚀 Deciphering the world's data, one record at a time.

[Back to Top](#-human-capital-analytics--full-mern-stack-platform)

</div>
