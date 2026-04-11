import React from 'react';
import { Link } from 'react-router-dom';

function Footer_80() {
  return (
    <footer className="bg-slate-800 text-white py-16 mt-auto border-t-4 border-blue-600 shadow-2xl w-[100vw] ml-0 float-end">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Government Seal and Main Info */}
        <div className="text-center mb-0">
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
          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-300">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/Dashboard" className="hover:text-blue-400 transition-colors">Dashboard</Link></li>
              <li><Link to="/Incidents" className="hover:text-blue-400 transition-colors">Incidents</Link></li>
              <li><Link to="/Reports" className="hover:text-blue-400 transition-colors">Reports</Link></li>
              <li><Link to="/map-geo-fencing" className="hover:text-blue-400 transition-colors">Map</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-300">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>📞 1800-XXX-XXXX (Toll Free)</li>
              <li>📧 support@sahyatri.gov.in</li>
              <li>🏛️ Ministry of Digital Affairs</li>
              <li>📍 New Delhi, India</li>
            </ul>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-4 text-blue-300">Important Links</h4>
            <ul className="space-y-2">
              <li><a href="#" className="hover:text-blue-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">Accessibility</a></li>
              <li><a href="#" className="hover:text-blue-400 transition-colors">RTI</a></li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Government of India. All Rights Reserved.
          </p>
          <p className="text-xs text-gray-500 mt-2">
            Website Content Managed by Ministry of Digital Affairs, Government of India
          </p>
        </div>
      </div>
    </footer>
  );
}

export default Footer_80;
