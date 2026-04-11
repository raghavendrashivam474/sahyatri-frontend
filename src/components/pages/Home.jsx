import React from 'react';
import { Link } from 'react-router-dom';
// import Footer from './Footer.jsx';


function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-blue-900 to-blue-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24">
          <div className="text-center">
            <h1 className="text-5xl font-bold mb-6">Welcome to SAHYatri</h1>
            <p className="text-xl mb-8 max-w-3xl mx-auto">
              Smart Tourist Safety Platform for Government Use. Advanced tracking, incident response, secure digital IDs, and real-time monitoring with multilingual accessibility and security.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/services"
                className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Explore Services
              </Link>
              <Link
                to="/about"
                className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Services Section */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Core SAHYatri Services</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Comprehensive tourist safety and management solutions designed for government agencies and emergency services.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-blue-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-blue-900 mb-2 text-center">Tourist Tracking</h3>
              <p className="text-gray-600 text-center mb-4">Real-time GPS tracking and location monitoring for registered tourists</p>
              <Link to="/services/tracking" className="text-blue-900 font-semibold hover:underline">
                View System →
              </Link>
            </div>

            <div className="bg-red-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-red-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-red-800 mb-2 text-center">Incident Response</h3>
              <p className="text-gray-600 text-center mb-4">Rapid emergency response system with automated alerts and coordination</p>
              <Link to="/services/incidents" className="text-red-800 font-semibold hover:underline">
                Emergency Hub →
              </Link>
            </div>

            <div className="bg-green-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="bg-green-600 text-white rounded-full w-12 h-12 flex items-center justify-center mb-4 mx-auto">
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-green-800 mb-2 text-center">Digital ID Issuance</h3>
              <p className="text-gray-600 text-center mb-4">Secure digital identification system with biometric verification</p>
              <Link to="/services/ids" className="text-green-800 font-semibold hover:underline">
                ID Portal →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Statistics Section */}
      <div className="py-16 bg-blue-900 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold mb-4">SAHYatri Impact</h2>
            <p className="text-blue-100">Real-time safety and security metrics</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">1,247</div>
              <div className="text-blue-100">Active Tourists</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">8,934</div>
              <div className="text-blue-100">Digital IDs Issued</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">12</div>
              <div className="text-blue-100">Active Incidents</div>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold mb-2">3</div>
              <div className="text-blue-100">Open SOS Alerts</div>
            </div>
          </div>
        </div>
      </div>

      {/* News & Announcements */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-blue-900 mb-4">Safety Updates</h2>
            <p className="text-gray-600">Latest developments in tourist safety and platform features</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm text-gray-500 mb-2">December 15, 2024</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Enhanced GPS Tracking</h3>
              <p className="text-gray-600 mb-4">
                New precision tracking system with improved accuracy for tourist locations and emergency response.
              </p>
              <Link to="/updates/gps-tracking" className="text-blue-900 font-semibold hover:underline">
                Learn More →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm text-gray-500 mb-2">December 10, 2024</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Multilingual Support</h3>
              <p className="text-gray-600 mb-4">
                Added support for 15+ languages to improve accessibility for international tourists and local operators.
              </p>
              <Link to="/updates/multilingual" className="text-blue-900 font-semibold hover:underline">
                View Details →
              </Link>
            </div>

            <div className="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
              <div className="text-sm text-gray-500 mb-2">December 5, 2024</div>
              <h3 className="text-xl font-semibold text-blue-900 mb-3">Analytics Dashboard</h3>
              <p className="text-gray-600 mb-4">
                Advanced analytics and reporting tools for government agencies to monitor tourist safety metrics.
              </p>
              <Link to="/updates/analytics" className="text-blue-900 font-semibold hover:underline">
                Explore Dashboard →
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="py-16 bg-gradient-to-r from-blue-600 to-blue-800 text-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Enhance Tourist Safety?</h2>
          <p className="text-xl mb-8 text-blue-100">
            Join government agencies worldwide who trust SAHYatri for comprehensive tourist safety and management.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/contact"
              className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
            >
              Contact Us
            </Link>
            <Link
              to="/about"
              className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors"
            >
              About SAHYatri
            </Link>
          </div>
        </div>
      </div>
      {/* <Footer/> */}
    </div>
  );
}

export default Home;
