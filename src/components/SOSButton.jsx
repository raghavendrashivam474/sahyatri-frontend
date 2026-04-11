// src/components/SOSButton.jsx
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

const SOSButton = () => {
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);
  const { token, user } = useAuth();
  const { emitSOS, isConnected } = useSocket();

  // Don't show if not logged in or if admin
  if (!token) return null;
  if (user?.role === 'admin') return null;

  const handleSOS = async () => {
    if (sending) return;

    const confirm = window.confirm(
      '🚨 Are you sure you want to send an SOS alert? This will notify emergency services!'
    );
    if (!confirm) return;

    setSending(true);

    try {
      // ✅ Get current location
      let location = null;
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject, {
            enableHighAccuracy: true,
            timeout: 5000,
          });
        });
        location = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
      } catch (locErr) {
        console.warn('Could not get location:', locErr);
      }

      // ✅ 1. Send via API (saves to database)
      const response = await fetch('http://localhost:5000/api/alert/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ message: 'Emergency! I need help!' }),
      });

      if (response.ok) {
        // ✅ 2. Also emit via socket (real-time to admin)
        const sosData = {
          user: { name: user?.name, email: user?.email },
          alert: { message: 'Emergency! I need help!' },
          location: location,
          timestamp: new Date().toISOString(),
        };
        emitSOS(sosData);

        setSent(true);
        console.log('🚨 SOS sent via API + Socket!');

        // Show success
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

  return (
    <>
      <button
        onClick={handleSOS}
        disabled={sending}
        className={`fixed bottom-8 right-8 z-50 w-20 h-20 rounded-full text-white 
                    font-bold text-xl shadow-2xl transition-all duration-300 
                    flex items-center justify-center ${
                      sent
                        ? 'bg-green-500 scale-110'
                        : sending
                        ? 'bg-yellow-500 animate-pulse cursor-wait'
                        : 'bg-red-600 hover:bg-red-700 hover:scale-110 animate-bounce'
                    }`}
        style={{
          boxShadow: sent
            ? '0 0 40px rgba(34, 197, 94, 0.8)'
            : '0 0 40px rgba(220, 38, 38, 0.8)',
        }}
        title="Emergency SOS"
      >
        {sent ? '✓' : sending ? '⟳' : 'SOS'}
      </button>

      {/* ✅ Connection indicator */}
      <div
        className={`fixed bottom-32 right-10 z-50 text-xs px-2 py-1 rounded-full ${
          isConnected
            ? 'bg-green-100 text-green-700'
            : 'bg-red-100 text-red-700'
        }`}
      >
        {isConnected ? '🟢 Live' : '🔴 Offline'}
      </div>
    </>
  );
};

export default SOSButton;