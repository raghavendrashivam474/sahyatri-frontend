// src/index.js (or main.jsx)
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx'; // Ensure this path is correct
import './index.css'; // Or your global CSS file for Tailwind

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
