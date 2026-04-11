// src/components/layout/Navbar.jsx
import React, { useState, forwardRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

const LogoutIcon = ({ style }) => (
  <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
  </svg>
);

const Navbar = forwardRef((props, ref) => {
  const [isOpen, setIsOpen] = useState(false);
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="bg-blue-600 text-white shadow-lg sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">

          {/* ✅ Logo — Fixed */}
          <Link to="/" className="flex items-center gap-2 no-underline">
            <span style={{ fontSize: '1.6em' }}>🌍</span>
            <span className="text-xl font-bold text-white">SAHYatri</span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden md:flex items-center space-x-6">
            <Link to="/" className="hover:text-blue-200 transition">Home</Link>
            <Link to="/services" className="hover:text-blue-200 transition">Services</Link>
            <Link to="/about" className="hover:text-blue-200 transition">About</Link>
            <Link to="/contact" className="hover:text-blue-200 transition">Contact</Link>

            {user ? (
              <>
                <Link to="/Dashboard" className="hover:text-blue-200 transition">Dashboard</Link>
                <div className="flex items-center gap-4">
                  <span className="text-sm">👋 {user.name}</span>
                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg transition"
                  >
                    <LogoutIcon style={{ width: '16px', height: '16px' }} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold hover:bg-blue-50 transition">
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden p-2 rounded-lg hover:bg-blue-700 transition"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              {isOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {/* Mobile Menu */}
        {isOpen && (
          <div className="md:hidden pb-4 space-y-2">
            <Link to="/" className="block py-2 hover:bg-blue-700 px-4 rounded">Home</Link>
            <Link to="/services" className="block py-2 hover:bg-blue-700 px-4 rounded">Services</Link>
            <Link to="/about" className="block py-2 hover:bg-blue-700 px-4 rounded">About</Link>
            <Link to="/contact" className="block py-2 hover:bg-blue-700 px-4 rounded">Contact</Link>

            {user ? (
              <>
                <Link to="/Dashboard" className="block py-2 hover:bg-blue-700 px-4 rounded">Dashboard</Link>
                <div className="px-4 py-2 text-sm border-t border-blue-500 mt-2">
                  <p className="mb-2">👋 {user.name}</p>
                  <button
                    onClick={handleLogout}
                    className="w-full bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg flex items-center justify-center gap-2"
                  >
                    <LogoutIcon style={{ width: '16px', height: '16px' }} />
                    Logout
                  </button>
                </div>
              </>
            ) : (
              <Link to="/login" className="block bg-white text-blue-600 px-4 py-2 rounded-lg font-semibold text-center mx-4">
                Login
              </Link>
            )}
          </div>
        )}
      </div>
    </nav>
  );
});

export default Navbar;