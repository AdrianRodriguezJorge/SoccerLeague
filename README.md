# Soccer League

Repository monorepo for the **Soccer League** application, consisting of a NestJS backend API and a Vue 3 + Vite + TailwindCSS frontend UI.

---

## Overview

- **Backend** (`/backend`): RESTful API built with **NestJS**, **TypeScript**, and **Prisma** for data persistence.
- **Frontend** (`/frontend`): Single‑page application built with **Vue 3**, **Vite**, **TailwindCSS**, **Pinia** for state management and **Vue Router** for navigation.

The project enables management of stadiums, teams, matches, and players, plus a collection of league reports.

---

## Prerequisites

- **Node.js** >= 18
- **npm** (comes with Node)
- A relational database supported by Prisma (e.g., PostgreSQL). Configure connection details in `backend/.env`.

---

## Installation

```bash
# Clone the repository
git clone https://github.com/AdrianRodriguezJorge/SoccerLeague.git
cd SoccerLeague

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

---

## Running the application (development)

### Backend

```bash
cd backend
npm run start:dev   # starts NestJS server on http://localhost:3000
```

### Frontend

```bash
cd frontend
npm run dev        # starts Vite dev server (usually http://localhost:5173)
```

Open the frontend URL in a browser; the UI will communicate with the backend API.

---

## Project structure

```
SoccerLeague/
├─ backend/        # NestJS API
│   ├─ src/
│   └─ README.md
├─ frontend/       # Vue UI
│   ├─ src/
│   └─ README.md
├─ README.md       # (this file) repository overview
└─ ...
```

---

## License

MIT © 2024‑2026 Adrian Rodríguez
