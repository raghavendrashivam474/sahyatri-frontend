import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';

const SOSButton = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { token } = useAuth();

  const handleSOS = async () => {
    if (sending || !token) return;

    const confirm = window.confirm('🚨 Are you sure you want to send an SOS alert? This will notify emergency services!');
    if (!confirm) return;

    setSending(true);
    
    try {
      const response = await fetch('http://localhost:5000/api/alert/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ message: 'Emergency! I need help!' })
      });

      if (response.ok) {
        setSent(true);
        alert('✅ SOS Alert Sent! Help is on the way!');
        setTimeout(() => setSent(false), 5000);
      } else {
        alert('❌ Failed to send SOS. Please try again.');
      }
    } catch (error) {
      console.error('SOS Error:', error);
      alert('❌ Network error. Please check your connection.');
    }
    
    setSending(false);
  };

  // Only show for logged-in users
  if (!token) return null;

  return (
    <button
      onClick={handleSOS}
      disabled={sending}
      className={`fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full text-white font-bold text-xl shadow-2xl transition-all duration-300 flex items-center justify-center ${
        sent
          ? 'bg-green-500 scale-110 animate-pulse'
          : sending
          ? 'bg-yellow-500 animate-pulse cursor-wait'
          : 'bg-red-600 hover:bg-red-700 hover:scale-110 animate-bounce'
      }`}
      style={{ 
        boxShadow: sent ? '0 0 40px rgba(34, 197, 94, 0.8)' : '0 0 40px rgba(220, 38, 38, 0.8)',
        animation: !sending && !sent ? 'bounce 2s infinite' : ''
      }}
      title="Emergency SOS - Click to alert authorities"
    >
      {sent ? (
        <span className="text-2xl">✓</span>
      ) : sending ? (
        <span className="animate-spin text-2xl">⟳</span>
      ) : (
        <span className="text-lg">SOS</span>
      )}
    </button>
  );
};

export default SOSButton;
