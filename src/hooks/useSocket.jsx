import { useEffect, useState } from 'react';
import io from 'socket.io-client';

const socket = io('http://localhost:5000');

export const useSocket = () => {
  const [liveAlerts, setLiveAlerts] = useState([]);
  const [liveLocations, setLiveLocations] = useState([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    socket.on('connect', () => {
      setIsConnected(true);
      console.log('✅ Socket connected');
    });

    socket.on('newAlert', (alertData) => {
      console.log('🚨 New Alert:', alertData);
      setLiveAlerts((prev) => [alertData, ...prev]);
      
      // Browser notification
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification('🚨 SOS Alert!', {
          body: `${alertData.user.name} needs help!`,
          icon: '/favicon.ico',
          tag: 'sos-alert'
        });
      }
    });

    socket.on('locationUpdate', (locationData) => {
      setLiveLocations((prev) => {
        const filtered = prev.filter((l) => l.userId !== locationData.userId);
        return [...filtered, locationData];
      });
    });

    socket.on('disconnect', () => {
      setIsConnected(false);
      console.log('❌ Socket disconnected');
    });

    // Request notification permission
    if ('Notification' in window && Notification.permission === 'default') {
      Notification.requestPermission();
    }

    return () => {
      socket.off('connect');
      socket.off('newAlert');
      socket.off('locationUpdate');
      socket.off('disconnect');
    };
  }, []);

  return { liveAlerts, liveLocations, isConnected, socket };
};
