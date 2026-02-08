# BookSaloonz – Online Salon Pre-Booking System

This is a MERN stack project for a final year engineering project.

## Directory Structure

### Client (Frontend)
Located in `/client`. Built with React + Vite.
- **`public/`**: Static assets like `favicon.ico`.
- **`src/`**: Main source code.
  - **`assets/`**: Images, logos, icons.
  - **`components/`**: Reusable UI components (Navbar, Footer, Cards).
  - **`pages/`**: Full page components (Home, Login, Booking).
  - **`services/`**: API integration logic.
  - **`utils/`**: Helper functions (e.g., date formatting, axios instance).
  - **`App.jsx`**: Main application component and routing.
  - **`main.jsx`**: Entry point for React.

### Server (Backend)
Located in `/server`. Built with Node.js + Express + MacongoDB.
- **`config/`**: Configuration files (Database connection, Passport strategies).
- **`models/`**: Mongoose schemas (User, Salon, Booking).
- **`controllers/`**: Request handlers (Business logic).
- **`routes/`**: API route definitions.
- **`middleware/`**: Custom middleware (Authentication, Error handling).
- **`algorithms/`**: "Smart" features logic:
  - `bertSearch.js`: Semantic search.
  - `ncfRecommend.js`: User recommendations.
  - `ltrRanking.js`: Result ranking.
  - `dqnSlot.js`: Time slot optimization.

## How to Run

### 1. Backend
```bash
cd server
npm install
npm run dev
```

### 2. Frontend
```bash
cd client
npm install
npm run dev
```

## Prerequisities
- Node.js installed
- MongoDB installed and running
- Create a `.env` file in `/server` with `MONGO_URI` and `PORT`.
