import React, { useState, useEffect } from 'react';
// import { Link } from "react-router-dom"; // Link is not used, can be removed
import Header from './Header';
import Footer_80 from './Footer_80'; 

// Mock data remains the same...
const mockTourists = [
  { id: 'T001', name: 'John Smith', nationality: 'United States', status: 'Active', safetyScore: 95, itinerary: 'Kathmandu → Pokhara → Chitwan', currentLocation: 'Thamel, Kathmandu', verification: 'Verified', emergencyContacts: '+1-555-0123, +1-555-0456', kyc: { passport: 'US123456789', visaExpiry: '2024-12-31', address: '123 Main St, New York, NY' }, route: [ { location: 'Tribhuvan Airport', time: '2024-01-15 10:30', status: 'Arrived' }, { location: 'Thamel Hotel', time: '2024-01-15 12:00', status: 'Checked-in' }, { location: 'Pashupatinath Temple', time: '2024-01-15 15:30', status: 'Visited' } ], safetyLog: [ { date: '2024-01-15', event: 'Safe check-in completed', severity: 'info' }, { date: '2024-01-14', event: 'Weather alert acknowledged', severity: 'warning' } ] },
  { id: 'T002', name: 'Maria Garcia', nationality: 'Spain', status: 'In-Transit', safetyScore: 88, itinerary: 'Lumbini → Kathmandu', currentLocation: 'Lumbini', verification: 'Verified', emergencyContacts: '+34-555-7890, +34-555-2345', kyc: { passport: 'ES987654321', visaExpiry: '2024-11-15', address: '456 Plaza Mayor, Madrid' }, route: [ { location: 'Lumbini Bus Station', time: '2024-01-15 08:00', status: 'Departed' }, { location: 'Butwal Transit', time: '2024-01-15 11:30', status: 'In-transit' } ], safetyLog: [ { date: '2024-01-15', event: 'Transit started', severity: 'info' } ] },
  { id: 'T003', name: 'Raj Patel', nationality: 'India', status: 'SOS', safetyScore: 45, itinerary: 'Everest Base Camp', currentLocation: 'Namche Bazaar', verification: 'Pending', emergencyContacts: '+91-555-6789, +91-555-0123', kyc: { passport: 'IN456789123', visaExpiry: '2024-10-30', address: '789 MG Road, Mumbai' }, route: [ { location: 'Lukla Airport', time: '2024-01-14 06:00', status: 'Arrived' }, { location: 'Namche Bazaar', time: '2024-01-14 14:00', status: 'SOS Activated' } ], safetyLog: [ { date: '2024-01-14', event: 'SOS Alert triggered', severity: 'critical' }, { date: '2024-01-14', event: 'Medical assistance dispatched', severity: 'warning' } ] },
  { id: 'T004', name: 'Emma Wilson', nationality: 'Australia', status: 'Active', safetyScore: 92, itinerary: 'Pokhara Adventure', currentLocation: 'Phewa Lake, Pokhara', verification: 'Verified', emergencyContacts: '+61-555-3456, +61-555-7890', kyc: { passport: 'AU789123456', visaExpiry: '2025-01-20', address: '321 Queen St, Sydney' }, route: [ { location: 'Pokhara Airport', time: '2024-01-15 09:00', status: 'Arrived' }, { location: 'Lakeside Hotel', time: '2024-01-15 10:30', status: 'Checked-in' }, { location: 'Phewa Lake', time: '2024-01-15 14:00', status: 'Current' } ], safetyLog: [ { date: '2024-01-15', event: 'Activity tracking active', severity: 'info' } ] }
];

function TouristsDirectory() {
  const [tourists, setTourists] = useState(mockTourists);
  const [filteredTourists, setFilteredTourists] = useState(mockTourists);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('All');
  const [areaFilter, setAreaFilter] = useState('All');
  const [scoreFilter, setScoreFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [selectedTourist, setSelectedTourist] = useState(null);
  const [newTourist, setNewTourist] = useState({
    name: '', nationality: '', status: 'Active', safetyScore: 100, itinerary: '', currentLocation: '', emergencyContacts: ''
  });

  // All logic functions (useEffect, handleRowClick, etc.) remain exactly the same...
  useEffect(() => { let filtered = tourists; if (searchTerm) { filtered = filtered.filter(tourist => tourist.name.toLowerCase().includes(searchTerm.toLowerCase()) || tourist.id.toLowerCase().includes(searchTerm.toLowerCase()) || tourist.nationality.toLowerCase().includes(searchTerm.toLowerCase()) ); } if (statusFilter !== 'All') { filtered = filtered.filter(tourist => tourist.status === statusFilter); } if (areaFilter !== 'All') { filtered = filtered.filter(tourist => tourist.currentLocation.toLowerCase().includes(areaFilter.toLowerCase()) ); } if (scoreFilter !== 'All') { const scoreRanges = { 'High (80-100)': [80, 100], 'Medium (50-79)': [50, 79], 'Low (0-49)': [0, 49] }; const [min, max] = scoreRanges[scoreFilter]; filtered = filtered.filter(tourist => tourist.safetyScore >= min && tourist.safetyScore <= max ); } setFilteredTourists(filtered); }, [tourists, searchTerm, statusFilter, areaFilter, scoreFilter]);
  const handleRowClick = (tourist) => { setSelectedTourist(tourist); setShowDetailModal(true); };
  const handleAddTourist = (e) => { e.preventDefault(); const tourist = { id: `T${String(tourists.length + 1).padStart(3, '0')}`, ...newTourist, verification: 'Pending', kyc: { passport: 'Pending', visaExpiry: 'Pending', address: 'Pending' }, route: [], safetyLog: [] }; setTourists([...tourists, tourist]); setShowAddModal(false); setNewTourist({ name: '', nationality: '', status: 'Active', safetyScore: 100, itinerary: '', currentLocation: '', emergencyContacts: '' }); };
  const getStatusStyle = (status) => { switch (status) { case 'Active': return { backgroundColor: '#e6ffed', color: '#28a745' }; case 'In-Transit': return { backgroundColor: '#e0f2ff', color: '#007bff' }; case 'SOS': return { backgroundColor: '#ffebe6', color: '#dc3545' }; default: return { backgroundColor: '#f0f4f8', color: '#495057' }; } };
  const getSafetyScoreColor = (score) => { if (score >= 80) return { color: '#28a745' }; if (score >= 50) return { color: '#ffc107' }; return { color: '#dc3545' }; };
  const getVerificationStyle = (verification) => { if (verification === 'Verified') return { backgroundColor: '#e6ffed', color: '#28a745' }; return { backgroundColor: '#fffbe6', color: '#ffc107' }; };
  const getSeverityStyle = (severity) => { switch (severity) { case 'critical': return { backgroundColor: '#ffebe6', color: '#dc3545' }; case 'warning': return { backgroundColor: '#fffbe6', color: '#ffc107' }; case 'info': return { backgroundColor: '#e0f2ff', color: '#007bff' }; default: return { backgroundColor: '#f0f4f8', color: '#495057' }; } };

  return (
    // THE CHANGE IS HERE: The top-level div now controls the main content area's width and position.
    // It is set to 80vw and floated to the right to accommodate a potential sidebar.
    <>
    <div style={styles.mainContentWrapper}>
      {/* <Header />   */}

      {/* This wrapper provides the internal padding for the page content */}
      <div style={styles.contentPadding}>
        <div style={styles.pageHeader}>
            <h1 style={styles.pageTitleText}>Tourists Directory</h1>
            <button
              onClick={() => setShowAddModal(true)}
              style={styles.addTouristButton}
              onMouseOver={(e) => e.currentTarget.style.backgroundColor = styles.addTouristButtonHover.backgroundColor}
              onMouseOut={(e) => e.currentTarget.style.backgroundColor = styles.addTouristButton.backgroundColor}
            >
              <svg style={styles.addTouristIcon} fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd"/>
              </svg>
              Add Tourist
            </button>
        </div>

        {/* Filters, Table, and Modals remain exactly the same... */}
        <div style={styles.filterCard}>
          <div style={styles.filterGrid}>
            <div>
              <label style={styles.filterLabel}>Search</label>
              <input type="text" placeholder="Name, ID, or nationality..." value={searchTerm} onChange={(e) => setSearchTerm(e.target.value)} style={styles.filterInput}/>
            </div>
            <div>
              <label style={styles.filterLabel}>Status</label>
              <select value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)} style={styles.filterSelect}>
                <option value="All">All Status</option><option value="Active">Active</option><option value="In-Transit">In-Transit</option><option value="SOS">SOS</option>
              </select>
            </div>
            <div>
              <label style={styles.filterLabel}>Area</label>
              <select value={areaFilter} onChange={(e) => setAreaFilter(e.target.value)} style={styles.filterSelect}>
                <option value="All">All Areas</option><option value="Kathmandu">Kathmandu</option><option value="Pokhara">Pokhara</option><option value="Lumbini">Lumbini</option><option value="Chitwan">Chitwan</option>
              </select>
            </div>
            <div>
              <label style={styles.filterLabel}>Safety Score</label>
              <select value={scoreFilter} onChange={(e) => setScoreFilter(e.target.value)} style={styles.filterSelect}>
                <option value="All">All Scores</option><option value="High (80-100)">High (80-100)</option><option value="Medium (50-79)">Medium (50-79)</option><option value="Low (0-49)">Low (0-49)</option>
              </select>
            </div>
          </div>
        </div>

        <div style={styles.tableCard}>
          <div style={styles.tableCardHeader}><h3 style={styles.cardTitle}>Registered Tourists ({filteredTourists.length})</h3></div>
          <div style={styles.tableContainer}>
            <table style={styles.table}>
              <thead><tr><th style={styles.th}>Name</th><th style={styles.th}>ID</th><th style={styles.th}>Nationality</th><th style={styles.th}>Status</th><th style={styles.th}>Safety Score</th><th style={styles.th}>Current Location</th><th style={styles.th}>Verification</th></tr></thead>
              <tbody>{filteredTourists.map((tourist) => (<tr key={tourist.id} onClick={() => handleRowClick(tourist)} style={styles.tr} onMouseOver={(e) => e.currentTarget.style.backgroundColor = '#f8f9fa'} onMouseOut={(e) => e.currentTarget.style.backgroundColor = 'transparent'}><td style={styles.td}><div style={styles.tdPrimaryText}>{tourist.name}</div></td><td style={styles.td}><div style={styles.tdSecondaryText}>{tourist.id}</div></td><td style={styles.td}><div style={styles.tdSecondaryText}>{tourist.nationality}</div></td><td style={styles.td}><span style={{...styles.statusBadge, ...getStatusStyle(tourist.status)}}>{tourist.status}</span></td><td style={styles.td}><div style={{...styles.tdPrimaryText, ...getSafetyScoreColor(tourist.safetyScore)}}>{tourist.safetyScore}%</div></td><td style={styles.td}><div style={styles.tdSecondaryText}>{tourist.currentLocation}</div></td><td style={styles.td}><span style={{...styles.statusBadge, ...getVerificationStyle(tourist.verification)}}>{tourist.verification}</span></td></tr>))}</tbody>
            </table>
          </div>
        </div>
      </div>

      {/* Modals remain the same */}
      {showAddModal && ( <div style={styles.modalOverlay}> <div style={styles.modalContentSmall}> <div style={styles.modalHeader}> <h3 style={styles.modalTitle}>Add New Tourist</h3> <button onClick={() => setShowAddModal(false)} style={styles.modalCloseButton}> &times; </button> </div> <form onSubmit={handleAddTourist}> <div style={styles.formGrid}> <div style={styles.formGroup}> <label style={styles.formLabel}>Full Name</label> <input type="text" required value={newTourist.name} onChange={(e) => setNewTourist({...newTourist, name: e.target.value})} style={styles.formInput} /> </div> <div style={styles.formGroup}> <label style={styles.formLabel}>Nationality</label> <input type="text" required value={newTourist.nationality} onChange={(e) => setNewTourist({...newTourist, nationality: e.target.value})} style={styles.formInput} /> </div> <div style={styles.formGroupFull}> <label style={styles.formLabel}>Itinerary</label> <input type="text" value={newTourist.itinerary} onChange={(e) => setNewTourist({...newTourist, itinerary: e.target.value})} style={styles.formInput} placeholder="e.g., Kathmandu -> Pokhara"/> </div> <div style={styles.formGroupFull}> <label style={styles.formLabel}>Current Location</label> <input type="text" value={newTourist.currentLocation} onChange={(e) => setNewTourist({...newTourist, currentLocation: e.target.value})} style={styles.formInput} /> </div> <div style={styles.formGroupFull}> <label style={styles.formLabel}>Emergency Contacts</label> <input type="text" value={newTourist.emergencyContacts} onChange={(e) => setNewTourist({...newTourist, emergencyContacts: e.target.value})} style={styles.formInput} placeholder="Comma separated phone numbers" /> </div> </div> <div style={styles.modalActions}> <button type="button" onClick={() => setShowAddModal(false)} style={styles.modalCancelButton}> Cancel </button> <button type="submit" style={styles.modalSubmitButton}> Add Tourist </button> </div> </form> </div> </div> )}
      {showDetailModal && selectedTourist && ( <div style={styles.modalOverlay}> <div style={styles.modalContentLarge}> <div style={styles.modalHeader}> <div> <h3 style={styles.modalTitle}>{selectedTourist.name}</h3> <span style={{...styles.statusBadge, ...getStatusStyle(selectedTourist.status)}}>{selectedTourist.status}</span> </div> <button onClick={() => setShowDetailModal(false)} style={styles.modalCloseButton}> &times; </button> </div> <div style={styles.detailGrid}> <div style={styles.detailCard}> <h4 style={styles.detailCardTitle}>KYC Information</h4> <div style={styles.detailInfoGroup}> <div style={styles.detailInfoItem}> <span style={styles.detailInfoLabel}>Passport:</span> <span style={styles.detailInfoValue}>{selectedTourist.kyc.passport}</span> </div> <div style={styles.detailInfoItem}> <span style={styles.detailInfoLabel}>Visa Expiry:</span> <span style={styles.detailInfoValue}>{selectedTourist.kyc.visaExpiry}</span> </div> <div style={styles.detailInfoItemFull}> <span style={styles.detailInfoLabel}>Address:</span> <span style={styles.detailInfoValue}>{selectedTourist.kyc.address}</span> </div> </div> </div> <div style={styles.detailCard}> <h4 style={styles.detailCardTitle}>Route Timeline</h4> <div style={styles.timelineList}> {selectedTourist.route.length > 0 ? selectedTourist.route.map((point, index) => ( <div key={index} style={styles.timelineItem}> <div style={styles.timelineGraphic}> <div style={styles.timelinePoint}></div> <div style={styles.timelineLine}></div> </div> <div style={styles.timelineContent}> <p style={styles.timelineLocation}>{point.location}</p> <p style={styles.timelineTimeStatus}>{point.time} - {point.status}</p> </div> </div> )) : <p style={styles.noDataText}>No route data available.</p>} </div> </div> <div style={styles.detailCardSpan2}> <h4 style={styles.detailCardTitle}>Safety Log</h4> <div style={styles.safetyLogList}> {selectedTourist.safetyLog.length > 0 ? selectedTourist.safetyLog.map((log, index) => ( <div key={index} style={styles.safetyLogItem}> <div> <p style={styles.safetyLogEvent}>{log.event}</p> <p style={styles.safetyLogDate}>{log.date}</p> </div> <span style={{...styles.statusBadge, ...getSeverityStyle(log.severity)}}> {log.severity} </span> </div> )) : <p style={styles.noDataText}>No safety logs recorded.</p>} </div> </div> </div> </div> </div> )}
      {/* <Footer_80/> */}
    </div>

    </>
  );
}

// STYLES OBJECT (UPDATED)
const styles = {
    // NEW STYLE: This wrapper controls the main content area layout.
    mainContentWrapper: {
      width: '80vw',
      float: 'right',
      minHeight: '100vh',
      backgroundColor: '#f0f4f8',
      boxSizing: 'border-box',
    },
    
    // This style provides internal padding, since the parent now handles the main layout
    contentPadding: {
      padding: '25px',
      maxWidth: '1100px',
      margin: '0 auto',
    },

    // All other styles from your original file remain the same...
    cardTitle: { fontSize: '1.1em', fontWeight: '600', color: '#003366', margin: '0' },
    statusBadge: { padding: '5px 12px', borderRadius: '15px', fontSize: '0.75em', fontWeight: 'bold', textTransform: 'uppercase', letterSpacing: '0.5px' },
    noDataText: { fontSize: '0.9em', color: '#6c757d', fontStyle: 'italic', padding: '10px 0' },
    pageHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px' },
    pageTitleText: { fontSize: '2em', color: '#003366', fontWeight: '700', margin: '0' },
    addTouristButton: { backgroundColor: '#007bff', color: 'white', padding: '10px 18px', borderRadius: '6px', fontWeight: '600', transition: 'background-color 0.2s ease', display: 'flex', alignItems: 'center', gap: '8px', border: 'none', cursor: 'pointer' },
    addTouristButtonHover: { backgroundColor: '#0056b3' },
    addTouristIcon: { width: '18px', height: '18px' },
    filterCard: { backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)', padding: '20px', marginBottom: '25px' },
    filterGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '20px' },
    filterLabel: { display: 'block', fontSize: '0.9em', fontWeight: '500', color: '#495057', marginBottom: '6px' },
    filterInput: { width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '6px', fontSize: '1em' },
    filterSelect: { width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '6px', fontSize: '1em', backgroundColor: 'white' },
    tableCard: { backgroundColor: '#ffffff', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.06)', overflow: 'hidden' },
    tableCardHeader: { padding: '16px 20px', borderBottom: '1px solid #e9ecef' },
    tableContainer: { overflowX: 'auto' },
    table: { width: '100%', borderCollapse: 'collapse' },
    th: { backgroundColor: '#f8f9fa', padding: '12px 20px', textAlign: 'left', fontSize: '0.8em', fontWeight: '600', color: '#495057', textTransform: 'uppercase', borderBottom: '1px solid #e9ecef' },
    td: { padding: '15px 20px', borderBottom: '1px solid #e9ecef', verticalAlign: 'middle' },
    tr: { cursor: 'pointer', transition: 'background-color 0.15s ease' },
    tdPrimaryText: { fontSize: '0.95em', fontWeight: '500', color: '#212529' },
    tdSecondaryText: { fontSize: '0.9em', color: '#6c757d' },
    modalOverlay: { position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0, 0, 0, 0.5)', display: 'flex', justifyContent: 'center', alignItems: 'center', zIndex: 1010, padding: '20px' },
    modalContentSmall: { backgroundColor: 'white', padding: '25px', borderRadius: '8px', maxWidth: '500px', width: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' },
    modalContentLarge: { backgroundColor: 'white', padding: '30px', borderRadius: '8px', maxWidth: '900px', width: '100%', boxShadow: '0 5px 15px rgba(0,0,0,0.2)', maxHeight: '90vh', overflowY: 'auto' },
    modalHeader: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px', paddingBottom: '15px', borderBottom: '1px solid #e9ecef' },
    modalTitle: { fontSize: '1.5em', fontWeight: '600', color: '#003366', margin: '0', marginBottom: '5px' },
    modalCloseButton: { background: 'none', border: 'none', fontSize: '1.8em', cursor: 'pointer', color: '#6c757d', lineHeight: '1' },
    formGrid: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' },
    formGroup: { marginBottom: '5px' },
    formGroupFull: { gridColumn: '1 / -1', marginBottom: '5px' },
    formLabel: { display: 'block', fontSize: '0.9em', fontWeight: '500', color: '#495057', marginBottom: '6px' },
    formInput: { width: '100%', padding: '10px', border: '1px solid #ced4da', borderRadius: '6px', fontSize: '1em' },
    modalActions: { display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '25px' },
    modalCancelButton: { padding: '10px 18px', backgroundColor: '#f8f9fa', color: '#333', borderRadius: '6px', border: '1px solid #ced4da', cursor: 'pointer', fontWeight: '500' },
    modalSubmitButton: { padding: '10px 18px', backgroundColor: '#007bff', color: 'white', borderRadius: '6px', border: 'none', cursor: 'pointer', fontWeight: '500' },
    detailGrid: { display: 'grid', gridTemplateColumns: '1fr', gap: '20px' },
    '@media (min-width: 768px)': { detailGrid: { gridTemplateColumns: '1fr 1fr' } },
    detailCard: { backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px', border: '1px solid #e9ecef' },
    detailCardSpan2: { gridColumn: '1 / -1', backgroundColor: '#f8f9fa', borderRadius: '8px', padding: '20px', border: '1px solid #e9ecef' },
    detailCardTitle: { fontSize: '1.1em', fontWeight: '600', color: '#003366', marginBottom: '15px', borderBottom: '1px solid #dee2e6', paddingBottom: '8px' },
    detailInfoGroup: { display: 'flex', flexDirection: 'column', gap: '10px' },
    detailInfoItem: { display: 'grid', gridTemplateColumns: '100px 1fr', alignItems: 'center' },
    detailInfoItemFull: { display: 'grid', gridTemplateColumns: '100px 1fr' },
    detailInfoLabel: { fontWeight: '500', color: '#6c757d', fontSize: '0.9em' },
    detailInfoValue: { color: '#212529', fontSize: '0.9em' },
    timelineList: { position: 'relative' },
    timelineItem: { display: 'flex', position: 'relative', paddingBottom: '15px' },
    timelineGraphic: { position: 'absolute', left: '5px', top: '5px', display: 'flex', flexDirection: 'column', alignItems: 'center', height: '100%' },
    timelinePoint: { width: '12px', height: '12px', backgroundColor: '#007bff', borderRadius: '50%', zIndex: 1 },
    timelineLine: { width: '2px', flexGrow: 1, backgroundColor: '#dee2e6' },
    timelineContent: { marginLeft: '30px' },
    timelineLocation: { fontSize: '0.9em', fontWeight: '600', color: '#212529', margin: '0' },
    timelineTimeStatus: { fontSize: '0.8em', color: '#6c757d', margin: '2px 0 0 0' },
    safetyLogList: { display: 'flex', flexDirection: 'column', gap: '10px' },
    safetyLogItem: { display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px', backgroundColor: '#ffffff', borderRadius: '6px', border: '1px solid #e9ecef' },
    safetyLogEvent: { fontSize: '0.9em', fontWeight: '500', color: '#212529', margin: '0' },
    safetyLogDate: { fontSize: '0.8em', color: '#6c757d', margin: '2px 0 0 0' },
};

export default TouristsDirectory;