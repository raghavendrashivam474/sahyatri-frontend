import React from 'react';
import Footer from './Footer.jsx';


function About() {
  return (
    <>
    <div className="min-h-screen bg-gray-50 py-12 ">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-blue-900 mb-4">About SAHYatri</h1>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Your trusted digital gateway to government services, designed to make citizen services accessible, efficient, and transparent.
          </p>
        </div>

        {/* What We Do Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-900">What We Do</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Comprehensive Service Delivery</h3>
              <p className="text-gray-600 mb-4">
                SAHYatri serves as a unified platform that brings together various government services under one digital roof. We provide citizens with easy access to essential services including:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2">
                <li>Document verification and processing</li>
                <li>License and permit applications</li>
                <li>Tax and revenue services</li>
                <li>Public grievance redressal</li>
                <li>Information and updates on government schemes</li>
              </ul>
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-800 mb-4">Citizen-Centric Approach</h3>
              <p className="text-gray-600">
                Our platform is built around the needs of citizens, ensuring that every interaction is simple, secure, and satisfactory. We prioritize user experience by providing:
              </p>
              <ul className="list-disc list-inside text-gray-600 space-y-2 mt-4">
                <li>24/7 accessibility to services</li>
                <li>Real-time status tracking</li>
                <li>Multi-language support</li>
                <li>Mobile-responsive design</li>
                <li>Secure data handling</li>
              </ul>
            </div>
          </div>
        </div>

        {/* How We Do It Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-900">How We Do It</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.031 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Secure Technology</h3>
              <p className="text-gray-600">
                We employ state-of-the-art security measures and encryption protocols to ensure all citizen data is protected and transactions are secure.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Streamlined Processes</h3>
              <p className="text-gray-600">
                Our automated workflows and intelligent routing systems ensure quick processing and minimal wait times for all service requests.
              </p>
            </div>
            <div className="text-center">
              <div className="bg-blue-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <svg className="w-8 h-8 text-blue-900" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-2">Collaborative Network</h3>
              <p className="text-gray-600">
                We work closely with various government departments and agencies to provide integrated services through a single platform.
              </p>
            </div>
          </div>
        </div>

        {/* USP Section */}
        <div className="bg-white rounded-lg shadow-lg p-8 mb-12">
          <div className="flex items-center mb-6">
            <div className="bg-blue-900 text-white rounded-full w-12 h-12 flex items-center justify-center mr-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h2 className="text-3xl font-bold text-blue-900">Our Unique Value Proposition</h2>
          </div>
          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Why Choose SAHYatri?</h3>
              <div className="space-y-4">
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">One-Stop Solution</h4>
                    <p className="text-gray-600">Access all government services through a single, integrated platform</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Time-Saving</h4>
                    <p className="text-gray-600">Reduce processing time by up to 80% through digital automation</p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-green-100 rounded-full p-2 mr-3 mt-1">
                    <svg className="w-4 h-4 text-green-600" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-800">Transparency</h4>
                    <p className="text-gray-600">Real-time tracking and updates on all service requests and applications</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h3 className="text-2xl font-semibold text-gray-800 mb-4">Our Commitment</h3>
              <div className="bg-blue-50 p-6 rounded-lg">
                <p className="text-gray-700 mb-4">
                  "At SAHYatri, we are committed to transforming the way citizens interact with government services. Our mission is to make governance more accessible, efficient, and citizen-friendly."
                </p>
                <div className="border-t pt-4">
                  <p className="font-semibold text-blue-900">Key Statistics:</p>
                  <ul className="text-gray-600 mt-2 space-y-1">
                    <li>• 10M+ Citizens Served</li>
                    <li>• 99.9% Uptime Guarantee</li>
                    <li>• 50+ Government Services</li>
                    <li>• 24/7 Customer Support</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-blue-900 text-white rounded-lg p-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Experience the Future of Government Services?</h2>
          <p className="text-xl mb-6">
            Join millions of citizens who have already simplified their government interactions with SAHYatri.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button className="bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
              Get Started Today
            </button>
            <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-blue-900 transition-colors">
              Learn More
            </button>
          </div>
        </div>
      </div>
     
    </div>
     {/* <Footer/> */}
     </>
  );
}

export default About;
