import React, { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useSocket } from '../../hooks/useSocket';

function SettingsAdmin() {
  const [users, setUsers] = useState([]);
  const [alerts, setAlerts] = useState([]);
  const [stats, setStats] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalAlerts: 0,
    unresolvedAlerts: 0,
    todayRegistrations: 0
  });
  const [selectedTab, setSelectedTab] = useState('overview');
  const [loading, setLoading] = useState(true);

  const { token, user } = useAuth();
  const { liveAlerts, liveLocations, isConnected } = useSocket();

  // Fetch data
  useEffect(() => {
    const fetchData = async () => {
      if (!token) return;

      try {
        // Fetch users
        const usersRes = await fetch('http://localhost:5000/api/location/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (usersRes.ok) {
          const usersData = await usersRes.json();
          setUsers(usersData);
          
          setStats(prev => ({
            ...prev,
            totalUsers: usersData.length,
            activeUsers: usersData.filter(u => {
              const lastUpdate = new Date(u.lastUpdated);
              const now = new Date();
              return (now - lastUpdate) < 60000; // Active in last 1 min
            }).length
          }));
        }

        // Fetch alerts
        const alertsRes = await fetch('http://localhost:5000/api/alert/all', {
          headers: { 'Authorization': `Bearer ${token}` }
        });
        if (alertsRes.ok) {
          const alertsData = await alertsRes.json();
          setAlerts(alertsData);
          
          setStats(prev => ({
            ...prev,
            totalAlerts: alertsData.length,
            unresolvedAlerts: alertsData.filter(a => !a.resolved).length
          }));
        }

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setLoading(false);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // Refresh every 30s
    return () => clearInterval(interval);
  }, [token]);

  // Update alerts with live data
  useEffect(() => {
    if (liveAlerts.length > 0) {
      setAlerts(prev => [...liveAlerts.map(la => la.alert), ...prev]);
      setStats(prev => ({
        ...prev,
        totalAlerts: prev.totalAlerts + liveAlerts.length,
        unresolvedAlerts: prev.unresolvedAlerts + liveAlerts.length
      }));
    }
  }, [liveAlerts]);

  // Resolve alert
  const resolveAlert = async (alertId) => {
    try {
      const response = await fetch(`http://localhost:5000/api/alert/${alertId}/resolve`, {
        method: 'PATCH',
        headers: { 'Authorization': `Bearer ${token}` }
      });

      if (response.ok) {
        setAlerts(prev => prev.map(a => 
          a._id === alertId ? { ...a, resolved: true } : a
        ));
        setStats(prev => ({
          ...prev,
          unresolvedAlerts: prev.unresolvedAlerts - 1
        }));
      }
    } catch (error) {
      console.error('Error resolving alert:', error);
    }
  };

  if (loading) {
    return (
      <div className="p-6 bg-gray-100 min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading Admin Panel...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Header */}
      <div className="mb-6 bg-gradient-to-r from-purple-600 to-indigo-700 text-white p-6 rounded-xl shadow-lg">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-3xl font-bold">⚙️ Admin Control Panel</h1>
            <p className="text-purple-100 mt-1">Welcome back, {user?.name}!</p>
          </div>
          <div className="text-right">
            <div className={`flex items-center gap-2 ${isConnected ? 'text-green-300' : 'text-red-300'}`}>
              <span className={`w-3 h-3 rounded-full ${isConnected ? 'bg-green-400 animate-pulse' : 'bg-red-400'}`}></span>
              {isConnected ? 'System Online' : 'System Offline'}
            </div>
            <p className="text-purple-200 text-sm mt-1">
              Live Users: {liveLocations.length}
            </p>
          </div>
        </div>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-6 mb-6">
        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-blue-500">
          <p className="text-gray-500 text-sm">Total Users</p>
          <h3 className="text-3xl font-bold text-blue-600">{stats.totalUsers}</h3>
          <p className="text-xs text-gray-400 mt-1">Registered tourists</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-green-500">
          <p className="text-gray-500 text-sm">Active Now</p>
          <h3 className="text-3xl font-bold text-green-600">{stats.activeUsers}</h3>
          <p className="text-xs text-gray-400 mt-1">Online in last 1 min</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-yellow-500">
          <p className="text-gray-500 text-sm">Total Alerts</p>
          <h3 className="text-3xl font-bold text-yellow-600">{stats.totalAlerts}</h3>
          <p className="text-xs text-gray-400 mt-1">All time incidents</p>
        </div>

        <div className={`bg-white p-6 rounded-xl shadow-md border-l-4 ${stats.unresolvedAlerts > 0 ? 'border-red-500 animate-pulse' : 'border-gray-300'}`}>
          <p className="text-gray-500 text-sm">Unresolved SOS</p>
          <h3 className={`text-3xl font-bold ${stats.unresolvedAlerts > 0 ? 'text-red-600' : 'text-gray-600'}`}>
            {stats.unresolvedAlerts}
          </h3>
          <p className="text-xs text-gray-400 mt-1">Needs attention!</p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow-md border-l-4 border-purple-500">
          <p className="text-gray-500 text-sm">Live Tracking</p>
          <h3 className="text-3xl font-bold text-purple-600">{liveLocations.length}</h3>
          <p className="text-xs text-gray-400 mt-1">Real-time updates</p>
        </div>
      </div>

      {/* Tab Navigation */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b">
          <button
            onClick={() => setSelectedTab('overview')}
            className={`px-6 py-4 font-semibold ${selectedTab === 'overview' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            📊 Overview
          </button>
          <button
            onClick={() => setSelectedTab('users')}
            className={`px-6 py-4 font-semibold ${selectedTab === 'users' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            👥 Users ({users.length})
          </button>
          <button
            onClick={() => setSelectedTab('alerts')}
            className={`px-6 py-4 font-semibold ${selectedTab === 'alerts' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            🚨 Alerts ({stats.unresolvedAlerts})
          </button>
          <button
            onClick={() => setSelectedTab('logs')}
            className={`px-6 py-4 font-semibold ${selectedTab === 'logs' ? 'border-b-4 border-blue-600 text-blue-600' : 'text-gray-600'}`}
          >
            📋 Activity Logs
          </button>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Overview Tab */}
          {selectedTab === 'overview' && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Recent Alerts */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">🚨 Recent SOS Alerts</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {alerts.slice(0, 5).map((alert) => (
                      <div key={alert._id} className={`p-3 rounded-lg ${alert.resolved ? 'bg-green-100' : 'bg-red-100'}`}>
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="font-semibold">{alert.userId?.name || 'Unknown'}</p>
                            <p className="text-sm text-gray-600">{alert.message}</p>
                            <p className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                          </div>
                          <span className={`text-xs px-2 py-1 rounded ${alert.resolved ? 'bg-green-600 text-white' : 'bg-red-600 text-white'}`}>
                            {alert.resolved ? 'Resolved' : 'Active'}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Active Users */}
                <div className="bg-gray-50 p-4 rounded-lg">
                  <h3 className="font-bold text-lg mb-4">👥 Recently Active Users</h3>
                  <div className="space-y-2 max-h-64 overflow-y-auto">
                    {users.slice(0, 5).map((u) => (
                      <div key={u._id} className="bg-white p-3 rounded-lg">
                        <div className="flex justify-between items-center">
                          <div>
                            <p className="font-semibold">{u.name}</p>
                            <p className="text-sm text-gray-600">{u.email}</p>
                          </div>
                          <div className="text-right">
                            <span className={`text-xs px-2 py-1 rounded ${u.status === 'safe' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                              {u.status}
                            </span>
                            <p className="text-xs text-gray-500 mt-1">
                              {new Date(u.lastUpdated).toLocaleTimeString()}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Users Tab */}
          {selectedTab === 'users' && (
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-100 text-left">
                    <th className="p-3">Name</th>
                    <th className="p-3">Email</th>
                    <th className="p-3">Role</th>
                    <th className="p-3">Status</th>
                    <th className="p-3">Last Update</th>
                    <th className="p-3">Location</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((u) => (
                    <tr key={u._id} className="border-b hover:bg-gray-50">
                      <td className="p-3 font-semibold">{u.name}</td>
                      <td className="p-3">{u.email}</td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${u.role === 'admin' ? 'bg-purple-100 text-purple-700' : 'bg-blue-100 text-blue-700'}`}>
                          {u.role}
                        </span>
                      </td>
                      <td className="p-3">
                        <span className={`px-2 py-1 rounded text-xs ${u.status === 'safe' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {u.status}
                        </span>
                      </td>
                      <td className="p-3 text-sm">{new Date(u.lastUpdated).toLocaleString()}</td>
                      <td className="p-3 text-xs text-gray-500">
                        {u.location?.lat?.toFixed(4)}, {u.location?.lng?.toFixed(4)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Alerts Tab */}
          {selectedTab === 'alerts' && (
            <div className="space-y-4">
              {alerts.length === 0 ? (
                <div className="text-center py-12 text-gray-500">
                  <p className="text-xl mb-2">✓ No alerts</p>
                  <p>All systems operational</p>
                </div>
              ) : (
                alerts.map((alert) => (
                  <div key={alert._id} className={`p-4 rounded-lg border-l-4 ${alert.resolved ? 'border-green-500 bg-green-50' : 'border-red-500 bg-red-50'}`}>
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center gap-3 mb-2">
                          <h4 className="font-bold text-lg">{alert.userId?.name || 'Unknown User'}</h4>
                          <span className={`px-3 py-1 rounded-full text-xs font-semibold ${alert.type === 'SOS' ? 'bg-red-600 text-white' : 'bg-yellow-600 text-white'}`}>
                            {alert.type}
                          </span>
                        </div>
                        <p className="text-gray-700 mb-2">{alert.message}</p>
                        <div className="grid grid-cols-2 gap-4 text-sm">
                          <p><strong>Email:</strong> {alert.userId?.email}</p>
                          <p><strong>Time:</strong> {new Date(alert.timestamp).toLocaleString()}</p>
                          <p><strong>Location:</strong> {alert.location?.lat?.toFixed(4)}, {alert.location?.lng?.toFixed(4)}</p>
                          <p><strong>Status:</strong> 
                            <span className={alert.resolved ? 'text-green-600 font-bold' : 'text-red-600 font-bold'}>
                              {' '}{alert.resolved ? 'Resolved' : 'Unresolved'}
                            </span>
                          </p>
                        </div>
                      </div>
                      {!alert.resolved && (
                        <button
                          onClick={() => resolveAlert(alert._id)}
                          className="ml-4 bg-green-600 text-white px-4 py-2 rounded-lg hover:bg-green-700 transition"
                        >
                          ✓ Resolve
                        </button>
                      )}
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* Logs Tab */}
          {selectedTab === 'logs' && (
            <div className="space-y-2">
              <h3 className="font-bold text-lg mb-4">📋 System Activity Logs</h3>
              <div className="bg-gray-50 p-4 rounded-lg space-y-2 max-h-96 overflow-y-auto">
                {alerts.map((alert, index) => (
                  <div key={index} className="bg-white p-3 rounded border-l-4 border-blue-500">
                    <p className="text-sm">
                      <span className="font-semibold">{alert.type}</span> alert from{' '}
                      <span className="font-semibold">{alert.userId?.name}</span>
                    </p>
                    <p className="text-xs text-gray-500">{new Date(alert.timestamp).toLocaleString()}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default SettingsAdmin;
