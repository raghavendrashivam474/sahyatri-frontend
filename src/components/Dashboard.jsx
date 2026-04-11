// src/pages/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useLocationTracking } from "../hooks/useLocationTracking";
import { useSocket } from "../hooks/useSocket";

function Dashboard() {
  const [activeTourists, setActiveTourists] = useState(0);
  const [issuedIDs, setIssuedIDs] = useState(0);
  const [currentIncidents, setCurrentIncidents] = useState(0);
  const [openSOS, setOpenSOS] = useState(0);
  const [userLocation, setUserLocation] = useState(null);

  const { user, token } = useAuth();
  const { liveAlerts, isConnected } = useSocket();

  useLocationTracking(10000);

  // Get user's own location
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude.toFixed(4),
            lng: position.coords.longitude.toFixed(4),
          });
        },
        (error) => console.log("Location error:", error)
      );
    }
  }, []);

  // ✅ FIX: Only fetch admin stats if user IS admin
  useEffect(() => {
    const fetchStats = async () => {
      if (!token) return;

      // ✅ Only admin can call these endpoints
      if (user?.role !== "admin") {
        console.log("Tourist user — skipping admin API calls");
        return;
      }

      try {
        const usersRes = await fetch("http://localhost:5000/api/location/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (usersRes.ok) {
          const users = await usersRes.json();
          setActiveTourists(users.length);
          setIssuedIDs(users.length);
        }

        const alertsRes = await fetch("http://localhost:5000/api/alert/all", {
          headers: { Authorization: `Bearer ${token}` },
        });

        if (alertsRes.ok) {
          const alerts = await alertsRes.json();
          setCurrentIncidents(alerts.length);
          setOpenSOS(alerts.filter((a) => !a.resolved).length);
        }
      } catch (error) {
        console.log("Stats fetch error:", error);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [token, user]);

  useEffect(() => {
    if (liveAlerts.length > 0) {
      setOpenSOS((prev) => prev + 1);
      setCurrentIncidents((prev) => prev + 1);
    }
  }, [liveAlerts]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl mb-6 shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">
              Welcome, {user?.name || "User"}! 👋
            </h1>
            <p className="text-blue-100 mt-1">
              SAHYatri Tourist Safety Dashboard
            </p>
            {/* ✅ Show role badge */}
            <span
              className={`inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold ${
                user?.role === "admin"
                  ? "bg-red-500 text-white"
                  : "bg-green-500 text-white"
              }`}
            >
              {user?.role === "admin" ? "🛡️ Admin" : "🧳 Tourist"}
            </span>
          </div>
          <div className="text-right">
            <div
              className={`flex items-center gap-2 ${
                isConnected ? "text-green-300" : "text-red-300"
              }`}
            >
              <span
                className={`w-3 h-3 rounded-full ${
                  isConnected
                    ? "bg-green-400 animate-pulse"
                    : "bg-red-400"
                }`}
              ></span>
              {isConnected ? "Live Connected" : "Disconnected"}
            </div>
            {userLocation && (
              <p className="text-blue-200 text-sm mt-1">
                📍 {userLocation.lat}, {userLocation.lng}
              </p>
            )}
          </div>
        </div>
      </div>

      {/* ✅ Admin Stats — Only shown to admins */}
      {user?.role === "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Active Tourists</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {activeTourists.toLocaleString()}
                </h2>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">👥</span>
              </div>
            </div>
            <p className="text-green-500 text-sm mt-2">
              ↑ Live tracking enabled
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Registered Users</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {issuedIDs.toLocaleString()}
                </h2>
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">🪪</span>
              </div>
            </div>
            <p className="text-green-500 text-sm mt-2">
              ↑ Total registrations
            </p>
          </div>

          <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Total Incidents</p>
                <h2 className="text-3xl font-bold text-gray-800">
                  {currentIncidents}
                </h2>
              </div>
              <div className="bg-yellow-100 p-3 rounded-full">
                <span className="text-2xl">⚠️</span>
              </div>
            </div>
            <p className="text-yellow-500 text-sm mt-2">
              ↔ All reported incidents
            </p>
          </div>

          <div
            className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 ${
              openSOS > 0
                ? "border-red-500 animate-pulse"
                : "border-gray-300"
            }`}
          >
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Open SOS Alerts</p>
                <h2
                  className={`text-3xl font-bold ${
                    openSOS > 0 ? "text-red-600" : "text-gray-800"
                  }`}
                >
                  {openSOS}
                </h2>
              </div>
              <div
                className={`${
                  openSOS > 0 ? "bg-red-100" : "bg-gray-100"
                } p-3 rounded-full`}
              >
                <span className="text-2xl">🚨</span>
              </div>
            </div>
            <p
              className={`text-sm mt-2 ${
                openSOS > 0 ? "text-red-500" : "text-green-500"
              }`}
            >
              {openSOS > 0 ? "⚠ Needs attention!" : "✓ All clear"}
            </p>
          </div>
        </div>
      )}

      {/* ✅ Tourist View — Only shown to regular users */}
      {user?.role !== "admin" && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
          {/* Location Status */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Your Location</p>
                {userLocation ? (
                  <p className="text-lg font-bold text-green-600">
                    📍 {userLocation.lat}, {userLocation.lng}
                  </p>
                ) : (
                  <p className="text-yellow-600">⏳ Getting location...</p>
                )}
              </div>
              <div className="bg-green-100 p-3 rounded-full">
                <span className="text-2xl">📍</span>
              </div>
            </div>
            <p className="text-green-500 text-sm mt-2">
              ✅ Location tracking active
            </p>
          </div>

          {/* Safety Status */}
          <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500 text-sm">Safety Status</p>
                <p className="text-lg font-bold text-green-600">✅ Safe</p>
              </div>
              <div className="bg-blue-100 p-3 rounded-full">
                <span className="text-2xl">🛡️</span>
              </div>
            </div>
            <p className="text-blue-500 text-sm mt-2">
              You are being monitored
            </p>
          </div>

          {/* SOS Button for Tourist */}
          <div className="md:col-span-2 bg-white p-8 rounded-xl shadow-md text-center">
            <h3 className="text-xl font-bold text-gray-800 mb-4">
              🚨 Emergency SOS
            </h3>
            <p className="text-gray-500 mb-6">
              Press the button below if you need immediate help
            </p>
            <Link
              to="/sos"
              className="inline-block bg-red-600 text-white text-xl font-bold px-12 py-6 
                         rounded-full hover:bg-red-700 active:scale-95 
                         transition-transform shadow-lg"
            >
              🆘 Send SOS
            </Link>
          </div>
        </div>
      )}

      {/* Live Alerts Section — Show to all but especially admin */}
      {liveAlerts.length > 0 && (
        <div className="bg-red-50 border border-red-200 p-4 rounded-xl mb-6">
          <h3 className="text-red-800 font-bold mb-3 flex items-center gap-2">
            <span className="animate-ping inline-block w-2 h-2 bg-red-500 rounded-full"></span>
            Live SOS Alerts ({liveAlerts.length})
          </h3>
          <div className="space-y-2">
            {liveAlerts.slice(0, 5).map((alert, index) => (
              <div
                key={index}
                className="bg-white p-3 rounded-lg border border-red-300 flex justify-between items-center"
              >
                <div>
                  <p className="font-semibold text-red-800">
                    {alert.user?.name || "Unknown User"}
                  </p>
                  <p className="text-sm text-gray-600">
                    {alert.alert?.message || "SOS Alert"}
                  </p>
                </div>
                <span className="text-xs text-gray-500">Just now</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Quick Actions — Different for admin vs tourist */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link
          to="/map-geo-fencing"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
        >
          <div className="text-center">
            <span className="text-4xl mb-3 block">🗺️</span>
            <h3 className="font-bold text-lg text-gray-800">Live Map</h3>
            <p className="text-gray-500 text-sm">
              {user?.role === "admin"
                ? "Track all tourists in real-time"
                : "View your location on map"}
            </p>
          </div>
        </Link>

        {user?.role === "admin" ? (
          <>
            <Link
              to="/Incidents"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
            >
              <div className="text-center">
                <span className="text-4xl mb-3 block">📋</span>
                <h3 className="font-bold text-lg text-gray-800">
                  Manage Incidents
                </h3>
                <p className="text-gray-500 text-sm">
                  View and resolve alerts
                </p>
              </div>
            </Link>

            <Link
              to="/Tourists"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
            >
              <div className="text-center">
                <span className="text-4xl mb-3 block">👥</span>
                <h3 className="font-bold text-lg text-gray-800">
                  Tourist Directory
                </h3>
                <p className="text-gray-500 text-sm">
                  View all registered tourists
                </p>
              </div>
            </Link>
          </>
        ) : (
          <>
            <Link
              to="/sos"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-red-200"
            >
              <div className="text-center">
                <span className="text-4xl mb-3 block">🆘</span>
                <h3 className="font-bold text-lg text-red-600">
                  Emergency SOS
                </h3>
                <p className="text-gray-500 text-sm">
                  Send distress signal
                </p>
              </div>
            </Link>

            <Link
              to="/safety-tips"
              className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200"
            >
              <div className="text-center">
                <span className="text-4xl mb-3 block">📖</span>
                <h3 className="font-bold text-lg text-gray-800">
                  Safety Tips
                </h3>
                <p className="text-gray-500 text-sm">
                  Stay safe while traveling
                </p>
              </div>
            </Link>
          </>
        )}
      </div>

      {/* Map Preview — Show to all */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-4">
          📍 Quick Map Preview
        </h3>
        <div className="bg-gradient-to-br from-blue-100 to-green-100 h-64 rounded-lg flex items-center justify-center">
          <Link
            to="/map-geo-fencing"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2"
          >
            <span>🗺️</span>
            Open Full Map
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;