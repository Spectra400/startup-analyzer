# 🚀 AI Startup Idea Validator

![Status](https://img.shields.io/badge/Status-Live-brightgreen)
![React](https://img.shields.io/badge/React-18-blue)
![Node.js](https://img.shields.io/badge/Node.js-Express-green)
![Groq AI](https://img.shields.io/badge/AI-Groq%20LLaMA3-orange)

## 🌐 Live Demo
### 👉 [https://startup-analyzer-e9oz.vercel.app](https://startup-analyzer-e9oz.vercel.app)

> First load may take ~30 seconds as the backend wakes up from sleep.

---

## 📌 About
An AI-powered full-stack web application that validates startup ideas instantly.
Enter your idea, target users, and country — get a complete 10-section 
business evaluation powered by Groq AI (LLaMA 3 70B) in a futuristic 
cyberpunk dashboard.

---

## ✨ Features

- 🤖 **AI Analysis** — 10-section business evaluation via LLaMA 3 70B
- 📊 **6 Interactive Charts** — Radar, Bar, Line, Donut, Radial, Timeline
- 🎯 **Success Score** — Animated 0-100 startup viability meter
- 📄 **PDF Export** — Download dark-themed analysis report
- 💾 **History** — Reports saved locally in browser storage
- 🎨 **Futuristic UI** — Glassmorphism, neon glows, neural particles

---

## 🛠 Tech Stack

| Layer | Technologies |
|-------|-------------|
| Frontend | React 18, Vite, Tailwind CSS, Framer Motion, Three.js |
| Backend | Node.js, Express, Groq SDK |
| AI Model | LLaMA 3 70B via Groq API |
| Charts | Recharts |
| PDF | jsPDF |
| Deploy | Vercel + Render |

---

## 📁 Project Structure

```
Startup_Analyzer/
├── backend/
│   ├── controllers/
│   ├── routes/
│   ├── services/
│   └── server.js
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   ├── services/
│   │   └── utils/
│   └── index.html
└── README.md
```

---

## ⚙️ Local Setup

Requires Node.js 18+ and a Groq API key.

```bash
# Backend
cd backend && npm install
# Add your GROQ_API_KEY to backend/.env
npm run dev

# Frontend
cd frontend && npm install
npm run dev
```

---

## 📜 License
MIT

---

*Built with ❤️ using React, Node.js, and Groq AI*
