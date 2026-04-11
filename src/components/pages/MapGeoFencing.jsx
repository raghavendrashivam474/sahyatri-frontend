// src/pages/MapGeoFencing.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import LiveMap from "../components/Map/LiveMap";
import API from "../api/axios";

// ✅ Sample danger/safe zones (replace with DB data later)
const ZONES = [
  {
    name: "Dense Forest Area",
    type: "danger",
    lat: 28.6350,
    lng: 77.4450,
    radius: 800,
    description: "Low network coverage, wildlife risk",
  },
  {
    name: "River Crossing",
    type: "danger",
    lat: 28.6280,
    lng: 77.4400,
    radius: 400,
    description: "Strong currents during monsoon",
  },
  {
    name: "Tourist Info Center",
    type: "safe",
    lat: 28.6320,
    lng: 77.4440,
    radius: 300,
    description: "Help desk, first aid available",
  },
  {
    name: "Base Camp",
    type: "safe",
    lat: 28.6300,
    lng: 77.4420,
    radius: 500,
    description: "Rest area with facilities",
  },
];

const MapGeoFencing = () => {
  const { user, token } = useAuth();
  const [userLocation, setUserLocation] = useState(null);
  const [tourists, setTourists] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [zoneWarning, setZoneWarning] = useState(null);
  const isAdmin = user?.role === "admin";

  // Get user's location
  useEffect(() => {
    if (!navigator.geolocation) return;

    const watchId = navigator.geolocation.watchPosition(
      (position) => {
        const loc = {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        };
        setUserLocation(loc);
        checkDangerZones(loc);
      },
      (err) => console.error("Location error:", err),
      { enableHighAccuracy: true, timeout: 10000 }
    );

    return () => navigator.geolocation.clearWatch(watchId);
  }, []);

  // ✅ Geo-fencing: Check if user entered danger zone
  const checkDangerZones = (location) => {
    const dangerZones = ZONES.filter((z) => z.type === "danger");

    for (const zone of dangerZones) {
      const distance = getDistance(
        location.lat,
        location.lng,
        zone.lat,
        zone.lng
      );

      if (distance <= zone.radius) {
        setZoneWarning({
          zone: zone.name,
          description: zone.description,
          distance: Math.round(distance),
        });
        return;
      }
    }
    setZoneWarning(null);
  };

  // ✅ Calculate distance between two points (meters)
  const getDistance = (lat1, lng1, lat2, lng2) => {
    const R = 6371000; // Earth's radius in meters
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLng = ((lng2 - lng1) * Math.PI) / 180;
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLng / 2) *
        Math.sin(dLng / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
  };

  // ✅ Admin: Fetch all tourists and alerts
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
        console.error("Admin data fetch error:", err);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 15000);
    return () => clearInterval(interval);
  }, [isAdmin, token]);

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header */}
      <div className="bg-white shadow-sm p-4 flex justify-between items-center">
        <div className="flex items-center gap-4">
          <Link
            to="/dashboard"
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            ← Back
          </Link>
          <h1 className="text-xl font-bold">🗺️ Live Map & Geo-Fencing</h1>
        </div>
        <div className="flex items-center gap-3">
          {userLocation && (
            <span className="text-sm text-gray-500">
              📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
            </span>
          )}
          <span
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              isAdmin
                ? "bg-red-100 text-red-700"
                : "bg-green-100 text-green-700"
            }`}
          >
            {isAdmin ? "🛡️ Admin View" : "🧳 Tourist View"}
          </span>
        </div>
      </div>

      {/* ✅ Danger Zone Warning Banner */}
      {zoneWarning && (
        <div className="bg-red-600 text-white p-4 flex items-center justify-between animate-pulse">
          <div className="flex items-center gap-3">
            <span className="text-3xl">⚠️</span>
            <div>
              <p className="font-bold text-lg">
                DANGER ZONE: {zoneWarning.zone}
              </p>
              <p className="text-red-100 text-sm">
                {zoneWarning.description} — {zoneWarning.distance}m inside zone
              </p>
            </div>
          </div>
          <Link
            to="/sos"
            className="bg-white text-red-600 font-bold px-6 py-2 rounded-lg hover:bg-red-50"
          >
            🆘 Send SOS
          </Link>
        </div>
      )}

      {/* ✅ Map */}
      <div className="h-[calc(100vh-140px)]">
        <LiveMap
          userLocation={userLocation}
          tourists={tourists}
          alerts={alerts}
          dangerZones={ZONES}
          isAdmin={isAdmin}
        />
      </div>

      {/* ✅ Admin: Stats bar at bottom */}
      {isAdmin && (
        <div className="fixed bottom-0 left-0 right-0 bg-white shadow-lg border-t p-3">
          <div className="flex justify-around text-center">
            <div>
              <p className="text-2xl font-bold text-blue-600">
                {tourists.filter((t) => t.role === "user").length}
              </p>
              <p className="text-xs text-gray-500">Active Tourists</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-red-600">
                {alerts.filter((a) => !a.resolved).length}
              </p>
              <p className="text-xs text-gray-500">Active SOS</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-green-600">
                {ZONES.filter((z) => z.type === "safe").length}
              </p>
              <p className="text-xs text-gray-500">Safe Zones</p>
            </div>
            <div>
              <p className="text-2xl font-bold text-orange-600">
                {ZONES.filter((z) => z.type === "danger").length}
              </p>
              <p className="text-xs text-gray-500">Danger Zones</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MapGeoFencing;