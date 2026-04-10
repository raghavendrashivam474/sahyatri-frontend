import React, { useState, useEffect } from 'react';
import { Link } from "react-router-dom"; // Import Link for navigation
import Header from './Header';
import Footer_80 from './Footer_80';

// --- Mock Data (Replace with actual API calls in a real application) ---
const mockIncidents = [
    {
        id: 'INC001',
        tourists: ['John Doe (USA)', 'Jane Smith (USA)'],
        type: 'Missing Person',
        timestamp: '2023-10-26T10:30:00Z',
        assignedOfficer: 'Officer Sharma',
        status: 'Investigation Ongoing',
        timeline: [
            { timestamp: '2023-10-26T10:30:00Z', event: 'Reported by Hotel Manager' },
            { timestamp: '2023-10-26T10:45:00Z', event: 'Initial dispatch: Officer Sharma assigned' },
            { timestamp: '2023-10-26T11:15:00Z', event: 'Search initiated near Qutub Minar' },
            { timestamp: '2023-10-26T14:00:00Z', event: 'Photo uploaded: Last seen at hotel' },
        ],
        documents: [
            { name: 'Hotel CCTV Snapshot 1.jpg', url: '/path/to/img1.jpg' },
            { name: 'Missing Person Report.pdf', url: '/path/to/doc1.pdf' },
        ],
        location: 'Qutub Minar, Delhi',
    },
    {
        id: 'INC002',
        tourists: ['Emily White (UK)'],
        type: 'Theft - Passport & Wallet',
        timestamp: '2023-10-26T14:15:00Z',
        assignedOfficer: 'Officer Singh',
        status: 'FIR Filed',
        timeline: [
            { timestamp: '2023-10-26T14:15:00Z', event: 'Reported via Tourist Helpline' },
            { timestamp: '2023-10-26T14:30:00Z', event: 'Officer Singh dispatched to Connaught Place' },
            { timestamp: '2023-10-26T15:00:00Z', event: 'Statement recorded from tourist' },
            { timestamp: '2023-10-26T15:45:00Z', event: 'FIR filed (FIR No: DL-CP-2023-0001)' },
        ],
        documents: [
            { name: 'Tourist Statement.pdf', url: '/path/to/doc2.pdf' },
        ],
        location: 'Connaught Place, Delhi',
    },
    {
        id: 'INC003',
        tourists: ['Aisha Khan (UAE)'],
        type: 'Medical Emergency',
        timestamp: '2023-10-27T08:00:00Z',
        assignedOfficer: 'Officer Kumar',
        status: 'Resolved',
        timeline: [
            { timestamp: '2023-10-27T08:00:00Z', event: 'Reported by tour guide' },
            { timestamp: '2023-10-27T08:10:00Z', event: 'Officer Kumar and Medical Team dispatched' },
            { timestamp: '2023-10-27T08:45:00Z', event: 'Tourist transferred to Fortis Hospital' },
            { timestamp: '2023-10-27T12:00:00Z', event: 'Status updated: Condition stable, family informed' },
        ],
        documents: [],
        location: 'Agra Fort, Agra',
    },
    {
        id: 'INC004',
        tourists: ['Chen Wei (China)', 'Li Ming (China)'],
        type: 'Lost Property - Camera',
        timestamp: '2023-10-27T11:00:00Z',
        assignedOfficer: 'Officer Devi',
        status: 'Waiting for Tourist Action',
        timeline: [
            { timestamp: '2023-10-27T11:00:00Z', event: 'Reported via web portal' },
            { timestamp: '2023-10-27T11:30:00Z', event: 'Officer Devi assigned' },
            { timestamp: '2023-10-27T12:00:00Z', event: 'CCTV footage reviewed at Taj Mahal' },
            { timestamp: '2023-10-27T13:00:00Z', event: 'Property found and secured. Tourist notified to collect.' },
        ],
        documents: [
            { name: 'Found Property Form.pdf', url: '/path/to/doc3.pdf' },
            { name: 'Camera Photo 1.jpg', url: '/path/to/img2.jpg' },
        ],
        location: 'Taj Mahal, Agra',
    },
];

const mockOfficers = [
    'Officer Sharma', 'Officer Singh', 'Officer Kumar', 'Officer Devi', 'Officer Patel', 'Officer Rao'
];

// --- Component Definition ---
const IncidentsAndAlerts = () => {
    const [incidents, setIncidents] = useState(mockIncidents);
    const [alerts, setAlerts] = useState([]);
    const [selectedIncident, setSelectedIncident] = useState(null);
    const [isDetailModalOpen, setIsDetailModalOpen] = useState(false);
    const [activeTab, setActiveTab] = useState('incidents'); // 'incidents' or 'alerts'

    // Simulate real-time alerts
    useEffect(() => {
        const alertInterval = setInterval(() => {
            const newAlert = {
                id: `AL${Date.now()}`,
                timestamp: new Date().toLocaleString(),
                type: Math.random() > 0.6 ? 'New Incident' : Math.random() > 0.3 ? 'Status Update' : 'Officer Update',
                description: (() => {
                    const randomIncident = incidents[Math.floor(Math.random() * incidents.length)];
                    switch (Math.random() > 0.6 ? 'New Incident' : Math.random() > 0.3 ? 'Status Update' : 'Officer Update') {
                        case 'New Incident': return `New incident reported: ${['Missing Person', 'Theft', 'Medical Emergency'][Math.floor(Math.random() * 3)]} near ${['Delhi', 'Agra', 'Mumbai'][Math.floor(Math.random() * 3)]}.`;
                        case 'Status Update': return `Incident #${randomIncident.id} status updated to "${['Investigation Ongoing', 'Resolved', 'FIR Filed'][Math.floor(Math.random() * 3)]}".`;
                        case 'Officer Update': return `Officer ${mockOfficers[Math.floor(Math.random() * mockOfficers.length)]} assigned to Incident #${randomIncident.id}.`;
                        default: return 'Generic update received.';
                    }
                })(),
                icon: Math.random() > 0.6 ? '🚨' : Math.random() > 0.3 ? '⬆️' : '👨‍✈️', // Emojis for event icons
            };
            setAlerts(prev => [newAlert, ...prev].slice(0, 20)); // Keep last 20 alerts
        }, 5000); // Every 5 seconds

        return () => clearInterval(alertInterval);
    }, [incidents]); // Re-run if incidents change (though mockIncidents is static)

    const handleViewDetails = (incident) => {
        setSelectedIncident(incident);
        setIsDetailModalOpen(true);
    };

    const handleCloseDetails = () => {
        setIsDetailModalOpen(false);
        setSelectedIncident(null);
    };

    const handleAssignOfficer = (incidentId, newOfficer) => {
        setIncidents(prevIncidents =>
            prevIncidents.map(inc =>
                inc.id === incidentId
                    ? {
                        ...inc,
                        assignedOfficer: newOfficer,
                        timeline: [
                            ...inc.timeline,
                            { timestamp: new Date().toISOString(), event: `Officer reassigned to ${newOfficer}` }
                        ]
                    }
                    : inc
            )
        );
        setSelectedIncident(prev => prev ? {
            ...prev,
            assignedOfficer: newOfficer,
            timeline: [
                ...prev.timeline,
                { timestamp: new Date().toISOString(), event: `Officer reassigned to ${newOfficer}` }
            ]
        } : null);
    };

    const handleGenerateFIR = (incidentId) => {
        setIncidents(prevIncidents =>
            prevIncidents.map(inc =>
                inc.id === incidentId && inc.status !== 'FIR Filed'
                    ? {
                        ...inc,
                        status: 'FIR Filed',
                        timeline: [
                            ...inc.timeline,
                            { timestamp: new Date().toISOString(), event: `FIR automatically generated (FIR No: DL-TR-2023-${Math.floor(Math.random() * 9000 + 1000)})` }
                        ]
                    }
                    : inc
            )
        );
        setSelectedIncident(prev => prev ? {
            ...prev,
            status: 'FIR Filed',
            timeline: [
                ...prev.timeline,
                { timestamp: new Date().toISOString(), event: `FIR automatically generated (FIR No: DL-TR-2023-${Math.floor(Math.random() * 9000 + 1000)})` }
            ]
        } : null);
        alert(`FIR generated for Incident ID: ${incidentId}`);
    };

    const handleUploadDocuments = (e, incidentId) => {
        const files = Array.from(e.target.files);
        if (files.length === 0) return;

        const newDocs = files.map(file => ({
            name: file.name,
            url: URL.createObjectURL(file), // Create object URL for preview
            type: file.type
        }));

        setIncidents(prevIncidents =>
            prevIncidents.map(inc =>
                inc.id === incidentId
                    ? {
                        ...inc,
                        documents: [...(inc.documents || []), ...newDocs],
                        timeline: [
                            ...inc.timeline,
                            { timestamp: new Date().toISOString(), event: `Document(s) uploaded: ${newDocs.map(d => d.name).join(', ')}` }
                        ]
                    }
                    : inc
            )
        );
        setSelectedIncident(prev => prev ? {
            ...prev,
            documents: [...(prev.documents || []), ...newDocs],
            timeline: [
                ...prev.timeline,
                { timestamp: new Date().toISOString(), event: `Document(s) uploaded: ${newDocs.map(d => d.name).join(', ')}` }
            ]
        } : null);
        alert(`${files.length} file(s) uploaded to Incident ID: ${incidentId}`);
    };


    const formatTimestamp = (isoString) => {
        if (!isoString) return 'N/A';
        const date = new Date(isoString);
        return date.toLocaleString('en-IN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: true
        });
    };

    return (
        // Outermost div for the entire page background
        <>
        <div style={styles.pageBackground}>
            {/* Dashboard Header - Full Width (Standardized) */}
            {/* <Header /> */}

            {/* Main content starts here, encapsulated in the new mainContentWrapper */}
            <div style={styles.mainContentWrapper}>
                {/* Page-specific Header/Title (Aligned with Dashboard's pageHeader) */}
                <div style={styles.pageHeader}>
                    <h1 style={styles.pageTitleText}>Incidents & Alerts Management</h1>
                    {/* No additional buttons/elements for this page header in mock, so it's just the title */}
                </div>

                <div style={styles.tabs}>
                    <button
                        style={{ ...styles.tabButton, ...(activeTab === 'incidents' && styles.tabButtonActive) }}
                        onClick={() => setActiveTab('incidents')}
                    >
                        Incidents List
                    </button>
                    <button
                        style={{ ...styles.tabButton, ...(activeTab === 'alerts' && styles.tabButtonActive) }}
                        onClick={() => setActiveTab('alerts')}
                    >
                        Real-time Alerts ({alerts.length})
                    </button>
                </div>

                {activeTab === 'incidents' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardSectionTitle}>Current Incidents</h2>
                        <table style={styles.table}>
                            <thead>
                                <tr>
                                    <th style={styles.th}>Incident ID</th>
                                    <th style={styles.th}>Tourist(s)</th>
                                    <th style={styles.th}>Type</th>
                                    <th style={styles.th}>Timestamp</th>
                                    <th style={styles.th}>Assigned Officer</th>
                                    <th style={styles.th}>Status</th>
                                    <th style={styles.th}>Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {incidents.length > 0 ? (
                                    incidents.map((incident) => (
                                        <tr key={incident.id} style={styles.tr}>
                                            <td style={styles.td}>{incident.id}</td>
                                            <td style={styles.td}>{incident.tourists.join(', ')}</td>
                                            <td style={styles.td}>{incident.type}</td>
                                            <td style={styles.td}>{formatTimestamp(incident.timestamp)}</td>
                                            <td style={styles.td}>{incident.assignedOfficer}</td>
                                            <td style={styles.td}>
                                                <span style={{
                                                    ...styles.statusBadge,
                                                    backgroundColor:
                                                        incident.status === 'FIR Filed' ? '#28a745' :
                                                        incident.status === 'Investigation Ongoing' ? '#ffc107' :
                                                        incident.status === 'Resolved' ? '#17a2b8' :
                                                        incident.status === 'Waiting for Tourist Action' ? '#6c757d' :
                                                        '#007bff'
                                                }}>
                                                    {incident.status}
                                                </span>
                                            </td>
                                            <td style={styles.td}>
                                                <button
                                                    style={styles.actionButton}
                                                    onClick={() => handleViewDetails(incident)}
                                                >
                                                    View Details
                                                </button>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" style={styles.tdNoData}>No incidents reported yet.</td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                )}

                {activeTab === 'alerts' && (
                    <div style={styles.card}>
                        <h2 style={styles.cardSectionTitle}>Real-time Alert Feed</h2>
                        <div style={styles.alertFeed}>
                            {alerts.length > 0 ? (
                                alerts.map((alert) => (
                                    <div key={alert.id} style={styles.alertItem}>
                                        <span style={styles.alertIcon}>{alert.icon}</span>
                                        <div style={styles.alertContent}>
                                            <div style={styles.alertHeader}>
                                                <span style={styles.alertType}>{alert.type}</span>
                                                <span style={styles.alertTimestamp}>{alert.timestamp}</span>
                                            </div>
                                            <p style={styles.alertDescription}>{alert.description}</p>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <p style={styles.noAlerts}>No real-time alerts active.</p>
                            )}
                        </div>
                    </div>
                )}


                {/* Detailed Incident View Modal */}
                {isDetailModalOpen && selectedIncident && (
                    <div style={styles.modalOverlay}>
                        <div style={styles.modalContent}>
                            <button style={styles.modalCloseButton} onClick={handleCloseDetails}>
                                &times;
                            </button>
                            <h2 style={styles.modalTitle}>Incident Details: {selectedIncident.id}</h2>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Basic Information</h3>
                                <p><strong>Tourist(s):</strong> {selectedIncident.tourists.join(', ')}</p>
                                <p><strong>Type:</strong> {selectedIncident.type}</p>
                                <p><strong>Location:</strong> {selectedIncident.location || 'N/A'}</p>
                                <p><strong>Reported:</strong> {formatTimestamp(selectedIncident.timestamp)}</p>
                                <p><strong>Current Status:</strong> <span style={{
                                    ...styles.statusBadge,
                                    backgroundColor:
                                        selectedIncident.status === 'FIR Filed' ? '#28a745' :
                                        selectedIncident.status === 'Investigation Ongoing' ? '#ffc107' :
                                        selectedIncident.status === 'Resolved' ? '#17a2b8' :
                                        selectedIncident.status === 'Waiting for Tourist Action' ? '#6c757d' :
                                        '#007bff'
                                }}>
                                    {selectedIncident.status}
                                </span></p>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Assigned Officer</h3>
                                <div style={styles.assignOfficerContainer}>
                                    <select
                                        style={styles.selectOfficer}
                                        value={selectedIncident.assignedOfficer}
                                        onChange={(e) => handleAssignOfficer(selectedIncident.id, e.target.value)}
                                    >
                                        {mockOfficers.map(officer => (
                                            <option key={officer} value={officer}>{officer}</option>
                                        ))}
                                    </select>
                                    <button
                                        style={styles.assignButton}
                                        onClick={() => alert('Officer assignment updated (simulated)')} // The onChange already handles it
                                    >
                                        Update Assignment
                                    </button>
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Event Timeline</h3>
                                <ul style={styles.timelineList}>
                                    {[...selectedIncident.timeline].sort((a, b) => new Date(a.timestamp) - new Date(b.timestamp)).map((event, index, array) => (
                                        <li key={index} style={{
                                            ...styles.timelineItem,
                                            // The pseudo-elements below won't render with inline styles.
                                            // For proper rendering, use a CSS file or CSS-in-JS library.
                                            // This is a placeholder for visual intent.
                                            // '&::before': { ... },
                                            // '&::after': { ... },
                                            // ...(index === array.length - 1 ? styles.timelineItemLast : {})
                                        }}>
                                            <span style={styles.timelineTimestamp}>{formatTimestamp(event.timestamp)}: </span>
                                            {event.event}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>Photo/Document Uploads</h3>
                                <div style={styles.documentUploads}>
                                    <input
                                        type="file"
                                        multiple
                                        onChange={(e) => handleUploadDocuments(e, selectedIncident.id)}
                                        style={styles.fileInput}
                                        id="documentUpload"
                                    />
                                    <label htmlFor="documentUpload" style={styles.uploadButton}>Upload Documents</label>
                                    <div style={styles.uploadedFiles}>
                                        {selectedIncident.documents && selectedIncident.documents.length > 0 ? (
                                            selectedIncident.documents.map((doc, index) => (
                                                <div key={index} style={styles.uploadedFileItem}>
                                                    <a href={doc.url} target="_blank" rel="noopener noreferrer" style={styles.fileLink}>
                                                        {doc.type && doc.type.startsWith('image/') ? '🖼️ ' : '📄 '} {doc.name}
                                                    </a>
                                                </div>
                                            ))
                                        ) : (
                                            <p style={{ margin: 0, color: '#666' }}>No documents uploaded yet.</p>
                                        )}
                                    </div>
                                </div>
                            </div>

                            <div style={styles.detailSection}>
                                <h3 style={styles.detailSectionTitle}>FIR Management</h3>
                                <button
                                    style={{
                                        ...styles.firButton,
                                        backgroundColor: selectedIncident.status === 'FIR Filed' ? '#28a745' : '#dc3545',
                                        cursor: selectedIncident.status === 'FIR Filed' ? 'not-allowed' : 'pointer'
                                    }}
                                    onClick={() => handleGenerateFIR(selectedIncident.id)}
                                    disabled={selectedIncident.status === 'FIR Filed'}
                                >
                                    {selectedIncident.status === 'FIR Filed' ? 'FIR Already Filed' : 'Auto-Generate FIR'}
                                </button>
                                {selectedIncident.status === 'FIR Filed' && <p style={{ color: '#28a745', fontSize: '0.9em' }}>FIR has been successfully filed for this incident.</p>}
                            </div>
                        </div>
                    </div>
                )}
                {/* <Footer_80/> */}
            </div>
            
        </div>
        </>
    );
};

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
    // --- THIS IS THE MODIFIED BLOCK ---
    mainContentWrapper: {
        width: '81.2vw',           // Set width to 80% of the viewport
        marginLeft: 'auto',      // Automatically calculate left margin to push it right
        padding: '30px 20px',    // Keep internal padding
        boxSizing: 'border-box', // Ensure padding is included in the total width
    },
    // General card title style, used for h2s inside cards
    cardSectionTitle: { // Consistent across components for h2/card titles
        fontSize: '1.2em',
        fontWeight: '700',
        color: '#003366',
        marginBottom: '15px',
        borderBottom: '1px solid #eee',
        paddingBottom: '10px',
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

    // --- Page-specific Header/Title (Aligned with TouristsDirectory's pageHeader) ---
    pageHeader: {
        display: 'flex', // Use flex to align title and potential buttons/subtitle
        justifyContent: 'space-between', // Pushes title to left, other elements to right
        alignItems: 'center',
        marginBottom: '25px',
        borderBottom: '2px solid #a3b1c6',
        paddingBottom: '15px',
        marginTop: '20px', // Space from top for the main content wrapper
    },
    pageTitleText: { // Renamed from sectionTitle for clarity, but same style
        fontSize: '2.2em',
        color: '#003366',
        fontWeight: '700',
        letterSpacing: '0.5px',
        margin: '0',
    },

    // --- Rest of Incidents & Alerts specific styles (adjusted for consistency) ---
    tabs: {
        display: 'flex',
        marginBottom: '20px',
        borderBottom: '1px solid #dcdcdc',
    },
    tabButton: {
        padding: '12px 20px',
        border: 'none',
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontSize: '1em',
        color: '#007bff',
        borderBottom: '2px solid transparent',
        transition: 'all 0.3s ease',
        fontWeight: '600',
    },
    tabButtonActive: {
        color: '#003366', // Active tab text color to match header
        borderBottom: '3px solid #003366', // Stronger active border
        fontWeight: 'bold',
        backgroundColor: '#f0f4f8', // Slightly darker background for active tab
    },
    card: {
        backgroundColor: '#ffffff',
        border: '1px solid #dcdcdc',
        borderRadius: '8px',
        padding: '25px',
        marginBottom: '20px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.05)',
    },
    table: {
        width: '100%',
        borderCollapse: 'collapse',
        marginTop: '15px',
    },
    th: {
        backgroundColor: '#f0f4f8', // light gray
        padding: '15px 24px',
        textAlign: 'left',
        fontSize: '0.85em',
        fontWeight: '600',
        color: '#495057',
        textTransform: 'uppercase',
        letterSpacing: '0.5px',
        borderBottom: '1px solid #e0e0e0',
    },
    td: {
        padding: '12px 24px',
        borderBottom: '1px solid #e0e0e0',
        color: '#34495e',
        verticalAlign: 'middle',
    },
    tr: {
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#f5f5f5' } // Cannot be directly inline
    },
    tdNoData: {
        textAlign: 'center',
        padding: '20px',
        color: '#6c757d',
    },
    actionButton: {
        backgroundColor: '#007bff',
        color: 'white',
        border: 'none',
        padding: '8px 12px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '0.9em',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#0056b3' } // Cannot be directly inline
    },
    statusBadge: { // For table status and modal status
        padding: '5px 10px',
        borderRadius: '15px',
        color: 'white',
        fontSize: '0.8em',
        fontWeight: 'bold',
        display: 'inline-block',
        minWidth: '100px',
        textAlign: 'center',
        textTransform: 'uppercase',
    },
    alertFeed: {
        maxHeight: '400px',
        overflowY: 'auto',
        border: '1px solid #dcdcdc',
        borderRadius: '5px',
        padding: '10px',
        backgroundColor: '#fdfdfd',
    },
    alertItem: {
        display: 'flex',
        alignItems: 'flex-start',
        padding: '10px 0',
        borderBottom: '1px dotted #e0e0e0',
        // '&:last-child': { borderBottom: 'none' }, // Cannot be directly inline
    },
    alertIcon: {
        fontSize: '1.5em',
        marginRight: '15px',
        flexShrink: 0,
    },
    alertContent: {
        flexGrow: 1,
    },
    alertHeader: {
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: '5px',
    },
    alertType: {
        fontWeight: 'bold',
        color: '#0056b3',
        fontSize: '1em',
    },
    alertTimestamp: {
        fontSize: '0.8em',
        color: '#6c757d',
    },
    alertDescription: {
        margin: '0',
        color: '#343a40',
        fontSize: '0.9em',
        lineHeight: '1.4',
    },
    noAlerts: {
        textAlign: 'center',
        color: '#6c757d',
        padding: '20px',
    },
    modalOverlay: {
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.6)',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    },
    modalContent: {
        backgroundColor: '#ffffff',
        padding: '30px',
        borderRadius: '8px',
        maxWidth: '800px',
        width: '90%',
        maxHeight: '90vh',
        overflowY: 'auto',
        position: 'relative',
        boxShadow: '0 5px 15px rgba(0,0,0,0.3)',
    },
    modalCloseButton: {
        position: 'absolute',
        top: '15px',
        right: '15px',
        background: 'none',
        border: 'none',
        fontSize: '1.8em',
        cursor: 'pointer',
        color: '#6c757d',
    },
    modalTitle: {
        fontSize: '1.8em',
        color: '#003366', // Adjusted to match deep blue
        marginBottom: '25px',
        borderBottom: '1px solid #e9ecef',
        paddingBottom: '10px',
    },
    detailSection: {
        marginBottom: '20px',
        paddingBottom: '15px',
        borderBottom: '1px dashed #e9ecef',
        // '&:last-child': { borderBottom: 'none' }, // Cannot be directly inline
    },
    detailSectionTitle: {
        fontSize: '1.2em',
        color: '#0056b3',
        marginBottom: '10px',
        fontWeight: '600',
    },
    timelineList: {
        listStyle: 'none',
        paddingLeft: '0',
    },
    timelineItem: {
        marginBottom: '8px',
        fontSize: '0.95em',
        lineHeight: '1.4',
        color: '#495057',
        position: 'relative',
        paddingLeft: '20px',
        // Pseudo-elements require actual CSS:
        // '&::before': { content: '""', position: 'absolute', left: '0', top: '6px', width: '8px', height: '8px', borderRadius: '50%', backgroundColor: '#007bff' },
        // '&::after': { content: '""', position: 'absolute', left: '3px', top: '14px', bottom: '-4px', width: '2px', backgroundColor: '#e9ecef' }
    },
    timelineItemLast: {
        // Pseudo-elements require actual CSS:
        // '&::after': { display: 'none' }
    },
    timelineTimestamp: {
        fontWeight: 'bold',
        color: '#6c757d',
        marginRight: '5px',
    },
    assignOfficerContainer: {
        display: 'flex',
        gap: '10px',
        alignItems: 'center',
    },
    selectOfficer: {
        padding: '8px 12px',
        border: '1px solid #ced4da',
        borderRadius: '4px',
        fontSize: '1em',
        flexGrow: 1,
        maxWidth: '300px',
    },
    assignButton: {
        backgroundColor: '#28a745',
        color: 'white',
        border: 'none',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#218838' } // Cannot be directly inline
    },
    documentUploads: {
        marginTop: '10px',
    },
    fileInput: {
        display: 'none',
    },
    uploadButton: {
        backgroundColor: '#6c757d',
        color: 'white',
        padding: '8px 15px',
        borderRadius: '4px',
        cursor: 'pointer',
        fontSize: '1em',
        display: 'inline-block',
        transition: 'background-color 0.2s ease',
        // '&:hover': { backgroundColor: '#5a6268' } // Cannot be directly inline
    },
    uploadedFiles: {
        marginTop: '10px',
        borderTop: '1px dashed #e9ecef',
        paddingTop: '10px',
    },
    uploadedFileItem: {
        marginBottom: '5px',
    },
    fileLink: {
        color: '#007bff',
        textDecoration: 'none',
        // '&:hover': { textDecoration: 'underline' } // Cannot be directly inline
    },
    firButton: {
        padding: '10px 20px',
        borderRadius: '5px',
        border: 'none',
        color: 'white',
        fontSize: '1.1em',
        fontWeight: 'bold',
        cursor: 'pointer',
        transition: 'background-color 0.2s ease',
        marginTop: '10px',
    },
};

export default IncidentsAndAlerts;