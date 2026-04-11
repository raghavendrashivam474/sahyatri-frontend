import React from 'react';
import { Link } from 'react-router-dom';

function Footer() {
  return (
    <footer className="bg-slate-800 text-white py-16 mt-auto border-t-4 border-blue-600 shadow-2xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Government Seal and Main Info */}
        <div className="text-center mb-12">
          <div className="flex justify-center items-center mb-6">
            {/* Government Seal */}
            <div className="bg-blue-600 rounded-full p-4 mr-4 shadow-lg">
              <svg className="w-12 h-12 text-white" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2L13.09 8.26L20 9L13.09 9.74L12 16L10.91 9.74L4 9L10.91 8.26L12 2Z"/>
                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="2" fill="none"/>
              </svg>
            </div>
            <div className="text-left">
              <h3 className="text-2xl font-bold text-blue-300">Government of India</h3>
              <p className="text-lg text-blue-200">Ministry of Digital Affairs</p>
            </div>
          </div>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            SAHYatri - Digital Government Services Portal
          </p>
        </div>

        {/* Main Footer Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
          {/* Services */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <Link to="/services" className="text-xl font-bold text-blue-300 mb-4 border-b-2 border-blue-500 pb-2 flex items-center hover:text-blue-200 transition-colors duration-200 cursor-pointer">
              <svg className="w-6 h-6 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
              </svg>
              Services
            </Link>
            <ul className="space-y-3">
              <li><Link to="/dashboard" className="text-gray-200 hover:text-blue-200 transition-all duration-200 flex items-center hover:bg-blue-500 p-3 rounded-lg border border-gray-600 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/>
                </svg>
                Dashboard
              </Link></li>
              <li><Link to="/tourists" className="text-gray-200 hover:text-blue-200 transition-all duration-200 flex items-center hover:bg-blue-500 p-3 rounded-lg border border-gray-600 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                </svg>
                Tourists
              </Link></li>
              <li><Link to="/incidents" className="text-gray-200 hover:text-blue-200 transition-all duration-200 flex items-center hover:bg-blue-500 p-3 rounded-lg border border-gray-600 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M1 21h22L12 2 1 21zm12-3h-2v-2h2v2zm0-4h-2v-4h2v4z"/>
                </svg>
                Incidents & Alerts
              </Link></li>
              <li><Link to="/reports-analytics" className="text-gray-200 hover:text-blue-200 transition-all duration-200 flex items-center hover:bg-blue-500 p-3 rounded-lg border border-gray-600 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19 3H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-5 14H7v-2h7v2zm3-4H7v-2h10v2zm0-4H7V7h10v2z"/>
                </svg>
                Reports & Analytics
              </Link></li>
              <li><Link to="/help-support" className="text-gray-200 hover:text-blue-200 transition-all duration-200 flex items-center hover:bg-blue-500 p-3 rounded-lg border border-gray-600 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm1 17h-2v-2h2v2zm0-4h-2V7h2v8z"/>
                </svg>
                Help & Support
              </Link></li>
              <li><Link to="/map-geo-fencing" className="text-gray-200 hover:text-blue-200 transition-all duration-200 flex items-center hover:bg-blue-500 p-3 rounded-lg border border-gray-600 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                Map & Geo-fencing
              </Link></li>
              <li><Link to="/settings-admin" className="text-gray-200 hover:text-blue-200 transition-all duration-200 flex items-center hover:bg-blue-500 p-3 rounded-lg border border-gray-600 shadow-sm hover:shadow-md">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Settings & Admin
              </Link></li>
            </ul>
          </div>
           
          {/* Contact Information */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-xl font-bold text-blue-300 mb-4 border-b-2 border-blue-500 pb-2 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
              </svg>
              Contact Info
            </h4>
            <div className="space-y-4 text-gray-300">
              <div className="flex items-center p-2 hover:bg-blue-600 rounded transition-colors duration-200">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/>
                </svg>
                <span className="text-sm">New Delhi, India</span>
              </div>
              <div className="flex items-center p-2 hover:bg-blue-600 rounded transition-colors duration-200">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M6.62 10.79c1.44 2.83 3.76 5.14 6.59 6.59l2.2-2.2c.27-.27.67-.36 1.02-.24 1.12.37 2.33.57 3.57.57.55 0 1 .45 1 1V20c0 .55-.45 1-1 1-9.39 0-17-7.61-17-17 0-.55.45-1 1-1h3.5c.55 0 1 .45 1 1 0 1.25.2 2.45.57 3.57.11.35.03.74-.25 1.02l-2.2 2.2z"/>
                </svg>
                <span className="text-sm">1800-XXX-XXXX</span>
              </div>
              <div className="flex items-center p-2 hover:bg-blue-600 rounded transition-colors duration-200">
                <svg className="w-5 h-5 mr-3 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z"/>
                </svg>
                <span className="text-sm">info@sahyatri.gov.in</span>
              </div>
            </div>
          </div>

          {/* Legal & Policies */}
          <div className="bg-slate-700 p-6 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
            <h4 className="text-xl font-bold text-blue-300 mb-4 border-b-2 border-blue-500 pb-2 flex items-center">
              <svg className="w-6 h-6 mr-2 text-blue-400" fill="currentColor" viewBox="0 0 24 24">
                <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
              </svg>
              Legal & Policies
            </h4>
            <ul className="space-y-3">
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200 flex items-center hover:bg-blue-600 p-2 rounded">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Privacy Policy
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200 flex items-center hover:bg-blue-600 p-2 rounded">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Terms of Service
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200 flex items-center hover:bg-blue-600 p-2 rounded">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
                </svg>
                Accessibility Statement
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200 flex items-center hover:bg-blue-600 p-2 rounded">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 2 2h8c1.1 0 2-.9 2-2V8l-6-6zm4 18H6V4h7v5h5v11z"/>
                </svg>
                RTI Information
              </a></li>
              <li><a href="#" className="text-gray-300 hover:text-blue-300 transition-colors duration-200 flex items-center hover:bg-blue-600 p-2 rounded">
                <svg className="w-4 h-4 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"/>
                </svg>
                Copyright Policy
              </a></li>
            </ul>
          </div>
        </div>

        {/* Social Media Icons */}
        <div className="flex justify-center space-x-6 pt-6 border-t border-blue-700">
          <a
            href="https://facebook.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-blue-700 rounded-full"
            aria-label="Facebook"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
            </svg>
          </a>

          <a
            href="https://twitter.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-blue-700 rounded-full"
            aria-label="Twitter"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M23.953 4.57a10 10 0 01-2.825.775 4.958 4.958 0 002.163-2.723c-.951.555-2.005.959-3.127 1.184a4.92 4.92 0 00-8.384 4.482C7.69 8.095 4.067 6.13 1.64 3.162a4.822 4.822 0 00-.666 2.475c0 1.71.87 3.213 2.188 4.096a4.904 4.904 0 01-2.228-.616v.06a4.923 4.923 0 003.946 4.827 4.996 4.996 0 01-2.212.085 4.936 4.936 0 004.604 3.417 9.867 9.867 0 01-6.102 2.105c-.39 0-.779-.023-1.17-.067a13.995 13.995 0 007.557 2.209c9.053 0 13.998-7.496 13.998-13.985 0-.21 0-.42-.015-.63A9.935 9.935 0 0024 4.59z"/>
            </svg>
          </a>

          <a
            href="https://instagram.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-blue-700 rounded-full"
            aria-label="Instagram"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
            </svg>
          </a>

          <a
            href="https://linkedin.com"
            target="_blank"
            rel="noopener noreferrer"
            className="text-white hover:text-blue-300 transition-colors duration-200 p-2 hover:bg-blue-700 rounded-full"
            aria-label="LinkedIn"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
            </svg>
          </a>
        </div>

        {/* Bottom Copyright */}
        <div className="pt-8 mt-8 border-t border-blue-700 text-center">
          <p className="text-sm text-gray-400">
            &copy; {new Date().getFullYear()} Government of India. All rights reserved. |
            This is an official website of the Government of India |
            Last updated: {new Date().toLocaleDateString()}
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Website Content Managed by Ministry of Digital Affairs, Government of India
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
