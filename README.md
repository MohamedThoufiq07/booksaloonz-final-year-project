# ✂️ BookSaloonz - Premium AI-Powered Salon Pre-Booking System

[![React](https://img.shields.io/badge/Frontend-React%20%2B%20Vite-61DAFB?logo=react)](https://reactjs.org/)
[![Node.js](https://img.shields.io/badge/Backend-Node.js%20%2B%20Express-339933?logo=node.js)](https://nodejs.org/)
[![MongoDB](https://img.shields.io/badge/Database-MongoDB-47A248?logo=mongodb)](https://www.mongodb.com/)
[![TensorFlow](https://img.shields.io/badge/AI-TensorFlow.js-FF6F00?logo=tensorflow)](https://www.tensorflow.org/js)

**BookSaloonz** is an advanced, full-stack web application designed to revolutionize the grooming industry. It bridges the gap between premium salons and style-conscious customers through intelligent scheduling, AI-driven style recommendations, and data-backed performance ranking.

---

## 🌟 Key Features

### 🤖 1. AI Hairstyle Finder
*   **Face Shape Analysis**: Utilizes `face-api.js` (TensorFlow.js) to detect facial landmarks and classify user face shapes in real-time.
*   **Smart Suggestions**: Recommends the most flattering hairstyles based on categorized facial geometry (Oval, Square, Round, etc.).

### 🧠 2. Intelligent Search & Recommendations
*   **BERT-Inspired Semantic Search**: Implements a custom NLP-based search engine with synonym expansion and fuzzy matching for a natural search experience.
*   **NCF Recommendation Engine**: Neural Collaborative Filtering logic to suggest salons and products based on user preferences and behavior.
*   **LTR Ranking**: A "Learning to Rank" approach that prioritizes high-quality, relevant salons in search results.

### 📅 3. Smart Slot Booking (DQN-Inspired)
*   **Efficiency Optimization**: A Reinforcement Learning-inspired algorithm that evaluates available time slots using multiple reward signals:
    *   *Gap Minimization*: Reduces "dead time" for salon owners.
    *   *Peak Avoidance*: Incentivizes off-peak bookings.
    *   *User Convenience*: Matches slots with user's preferred booking times.

### 💇‍♂️ 4. Personalized Grooming Tools
*   **Hair Tracker**: A digital diary for users to track their hair growth journey, styling history, and upcoming grooming needs.
*   **Product Marketplace**: Discover and purchase professional grooming products directly from top-rated salons.

### 🏢 5. Salon Management Portal
*   **Dedicated Dashboard**: Salon owners can manage bookings, update service catalogs, and monitor their performance metrics.

---

## 🛠️ Technical Stack

### **Frontend**
- **Framework**: React.js with Vite for blazing-fast development.
- **Styling**: Modern CSS3 with Vanilla CSS for custom, high-end aesthetics.
- **State Management**: React Hooks and Context API.
- **Icons & UI**: Lucide React & FontAwesome.

### **Backend**
- **Runtime**: Node.js
- **Framework**: Express.js
- **Database**: MongoDB with Mongoose (ODM).
- **Authentication**: JWT (JSON Web Tokens) & Bcrypt for secure access.
- **File Handling**: Multer for image uploads.

### **AI & ML Engines**
- **Computer Vision**: TensorFlow.js / Face-api.js.
- **Algorithms**: Custom-built JS implementations of Semantic Search, DQN Slot Selection, and Collaborative Filtering.

---

## 🏗️ Project Structure

```bash
final-year-project/
├── booksaloon/          # Frontend - React + Vite
│   ├── src/
│   │   ├── components/  # Reusable UI Components
│   │   ├── pages/       # Home, AI Finder, Tracker, Salons, etc.
│   │   ├── assets/      # Styles and Media
│   │   └── App.jsx      # Core Routing Logic
├── server/              # Backend - Node.js + Express
│   ├── algorithms/      # AI/ML Core Logic (BERT, DQN, NCF, LTR)
│   ├── models/          # Mongoose Schemas (User, Salon, Booking)
│   ├── routes/          # API Handlers
│   ├── controllers/     # Business Process Logic
│   └── index.js         # Entry Point
└── package.json         # Root manager for concurrent execution
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js (v16.x or higher)
- MongoDB (Local or Atlas)
- NPM or Yarn

### 1. Clone & Environment Setup
```bash
git clone https://github.com/MohamedThoufiq07/booksaloonz-final-year-project.git
cd booksaloonz-final-year-project
```

Create a `.env` file in the `server` directory:
```env
PORT=5000
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_secret_key
```

### 2. Automatic Installation
Run the root install script to set up both Frontend and Backend:
```bash
npm run install-all
```

### 3. Run the Application
Start both the server and the frontend concurrently:
```bash
npm run dev
```

The application will be available at `http://localhost:5173` (Vite) and the API at `http://localhost:5000`.

---

## 🧪 Technical Highlights (For Interviewers)

*   **Custom Slot Optimization**: Instead of a simple "first-come-first-served" queue, I implemented a weighting-based algorithm (`dqnSlot.js`) to maximize salon throughput while maintaining user satisfaction.
*   **Semantic Understanding**: The search engine doesn't just look for keywords; it uses a domain-specific synonym map to understand that "cutting" and "styling" belong to the same style-context.
*   **On-Device AI**: By using TensorFlow.js on the client-side, the AI Hairstyle Finder provides instant feedback without the latency of server-side image processing.

---

## 👨‍💻 Contributor
- **Mohamed Thoufiq** - *Full Stack Developer & AI Enthusiast*

---
✨ *This project was developed as a Final Year Engineering Project to demonstrate the integration of Modern Web Technologies with AI/ML concepts.*
