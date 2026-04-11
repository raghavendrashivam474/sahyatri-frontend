// src/components/TouristDashboard.jsx
import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useSocket } from "../../hooks/useSocket";

const TouristDashboard = () => {
  const { user } = useAuth();
  const { isConnected } = useSocket();
  const [userLocation, setUserLocation] = useState(null);
  const [safetyStatus, setSafetyStatus] = useState("safe");

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setUserLocation({
            lat: pos.coords.latitude.toFixed(4),
            lng: pos.coords.longitude.toFixed(4),
          });
        },
        (err) => console.log("Location error:", err)
      );
    }
  }, []);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">

      {/* Welcome Banner */}
      <div className="bg-gradient-to-r from-blue-600 to-indigo-700 text-white p-6 rounded-xl mb-6 shadow-lg">
        <div className="flex justify-between items-center flex-wrap gap-4">
          <div>
            <h1 className="text-3xl font-bold">Welcome, {user?.name}! 👋</h1>
            <p className="text-blue-100 mt-1">Your Safety Dashboard</p>
            <span className="inline-block mt-2 px-3 py-1 rounded-full text-xs font-semibold bg-green-500 text-white">
              🧳 Tourist
            </span>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-2 ${isConnected ? "text-green-300" : "text-red-300"}`}>
              <span className={`w-3 h-3 rounded-full ${isConnected ? "bg-green-400 animate-pulse" : "bg-red-400"}`} />
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

      {/* Safety Status Cards */}
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
                <p className="text-yellow-600 font-medium">⏳ Getting location...</p>
              )}
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <span className="text-2xl">📍</span>
            </div>
          </div>
          <p className="text-green-500 text-sm mt-2">✅ Location tracking active</p>
        </div>

        {/* Safety Status */}
        <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${
          safetyStatus === "safe" ? "border-green-500" : "border-red-500"
        }`}>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-gray-500 text-sm">Safety Status</p>
              <p className={`text-lg font-bold ${
                safetyStatus === "safe" ? "text-green-600" : "text-red-600"
              }`}>
                {safetyStatus === "safe" ? "✅ You are Safe" : "⚠️ Caution"}
              </p>
            </div>
            <div className={`${safetyStatus === "safe" ? "bg-green-100" : "bg-red-100"} p-3 rounded-full`}>
              <span className="text-2xl">{safetyStatus === "safe" ? "🛡️" : "⚠️"}</span>
            </div>
          </div>
          <p className="text-blue-500 text-sm mt-2">Authorities are monitoring your safety</p>
        </div>
      </div>

      {/* Emergency SOS */}
      <div className="bg-white p-8 rounded-xl shadow-md text-center mb-6 border-2 border-red-100">
        <h3 className="text-xl font-bold text-gray-800 mb-2">🚨 Emergency SOS</h3>
        <p className="text-gray-500 mb-6">Press the button if you need immediate help</p>
        <Link
          to="/sos"
          className="inline-block bg-red-600 text-white text-xl font-bold px-12 py-6 
                     rounded-full hover:bg-red-700 active:scale-95 
                     transition-transform shadow-lg hover:shadow-xl"
        >
          🆘 Send SOS
        </Link>
      </div>

      {/* Quick Actions — Tourist Only */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
        <Link to="/map-geo-fencing" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">🗺️</span>
            <h3 className="font-bold text-lg text-gray-800">Live Map</h3>
            <p className="text-gray-500 text-sm">View your location & zones</p>
          </div>
        </Link>

        <Link to="/Help-Support" className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-all hover:scale-105 border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">📞</span>
            <h3 className="font-bold text-lg text-gray-800">Help & Support</h3>
            <p className="text-gray-500 text-sm">Contact emergency services</p>
          </div>
        </Link>

        <div className="bg-white p-6 rounded-xl shadow-md border border-gray-200">
          <div className="text-center">
            <span className="text-4xl mb-3 block">📖</span>
            <h3 className="font-bold text-lg text-gray-800">Safety Tips</h3>
            <p className="text-gray-500 text-sm mt-2">• Stay in marked zones</p>
            <p className="text-gray-500 text-sm">• Keep phone charged</p>
            <p className="text-gray-500 text-sm">• Share location with family</p>
          </div>
        </div>
      </div>

      {/* Emergency Contacts */}
      <div className="bg-white p-6 rounded-xl shadow-md">
        <h3 className="text-lg font-bold text-gray-800 mb-4">📞 Emergency Contacts</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-red-50 p-4 rounded-lg text-center">
            <p className="text-2xl mb-1">🚔</p>
            <p className="font-bold">Police</p>
            <p className="text-red-600 font-bold text-lg">100</p>
          </div>
          <div className="bg-blue-50 p-4 rounded-lg text-center">
            <p className="text-2xl mb-1">🚑</p>
            <p className="font-bold">Ambulance</p>
            <p className="text-blue-600 font-bold text-lg">102</p>
          </div>
          <div className="bg-green-50 p-4 rounded-lg text-center">
            <p className="text-2xl mb-1">🆘</p>
            <p className="font-bold">Tourist Helpline</p>
            <p className="text-green-600 font-bold text-lg">1363</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TouristDashboard;