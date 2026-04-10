import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { useAuth } from '../context/AuthContext';
import { useSocket } from '../hooks/useSocket';

// Fix default marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
});

// Custom marker icons
const userIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

const dangerIcon = new L.Icon({
  iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-red.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});

// Geo-fencing zones
const dangerZones = [
  { 
    center: [28.6139, 77.2090],
    radius: 2000, 
    name: 'Delhi High Alert Zone', 
    color: 'red',
    description: 'High tourist traffic area'
  },
  { 
    center: [27.1767, 78.0081],
    radius: 1500, 
    name: 'Agra Tourist Zone', 
    color: 'orange',
    description: 'Taj Mahal area monitoring'
  },
  { 
    center: [26.9124, 75.7873],
    radius: 1800, 
    name: 'Jaipur Pink City Zone', 
    color: 'orange',
    description: 'Tourist safety zone'
  },
];

function MapGeoFencing() {
  const [users, setUsers] = useState([]);
  const [myLocation, setMyLocation] = useState([20.5937, 78.9629]);
  const [mapReady, setMapReady] = useState(false);
  const [selectedUser, setSelectedUser] = useState(null);

  const { token, user } = useAuth();
  const { liveLocations } = useSocket();

  // Get current location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setMyLocation([position.coords.latitude, position.coords.longitude]);
        },
        (error) => console.log('Location error:', error)
      );
    }
    // Delay map render to avoid initialization error
    const timer = setTimeout(() => setMapReady(true), 100);
    return () => clearTimeout(timer);
  }, []);

  // Fetch all users' locations
  useEffect(() => {
    const fetchUsers = async () => {
      if (!token) return;

      try {
        const response = await fetch('http://localhost:5000/api/location/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });

        if (response.ok) {
          const data = await response.json();
          setUsers(data);
        }
      } catch (err) {
        console.log('Error fetching locations:', err);
      }
    };

    fetchUsers();
    const interval = setInterval(fetchUsers, 15000);
    return () => clearInterval(interval);
  }, [token]);

  // Merge live locations
  const allUsers = [...users];
  liveLocations.forEach(live => {
    const index = allUsers.findIndex(u => u._id === live.userId);
    if (index !== -1) {
      allUsers[index].location = live.location;
    }
  });

  if (!mapReady) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Map...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">🗺️ Live Map & Geo-Fencing</h1>
        <p className="text-gray-600">Real-time tourist location tracking with danger zone monitoring</p>
      </div>

      {/* Legend */}
      <div className="bg-white p-4 rounded-lg shadow-md mb-4 flex flex-wrap gap-6">
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-blue-500 rounded-full"></span>
          <span className="text-sm">You / Active Tourists</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded-full"></span>
          <span className="text-sm">SOS / Danger</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-500 rounded-full opacity-30"></span>
          <span className="text-sm">High Alert Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-orange-500 rounded-full opacity-30"></span>
          <span className="text-sm">Caution Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></span>
          <span className="text-sm">Live Updates: {liveLocations.length}</span>
        </div>
      </div>

      {/* Map Container */}
      <div className="bg-white rounded-xl shadow-lg overflow-hidden" style={{ height: '70vh' }}>
        <MapContainer 
          key={`map-${myLocation[0]}-${myLocation[1]}`}
          center={myLocation} 
          zoom={5} 
          style={{ height: '100%', width: '100%' }}
          scrollWheelZoom={true}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution='&copy; OpenStreetMap'
          />

          {/* Current User Location */}
          <Marker position={myLocation} icon={userIcon}>
            <Popup>
              <div className="text-center">
                <strong className="text-blue-600">📍 You are here</strong>
                <p className="text-sm text-gray-600">{user?.name || 'Your Location'}</p>
                <p className="text-xs text-gray-500">
                  {myLocation[0].toFixed(4)}, {myLocation[1].toFixed(4)}
                </p>
              </div>
            </Popup>
          </Marker>

          {/* All Other Users */}
          {allUsers.map((u) => {
            if (!u.location || (u.location.lat === 0 && u.location.lng === 0)) return null;
            
            const icon = u.status === 'danger' ? dangerIcon : userIcon;
            
            return (
              <Marker 
                key={u._id} 
                position={[u.location.lat, u.location.lng]}
                icon={icon}
              >
                <Popup>
                  <div className="min-w-[180px]">
                    <h3 className="font-bold text-lg text-gray-800">{u.name}</h3>
                    <p className="text-sm text-gray-600">{u.email}</p>
                    <div className="mt-2 space-y-1">
                      <p className="text-xs">
                        <strong>Status:</strong>{' '}
                        <span className={u.status === 'danger' ? 'text-red-600 font-bold' : 'text-green-600'}>
                          {u.status?.toUpperCase() || 'SAFE'}
                        </span>
                      </p>
                      <p className="text-xs">
                        <strong>Role:</strong> {u.role}
                      </p>
                      <p className="text-xs">
                        <strong>Last Update:</strong>{' '}
                        {new Date(u.lastUpdated).toLocaleTimeString()}
                      </p>
                    </div>
                  </div>
                </Popup>
              </Marker>
            );
          })}

          {/* Danger Zones */}
          {dangerZones.map((zone, index) => (
            <Circle
              key={index}
              center={zone.center}
              radius={zone.radius}
              pathOptions={{ 
                color: zone.color, 
                fillColor: zone.color, 
                fillOpacity: 0.15,
                weight: 2
              }}
            >
              <Popup>
                <div>
                  <h4 className="font-bold text-red-700">{zone.name}</h4>
                  <p className="text-sm text-gray-600">{zone.description}</p>
                  <p className="text-xs text-gray-500 mt-1">Radius: {zone.radius}m</p>
                </div>
              </Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      {/* Stats Bar */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Total Tracked</p>
          <h3 className="text-2xl font-bold text-blue-600">{allUsers.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">In Danger</p>
          <h3 className="text-2xl font-bold text-orange-600">
            {allUsers.filter(u => u.status === 'danger').length}
          </h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Live Updates</p>
          <h3 className="text-2xl font-bold text-green-600">{liveLocations.length}</h3>
        </div>
        <div className="bg-white p-4 rounded-lg shadow-md">
          <p className="text-gray-500 text-sm">Alert Zones</p>
          <h3 className="text-2xl font-bold text-red-600">{dangerZones.length}</h3>
        </div>
      </div>
    </div>
  );
}

export default MapGeoFencing;
