# Angular + Node.js Production Dashboard

A production-ready dashboard tailored for a socks manufacturing floor. The Angular front end mirrors the provided UI reference with live charts, KPI cards, and recent order tables, while a lightweight Node.js API supplies real-time data for post-production visibility.

## Features
- 📊 Line and pie charts for throughput and status breakdowns using Chart.js.
- 📦 Order queue with SKU, customer, status chips, and due dates.
- ⚙️ Production metrics (cycle time, defect rate, units produced, downtime, lines running, urgent orders).
- 🔌 Node.js API serving dashboard data with CORS enabled for the Angular client.
- 🔄 Refresh action to re-fetch data without reloading the app.

## Getting Started
### Prerequisites
- Node.js 18+
- npm

### Install dependencies
```
npm install
```

### Run the Node.js API
```
npm run start:server
```
The API starts on `http://localhost:3000` and exposes `GET /api/dashboard`.

### Start the Angular UI (separate terminal)
```
npm start
```
Visit `http://localhost:4200` to view the dashboard consuming the Node.js API.

### Build for production
```
npm run build
```

## Notes
- The API is intentionally lightweight and dependency-free (built on Node's `http` module) to simplify deployment and remove external package requirements.
- Update `src/environments/environment.ts` if your API runs on a different host or port.
