// src/components/layout/MainLayout.jsx
import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Sidebar from "./Sidebar.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => { window.scrollTo(0, 0); }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', minHeight: '100vh' }}>
      <ScrollToTop />

      <div style={{ position: 'fixed', top: 0, left: 0, right: 0, zIndex: 1000 }}>
        <Navbar />
      </div>

      <div style={{ display: 'flex', marginTop: '64px', flex: 1 }}>
        <div style={{
          position: 'fixed',
          top: '64px',
          left: 0,
          bottom: 0,
          width: '260px',
          zIndex: 900,
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Sidebar />
        </div>

        <div style={{
          marginLeft: '260px',
          flex: 1,
          minHeight: 'calc(100vh - 64px)',
          backgroundColor: '#f3f4f6',
        }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;