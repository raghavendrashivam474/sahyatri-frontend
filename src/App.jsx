// src/App.jsx
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

// Layouts
import HomeLayout from './components/layout/HomeLayout.jsx';
import MainLayout from './components/layout/MainLayout.jsx';

// Public Pages
import Home from './components/pages/Home.jsx';
import About from './components/pages/About.jsx';
import Services from './components/pages/Services.jsx';
import Contact from './components/pages/Contact.jsx';
import Login from './components/auth/Login.jsx';
import Profile from './components/pages/Profile.jsx';

// Protected Pages
import Dashboard from './components/dashboard/Dashboard.jsx';
import TouristsDirectory from './components/pages/TouristsDirectory.jsx';
import IncidentsAndAlerts from './components/pages/IncidentsAndAlerts.jsx';
import ReportsAnalytics from './components/pages/ReportsAnalytics.jsx';
import HelpSupport from './components/pages/HelpSupport.jsx';
import SettingsAdmin from './components/pages/SettingsAdmin.jsx';
import MapGeoFencing from './components/map/MapGeoFencing.jsx';

// Auth & Protection
import ProtectedRoute from './components/ProtectedRoute/ProtectedRoute.jsx';
import AdminRoute from './components/auth/AdminRoute.jsx';

// Global SOS
import SOSButton from './components/common/SOSButton.jsx';

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
        { path: 'Dashboard', element: <Dashboard /> },
        { path: 'map-geo-fencing', element: <MapGeoFencing /> },
        { path: 'Help-Support', element: <HelpSupport /> },
        {
          path: 'Tourists',
          element: <AdminRoute><TouristsDirectory /></AdminRoute>,
        },
        {
          path: 'Incidents',
          element: <AdminRoute><IncidentsAndAlerts /></AdminRoute>,
        },
        {
          path: 'Reports-Analytics',
          element: <AdminRoute><ReportsAnalytics /></AdminRoute>,
        },
        {
          path: 'settings-admin',
          element: <AdminRoute><SettingsAdmin /></AdminRoute>,
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