# Victory School Management System

A full-stack school management web application built with **React + TypeScript** (frontend) and **Node.js / Express + MongoDB** (backend).

All data displayed in the UI is served from the real backend API — there is no hardcoded demo data in production screens.

---

## Table of Contents

- [Tech Stack](#tech-stack)
- [Running Locally](#running-locally)
- [Environment Variables](#environment-variables)
- [API Endpoints](#api-endpoints)
- [Running Tests](#running-tests)
- [Building for Production](#building-for-production)
- [Deployment](#deployment)
- [Project Structure](#project-structure)

---

## Tech Stack

| Layer    | Technology |
|----------|------------|
| Frontend | React 19, TypeScript, Vite, React Router, Recharts, Lucide React |
| Backend  | Node.js, Express, TypeScript, Mongoose (MongoDB), JWT |
| AI       | Google Gemini (via `@google/genai`) |
| CI       | GitHub Actions |

---

## Running Locally

### Prerequisites

- Node.js ≥ 18
- MongoDB (local or [MongoDB Atlas](https://www.mongodb.com/atlas))
- A [Google Gemini API key](https://aistudio.google.com/app/apikey) (optional – AI assistant only)

### 1. Clone the repository

```bash
git clone https://github.com/dorndickence/victory-project.git
cd victory-project
```

### 2. Configure the frontend

```bash
cp .env.example .env
# Edit .env and set GEMINI_API_KEY (and optionally VITE_API_URL)
```

### 3. Start the frontend

```bash
npm install
npm run dev        # Vite dev server → http://localhost:5173
```

### 4. Configure the backend

```bash
cd Backend
cp .env.example .env
# Edit Backend/.env – set MONGO_URI and JWT_SECRET at minimum
```

### 5. Start the backend

```bash
npm install
npm run dev        # ts-node-dev → http://localhost:5000
```

### 6. (Optional) Seed the database

```bash
# Still inside Backend/
SEED_ADMIN_PASSWORD=ChooseAStrongPassword npm run seed
```

This seeds students, teachers, monthly fee records, attendance records, per-student fees, subjects, exams, books, borrow records, announcements, and an admin user.

---

## Environment Variables

### Frontend (`.env` in repo root)

| Variable | Required | Description |
|----------|----------|-------------|
| `GEMINI_API_KEY` | No | Google Gemini API key for the AI assistant |
| `VITE_API_URL` | No | Backend API base URL (default: `http://localhost:5000/api/v1`) |

### Backend (`Backend/.env`)

| Variable | Required | Description |
|----------|----------|-------------|
| `NODE_ENV` | No | `development` or `production` (default: `development`) |
| `PORT` | No | Server port (default: `5000`) |
| `MONGO_URI` | Yes | MongoDB connection string |
| `JWT_SECRET` | **Yes in prod** | Secret for signing JWTs |
| `CORS_ORIGIN` | No | Allowed frontend origin (default: `http://localhost:5173`) |
| `SEED_ADMIN_EMAIL` | Seed only | Admin email created by seed script |
| `SEED_ADMIN_PASSWORD` | Seed only | Admin password created by seed script |

> **Note**: `JWT_SECRET` is **required** in production. The server will exit immediately on startup if it is not set.

---

## API Endpoints

All endpoints are prefixed with `/api/v1`.

| Resource | Method | Path | Auth required |
|----------|--------|------|---------------|
| Health | GET | `/healthz` | No |
| Auth | POST | `/auth/login` | No |
| Dashboard | GET | `/dashboard/stats` | No |
| Students | GET / POST | `/students` | GET: protected |
| Students | GET / PATCH / DELETE | `/students/:id` | Protected |
| Teachers | GET | `/teachers` | No |
| Teachers | POST | `/teachers` | Admin |
| Teachers | PATCH / DELETE | `/teachers/:id` | Admin |
| Fees (monthly) | GET | `/fees/monthly` | No |
| Fees (per-student) | GET / POST | `/fees` | POST: Admin |
| Fees (per-student) | PATCH / DELETE | `/fees/:id` | Admin |
| Academics | GET / POST | `/academics/subjects` | POST: Admin/Teacher |
| Academics | PATCH / DELETE | `/academics/subjects/:id` | Admin/Teacher |
| Academics | GET / POST | `/academics/exams` | POST: Admin/Teacher |
| Academics | PATCH / DELETE | `/academics/exams/:id` | Admin/Teacher |
| Library | GET / POST | `/library/books` | POST: Admin |
| Library | PATCH / DELETE | `/library/books/:id` | Admin |
| Library | GET / POST | `/library/borrows` | POST: Admin |
| Library | PATCH / DELETE | `/library/borrows/:id` | Admin |
| Communication | GET / POST | `/communication` | POST: Admin/Teacher |
| Communication | PATCH / DELETE | `/communication/:id` | Admin/Teacher |

---

## Running Tests

### Backend

```bash
cd Backend
npm test
```

Tests use [Jest](https://jestjs.io/) + [ts-jest](https://kulshekhar.github.io/ts-jest/).

---

## Building for Production

### Frontend

```bash
npm run build          # outputs to dist/
npm run preview        # preview the production build locally
```

### Backend

```bash
cd Backend
npm run build          # tsc → outputs to dist/
npm start              # node dist/app.js
```

---

## Deployment

### Checklist

1. Set all **required** environment variables in your hosting environment (never commit `.env` files).
2. Build both frontend and backend (`npm run build`).
3. Serve the frontend `dist/` folder via a static host (Netlify, Vercel, S3, Nginx, etc.).
4. Deploy the backend `dist/app.js` on any Node.js host (Render, Railway, Fly.io, AWS, a VPS, etc.).
5. Point `CORS_ORIGIN` on the backend to your frontend domain.
6. Point `VITE_API_URL` on the frontend to your backend domain.

### Docker (example)

```dockerfile
# Backend
FROM node:18-alpine AS builder
WORKDIR /app
COPY Backend/package*.json ./
RUN npm ci --omit=dev
COPY Backend/ ./
RUN npm run build

FROM node:18-alpine
WORKDIR /app
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
ENV NODE_ENV=production
EXPOSE 5000
CMD ["node", "dist/app.js"]
```

### Health check

The backend exposes `GET /healthz` → `{ "status": "ok" }` for uptime monitors and container orchestrators.

---

## Project Structure

```
victory-project/
├── .env.example          # Frontend env template
├── .github/workflows/    # GitHub Actions CI
├── components/           # Shared React components (including AI assistant)
├── constants/data.ts     # Intentionally empty – data comes from the backend API
├── lib/api.ts            # Frontend API client helper (uses VITE_API_URL)
├── pages/                # React page components (all wired to real API)
├── types.ts              # Shared TypeScript types
├── vite.config.ts        # Vite configuration
├── App.tsx               # Root React component
└── Backend/
    ├── .env.example      # Backend env template
    ├── app.ts            # Express app entry point
    ├── config/           # Runtime configuration & validation
    ├── controllers/      # Route handlers (student, teacher, fee, academics,
    │                     #   library, communication, dashboard, error)
    ├── middleware/        # Auth (JWT protect / restrictTo)
    ├── models/           # Mongoose schemas (Student, Teacher, FeeRecord,
    │                     #   AttendanceRecord, StudentFee, Subject, Exam,
    │                     #   Book, BorrowRecord, Announcement, User)
    ├── routes/           # Express routers for all resources
    ├── tests/            # Unit tests (errorController, teacherController)
    └── utils/seed.ts     # Dev-only database seed script (all entities)
```

