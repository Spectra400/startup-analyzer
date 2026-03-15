# 🚀 AI Startup Idea Validator

![Status](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Groq AI](https://img.shields.io/badge/AI-Groq%20LLaMA3-orange)
![Vercel](https://img.shields.io/badge/Deployed-Vercel-black)

## 🌐 Live Demo
### 👉 [https://startup-analyzer-e9oz.vercel.app](https://startup-analyzer-e9oz.vercel.app)

> ⚠️ Note: Backend is hosted on Render free tier.
> First request may take 30 seconds to wake up — please be patient!

---

An AI-powered full-stack web application that validates startup ideas using the Groq API (LLaMA 3 70B). Get instant market analysis, competitor insights, risk assessment, and a success score — all displayed in a futuristic cyberpunk dashboard.

---

## ✨ Features

- **AI-Powered Analysis** — 10-section business analysis powered by LLaMA 3 70B via Groq
- **Success Score** — Animated circular meter scoring your idea 0–100
- **PDF Export** — Download a beautifully formatted dark-themed PDF report
- **History Tracking** — All reports saved to browser localStorage for easy recall
- **Futuristic UI** — Glassmorphism, neon glows, neural particle background, Framer Motion animations

## 📊 Interactive Charts

| Chart | Type | Data |
|-------|------|------|
| 🎯 Success Score | Radial Bar | AI success score 0-100 |
| 🕸️ Market Opportunity | Radar | 6 market dimensions |
| 📊 Competitor Landscape | Horizontal Bar | Competitor strengths |
| 📈 Revenue Projection | Area Chart | 12-month forecast |
| 🍩 Risk Distribution | Donut Pie | 5 risk categories |
| 🗓️ MVP Timeline | Progress Bars | 3 development phases |

## 🛠 Tech Stack

| Layer      | Technologies                                              |
|------------|-----------------------------------------------------------|
| Frontend   | React 18, Vite, Tailwind CSS, Framer Motion, Three.js     |
| Backend    | Node.js, Express, Groq SDK                                |
| AI Model   | LLaMA 3 70B (via Groq API)                                |
| PDF        | jsPDF                                                     |
| Icons      | Lucide React                                              |

## 🚀 Deployment

| Service | URL |
|---------|-----|
| 🌐 Frontend | https://startup-analyzer-e9oz.vercel.app |
| ⚙️ Backend | https://startup-analyzer-backend.onrender.com |
| 📁 Repository | https://github.com/Spectra400/startup-analyzer |

---

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

## 🔑 Getting a Free Groq API Key

1. Go to [console.groq.com](https://console.groq.com)
2. Sign up for free — no credit card required
3. Click **API Keys** in left sidebar
4. Click **Create API Key**
5. Copy the key — it starts with `gsk_`
6. Paste it in `backend/.env` as `GROQ_API_KEY`

---

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

---

## 🙏 Acknowledgements

- [Groq](https://groq.com) — Free AI API with LLaMA 3 70B
- [Vercel](https://vercel.com) — Frontend hosting
- [Render](https://render.com) — Backend hosting
- [Recharts](https://recharts.org) — Interactive charts
- [Framer Motion](https://framer.com/motion) — Animations
- [Three.js](https://threejs.org) — Neural background

---

*Built with ❤️ using React, Node.js, and Groq AI*
