// src/components/Dashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useLocationTracking } from "../../hooks/useLocationTracking";
import { useSocket } from "../../hooks/useSocket";
import API from "../../api/axios";

// Everything else stays the same

// ══════════════════════════════════════════
// ADMIN DASHBOARD
// ══════════════════════════════════════════
const AdminDashboard = ({ liveAlerts, isConnected, user, token }) => {
  const [activeTourists, setActiveTourists]     = useState(0);
  const [totalUsers, setTotalUsers]             = useState(0);
  const [totalIncidents, setTotalIncidents]     = useState(0);
  const [openSOS, setOpenSOS]                   = useState(0);
  const [recentAlerts, setRecentAlerts]         = useState([]);
  const [recentTourists, setRecentTourists]     = useState([]);
  const [loading, setLoading]                   = useState(true);

  // Fetch admin stats
  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const [usersRes, alertsRes] = await Promise.all([
          API.get("/location/all"),
          API.get("/alert/all"),
        ]);

        const users  = usersRes.data;
        const alerts = alertsRes.data;

        setTotalUsers(users.length);
        setActiveTourists(users.filter((u) => u.role === "user" && u.location).length);
        setTotalIncidents(alerts.length);
        setOpenSOS(alerts.filter((a) => !a.resolved).length);
        setRecentAlerts(alerts.slice(0, 5));
        setRecentTourists(users.filter((u) => u.role === "user").slice(0, 5));
      } catch (err) {
        console.error("Admin stats error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [token]);

  // Add live SOS to count
  useEffect(() => {
    if (liveAlerts.length > 0) {
      setOpenSOS((prev) => prev + 1);
      setTotalIncidents((prev) => prev + 1);
    }
  }, [liveAlerts]);

  const resolveAlert = async (alertId) => {
    try {
      await API.patch(`/alert/${alertId}/resolve`);
      setRecentAlerts((prev) =>
        prev.map((a) => (a._id === alertId ? { ...a, resolved: true } : a))
      );
      setOpenSOS((prev) => Math.max(0, prev - 1));
    } catch (err) {
      console.error("Resolve error:", err);
    }
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ── Admin Welcome Banner ── */}
      <div className="bg-gradient-to-r from-red-600 to-purple-700 text-white p-6 rounded-xl mb-6 shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Control Center 🛡️</h1>
            <p className="text-red-100 mt-1">SAHYatri Safety Management — {user?.name}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
                🛡️ Administrator
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isConnected ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}>
                {isConnected ? "🟢 Live" : "🔴 Offline"}
              </span>
            </div>
          </div>
          <div className="text-right">
            <p className="text-red-200 text-sm">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long", year: "numeric",
                month: "long", day: "numeric",
              })}
            </p>
            <p className="text-red-100 text-xs mt-1">
              {new Date().toLocaleTimeString()}
            </p>
          </div>
        </div>
      </div>

      {/* ── Live SOS Alert Banner ── */}
      {liveAlerts.length > 0 && (
        <div className="bg-red-600 text-white p-4 rounded-xl mb-6 border-2 border-red-400">
          <div className="flex items-center gap-3 mb-2">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative rounded-full h-4 w-4 bg-white" />
            </span>
            <span className="font-bold text-lg">
              🚨 {liveAlerts.length} NEW LIVE SOS ALERT(S)!
            </span>
          </div>
          <div className="flex flex-wrap gap-2 mt-2">
            {liveAlerts.slice(0, 5).map((alert, i) => (
              <span key={i} className="bg-red-800 px-3 py-1 rounded-full text-sm">
                👤 {alert.user?.name || "Tourist"} — {alert.alert?.message || "SOS"}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* ── Stats Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Tourists</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {loading ? "..." : activeTourists}
              </h2>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">👥</span>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">↑ Currently being tracked</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Registered</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {loading ? "..." : totalUsers}
              </h2>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">🪪</span>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">↑ All registered users</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-yellow-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Total Incidents</p>
              <h2 className="text-3xl font-bold text-gray-800">
                {loading ? "..." : totalIncidents}
              </h2>
            </div>
            <div className="bg-yellow-100 p-3 rounded-full">
              <span className="text-2xl">⚠️</span>
            </div>
          </div>
          <p className="text-yellow-500 text-sm mt-2">↔ All reported incidents</p>
        </div>

        <div className={`bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 ${
          openSOS > 0 ? "border-red-500 animate-pulse" : "border-gray-300"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Open SOS Alerts</p>
              <h2 className={`text-3xl font-bold ${openSOS > 0 ? "text-red-600" : "text-gray-800"}`}>
                {loading ? "..." : openSOS}
              </h2>
            </div>
            <div className={`${openSOS > 0 ? "bg-red-100" : "bg-gray-100"} p-3 rounded-full`}>
              <span className="text-2xl">🚨</span>
            </div>
          </div>
          <p className={`text-sm mt-2 ${openSOS > 0 ? "text-red-500" : "text-green-500"}`}>
            {openSOS > 0 ? "⚠ Needs attention!" : "✓ All clear"}
          </p>
        </div>
      </div>

      {/* ── Recent Alerts + Active Tourists ── */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Recent Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
              🚨 Recent Alerts
            </h3>
            {openSOS > 0 && (
              <span className="bg-red-100 text-red-600 text-xs px-3 py-1 rounded-full font-semibold">
                {openSOS} active
              </span>
            )}
          </div>

          {recentAlerts.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl">✅</span>
              <p className="text-gray-400 mt-2">No alerts yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentAlerts.map((alert) => (
                <div
                  key={alert._id}
                  className={`p-4 rounded-lg border flex justify-between items-center ${
                    alert.resolved
                      ? "bg-green-50 border-green-200"
                      : "bg-red-50 border-red-200"
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <p className={`font-semibold text-sm ${
                      alert.resolved ? "text-green-700" : "text-red-700"
                    }`}>
                      {alert.resolved ? "✅" : "🆘"}{" "}
                      {alert.userId?.name || "Tourist"}
                    </p>
                    <p className="text-sm text-gray-600 truncate">{alert.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(alert.timestamp || alert.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!alert.resolved && (
                    <button
                      onClick={() => resolveAlert(alert._id)}
                      className="ml-3 bg-green-500 text-white px-3 py-2 rounded-lg text-sm 
                                 hover:bg-green-600 transition shrink-0"
                    >
                      ✅ Resolve
                    </button>
                  )}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Active Tourists */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            📍 Active Tourists
            <span className="bg-blue-100 text-blue-600 text-xs px-3 py-1 rounded-full font-semibold">
              {recentTourists.length} shown
            </span>
          </h3>

          {recentTourists.length === 0 ? (
            <div className="text-center py-8">
              <span className="text-4xl">👥</span>
              <p className="text-gray-400 mt-2">No tourists yet</p>
            </div>
          ) : (
            <div className="space-y-3">
              {recentTourists.map((tourist) => (
                <div
                  key={tourist._id}
                  className="p-4 rounded-lg bg-blue-50 border border-blue-200 
                             flex justify-between items-center"
                >
                  <div>
                    <p className="font-semibold text-gray-800">{tourist.name}</p>
                    <p className="text-sm text-gray-500">{tourist.email}</p>
                    {tourist.location && (
                      <p className="text-xs text-gray-400 mt-1">
                        📍 {tourist.location.lat?.toFixed(4)},{" "}
                        {tourist.location.lng?.toFixed(4)}
                      </p>
                    )}
                  </div>
                  <span className={`px-3 py-1 rounded-full text-xs font-bold ${
                    tourist.status === "danger"
                      ? "bg-red-100 text-red-700"
                      : "bg-green-100 text-green-700"
                  }`}>
                    {tourist.status === "danger" ? "🚨 Danger" : "✅ Safe"}
                  </span>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* ── Admin Quick Actions ── */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
        {[
          { to: "/map-geo-fencing", icon: "🗺️", label: "Live Map",    desc: "Track all tourists"   },
          { to: "/Incidents",       icon: "📋", label: "Incidents",   desc: "Manage all alerts"    },
          { to: "/Tourists",        icon: "👥", label: "Directory",   desc: "All tourists"         },
          { to: "/Reports-Analytics", icon: "📊", label: "Reports",  desc: "Analytics & data"     },
        ].map((item) => (
          <Link
            key={item.to}
            to={item.to}
            className="bg-white p-5 rounded-xl shadow-md hover:shadow-lg 
                       transition-all hover:scale-105 border border-gray-200 text-center"
          >
            <span className="text-3xl mb-2 block">{item.icon}</span>
            <h3 className="font-bold text-gray-800">{item.label}</h3>
            <p className="text-gray-500 text-xs mt-1">{item.desc}</p>
          </Link>
        ))}
      </div>

      {/* ── Map Preview ── */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Quick Map Preview</h3>
        <div className="bg-gradient-to-br from-red-50 to-purple-50 h-48 rounded-lg 
                        flex items-center justify-center border-2 border-dashed border-red-200">
          <Link
            to="/map-geo-fencing"
            className="bg-red-600 text-white px-6 py-3 rounded-lg 
                       hover:bg-red-700 transition flex items-center gap-2 font-semibold"
          >
            🗺️ Open Admin Map
          </Link>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════
// TOURIST DASHBOARD
// ══════════════════════════════════════════
const TouristDashboard = ({ liveAlerts, isConnected, user }) => {
  const [userLocation, setUserLocation] = useState(null);

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => setUserLocation({
          lat: pos.coords.latitude.toFixed(4),
          lng: pos.coords.longitude.toFixed(4),
        }),
        (err) => console.log("Location error:", err)
      );
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* ── Tourist Welcome Banner ── */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl mb-6 shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}! 👋</h1>
            <p className="text-blue-100 mt-1">Your Personal Safety Dashboard</p>
            <div className="flex items-center gap-2 mt-2">
              <span className="px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
                🧳 Tourist
              </span>
              <span className={`px-3 py-1 rounded-full text-xs font-semibold ${
                isConnected ? "bg-green-500 text-white" : "bg-gray-500 text-white"
              }`}>
                {isConnected ? "🟢 Live" : "🔴 Offline"}
              </span>
            </div>
          </div>
          <div className="text-right">
            {userLocation && (
              <p className="text-blue-200 text-sm">
                📍 {userLocation.lat}, {userLocation.lng}
              </p>
            )}
            <p className="text-blue-300 text-xs mt-1">Location tracking active</p>
          </div>
        </div>
      </div>

      {/* ── Tourist Status Cards ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
        {/* Location */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Your Location</p>
              {userLocation ? (
                <p className="text-lg font-bold text-green-600">
                  📍 {userLocation.lat}, {userLocation.lng}
                </p>
              ) : (
                <p className="text-yellow-600 font-medium">⏳ Getting location...</p>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">📍</span>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">✅ Authorities can see your location</p>
        </div>

        {/* Safety Status */}
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Safety Status</p>
              <p className="text-lg font-bold text-green-600">✅ You are Safe</p>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <span className="text-2xl">🛡️</span>
            </div>
          </div>
          <p className="text-blue-500 text-sm mt-2">You are being monitored</p>
        </div>
      </div>

      {/* ── SOS Button ── */}
      <div className="bg-white p-8 rounded-xl shadow-md text-center mb-6 border-2 border-red-100">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🚨 Emergency SOS</h3>
        <p className="text-gray-500 mb-6">
          Press the button below if you need immediate help.
          <br />
          <span className="text-sm text-gray-400">
            Authorities will be notified with your location.
          </span>
        </p>
        <button
          onClick={() => document.querySelector('[title="Emergency SOS"]')?.click()}
          className="inline-block bg-red-600 text-white text-xl font-bold px-12 py-6 
                     rounded-full hover:bg-red-700 active:scale-95 
                     transition-transform shadow-lg hover:shadow-xl"
        >
          🆘 Send SOS
        </button>
        <p className="text-xs text-gray-400 mt-4">
          Or use the floating SOS button at bottom-right
        </p>
      </div>

      {/* ── Tourist Quick Actions ── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link
          to="/map-geo-fencing"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg 
                     transition-all hover:scale-105 border border-gray-200"
        >
          <div className="text-center">
            <span className="text-4xl mb-3 block">🗺️</span>
            <h3 className="font-bold text-lg text-gray-800">Live Map</h3>
            <p className="text-gray-500 text-sm">View your location & danger zones</p>
          </div>
        </Link>

        <Link
          to="/Help-Support"
          className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg 
                     transition-all hover:scale-105 border border-gray-200"
        >
          <div className="text-center">
            <span className="text-4xl mb-3 block">📞</span>
            <h3 className="font-bold text-lg text-gray-800">Help & Support</h3>
            <p className="text-gray-500 text-sm">Contact emergency services</p>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">📖</span>
            <h3 className="font-bold text-lg text-gray-800 mb-3">Safety Tips</h3>
            <div className="text-left space-y-1">
              <p className="text-gray-500 text-sm">✅ Stay in marked zones</p>
              <p className="text-gray-500 text-sm">✅ Keep phone charged</p>
              <p className="text-gray-500 text-sm">✅ Share location with family</p>
              <p className="text-gray-500 text-sm">✅ Know emergency numbers</p>
            </div>
          </div>
        </div>
      </div>

      {/* ── Emergency Contacts ── */}
      <div className="bg-white p-6 rounded-xl shadow-md mb-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📞 Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {[
            { icon: "🚔", label: "Police",          number: "100",  color: "red"   },
            { icon: "🚑", label: "Ambulance",        number: "102",  color: "blue"  },
            { icon: "🆘", label: "Tourist Helpline", number: "1363", color: "green" },
          ].map((contact) => (
            <a
              key={contact.number}
              href={`tel:${contact.number}`}
              className={`bg-${contact.color}-50 p-4 rounded-lg text-center 
                         hover:bg-${contact.color}-100 transition cursor-pointer 
                         border border-${contact.color}-200`}
            >
              <p className="text-3xl mb-1">{contact.icon}</p>
              <p className="font-bold text-gray-800">{contact.label}</p>
              <p className={`text-${contact.color}-600 font-bold text-xl`}>
                {contact.number}
              </p>
              <p className="text-xs text-gray-400 mt-1">Tap to call</p>
            </a>
          ))}
        </div>
      </div>

      {/* ── Map Preview ── */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Quick Map Preview</h3>
        <div className="bg-gradient-to-br from-blue-100 to-green-100 h-48 rounded-lg 
                        flex items-center justify-center border-2 border-dashed border-blue-200">
          <Link
            to="/map-geo-fencing"
            className="bg-blue-600 text-white px-6 py-3 rounded-lg 
                       hover:bg-blue-700 transition flex items-center gap-2 font-semibold"
          >
            🗺️ Open Full Map
          </Link>
        </div>
      </div>
    </div>
  );
};

// ══════════════════════════════════════════
// MAIN DASHBOARD — Smart Router
// ══════════════════════════════════════════
function Dashboard() {
  const { user, token, loading } = useAuth();
  const { liveAlerts, isConnected } = useSocket();

  useLocationTracking(10000);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4" />
          <p className="text-gray-500">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  // ✅ Route to correct dashboard based on role
  if (user?.role === "admin") {
    return (
      <AdminDashboard
        liveAlerts={liveAlerts}
        isConnected={isConnected}
        user={user}
        token={token}
      />
    );
  }

  return (
    <TouristDashboard
      liveAlerts={liveAlerts}
      isConnected={isConnected}
      user={user}
    />
  );
}

export default Dashboard;