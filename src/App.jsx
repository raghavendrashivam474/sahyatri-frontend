// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import HomeLayout from './components/homelayout.jsx';
import MainLayout from './components/mainlayout.jsx';

// Public Pages
import Home from './components/Home.jsx';
import About from './components/About.jsx';
import Services from './components/Services.jsx';
import Contact from './components/Contact.jsx';
import Login from './components/Login.jsx';
import Profile from './components/Profile.jsx';

// Protected Pages
import Dashboard from './components/Dashboard.jsx';
import TouristsDirectory from './components/TouristsDirectory.jsx';
import IncidentsAndAlerts from './components/Incidents & Alerts.jsx';
import ReportsAnalytics from './components/Reports & Analytics.jsx';
import HelpSupport from './components/Help & Support.jsx';
import SettingsAdmin from './components/Settings & Admin.jsx';
import MapGeoFencing from './components/MapGeoFencing.jsx';

// Auth & Protection
import ProtectedRoute from './components/ProtectedRoute.jsx';
import AdminRoute from './components/ProtectedRoute/AdminRoute.jsx';

// Global SOS
import SOSButton from './components/SOSButton.jsx';

function App() {
  const router = createBrowserRouter([
    // PUBLIC ROUTES
    {
      path: '/',
      element: <HomeLayout />,
      children: [
        { index: true, element: <Home /> },
        { path: 'services', element: <Services /> },
        { path: 'about', element: <About /> },
        { path: 'contact', element: <Contact /> },
        { path: 'login', element: <Login /> },
        { path: 'profile', element: <Profile /> },
      ],
    },

    // PROTECTED ROUTES
    {
      path: '/',
      element: (
        <ProtectedRoute>
          <MainLayout />
        </ProtectedRoute>
      ),
      children: [
        // Tourist + Admin can access
        { path: 'Dashboard', element: <Dashboard /> },
        { path: 'map-geo-fencing', element: <MapGeoFencing /> },
        { path: 'Help-Support', element: <HelpSupport /> },

        // Admin only
        {
          path: 'Tourists',
          element: (
            <AdminRoute>
              <TouristsDirectory />
            </AdminRoute>
          ),
        },
        {
          path: 'Incidents',
          element: (
            <AdminRoute>
              <IncidentsAndAlerts />
            </AdminRoute>
          ),
        },
        {
          path: 'Reports-Analytics',
          element: (
            <AdminRoute>
              <ReportsAnalytics />
            </AdminRoute>
          ),
        },
        {
          path: 'settings-admin',
          element: (
            <AdminRoute>
              <SettingsAdmin />
            </AdminRoute>
          ),
        },
      ],
    },
  ]);

  return (
    <>
      <RouterProvider router={router} />
      <SOSButton />
    </>
  );
}

export default App;