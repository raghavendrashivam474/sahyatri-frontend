import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Services() {
  const navigate = useNavigate();

  return (
    <div style={styles.pageBackground}>
      <div style={styles.mainContentWrapper}>
        {/* Header Section */}
        <div style={styles.headerSection}>
          <h1 style={styles.mainTitle}>SAHYatri Government Services Portal</h1>
          <p style={styles.subtitle}>
            Ministry of Digital Affairs | Government of India
          </p>
          <div id="quick-access" style={styles.quickAccess}>
            <Link to="/dashboard" style={styles.quickButton}>
              <svg style={styles.buttonIcon} fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
              </svg>
              View Dashboard
            </Link>
            <Link to="/login" style={styles.quickButton}>
              <svg style={styles.buttonIcon} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              Login / Register
            </Link>
          </div>
        </div>

        {/* Introduction */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>About Our Services</h2>
          <p style={styles.description}>
            SAHYatri is India's premier digital government portal dedicated to ensuring the safety, security, and seamless experience
            for tourists visiting our nation. Through cutting-edge technology and comprehensive support systems, we provide real-time
            monitoring, instant incident response, and 24/7 assistance to enhance tourist safety while preserving India's rich cultural heritage.
          </p>
        </div>

        {/* Statistics Dashboard */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Current System Statistics</h2>
          <div style={styles.statsGrid}>
            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
                </svg>
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>1,247</div>
                <div style={styles.statLabel}>Active Tourists</div>
                <div style={styles.statChange}>+2.5% from yesterday</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M4 4a2 2 0 00-2 2v1h16V6a2 2 0 00-2-2H4zM18 9H2v5a2 2 0 002 2h12a2 2 0 002-2V9zM4 13a1 1 0 011-1h1a1 1 0 110 2H5a1 1 0 01-1-1zm5-1a1 1 0 100 2h1a1 1 0 100-2H9z" />
                </svg>
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>8,934</div>
                <div style={styles.statLabel}>IDs Issued</div>
                <div style={styles.statChange}>+12% from last week</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>12</div>
                <div style={styles.statLabel}>Incidents Resolved</div>
                <div style={styles.statChange}>3 resolved today</div>
              </div>
            </div>

            <div style={styles.statCard}>
              <div style={styles.statIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
              </div>
              <div style={styles.statContent}>
                <div style={styles.statValue}>3</div>
                <div style={styles.statLabel}>Active SOS Alerts</div>
                <div style={styles.statChange}>Requires attention</div>
              </div>
            </div>
          </div>
        </div>

        {/* Service Features */}
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Access Our Services</h2>
          <div style={styles.featuresGrid}>
            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 7a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0V8.414l-4.293 4.293a1 1 0 01-1.414 0L8 10.414l-4.293 4.293a1 1 0 01-1.414-1.414l5-5a1 1 0 011.414 0L11 10.586 14.586 7H12z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Dashboard</h3>
              <p style={styles.featureDescription}>
                View real-time monitoring and system overview.
              </p>
              <Link to="/dashboard" style={styles.featureButton}>Access Dashboard</Link>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Incidents & Alerts</h3>
              <p style={styles.featureDescription}>
                Report incidents and view safety alerts.
              </p>
              <Link to="/incidents" style={styles.featureButton}>Report Incident</Link>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M12 1.586l-4 4v12.828l4-4V1.586zM3.707 3.293A1 1 0 002 4v10a1 1 0 00.293.707L6 18.414V5.586L3.707 3.293zM17.707 5.293L14 1.586v12.828l2.293 2.293A1 1 0 0018 16V6a1 1 0 00-.293-.707z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Map & Geo-fencing</h3>
              <p style={styles.featureDescription}>
                Explore interactive maps and safety zones.
              </p>
              <Link to="/map-geo-fencing" style={styles.featureButton}>View Map</Link>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Help & Support</h3>
              <p style={styles.featureDescription}>
                Get assistance and contact support.
              </p>
              <Link to="/help-support" style={styles.featureButton}>Get Help</Link>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Reports & Analytics</h3>
              <p style={styles.featureDescription}>
                Access detailed reports and analytics.
              </p>
              <Link to="/reports-analytics" style={styles.featureButton}>View Reports</Link>
            </div>

            <div style={styles.featureCard}>
              <div style={styles.featureIcon}>
                <svg style={styles.icon} fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M2.166 4.999A11.954 11.954 0 0010 1.944 11.954 11.954 0 0017.834 5c.11.65.166 1.32.166 2.001 0 5.225-3.34 9.67-8 11.317C5.34 16.67 2 12.225 2 7c0-.682.057-1.35.166-2.001zm11.541 3.708a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
              </div>
              <h3 style={styles.featureTitle}>Tourists Directory</h3>
              <p style={styles.featureDescription}>
                Browse registered tourists and information.
              </p>
              <Link to="/tourists" style={styles.featureButton}>Browse Directory</Link>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div style={styles.ctaSection}>
          <h2 style={styles.ctaTitle}>Ready to Explore Safely?</h2>
          <p style={styles.ctaText}>
            Join thousands of tourists who trust SAHYatri for their safety and convenience in India.
          </p>
          <div style={styles.ctaButtons}>
            <button onClick={() => { navigate('/login'); window.scrollTo(0,0); }} style={styles.ctaPrimaryButton}>Get Started</button>
            <button onClick={() => { navigate('/contact'); window.scrollTo(0,0); }} style={styles.ctaSecondaryButton}>Contact Us</button>
          </div>
        </div>

        {/* Footer Note */}
        <div style={styles.footerNote}>
          <p style={styles.footerText}>
            For more information about our services, please contact the Ministry of Digital Affairs or visit our help center.
          </p>
        </div>
      </div>
    </div>
  );
}

const styles = {
  pageBackground: {
    backgroundColor: '#e9eff6',
    minHeight: '100vh',
    fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
    color: '#2c3e50',
    lineHeight: '1.6',
  },
  mainContentWrapper: {
    padding: '30px 20px',
  },
  headerSection: {
    textAlign: 'center',
    marginBottom: '40px',
    padding: '20px',
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    border: '1px solid #dcdcdc',
  },
  mainTitle: {
    fontSize: '2.5em',
    color: '#003366',
    margin: '0 0 10px 0',
    fontWeight: '700',
  },
  subtitle: {
    fontSize: '1.1em',
    color: '#007bff',
    margin: '0',
    fontWeight: '500',
  },
  section: {
    marginBottom: '40px',
  },
  sectionTitle: {
    fontSize: '1.8em',
    color: '#003366',
    marginBottom: '20px',
    borderBottom: '2px solid #007bff',
    paddingBottom: '10px',
  },
  description: {
    fontSize: '1.1em',
    color: '#555',
    lineHeight: '1.7',
    maxWidth: '800px',
    margin: '0 auto',
  },
  statsGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
    gap: '20px',
  },
  statCard: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '25px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    border: '1px solid #dcdcdc',
    display: 'flex',
    alignItems: 'center',
    transition: 'transform 0.2s ease-in-out',
  },
  statIcon: {
    backgroundColor: '#e0f2ff',
    borderRadius: '50%',
    padding: '15px',
    marginRight: '20px',
    color: '#007bff',
  },
  icon: {
    width: '24px',
    height: '24px',
  },
  statContent: {
    flex: 1,
  },
  statValue: {
    fontSize: '2.2em',
    fontWeight: 'bold',
    color: '#003366',
    margin: '0',
  },
  statLabel: {
    fontSize: '1em',
    color: '#6c757d',
    margin: '5px 0',
    textTransform: 'uppercase',
    letterSpacing: '0.5px',
  },
  statChange: {
    fontSize: '0.9em',
    color: '#28a745',
  },
  featuresGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
    gap: '25px',
  },
  featureCard: {
    backgroundColor: '#ffffff',
    borderRadius: '16px',
    padding: '30px',
    boxShadow: '0 8px 25px rgba(0, 0, 0, 0.1)',
    border: '1px solid #e1e5e9',
    textAlign: 'center',
    transition: 'all 0.3s ease',
    cursor: 'pointer',
  },
  featureIcon: {
    background: 'linear-gradient(135deg, #e3f2fd 0%, #bbdefb 100%)',
    borderRadius: '50%',
    padding: '15px',
    margin: '0 auto 15px auto',
    width: '60px',
    height: '60px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#007bff',
    transition: 'all 0.3s ease',
  },
  featureTitle: {
    fontSize: '1.3em',
    color: '#003366',
    margin: '0 0 10px 0',
    fontWeight: '600',
  },
  featureDescription: {
    fontSize: '1em',
    color: '#666',
    margin: '0',
    lineHeight: '1.5',
  },
  footerNote: {
    backgroundColor: '#ffffff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0,0,0,0.08)',
    border: '1px solid #dcdcdc',
    textAlign: 'center',
  },
  footerText: {
    fontSize: '1em',
    color: '#666',
    margin: '0',
  },
  quickAccess: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
    marginTop: '20px',
  },
  quickButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '10px 20px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '1em',
    fontWeight: '500',
    transition: 'background-color 0.2s ease',
  },
  buttonIcon: {
    width: '16px',
    height: '16px',
  },
  featureButton: {
    display: 'inline-block',
    marginTop: '15px',
    padding: '12px 24px',
    background: 'linear-gradient(135deg, #007bff 0%, #0056b3 100%)',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '8px',
    fontSize: '0.9em',
    fontWeight: '500',
    transition: 'all 0.3s ease',
    boxShadow: '0 4px 15px rgba(0, 123, 255, 0.3)',
  },
  ctaSection: {
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    padding: '40px',
    boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
    border: '1px solid #dcdcdc',
    textAlign: 'center',
    marginBottom: '40px',
  },
  ctaTitle: {
    fontSize: '2em',
    color: '#003366',
    margin: '0 0 15px 0',
    fontWeight: '700',
  },
  ctaText: {
    fontSize: '1.1em',
    color: '#555',
    margin: '0 0 25px 0',
    lineHeight: '1.6',
  },
  ctaButtons: {
    display: 'flex',
    justifyContent: 'center',
    gap: '15px',
  },
  ctaPrimaryButton: {
    padding: '12px 30px',
    backgroundColor: '#007bff',
    color: '#ffffff',
    textDecoration: 'none',
    borderRadius: '6px',
    fontSize: '1em',
    fontWeight: '600',
    transition: 'background-color 0.2s ease',
  },
  ctaSecondaryButton: {
    padding: '12px 30px',
    backgroundColor: 'transparent',
    color: '#007bff',
    textDecoration: 'none',
    border: '2px solid #007bff',
    borderRadius: '6px',
    fontSize: '1em',
    fontWeight: '600',
    transition: 'all 0.2s ease',
  },
};

export default Services;
