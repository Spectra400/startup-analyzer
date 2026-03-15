# 🚀 AI Startup Idea Validator

An AI-powered full-stack web application that validates startup ideas using the Groq API (LLaMA 3 70B). Get instant market analysis, competitor insights, risk assessment, and a success score — all displayed in a futuristic cyberpunk dashboard.

---

## ✨ Features

- **AI-Powered Analysis** — 10-section business analysis powered by LLaMA 3 70B via Groq
- **Success Score** — Animated circular meter scoring your idea 0–100
- **PDF Export** — Download a beautifully formatted dark-themed PDF report
- **History Tracking** — All reports saved to browser localStorage for easy recall
- **Futuristic UI** — Glassmorphism, neon glows, neural particle background, Framer Motion animations

## 🛠 Tech Stack

| Layer      | Technologies                                              |
|------------|-----------------------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion, Three.js     |
| Backend    | Node.js, Express, Groq SDK                                |
| AI Model   | LLaMA 3 70B (via Groq API)                                |
| PDF        | jsPDF                                                     |
| Icons      | Lucide React                                              |

## 📦 Setup Instructions

### Prerequisites
- Node.js 18+ installed
- A free [Groq API key](https://console.groq.com/)

### 1. Clone & Install

```bash
# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd ../frontend
npm install
```

### 2. Configure Environment

Open `backend/.env` and replace the placeholder with your API key:

```
GROQ_API_KEY=gsk_your_actual_api_key_here
PORT=5000
```

### 3. Run the Application

Open **two terminals**:

```bash
# Terminal 1 — Backend
cd backend
npm run dev

# Terminal 2 — Frontend
cd frontend
npm run dev
```

The frontend runs at **http://localhost:5173** and the backend API at **http://localhost:5000**.

## 📁 Project Structure

```
Startup_Analyzer/
├── backend/
│   ├── controllers/analyzeController.js
│   ├── routes/analyzeRoutes.js
│   ├── services/groqService.js
│   ├── .env
│   ├── package.json
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/   (Navbar, GlassCard, ScoreMeter, NeuralBackground)
│   │   ├── pages/        (Landing, IdeaForm, Results, History)
│   │   ├── services/     (api.js)
│   │   ├── utils/        (localStorage.js, pdfGenerator.js)
│   │   ├── App.jsx
│   │   ├── main.jsx
│   │   └── index.css
│   ├── index.html
│   ├── tailwind.config.js
│   ├── vite.config.js
│   └── package.json
└── README.md
```

## 📄 License

MIT
