// src/components/Sidebar.jsx
import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

// Everything else stays the same
const iconStyle = { width: '20px', height: '20px', marginRight: '12px', flexShrink: 0 };

// ── Icons ──
const DashboardIcon = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>;
const TouristsIcon  = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const IncidentsIcon = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /></svg>;
const ReportsIcon   = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" /></svg>;
const MapIcon       = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"/><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const SettingsIcon  = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.096 2.572-1.065zM15 12a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const HelpIcon      = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const ProfileIcon   = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const LogoutIcon    = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;
const SOSIcon       = ({ style }) => <svg style={style||iconStyle} fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" /></svg>;

// ── Menu Items ──
const adminLinks = [
  { to: "/Dashboard",         text: "Dashboard",           icon: DashboardIcon, badge: null    },
  { to: "/map-geo-fencing",   text: "Live Map",            icon: MapIcon,       badge: null    },
  { to: "/Tourists",          text: "Tourist Directory",   icon: TouristsIcon,  badge: null    },
  { to: "/Incidents",         text: "Incidents & Alerts",  icon: IncidentsIcon, badge: "admin" },
  { to: "/Reports-Analytics", text: "Reports & Analytics", icon: ReportsIcon,   badge: null    },
  { to: "/settings-admin",    text: "Settings & Admin",    icon: SettingsIcon,  badge: "admin" },
  { to: "/Help-Support",      text: "Help & Support",      icon: HelpIcon,      badge: null    },
];

const touristLinks = [
  { to: "/Dashboard",       text: "Dashboard",     icon: DashboardIcon, badge: null },
  { to: "/map-geo-fencing", text: "Live Map",      icon: MapIcon,       badge: null },
  { to: "/Help-Support",    text: "Help & Support", icon: HelpIcon,     badge: null },
];

function Sidebar() {
  const navigate          = useNavigate();
  const location          = useLocation();
  const { user, logout }  = useAuth();
  const isAdmin           = user?.role === "admin";
  const navLinks          = isAdmin ? adminLinks : touristLinks;

  const handleLogout = () => {
    logout();
    navigate('/login');
    window.scrollTo(0, 0);
  };

  const bgColor     = isAdmin ? '#1a0533' : '#003366';
  const accentColor = isAdmin ? '#7C3AED' : '#007bff';

  return (
    <div style={{
      width: '260px',
      backgroundColor: bgColor,
      color: 'white',
      display: 'flex',
      flexDirection: 'column',
      height: '100%',          // ✅ fill parent height
      overflow: 'hidden',      // ✅ hide overflow on container
      boxShadow: '2px 0 10px rgba(0,0,0,0.3)',
    }}>

      {/* ══ SCROLLABLE TOP SECTION ══ */}
      <div style={{
        flex: 1,               // ✅ take all available space
        overflowY: 'auto',     // ✅ scroll if content overflows
        overflowX: 'hidden',
        paddingTop: '20px',
        // Custom scrollbar
        scrollbarWidth: 'thin',
        scrollbarColor: `${accentColor} transparent`,
      }}>

        {/* Logo */}
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '12px',
          padding: '0 16px 16px',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          marginBottom: '12px',
        }}>
          <div style={{
            backgroundColor: accentColor,
            borderRadius: '50%',
            padding: '8px',
            display: 'flex',
            flexShrink: 0,
          }}>
            <svg style={{ width: 28, height: 28 }} fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
            </svg>
          </div>
          <div>
            <p style={{ fontSize: '1.4em', fontWeight: 'bold', margin: 0 }}>SAHYatri</p>
            <p style={{ fontSize: '0.65em', color: isAdmin ? '#c4b5fd' : '#93c5fd', margin: 0 }}>
              {isAdmin ? 'Admin Panel' : 'Tourist Portal'}
            </p>
          </div>
        </div>

        {/* User Badge */}
        <div style={{
          margin: '0 12px 16px',
          padding: '10px 12px',
          borderRadius: '8px',
          backgroundColor: isAdmin ? 'rgba(124,58,237,0.2)' : 'rgba(0,123,255,0.15)',
          border: `1px solid ${accentColor}`,
          display: 'flex',
          alignItems: 'center',
          gap: '8px',
        }}>
          {/* Online dot */}
          <div style={{
            width: 8, height: 8,
            borderRadius: '50%',
            backgroundColor: '#22C55E',
            flexShrink: 0,
          }} />
          <div style={{ minWidth: 0, flex: 1 }}>
            <p style={{ margin: 0, fontSize: '0.7em', color: '#94a3b8' }}>Logged in as</p>
            <p style={{
              margin: 0, fontSize: '0.85em',
              fontWeight: 'bold', color: 'white',
              overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap',
            }}>
              {user?.name || 'User'}
            </p>
          </div>
          <span style={{
            fontSize: '0.6em',
            padding: '3px 8px',
            borderRadius: '999px',
            backgroundColor: accentColor,
            color: 'white',
            fontWeight: 'bold',
            flexShrink: 0,
          }}>
            {isAdmin ? '🛡️ ADMIN' : '🧳 TOURIST'}
          </span>
        </div>

        {/* Navigation */}
        <nav>
          <p style={styles.sectionLabel}>NAVIGATION</p>

          {navLinks.map((link) => {
            const isActive  = location.pathname.toLowerCase() === link.to.toLowerCase();
            const LinkIcon  = link.icon;

            return (
              <Link
                key={link.to}
                to={link.to}
                style={{
                  ...styles.navLink,
                  ...(isActive ? {
                    color: 'white',
                    fontWeight: '600',
                    backgroundColor: isAdmin
                      ? 'rgba(124,58,237,0.25)'
                      : 'rgba(0,77,153,0.6)',
                    borderLeftColor: accentColor,
                  } : {}),
                }}
              >
                <LinkIcon style={{
                  ...iconStyle,
                  color: isActive ? 'white' : '#94a3b8',
                }} />
                <span style={{ flex: 1 }}>{link.text}</span>
                {link.badge === 'admin' && (
                  <span style={{
                    fontSize: '0.55em',
                    padding: '2px 6px',
                    borderRadius: '999px',
                    backgroundColor: '#7C3AED',
                    color: 'white',
                    fontWeight: 'bold',
                    flexShrink: 0,
                  }}>
                    ADMIN
                  </span>
                )}
              </Link>
            );
          })}

          {/* Tourist Emergency Section */}
          {!isAdmin && (
            <>
              <p style={{ ...styles.sectionLabel, marginTop: '16px' }}>EMERGENCY</p>
              <button
                onClick={() => document.querySelector('[title="Emergency SOS"]')?.click()}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  width: '100%',
                  padding: '12px 20px',
                  backgroundColor: 'rgba(220,38,38,0.15)',
                  border: 'none',
                  borderLeft: '4px solid #DC2626',
                  color: '#fca5a5',
                  cursor: 'pointer',
                  fontSize: '0.95em',
                  textAlign: 'left',
                }}
              >
                <SOSIcon style={{ ...iconStyle, color: '#fca5a5' }} />
                Send SOS Alert
              </button>
            </>
          )}

          {/* Admin Quick Actions */}
          {isAdmin && (
            <>
              <p style={{ ...styles.sectionLabel, marginTop: '16px' }}>QUICK ACTIONS</p>
              <a
                href="http://localhost:5000/api/test/sos"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  padding: '10px 20px',
                  color: '#fbbf24',
                  textDecoration: 'none',
                  fontSize: '0.85em',
                  backgroundColor: 'rgba(251,191,36,0.1)',
                  borderLeft: '3px solid #fbbf24',
                }}
              >
                <span style={{ marginRight: '10px' }}>🧪</span>
                Test SOS Alert
              </a>
            </>
          )}
        </nav>
      </div>

      {/* ══ FIXED BOTTOM SECTION — Always Visible ══ */}
      <div style={{
        flexShrink: 0,           // ✅ never shrink — always visible
        borderTop: '1px solid rgba(255,255,255,0.1)',
        backgroundColor: bgColor,
        paddingTop: '8px',
        paddingBottom: '8px',
      }}>
        <Link
          to="/profile"
          style={{
            ...styles.navLink,
            ...(location.pathname === '/profile' ? {
              color: 'white',
              fontWeight: '600',
              backgroundColor: isAdmin
                ? 'rgba(124,58,237,0.25)'
                : 'rgba(0,77,153,0.6)',
              borderLeftColor: accentColor,
            } : {}),
          }}
        >
          <ProfileIcon style={{
            ...iconStyle,
            color: location.pathname === '/profile' ? 'white' : '#94a3b8',
          }} />
          Profile
        </Link>

        <button onClick={handleLogout} style={{
          display: 'flex',
          alignItems: 'center',
          padding: '12px 20px',
          backgroundColor: 'transparent',
          border: 'none',
          cursor: 'pointer',
          color: '#ff8a8a',
          fontSize: '0.95em',
          textAlign: 'left',
          width: '100%',
        }}>
          <LogoutIcon style={{ ...iconStyle, color: '#ff8a8a' }} />
          Logout
        </button>
      </div>

    </div>
  );
}

const styles = {
  sectionLabel: {
    fontSize: '0.62em',
    color: '#475569',
    fontWeight: 'bold',
    letterSpacing: '0.1em',
    padding: '8px 20px 4px',
    margin: 0,
  },
  navLink: {
    display: 'flex',
    alignItems: 'center',
    color: '#94a3b8',
    textDecoration: 'none',
    fontSize: '0.92em',
    padding: '11px 20px',
    transition: 'all 0.2s ease',
    borderLeft: '4px solid transparent',
  },
};

export default Sidebar;