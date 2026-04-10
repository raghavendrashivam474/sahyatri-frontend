import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; // Import Link for navigation
// import Header from './Header';
// import Footer_80 from './Footer_80';

function ReportsAnalytics() {
  const [incidentsData, setIncidentsData] = useState([]);
  const [safetyScores, setSafetyScores] = useState([]);
  const [trendsData, setTrendsData] = useState([]);
  const [filters, setFilters] = useState({
    dateRange: 'last30days',
    location: 'all',
    incidentType: 'all'
  });

  // Simulate data fetching
  useEffect(() => {
    // Mock data for incidents
    setIncidentsData([
      { id: 1, type: 'SOS Alert', location: 'Zone A', date: '2023-10-01', status: 'Resolved' },
      { id: 2, type: 'Medical Emergency', location: 'Zone B', date: '2023-10-02', status: 'In Progress' },
      { id: 3, type: 'Weather Alert', location: 'Zone C', date: '2023-10-03', status: 'Resolved' },
      { id: 4, type: 'Theft', location: 'Zone A', date: '2023-10-05', status: 'Investigation Ongoing' },
    ]);

    // Mock data for safety scores
    setSafetyScores([
      { zone: 'Zone A', score: 85, trend: 'up' },
      { zone: 'Zone B', score: 92, trend: 'stable' },
      { zone: 'Zone C', score: 78, trend: 'down' },
      { zone: 'Zone D', score: 95, trend: 'up' },
    ]);

    // Mock data for trends
    setTrendsData([
      { month: 'Jan', incidents: 12, safetyScore: 88 },
      { month: 'Feb', incidents: 15, safetyScore: 85 },
      { month: 'Mar', incidents: 10, safetyScore: 90 },
      { month: 'Apr', incidents: 8, safetyScore: 92 },
      { month: 'May', incidents: 14, safetyScore: 89 },
    ]);
  }, []);

  const handleFilterChange = (e) => {
    setFilters({
      ...filters,
      [e.target.name]: e.target.value
    });
  };

  const handleExport = (format) => {
    // Mock export functionality
    console.log(`Exporting report in ${format} format with filters:`, filters);
    alert(`Report exported as ${format.toUpperCase()} (simulated)`);
  };

  return (
    <div style={styles.pageBackground}>
      {/* Dashboard Header - Full Width (Standardized) */}
      {/* <Header /> */}

      {/* Main content wrapper - Centered below header */}
      <div style={styles.mainContentWrapper}>
        {/* Page-specific Header/Title */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitleText}>Reports & Analytics</h1>
          <div style={styles.exportButtons}>
            <button onClick={() => handleExport('csv')} style={styles.exportButton}>
              Export CSV
            </button>
            <button onClick={() => handleExport('pdf')} style={styles.exportButton}>
              Export PDF
            </button>
          </div>
        </div>

        {/* Filters Section */}
        <div style={styles.filterCard}> {/* Reusing filterCard style */}
          <h2 style={styles.cardSectionTitle}>Report Generator</h2>
          <div style={styles.filters}>
            <select name="dateRange" value={filters.dateRange} onChange={handleFilterChange} style={styles.filterSelect}>
              <option value="last7days">Last 7 Days</option>
              <option value="last30days">Last 30 Days</option>
              <option value="last3months">Last 3 Months</option>
              <option value="lastyear">Last Year</option>
            </select>
            <select name="location" value={filters.location} onChange={handleFilterChange} style={styles.filterSelect}>
              <option value="all">All Locations</option>
              <option value="zoneA">Zone A</option>
              <option value="zoneB">Zone B</option>
              <option value="zoneC">Zone C</option>
              <option value="zoneD">Zone D</option>
            </select>
            <select name="incidentType" value={filters.incidentType} onChange={handleFilterChange} style={styles.filterSelect}>
              <option value="all">All Incident Types</option>
              <option value="sos">SOS Alerts</option>
              <option value="medical">Medical Emergencies</option>
              <option value="weather">Weather Alerts</option>
              <option value="theft">Theft</option>
            </select>
            <button style={styles.generateButton}>Generate Report</button>
          </div>
        </div>

        {/* Widgets/Charts Section */}
        <div style={styles.widgetsSection}>
          <h2 style={styles.cardSectionTitle}>Key Performance Indicators</h2> {/* Using cardSectionTitle */}
          <div style={styles.widgetsGrid}>
            {/* Incidents Overview Widget */}
            <div style={styles.widgetCard}> {/* Using widgetCard style */}
              <h3 style={styles.widgetTitle}>Incidents Overview</h3>
              <div style={styles.chartPlaceholder}>
                <p style={styles.chartPlaceholderText}>Chart: Incidents by Type</p>
                <div style={styles.chartDataList}>
                  {incidentsData.map((incident) => (
                    <div key={incident.id} style={styles.dataListItem}>
                      <span style={styles.dataListItemLabel}>{incident.type} ({incident.location})</span>
                      <span style={{
                        ...styles.statusBadgeSmall,
                        backgroundColor:
                          incident.status === 'Resolved' ? '#28a745' :
                          incident.status === 'In Progress' ? '#ffc107' :
                          '#007bff'
                      }}>{incident.status}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Safety Scores Widget */}
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>Safety Scores by Zone</h3>
              <div style={styles.chartPlaceholder}>
                <p style={styles.chartPlaceholderText}>Chart: Average Safety Scores</p>
                <div style={styles.chartDataList}>
                  {safetyScores.map((score, index) => (
                    <div key={index} style={styles.dataListItem}>
                      <span style={styles.dataListItemLabel}>{score.zone}:</span>
                      <span style={{
                        ...styles.dataListItemValue,
                        color: score.score >= 80 ? '#28a745' : score.score >= 50 ? '#ffc107' : '#dc3545'
                      }}>
                        {score.score}%
                        <span style={{ color: score.trend === 'up' ? '#28a745' : score.trend === 'down' ? '#dc3545' : '#6c757d', marginLeft: '8px' }}>
                          {score.trend === 'up' ? ' ↗' : score.trend === 'down' ? ' ↘' : ' →'}
                        </span>
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Trends Widget */}
            <div style={styles.widgetCard}>
              <h3 style={styles.widgetTitle}>Monthly Trends</h3>
              <div style={styles.chartPlaceholder}>
                <p style={styles.chartPlaceholderText}>Chart: Incidents & Safety Score</p>
                <div style={styles.chartDataList}>
                  {trendsData.map((trend, index) => (
                    <div key={index} style={styles.dataListItem}>
                      <span style={styles.dataListItemLabel}>{trend.month}:</span>
                      <span style={styles.dataListItemValue}>
                        Incidents {trend.incidents}, Safety {trend.safetyScore}%
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <Footer_80/> */}
      </div>
     
    </div>
  );
}

// --- Professional Government Website Styles (Standardized) ---
const styles = {
    // --- Shared Base Styles ---
    pageBackground: {
        fontFamily: "'Segoe UI', Roboto, 'Helvetica Neue', Arial, sans-serif",
        backgroundColor: '#e9eff6', // Light grayish-blue for a government feel
        minHeight: '100vh',
        color: '#2c3e50',
        lineHeight: '1.6',
    },
    mainContentWrapper: {
        width: '81.2vw',          // Set width to 80% of the viewport width
        marginLeft: 'auto',       // Push the container to the right
        padding: '30px 20px',   // Keep existing padding
        boxSizing: 'border-box',  // Ensure padding is included in the width, not added to it
    },
    // General card title style, used for h3s inside cards
    cardSectionTitle: { // Consistent across components for h2/card titles
        fontSize: '1.5em', // Adjusted for main section titles
        fontWeight: '700',
        color: '#003366',
        marginBottom: '20px', // More space for section titles
        borderBottom: '1px solid #e9ecef',
        paddingBottom: '10px',
    },
    widgetTitle: { // Smaller title for individual widgets
        fontSize: '1.2em',
        fontWeight: '600',
        color: '#003366',
        marginBottom: '15px',
    },
    statusBadgeSmall: { // Smaller badge for lists/tables if needed
        padding: '4px 8px',
        borderRadius: '12px',
        fontSize: '0.75em',
        fontWeight: 'bold',
        display: 'inline-block',
        minWidth: '70px',
        textAlign: 'center',
        textTransform: 'uppercase',
        lineHeight: '1',
    },

    // --- Header Styles (Copied directly from Dashboard.jsx / TouristsDirectory.jsx) ---
    dashboardHeader: {
        backgroundColor: '#003366', // Deep blue
        color: 'white',
        padding: '15px 0',
        boxShadow: '0 2px 5px rgba(0,0,0,0.2)',
    },
    headerContent: {
        maxWidth: '1400px', // Matches mainContentWrapper width
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '0 20px',
    },
    headerLeft: {
        display: 'flex',
        alignItems: 'center',
        gap: '30px',
    },
    logoContainer: {
        display: 'flex',
        alignItems: 'center',
        gap: '10px',
    },
    logo: {
        backgroundColor: '#007bff',
        borderRadius: '50%',
        padding: '8px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        boxShadow: '0 0 5px rgba(0,0,0,0.3)',
    },
    logoIcon: {
        width: '24px',
        height: '24px',
        color: 'white',
    },
    logoText: {
        fontSize: '1.5em',
        fontWeight: '700',
        color: 'white',
        letterSpacing: '0.5px',
    },
    navigation: {
        display: 'flex',
        flexWrap: 'wrap', // Added flex-wrap for responsiveness if many links
        gap: '20px',
    },
    navLink: {
        color: '#e9ecef',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: '500',
        padding: '8px 12px',
        borderRadius: '5px',
        transition: 'background-color 0.3s ease, color 0.3s ease',
        // Note: For actual :hover, use a CSS file or CSS-in-JS library.
        // '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white' },
    },
    navLinkActive: {
        color: 'white',
        textDecoration: 'none',
        fontSize: '1em',
        fontWeight: '600',
        backgroundColor: '#007bff', // Blue for the active link
        padding: '8px 12px',
        borderRadius: '5px',
        boxShadow: '0 1px 3px rgba(0,0,0,0.2)',
    },
    headerRight: {
        display: 'flex',
        alignItems: 'center',
        gap: '15px',
    },
    userButton: {
        backgroundColor: 'transparent',
        border: '1px solid #e9ecef',
        color: '#e9ecef',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.3s ease, color 0.3s ease, border-color 0.3s ease',
        // '&:hover': { backgroundColor: 'rgba(255,255,255,0.1)', color: 'white', borderColor: 'white' },
    },
    userIcon: {
        width: '18px',
        height: '18px',
    },
    userButtonLogout: {
        backgroundColor: '#dc3545', // Red for logout
        border: 'none',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '0.9em',
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        transition: 'background-color 0.3s ease',
        // '&:hover': { backgroundColor: '#c82333' },
    },

    // --- Page-specific Header/Title ---
    pageHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '25px',
        borderBottom: '2px solid #a3b1c6',
        paddingBottom: '15px',
        marginTop: '20px', // Space from top for the main content wrapper
    },
    pageTitleText: {
        fontSize: '2.2em',
        color: '#003366',
        fontWeight: '700',
        letterSpacing: '0.5px',
        margin: '0',
    },
    exportButtons: {
        display: 'flex',
        gap: '10px',
    },
    exportButton: {
        backgroundColor: '#6c757d', // Grey for export buttons
        color: 'white',
        border: 'none',
        padding: '10px 18px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '0.95em',
        fontWeight: '600',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#5a6268' },
    },

    // --- Filters Section ---
    filterCard: { // Renamed from filtersSection to align with `card` naming convention
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #dcdcdc',
        marginBottom: '30px',
    },
    filters: { // Renamed from filters to avoid confusion, refers to the container of filter elements
        display: 'flex',
        gap: '15px',
        flexWrap: 'wrap',
    },
    filterSelect: {
        padding: '10px 12px',
        borderRadius: '8px',
        border: '1px solid #ced4da',
        fontSize: '1em',
        backgroundColor: 'white',
        appearance: 'none', // For custom arrow if needed
        outline: 'none',
        transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
        // '&:focus': { borderColor: '#007bff', boxShadow: '0 0 0 2px rgba(0,123,255,0.25)' },
    },
    generateButton: {
        backgroundColor: '#007bff', // Primary blue for action button
        color: 'white',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '8px',
        cursor: 'pointer',
        fontSize: '1em',
        fontWeight: '600',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#0056b3' },
    },

    // --- Widgets/Charts Section ---
    widgetsSection: { // Renamed from widgetsSection for consistency
        backgroundColor: '#ffffff',
        borderRadius: '12px',
        padding: '25px',
        boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
        border: '1px solid #dcdcdc',
    },
    widgetsGrid: {
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        gap: '20px',
    },
    widgetCard: { // Renamed from widget
        backgroundColor: '#f8f9fa',
        borderRadius: '8px',
        padding: '20px',
        border: '1px solid #e9ecef',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
    },
    chartPlaceholder: {
        minHeight: '180px', // Slightly adjusted height
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#e9ecef',
        borderRadius: '5px',
        padding: '15px',
        textAlign: 'center',
        border: '1px dashed #ced4da',
    },
    chartPlaceholderText: {
      fontSize: '1em',
      color: '#6c757d',
      marginBottom: '10px',
      fontWeight: '500',
    },
    chartDataList: { // Renamed from chartData for clarity
        width: '100%',
        padding: '10px 0',
        maxHeight: '120px', // Constrain height for demo data
        overflowY: 'auto',
    },
    dataListItem: { // Renamed from incidentItem, scoreItem, trendItem
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '5px 0',
        fontSize: '0.9em',
        borderBottom: '1px dotted #e0e0e0',
        // '&:last-child': { borderBottom: 'none' }, // Requires actual CSS
    },
    dataListItemLabel: {
        color: '#343a40',
        fontWeight: '500',
    },
    dataListItemValue: {
        color: '#495057',
    },
};

export default ReportsAnalytics;