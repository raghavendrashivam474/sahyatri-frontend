// src/hooks/useSocket.js
import { useEffect, useState, useCallback } from 'react';
import io from 'socket.io-client';
import { useAuth } from '../context/AuthContext';

const SOCKET_URL = 'http://localhost:5000';
let socket = null;

export const useSocket = () => {
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [liveLocations, setLiveLocations] = useState([]);
  const [isConnected, setIsConnected] = useState(false);
  const { token, user } = useAuth();

  useEffect(() => {
    // ✅ Create socket connection
    if (!socket) {
      socket = io(SOCKET_URL, {
        transports: ['websocket', 'polling'],
        reconnection: true,
        reconnectionAttempts: 10,
        reconnectionDelay: 2000,
      });
    }

    socket.on('connect', () => {
      setIsConnected(true);
      console.log('🟢 Socket connected:', socket.id);

      // ✅ Tell server your role
      if (user?.role) {
        socket.emit('join:role', user.role);
      }
    });

    // ✅ Listen for SOS alerts (from backend route)
    socket.on('newAlert', (alertData) => {
      console.log('🚨 NEW ALERT received:', alertData);
      setLiveAlerts((prev) => [alertData, ...prev]);

      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🚨 SOS Alert!', {
          body: `${alertData.user?.name || alertData.userName || 'Tourist'} needs help!`,
          icon: '/favicon.ico',
          tag: 'sos-alert',
        });
      }
    });

    // ✅ Listen for SOS alerts (alternate event name)
    socket.on('sos:new', (alertData) => {
      console.log('🚨 SOS:NEW received:', alertData);
      // Avoid duplicates
      setLiveAlerts((prev) => {
        const isDuplicate = prev.some(
          (a) => a.timestamp === alertData.timestamp
        );
        if (isDuplicate) return prev;
        return [alertData, ...prev];
      });
    });

    // ✅ Listen for location updates
    socket.on('locationUpdate', (locationData) => {
      setLiveLocations((prev) => {
        const filtered = prev.filter(
          (l) => l.userId !== locationData.userId
        );
        return [...filtered, locationData];
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('🔴 Socket disconnected');
    });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      socket.off('connect');
      socket.off('newAlert');
      socket.off('sos:new');
      socket.off('locationUpdate');
      socket.off('disconnect');
    };
  }, [user]);

  // ✅ Function to emit SOS via socket
  const emitSOS = useCallback((sosData) => {
    if (socket?.connected) {
      socket.emit('sos:trigger', sosData);
      console.log('🚨 SOS emitted via socket');
    } else {
      console.warn('⚠️ Socket not connected');
    }
  }, []);

  // ✅ Function to emit location via socket
  const emitLocation = useCallback((locationData) => {
    if (socket?.connected) {
      socket.emit('location:update', locationData);
    }
  }, []);

  return {
    liveAlerts,
    liveLocations,
    isConnected,
    socket,
    emitSOS,
    emitLocation,
    setLiveAlerts,
  };
};