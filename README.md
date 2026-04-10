# SAHYatri Frontend 🌍

A React-based frontend for the SAHYatri Tourist Safety Platform.

## 🚀 Features

* User authentication (JWT-based)
* Live location tracking
* Interactive map (Leaflet)
* SOS alert system
* Admin dashboard

## 🛠️ Tech Stack

* React (Vite)
* Tailwind CSS
* React Router
* Axios
* Socket.IO Client
* Leaflet / React-Leaflet
📁 Folder Structure
sahyatri-frontend/
│
├── public/                # Static assets
├── src/
│   ├── components/        # Reusable UI components
│   ├── pages/             # Route pages (Dashboard, Map, etc.)
│   ├── context/           # AuthContext, global state
│   ├── hooks/             # Custom hooks (location, socket)
│   ├── services/          # API calls (axios)
│   ├── utils/             # Helper functions
│   ├── App.jsx            # Main app component
│   └── main.jsx           # Entry point
│
├── .env.example           # Environment variables template
├── .gitignore
├── package.json
├── vite.config.js
└── README.md

## 📦 Setup

```bash
npm install
npm run dev
```

## 🔗 Backend API

Make sure backend is running at:
http://localhost:5000

## 🌐 Deployment

Recommended: Vercel

## 📌 Note

Environment variables required. Check `.env.example`
