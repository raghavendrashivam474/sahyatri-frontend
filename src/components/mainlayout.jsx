import React, { useEffect } from "react";
import { useLocation, Outlet } from "react-router-dom";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import Header from "./Header.jsx";

function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
}

function MainLayout() {
  return (
    <div className="min-h-screen bg-gray-100">
      <ScrollToTop />
      
      {/* Top Navbar */}
      <div className="sticky top-0 z-50">
        <Navbar />
      </div>
      
      {/* Main Content Area */}
      <div className="flex">
        {/* Sidebar */}
        <div className="w-64 fixed h-screen">
          <Header />
        </div>
        
        {/* Page Content */}
        <div className="flex-1 ml-64">
          <Outlet />
        </div>
      </div>
      
      {/* Footer */}
      <div className="ml-64">
        <Footer />
      </div>
    </div>
  );
}

export default MainLayout;
