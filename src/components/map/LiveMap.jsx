// src/components/Map/LiveMap.jsx
import React, { useEffect, useState } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  Circle,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

// ✅ Fix Leaflet default marker icon issue with Vite
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

// Custom icons
const createIcon = (color, emoji) => {
  return L.divIcon({
    className: "custom-marker",
    html: `<div style="
      background: ${color}; 
      width: 36px; height: 36px; 
      border-radius: 50%; 
      display: flex; 
      align-items: center; 
      justify-content: center; 
      font-size: 18px; 
      border: 3px solid white; 
      box-shadow: 0 2px 8px rgba(0,0,0,0.3);
    ">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });
};

const userIcon = createIcon("#3B82F6", "🧳");
const sosIcon = createIcon("#EF4444", "🆘");
const safeIcon = createIcon("#22C55E", "✅");
const dangerZoneColor = "#EF4444";
const safeZoneColor = "#22C55E";

// ✅ Component to fly to user's location
const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
};

// ✅ Main Map Component
const LiveMap = ({ userLocation, tourists = [], alerts = [], dangerZones = [], isAdmin = false }) => {
  const [mapCenter, setMapCenter] = useState([28.6139, 77.2090]); // Default: Delhi

  useEffect(() => {
    if (userLocation) {
      setMapCenter([userLocation.lat, userLocation.lng]);
    }
  }, [userLocation]);

  return (
    <div className="relative w-full h-full rounded-xl overflow-hidden shadow-lg">
      {/* Map Legend */}
      <div className="absolute top-3 right-3 z-[1000] bg-white p-3 rounded-lg shadow-md text-sm">
        <h4 className="font-bold mb-2">Legend</h4>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-4 bg-blue-500 rounded-full inline-block"></span>
          <span>Tourist</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-4 bg-red-500 rounded-full inline-block"></span>
          <span>SOS Alert</span>
        </div>
        <div className="flex items-center gap-2 mb-1">
          <span className="w-4 h-4 bg-green-500 rounded-full inline-block"></span>
          <span>Safe Zone</span>
        </div>
        <div className="flex items-center gap-2">
          <span className="w-4 h-4 bg-red-300 rounded-full inline-block"></span>
          <span>Danger Zone</span>
        </div>
      </div>

      <MapContainer
        center={mapCenter}
        zoom={13}
        style={{ height: "100%", width: "100%" }}
        zoomControl={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        <FlyToLocation position={userLocation ? [userLocation.lat, userLocation.lng] : null} />

        {/* ✅ Current user's location */}
        {userLocation && (
          <Marker
            position={[userLocation.lat, userLocation.lng]}
            icon={userIcon}
          >
            <Popup>
              <div className="text-center">
                <p className="font-bold">📍 Your Location</p>
                <p className="text-sm text-gray-600">
                  {userLocation.lat}, {userLocation.lng}
                </p>
              </div>
            </Popup>
          </Marker>
        )}

        {/* ✅ Other tourists (admin view) */}
        {isAdmin &&
          tourists.map((tourist) => {
            if (!tourist.location?.lat) return null;
            return (
              <Marker
                key={tourist._id}
                position={[tourist.location.lat, tourist.location.lng]}
                icon={tourist.status === "danger" ? sosIcon : safeIcon}
              >
                <Popup>
                  <div>
                    <p className="font-bold">{tourist.name}</p>
                    <p className="text-sm">{tourist.email}</p>
                    <p className="text-sm">
                      Status:{" "}
                      <span
                        className={
                          tourist.status === "danger"
                            ? "text-red-600 font-bold"
                            : "text-green-600"
                        }
                      >
                        {tourist.status || "safe"}
                      </span>
                    </p>
                  </div>
                </Popup>
              </Marker>
            );
          })}

        {/* ✅ SOS Alert markers */}
        {alerts
          .filter((a) => !a.resolved && a.location)
          .map((alert) => (
            <Marker
              key={alert._id}
              position={[
                alert.location.lat || alert.location.latitude,
                alert.location.lng || alert.location.longitude,
              ]}
              icon={sosIcon}
            >
              <Popup>
                <div>
                  <p className="font-bold text-red-600">🆘 SOS Alert</p>
                  <p className="text-sm">{alert.message}</p>
                  <p className="text-xs text-gray-500">
                    {new Date(alert.timestamp).toLocaleString()}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}

        {/* ✅ Danger Zones (red circles) */}
        {dangerZones
          .filter((z) => z.type === "danger")
          .map((zone, index) => (
            <Circle
              key={`danger-${index}`}
              center={[zone.lat, zone.lng]}
              radius={zone.radius || 500}
              pathOptions={{
                color: dangerZoneColor,
                fillColor: dangerZoneColor,
                fillOpacity: 0.15,
                weight: 2,
                dashArray: "5, 10",
              }}
            >
              <Popup>
                <div>
                  <p className="font-bold text-red-600">⚠️ {zone.name}</p>
                  <p className="text-sm">{zone.description}</p>
                </div>
              </Popup>
            </Circle>
          ))}

        {/* ✅ Safe Zones (green circles) */}
        {dangerZones
          .filter((z) => z.type === "safe")
          .map((zone, index) => (
            <Circle
              key={`safe-${index}`}
              center={[zone.lat, zone.lng]}
              radius={zone.radius || 300}
              pathOptions={{
                color: safeZoneColor,
                fillColor: safeZoneColor,
                fillOpacity: 0.1,
                weight: 2,
              }}
            >
              <Popup>
                <div>
                  <p className="font-bold text-green-600">✅ {zone.name}</p>
                  <p className="text-sm">{zone.description}</p>
                </div>
              </Popup>
            </Circle>
          ))}
      </MapContainer>
    </div>
  );
};

export default LiveMap;