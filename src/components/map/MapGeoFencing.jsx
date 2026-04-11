// src/components/MapGeoFencing.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../hooks/useSocket";
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
import API from "../../api/axios";

// Fix Leaflet marker icons
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png",
  iconUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png",
  shadowUrl: "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
});

const createIcon = (color, emoji) =>
  L.divIcon({
    className: "custom-marker",
    html: `<div style="background:${color};width:36px;height:36px;border-radius:50%;display:flex;align-items:center;justify-content:center;font-size:18px;border:3px solid white;box-shadow:0 2px 8px rgba(0,0,0,0.3)">${emoji}</div>`,
    iconSize: [36, 36],
    iconAnchor: [18, 18],
    popupAnchor: [0, -20],
  });

const userIcon = createIcon("#3B82F6", "🧳");
const sosIcon = createIcon("#EF4444", "🆘");
const safeIcon = createIcon("#22C55E", "✅");
const adminIcon = createIcon("#7C3AED", "🛡️");

const FlyToLocation = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    if (position) map.flyTo(position, 14, { duration: 1.5 });
  }, [position, map]);
  return null;
};

const ZONES = [
  { name: "Restricted Wildlife Area", type: "danger", lat: 28.632, lng: 77.444, radius: 500, description: "Protected area — wildlife risk" },
  { name: "River Flood Zone", type: "danger", lat: 28.628, lng: 77.44, radius: 400, description: "Flash flood risk during monsoon" },
  { name: "Steep Cliff Edge", type: "danger", lat: 28.636, lng: 77.448, radius: 300, description: "Dangerous terrain — risk of falling" },
  { name: "Tourist Info Center", type: "safe", lat: 28.634, lng: 77.442, radius: 300, description: "Help desk, first aid available" },
  { name: "Base Camp", type: "safe", lat: 28.63, lng: 77.446, radius: 400, description: "Food, water, medical supplies" },
  { name: "Police Checkpoint", type: "safe", lat: 28.635, lng: 77.442, radius: 200, description: "24/7 police assistance" },
];

const getDistance = (lat1, lng1, lat2, lng2) => {
  const R = 6371000;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLng = ((lng2 - lng1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos((lat1 * Math.PI) / 180) * Math.cos((lat2 * Math.PI) / 180) * Math.sin(dLng / 2) ** 2;
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
};

const MapGeoFencing = () => {
  const { user, token } = useAuth();
  const { liveAlerts, isConnected, emitSOS } = useSocket();

  const [userLocation, setUserLocation] = useState(null);
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [zoneWarning, setZoneWarning] = useState(null);

  const isAdmin = user?.role === "admin";

  // ✅ DEBUG: Log when liveAlerts changes
  useEffect(() => {
    console.log("📊 liveAlerts updated:", liveAlerts.length, liveAlerts);
  }, [liveAlerts]);

  // Watch GPS
  useEffect(() => {
    if (!navigator.geolocation) return;
    const watchId = navigator.geolocation.watchPosition(
      (pos) => {
        const loc = { lat: pos.coords.latitude, lng: pos.coords.longitude };
        setUserLocation(loc);
        let warning = null;
        for (const zone of ZONES.filter((z) => z.type === "danger")) {
          const d = getDistance(loc.lat, loc.lng, zone.lat, zone.lng);
          if (d <= zone.radius) {
            warning = { zone: zone.name, description: zone.description, distance: Math.round(d) };
            break;
          }
        }
        setZoneWarning(warning);
      },
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true, timeout: 10000 }
    );
    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // Admin fetch
  useEffect(() => {
    if (!isAdmin || !token) return;
    const fetchData = async () => {
      try {
        const [locRes, alertRes] = await Promise.all([
          API.get("/location/all"),
          API.get("/alert/all"),
        ]);
        setTourists(locRes.data);
        setAlerts(alertRes.data);
      } catch (err) {
        console.error("Admin fetch error:", err);
      }
    };
    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [isAdmin, token]);

  // Danger zone SOS
  const handleDangerZoneSOS = async () => {
    try {
      await API.post("/alert/sos", { message: `Danger Zone SOS: ${zoneWarning?.zone}` });
      emitSOS({
        user: { name: user?.name, email: user?.email },
        alert: { message: `Danger Zone SOS: ${zoneWarning?.zone}` },
        location: userLocation,
        timestamp: new Date().toISOString(),
      });
      alert("✅ SOS Sent!");
    } catch (err) {
      alert("❌ SOS Failed!");
    }
  };

  // ══════════════════════════════════════
  // RENDER
  // ══════════════════════════════════════
  return (
    <div className="min-h-screen bg-gray-100">

      {/* HEADER */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link to="/Dashboard" className="text-blue-600 hover:text-blue-800 font-semibold">← Back</Link>
          <h1 className="text-xl font-bold">🗺️ Live Map & Geo-Fencing</h1>
        </div>
        <div className="flex items-center gap-3">
          <span className={`flex items-center gap-1 text-sm ${isConnected ? "text-green-600" : "text-red-500"}`}>
            <span className={`w-2 h-2 rounded-full ${isConnected ? "bg-green-500 animate-pulse" : "bg-red-500"}`} />
            {isConnected ? "Live" : "Offline"}
          </span>
          {userLocation && (
            <span className="text-sm text-gray-500">
              📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </span>
          )}
          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${isAdmin ? "bg-red-100 text-red-700" : "bg-green-100 text-green-700"}`}>
            {isAdmin ? "🛡️ Admin" : "🧳 Tourist"}
          </span>
        </div>
      </div>

      {/* ✅ ADMIN: SOS ALERT BANNER — THIS IS THE KEY PART */}
      {isAdmin && liveAlerts.length > 0 && (
        <div style={{
          background: '#DC2626',
          color: 'white',
          padding: '20px',
          fontSize: '18px',
          fontWeight: 'bold',
          textAlign: 'center',
          animation: 'pulse 1s infinite',
          zIndex: 9999,
        }}>
          <div style={{ marginBottom: '10px', fontSize: '24px' }}>
            🚨🚨🚨 {liveAlerts.length} NEW SOS ALERT(S) RECEIVED! 🚨🚨🚨
          </div>
          {liveAlerts.slice(0, 5).map((a, i) => (
            <div key={i} style={{
              background: 'rgba(0,0,0,0.2)',
              padding: '8px 16px',
              borderRadius: '8px',
              margin: '5px auto',
              maxWidth: '500px',
              fontSize: '14px',
            }}>
              👤 {a.user?.name || 'Tourist'} — {a.alert?.message || 'SOS Alert'}
              {a.location?.lat && (
                <span style={{ marginLeft: '10px', opacity: 0.7 }}>
                  📍 {a.location.lat.toFixed(4)}, {a.location.lng.toFixed(4)}
                </span>
              )}
            </div>
          ))}
        </div>
      )}

      {/* ✅ ADMIN: ALWAYS SHOW ALERT COUNT (even if 0) */}
      {isAdmin && (
        <div style={{
          background: liveAlerts.length > 0 ? '#FEE2E2' : '#F0FDF4',
          padding: '10px 20px',
          textAlign: 'center',
          fontWeight: 'bold',
          color: liveAlerts.length > 0 ? '#DC2626' : '#16A34A',
          borderBottom: '2px solid',
          borderColor: liveAlerts.length > 0 ? '#DC2626' : '#16A34A',
        }}>
          {liveAlerts.length > 0
            ? `🚨 ${liveAlerts.length} Active SOS Alert(s) — Immediate attention required!`
            : '✅ No active SOS alerts — All tourists safe'}
        </div>
      )}

      {/* TOURIST: DANGER ZONE WARNING */}
      {!isAdmin && zoneWarning && (
        <div className="bg-red-600 text-white p-4 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <p className="font-bold text-lg">DANGER ZONE: {zoneWarning.zone}</p>
              <p className="text-red-100 text-sm">{zoneWarning.description} — {zoneWarning.distance}m inside</p>
            </div>
          </div>
          <button onClick={handleDangerZoneSOS} className="bg-white text-red-600 font-bold px-6 py-2 rounded-lg hover:bg-red-50">
            🆘 Send SOS
          </button>
        </div>
      )}

      {/* MAP */}
      <div style={{ height: "calc(100vh - 200px)" }}>
        <MapContainer center={[28.632, 77.444]} zoom={14} style={{ height: "100%", width: "100%" }}>
          <TileLayer
            attribution='&copy; OpenStreetMap'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          {userLocation && <FlyToLocation position={[userLocation.lat, userLocation.lng]} />}

          {/* User marker */}
          {userLocation && (
            <Marker position={[userLocation.lat, userLocation.lng]} icon={isAdmin ? adminIcon : userIcon}>
              <Popup>
                <p className="font-bold">{isAdmin ? "🛡️ You (Admin)" : "📍 You"}</p>
                <p className="text-sm">{user?.name}</p>
                <p className="text-xs">{userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}</p>
              </Popup>
            </Marker>
          )}

          {/* Admin: tourists from DB */}
          {isAdmin && tourists.filter(t => t.role === "user" && t.location).map(t => (
            <Marker key={t._id} position={[t.location.lat, t.location.lng]} icon={t.status === "danger" ? sosIcon : safeIcon}>
              <Popup>
                <p className="font-bold">{t.name}</p>
                <p className="text-sm">{t.email}</p>
                <p className="text-sm">{t.status === "danger" ? "🚨 DANGER" : "✅ Safe"}</p>
              </Popup>
            </Marker>
          ))}

          {/* ✅ Admin: LIVE SOS markers from socket */}
          {isAdmin && liveAlerts.filter(a => a.location?.lat).map((a, i) => (
            <Marker key={`sos-${i}`} position={[a.location.lat, a.location.lng]} icon={sosIcon}>
              <Popup>
                <p className="font-bold" style={{ color: 'red' }}>🆘 LIVE SOS</p>
                <p>{a.user?.name || 'Tourist'}</p>
                <p className="text-sm">{a.alert?.message}</p>
              </Popup>
            </Marker>
          ))}

          {/* Danger Zones */}
          {ZONES.filter(z => z.type === "danger").map((z, i) => (
            <Circle key={`d-${i}`} center={[z.lat, z.lng]} radius={z.radius}
              pathOptions={{ color: "#EF4444", fillColor: "#EF4444", fillOpacity: 0.15, weight: 2, dashArray: "5,10" }}>
              <Popup><p style={{ color: 'red', fontWeight: 'bold' }}>⚠️ {z.name}</p><p>{z.description}</p></Popup>
            </Circle>
          ))}

          {/* Safe Zones */}
          {ZONES.filter(z => z.type === "safe").map((z, i) => (
            <Circle key={`s-${i}`} center={[z.lat, z.lng]} radius={z.radius}
              pathOptions={{ color: "#22C55E", fillColor: "#22C55E", fillOpacity: 0.1, weight: 2 }}>
              <Popup><p style={{ color: 'green', fontWeight: 'bold' }}>✅ {z.name}</p><p>{z.description}</p></Popup>
            </Circle>
          ))}
        </MapContainer>
      </div>

      {/* Admin stats */}
      {isAdmin && (
        <div style={{
          position: 'fixed', bottom: 0, left: 0, right: 0,
          background: 'white', borderTop: '2px solid #e5e7eb',
          padding: '12px', display: 'flex', justifyContent: 'space-around',
          zIndex: 1000,
        }}>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#2563EB' }}>
              {tourists.filter(t => t.role === 'user').length}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Tourists</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#DC2626' }}>
              {liveAlerts.length + alerts.filter(a => !a.resolved).length}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Active SOS</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#16A34A' }}>
              {ZONES.filter(z => z.type === 'safe').length}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Safe Zones</p>
          </div>
          <div style={{ textAlign: 'center' }}>
            <p style={{ fontSize: '24px', fontWeight: 'bold', color: '#EA580C' }}>
              {ZONES.filter(z => z.type === 'danger').length}
            </p>
            <p style={{ fontSize: '12px', color: '#6B7280' }}>Danger Zones</p>
          </div>
        </div>
      )}

      {/* Legend */}
      <div style={{
        position: 'fixed', top: '100px', right: '16px', zIndex: 1000,
        background: 'white', padding: '12px', borderRadius: '8px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.15)', fontSize: '13px',
      }}>
        <h4 style={{ fontWeight: 'bold', marginBottom: '8px' }}>Legend</h4>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ width: 14, height: 14, background: '#3B82F6', borderRadius: '50%', display: 'inline-block' }} />
          Tourist
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ width: 14, height: 14, background: '#EF4444', borderRadius: '50%', display: 'inline-block' }} />
          SOS / Danger
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
          <span style={{ width: 14, height: 14, background: '#22C55E', borderRadius: '50%', display: 'inline-block' }} />
          Safe Zone
        </div>
        {isAdmin && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ width: 14, height: 14, background: '#7C3AED', borderRadius: '50%', display: 'inline-block' }} />
            Admin
          </div>
        )}
      </div>
    </div>
  );
};

export default MapGeoFencing;