// sidebar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';

// --- Icon Components ---
// Reusing and adding new icons for the sidebar
const iconStyle = { width: '20px', height: '20px', marginRight: '12px' }; // Adjusted icon style for sidebar links

const DashboardIcon = () => <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const TouristsIcon = () => <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h-3V10h3V20zM10 20H7V10h3V20zM4 20H1V10h3V20zM21 20h-3V10h3V20zM12 4a2 2 0 100-4 2 2 0 000 4zM12 20a2 2 0 100-4 2 2 0 000 4zM19 4a2 2 0 100-4 2 2 0 000 4zM5 4a2 2 0 100-4 2 2 0 000 4zM12 7h-2V5h2v2zM12 17h-2v-2h2v2zM19 7h-2V5h2v2zM5 7h-2V5h2v2z" /></svg>; // A placeholder for a group of people/users
const IncidentsIcon = () => <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const ReportsAnalyticsIcon = () => <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10a2 2 0 01-2 2h-2a2 2 0 01-2-2zm9 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const MapGeoFencingIcon = () => <svg style={iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;

const SettingsIcon = ({ style = iconStyle }) => <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const HelpIcon = ({ style = iconStyle }) => <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ProfileIcon = ({ style = iconStyle }) => <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon = ({ style = iconStyle }) => <svg style={style} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;


// --- Navigation Links Data ---
const navLinks = [
  // { to: "/services", text: "Services", icon: DashboardIcon },
  { to: "/dashboard", text: "Dashboard", icon: DashboardIcon },
  { to: "/tourists", text: "Tourists", icon: TouristsIcon },
  { to: "/incidents", text: "Incidents & Alerts", icon: IncidentsIcon },
  { to: "/reports-analytics", text: "Reports & Analytics", icon: ReportsAnalyticsIcon },
  { to: "/help-support", text: "Help & Support", icon: HelpIcon },
  { to: "/map-geo-fencing", text: "Map & Geo-fencing", icon: MapGeoFencingIcon },
  { to: "/settings-admin", text: "Settings & Admin", icon: SettingsIcon },
];

function Sidebar() { // Renamed from Header to Sidebar
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    navigate('/login');
    window.scrollTo(0, 0);
  };

  return (
    <div style={styles.sidebar}> {/* Applied sidebar styles */}
      {/* --- Top Section: Logo --- */}
      <div style={styles.logoContainer}>
        <div style={styles.logo}>
          <svg style={styles.logoIcon} fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" /></svg>
        </div>
        <span style={styles.logoText}>SAHYatri</span>
      </div>

      {/* --- Main Navigation Links --- */}
      <nav style={styles.navigation}>
        {navLinks.map((link) => {
          const isActive = location.pathname.startsWith(link.to);
          const LinkIcon = link.icon; // Get the icon component
          return (
            <Link
              key={link.to}
              to={link.to}
              style={isActive ? styles.navLinkActive : styles.navLink}
            >
              {LinkIcon && <LinkIcon style={{...iconStyle, color: isActive ? styles.navLinkActive.color : styles.navLink.color}} />} {/* Render icon with dynamic color */}
              {link.text}
            </Link>
          );
        })}
      </nav>

      {/* --- Bottom Section: User Actions (Profile, Logout) --- */}
      <div style={styles.userActions}>
        <div style={styles.divider}></div> {/* A separator */}

        <Link to="/profile" style={location.pathname === '/profile' ? styles.navLinkActive : styles.navLink} onClick={() => window.scrollTo(0, 0)}>
          <ProfileIcon style={{...iconStyle, color: location.pathname === '/profile' ? styles.navLinkActive.color : styles.navLink.color}} />
          Profile
        </Link>
        <button onClick={handleLogout} style={styles.logoutButton}>
          <LogoutIcon style={{...iconStyle, color: styles.logoutButton.color}} />
          Logout
        </button>
      </div>
    </div>
  );
}

// --- Styles for Sidebar ---
const styles = {
  sidebar: {
    width: '290px',
    backgroundColor: '#003366',
    color: 'white',
    /*height: '100vh',*/ // No longer using vh
    //position: 'sticky', // Make it sticky (removed)
    /*  DYNAMIC TOP VALUE  */
    //top: ({ navbarHeight }) => `${navbarHeight}px`, // Access navbarHeight from props (removed)
    // left: 0,
    padding: '20px 0',
    boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
    zIndex: 600,
    height: '100%'
  },
  logoContainer: {
    display: 'flex',
    alignItems: 'center',
    gap: '15px',
    padding: '0 20px 30px 20px', // More padding at the bottom for separation
    borderBottom: '1px solid rgba(255,255,255,0.1)', // Subtle line below logo
  },
  logo: {
    backgroundColor: '#007bff',
    borderRadius: '50%',
    padding: '8px',
    display: 'flex',
  },
  logoIcon: { width: '28px', height: '28px' }, // Slightly larger logo icon
  logoText: { fontSize: '1.6em', fontWeight: 'bold' },
  navigation: {
    display: 'flex',
    flexDirection: 'column', // Stack links vertically
    gap: '5px', // Reduced gap between links
    padding: '20px 0', // Padding for the navigation section
    flexGrow: 1, // Allows navigation to take up available space
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#e9ecef',
    textDecoration: 'none',
    fontSize: '1em',
    padding: '12px 20px', // Increased padding for better click area
    transition: 'background-color 0.2s ease, color 0.2s ease',
    '&:hover': {
      backgroundColor: '#004488', // Darker blue on hover
      color: 'white',
    },
  },
  navLinkActive: {
    display: 'flex',
    alignItems: 'center',
    color: 'white',
    textDecoration: 'none',
    fontSize: '1em',
    padding: '12px 20px',
    fontWeight: '600',
    backgroundColor: '#004d99', // A distinct background for active links
    borderLeft: '4px solid #007bff', // Highlight with a left border
  },
  userActions: {
    display: 'flex',
    flexDirection: 'column',
    padding: '20px 0 10px 0',
    borderTop: '1px solid rgba(255,255,255,0.1)', // Separator for user actions
  },
  divider: {
    width: '80%', // Shorter divider for visual appeal
    margin: '10px auto',
    height: '1px',
    backgroundColor: '#004488',
  },
  logoutButton: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    padding: '12px 20px',
    borderRadius: '0', // No rounded corners for sidebar links
    backgroundColor: 'transparent',
    border: 'none',
    cursor: 'pointer',
    transition: 'background-color 0.2s ease',
    color: '#ff8a8a', // Distinct color for logout
    fontSize: '1em',
    textAlign: 'left', // Ensure text aligns left
    width: '100%', // Take full width
    '&:hover': {
      backgroundColor: '#400000', // Dark red on hover for logout
    },
  },
};

export default Sidebar;