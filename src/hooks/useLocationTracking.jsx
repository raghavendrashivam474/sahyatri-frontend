import { useEffect } from 'react';
import { useAuth } from '../context/AuthContext';

export const useLocationTracking = (interval = 10000) => {
  const { token } = useAuth();

  useEffect(() => {
    if (!token) return;

    const updateLocation = async (position) => {
      const { latitude, longitude } = position.coords;
      
      try {
        const response = await fetch('http://localhost:5000/api/location/update', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
          body: JSON.stringify({ lat: latitude, lng: longitude })
        });

        if (response.ok) {
          console.log('✅ Location updated:', { lat: latitude, lng: longitude });
        }
      } catch (error) {
        console.error('❌ Location update failed:', error);
      }
    };

    const handleError = (error) => {
      console.error('GPS Error:', error.message);
    };

    // Get initial location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(updateLocation, handleError);

      // Update location every 10 seconds
      const locationInterval = setInterval(() => {
        navigator.geolocation.getCurrentPosition(updateLocation, handleError);
      }, interval);

      return () => clearInterval(locationInterval);
    } else {
      console.error('Geolocation not supported by this browser.');
    }
  }, [token, interval]);
};
