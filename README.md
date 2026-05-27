## 📖 Overview

**Carbon-Wise** is a full-stack web platform that empowers Indian consumers to make environmentally informed vehicle purchase decisions. It goes beyond tailpipe emissions by analyzing the **complete lifecycle carbon footprint** of vehicles — from manufacturing through daily usage to end-of-life disposal — while accounting for India's **state-level electrical grid intensity**.

### Key Features

| Feature | Description |
|---|---|
| 🔬 **Lifecycle Carbon Analysis** | Calculates total CO₂ across manufacturing, usage (well-to-wheel), and disposal phases |
| ⚡ **State-Aware Grid Intensity** | Adjusts EV emissions based on your state's electricity carbon intensity |
| 🔄 **Side-by-Side Comparison** | Compare up to 3 vehicles across carbon, cost, and efficiency metrics |
| 🤖 **Smart Recommendations** | Get personalized vehicle suggestions based on usage patterns and location |
| 🚨 **Greenwash Detection** | Flags misleading "green" marketing claims with evidence-based analysis |
| 🗺️ **Grid Intensity Map** | Visual state-by-state breakdown of India's electrical grid carbon intensity |
| 🚚 **Fleet Analysis** | Carbon footprint analysis for commercial and fleet operations |

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19 · Vite 7 · Tailwind CSS 4 · Recharts · React Router 7 |
| **Backend** | Node.js · Express 4 · sql.js (SQLite in-memory) |
| **Database** | SQLite (via sql.js — zero native dependencies) |
| **Language** | JavaScript (JSX) · TypeScript (config) |

---

## 📁 Project Structure

```
Mobility_Dilema/
├── backend/
│   ├── src/
│   │   ├── server.js            # Express entry point (port 3001)
│   │   ├── db.js                # sql.js database init & query helpers
│   │   ├── routes/
│   │   │   ├── vehicles.js      # /api/vehicles endpoints
│   │   │   ├── calculate.js     # /api/calculate — LCA engine endpoints
│   │   │   └── grid.js          # /api/grid-intensity endpoints
│   │   ├── services/
│   │   │   └── lca-engine.js    # Core lifecycle carbon calculation logic
│   │   └── data/
│   │       ├── seed-vehicles.json
│   │       ├── seed-grid-intensity.json
│   │       └── seed-fuel-prices.json
│   ├── seed-db.js               # Database seeding script
│   ├── poc-test.js              # PoC validation test suite
│   ├── carbon-wise.db           # Pre-seeded SQLite database file
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── App.jsx              # Root component with routing
│   │   ├── main.jsx             # React DOM entry point
│   │   ├── index.css            # Global styles & design system
│   │   ├── components/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   ├── pages/
│   │   │   ├── HomePage.jsx         # Landing page with vehicle catalog
│   │   │   ├── ComparePage.jsx      # Side-by-side vehicle comparison
│   │   │   ├── RecommendPage.jsx    # Smart recommendation engine
│   │   │   ├── GridMapPage.jsx      # State-wise grid intensity map
│   │   │   ├── FleetPage.jsx        # Fleet carbon analysis
│   │   │   └── VehicleDetailPage.jsx
│   │   └── lib/
│   │       └── api.js           # API client helper
│   ├── index.html
│   ├── vite.config.js           # Vite config with API proxy
│   └── package.json
│
└── README.md
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** v18 or higher — [Download](https://nodejs.org/)
- **npm** v9 or higher (bundled with Node.js)
- **Git** — [Download](https://git-scm.com/)

### 1. Clone the Repository

```bash
git clone https://github.com/Rudra01a/carbon-wise.git
cd carbon-wise
```

### 2. Backend Setup

```bash
# Navigate to the backend directory
cd backend

# Install dependencies
npm install

# Seed the database (creates carbon-wise.db with vehicle, grid & fuel data)
node seed-db.js

# Start the backend server (runs on http://localhost:3001)
npm start

# Or use watch mode for development
npm run dev
```

> **Note:** The database uses `sql.js` which is a pure JavaScript SQLite implementation — **no native build tools or Python required**.

### 3. Frontend Setup

Open a **new terminal** while the backend is still running:

```bash
# Navigate to the frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server (runs on http://localhost:5173)
npm run dev
```

### 4. Open the App

Visit **[http://localhost:5173](http://localhost:5173)** in your browser. The Vite dev server automatically proxies `/api/*` requests to the backend at `localhost:3001`.

---

## 🔌 API Reference

The backend exposes a RESTful API at `http://localhost:3001/api`.

| Method | Endpoint | Description |
|---|---|---|
| `GET` | `/api/health` | Health check & server status |
| `GET` | `/api/vehicles` | List all vehicles (supports `?fuel_type=`, `?segment=` filters) |
| `GET` | `/api/vehicles/:id` | Get a single vehicle by ID |
| `GET` | `/api/grid-intensity` | List all state grid intensity data |
| `GET` | `/api/grid-intensity/:state` | Get grid intensity for a specific state |
| `GET` | `/api/fuel-prices` | List fuel prices (supports `?state=` filter) |
| `POST` | `/api/calculate/lifecycle` | Full lifecycle carbon calculation for a vehicle |
| `POST` | `/api/calculate/compare` | Compare lifecycle emissions of multiple vehicles |
| `POST` | `/api/calculate/recommend` | Get vehicle recommendations based on user preferences |
| `POST` | `/api/calculate/greenwash` | Detect greenwashing claims for a vehicle |

### Example: Lifecycle Calculation

```bash
curl -X POST http://localhost:3001/api/calculate/lifecycle \
  -H "Content-Type: application/json" \
  -d '{
    "vehicleId": "tata-nexon-ev-lr",
    "state": "Karnataka",
    "annualKm": 15000,
    "ownershipYears": 8
  }'
```

---

## 🧪 Running Tests

A comprehensive PoC test script validates all backend endpoints and core logic:

```bash
cd backend

# Make sure the server is running first, then in another terminal:
node poc-test.js
```

This tests: health check, vehicle queries, grid intensity, lifecycle calculations, comparisons, recommendations, and greenwash detection.

---

## 📜 Available Scripts

### Backend (`/backend`)

| Script | Command | Description |
|---|---|---|
| Start | `npm start` | Run the production server |
| Dev | `npm run dev` | Run with `--watch` for auto-reload |
| Seed | `node seed-db.js` | Rebuild the database from seed files |
| Test | `node poc-test.js` | Run the PoC validation suite |

### Frontend (`/frontend`)

| Script | Command | Description |
|---|---|---|
| Dev | `npm run dev` | Start Vite dev server with HMR |
| Build | `npm run build` | TypeScript check + production build |
| Preview | `npm run preview` | Preview the production build locally |

---

## 🌍 How Carbon Calculation Works

Carbon-Wise uses a **Well-to-Wheel + Lifecycle** methodology:

```
Total Lifecycle CO₂ = Manufacturing + Usage + Disposal
```

- **Manufacturing**: Embedded carbon from vehicle production (steel, battery minerals, assembly)
- **Usage (Well-to-Wheel)**:
  - *ICE vehicles*: Fuel consumption × fuel emission factor × distance
  - *EVs*: Energy consumption × state grid carbon intensity × distance
  - *Hybrids*: Weighted combination based on electric-drive ratio
- **Disposal**: End-of-life processing emissions minus recycling credits

The state-level grid intensity data ensures that an EV charged in coal-heavy Jharkhand gets a very different score than one charged in hydro-rich Karnataka.

---

## 🚢 Deployment

### Backend on Render

Create a new **Web Service** from the backend folder and use these settings:

- **Root directory:** `backend`
- **Runtime:** Node
- **Build command:** `npm install`
- **Start command:** `npm start`
- **Instance type:** free or paid, depending on expected traffic

Set these environment variables in Render:

- `NODE_ENV=production`
- `PORT=10000` or leave Render to inject its own port
- `CORS_ORIGIN=https://your-site.netlify.app`

Optional if you want to allow local testing from the deployed API:

- `CORS_ORIGINS=https://your-site.netlify.app,http://localhost:5173`

Important notes for Render:

- The app uses `sql.js`, so the SQLite file is rebuilt from seed data if the filesystem is empty.
- This means the service is fine for demo/read-mostly deployments, but it is not a durable database.
- If you need persistence across redeploys, move the data layer to Render Postgres or another external database.

### Frontend on Netlify

Create a new **site** from the repository root and configure:

- **Base directory:** repository root
- **Build command:** `cd frontend && npm install && npm run build`
- **Publish directory:** `frontend/dist`

Set this environment variable in Netlify:

- `VITE_API_BASE_URL=https://your-backend.onrender.com`

This makes the browser call `https://your-backend.onrender.com/api/...` instead of the local Vite proxy path.

The included Netlify redirect below keeps React Router routes working on refresh and direct navigation.

---

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

---

## 📄 License

This project is licensed under the **MIT License**. See the [LICENSE](LICENSE) file for details.
