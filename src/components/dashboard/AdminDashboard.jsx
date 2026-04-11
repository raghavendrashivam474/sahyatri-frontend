// src/components/AdminDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../hooks/useSocket";
import API from "../../api/axios";

const AdminDashboard = () => {
  const { user, token } = useAuth();
  const { liveAlerts, isConnected } = useSocket();

  const [activeTourists, setActiveTourists] = useState(0);
  const [totalUsers, setTotalUsers] = useState(0);
  const [totalIncidents, setTotalIncidents] = useState(0);
  const [openSOS, setOpenSOS] = useState(0);
  const [recentAlerts, setRecentAlerts] = useState([]);
  const [recentTourists, setRecentTourists] = useState([]);

  // Fetch admin stats
  useEffect(() => {
    if (!token) return;

    const fetchStats = async () => {
      try {
        const [usersRes, alertsRes] = await Promise.all([
          API.get("/location/all"),
          API.get("/alert/all"),
        ]);

        const users = usersRes.data;
        const alerts = alertsRes.data;

        setTotalUsers(users.length);
        setActiveTourists(users.filter((u) => u.role === "user" && u.location).length);
        setTotalIncidents(alerts.length);
        setOpenSOS(alerts.filter((a) => !a.resolved).length);
        setRecentAlerts(alerts.slice(0, 5));
        setRecentTourists(users.filter((u) => u.role === "user").slice(0, 5));
      } catch (err) {
        console.error("Admin stats error:", err);
      }
    };

    fetchStats();
    const interval = setInterval(fetchStats, 30000);
    return () => clearInterval(interval);
  }, [token]);

  // Update SOS count with live alerts
  useEffect(() => {
    if (liveAlerts.length > 0) {
      setOpenSOS((prev) => prev + liveAlerts.length);
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

      {/* Welcome Banner — Admin Style */}
      <div className="bg-gradient-to-r from-red-600 to-purple-700 text-white p-6 rounded-xl mb-6 shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Admin Dashboard 🛡️</h1>
            <p className="text-red-100 mt-1">SAHYatri Control Center — {user?.name}</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-red-500 text-white">
              🛡️ Administrator
            </span>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-2 ${isConnected ? "text-green-300" : "text-red-300"}`}>
              <span className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
              {isConnected ? "Live Connected" : "Disconnected"}
            </div>
            <p className="text-red-200 text-sm mt-1">
              {new Date().toLocaleDateString("en-IN", {
                weekday: "long", year: "numeric", month: "long", day: "numeric",
              })}
            </p>
          </div>
        </div>
      </div>

      {/* Live SOS Banner */}
      {liveAlerts.length > 0 && (
        <div className="bg-red-600 text-white p-4 rounded-xl mb-6 animate-pulse">
          <div className="flex items-center gap-3">
            <span className="relative flex h-4 w-4">
              <span className="animate-ping absolute h-full w-full rounded-full bg-white opacity-75" />
              <span className="relative rounded-full h-4 w-4 bg-white" />
            </span>
            <span className="font-bold text-lg">
              🚨 {liveAlerts.length} NEW LIVE SOS ALERT(S)!
            </span>
          </div>
          <div className="mt-2 flex flex-wrap gap-2">
            {liveAlerts.slice(0, 3).map((alert, i) => (
              <span key={i} className="bg-red-800 px-3 py-1 rounded-full text-sm">
                {alert.user?.name || "Tourist"} — {alert.alert?.message || "SOS"}
              </span>
            ))}
          </div>
        </div>
      )}

      {/* Stats Grid — Admin Only */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow border-l-4 border-blue-500">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Active Tourists</p>
              <h2 className="text-3xl font-bold text-gray-800">{activeTourists}</h2>
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
              <h2 className="text-3xl font-bold text-gray-800">{totalUsers}</h2>
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
              <h2 className="text-3xl font-bold text-gray-800">{totalIncidents}</h2>
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
              <p className="text-gray-500 text-sm">Open SOS</p>
              <h2 className={`text-3xl font-bold ${openSOS > 0 ? "text-red-600" : "text-gray-800"}`}>
                {openSOS}
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

      {/* Recent Alerts + Recent Tourists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">

        {/* Recent Alerts */}
        <div className="bg-white p-6 rounded-xl shadow-md">
          <h3 className="text-lg font-bold text-gray-800 mb-4 flex items-center gap-2">
            🚨 Recent Alerts
            {openSOS > 0 && (
              <span className="bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full">
                {openSOS} active
              </span>
            )}
          </h3>
          {recentAlerts.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No alerts yet</p>
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
                  <div>
                    <p className={`font-semibold ${alert.resolved ? "text-green-700" : "text-red-700"}`}>
                      {alert.resolved ? "✅" : "🆘"} {alert.userId?.name || "Tourist"}
                    </p>
                    <p className="text-sm text-gray-600">{alert.message}</p>
                    <p className="text-xs text-gray-400">
                      {new Date(alert.timestamp || alert.createdAt).toLocaleString()}
                    </p>
                  </div>
                  {!alert.resolved && (
                    <button
                      onClick={() => resolveAlert(alert._id)}
                      className="bg-green-500 text-white px-4 py-2 rounded-lg text-sm hover:bg-green-600"
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
          <h3 className="text-lg font-bold text-gray-800 mb-4">📍 Active Tourists</h3>
          {recentTourists.length === 0 ? (
            <p className="text-gray-400 text-center py-8">No active tourists</p>
          ) : (
            <div className="space-y-3">
              {recentTourists.map((tourist) => (
                <div key={tourist._id} className="p-4 rounded-lg bg-blue-50 border border-blue-200 flex justify-between items-center">
                  <div>
                    <p className="font-semibold text-gray-800">{tourist.name}</p>
                    <p className="text-sm text-gray-600">{tourist.email}</p>
                  </div>
                  <div className="text-right">
                    <span className={`px-2 py-1 rounded-full text-xs font-semibold ${
                      tourist.status === "danger"
                        ? "bg-red-100 text-red-700"
                        : "bg-green-100 text-green-700"
                    }`}>
                      {tourist.status === "danger" ? "🚨 Danger" : "✅ Safe"}
                    </span>
                    {tourist.location && (
                      <p className="text-xs text-gray-400 mt-1">
                        📍 {tourist.location.lat?.toFixed(4)}, {tourist.location.lng?.toFixed(4)}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Admin Quick Actions */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-6">
        <Link to="/map-geo-fencing" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">🗺️</span>
            <h3 className="font-bold text-lg text-gray-800">Live Map</h3>
            <p className="text-gray-500 text-sm">Track all tourists</p>
          </div>
        </Link>

        <Link to="/Incidents" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">📋</span>
            <h3 className="font-bold text-lg text-gray-800">Incidents</h3>
            <p className="text-gray-500 text-sm">Manage all alerts</p>
          </div>
        </Link>

        <Link to="/Tourists" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">👥</span>
            <h3 className="font-bold text-lg text-gray-800">Tourists</h3>
            <p className="text-gray-500 text-sm">View directory</p>
          </div>
        </Link>

        <Link to="/Reports-Analytics" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">📊</span>
            <h3 className="font-bold text-lg text-gray-800">Reports</h3>
            <p className="text-gray-500 text-sm">Analytics & data</p>
          </div>
        </Link>
      </div>

      {/* Map Preview */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-xl font-bold text-gray-800 mb-4">📍 Quick Map Preview</h3>
        <div className="bg-gradient-to-br from-blue-100 to-green-100 h-48 rounded-lg flex items-center justify-center">
          <Link to="/map-geo-fencing" className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition flex items-center gap-2">
            🗺️ Open Full Map
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;