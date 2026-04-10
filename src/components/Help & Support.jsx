import React, { useState } from 'react';
import { Link } from "react-router-dom"; // Import Link for navigation
// import Header from './Header';
// import Footer_80 from './Footer_80';

function HelpSupport() {
  const [activeTab, setActiveTab] = useState('faq');
  const [feedback, setFeedback] = useState({ name: '', email: '', issue: '', description: '' });
  const [submitted, setSubmitted] = useState(false);

  const faqs = [
    {
      question: 'How do I register as a tourist?',
      answer: 'To register, visit the Home page and click on "Register". Fill in your details and submit the form. You will receive a confirmation email.',
    },
    {
      question: 'What is the SAHYatri ID?',
      answer: 'SAHYatri ID is a unique identification number issued to tourists for tracking and safety purposes during their visit.',
    },
    {
      question: 'How do I report an incident?',
      answer: 'Go to the Incidents & Alerts page and click on "Report Incident". Provide details about the incident, and our team will respond promptly.',
    },
    {
      question: 'How can I access the map and geo-fencing features?',
      answer: 'Navigate to the Map & Geo-fencing page from the dashboard. It shows live tourist locations and restricted areas.',
    },
    {
      question: 'What should I do in case of an emergency?',
      answer: 'Use the SOS button on the dashboard or call the emergency helpline numbers provided below.',
    },
  ];

  const helplines = [
    { department: 'Tourist Safety', number: '1800-123-4567', description: 'For general safety concerns and assistance.' },
    { department: 'Emergency Services', number: '100', description: 'For immediate emergencies and police assistance.' },
    { department: 'Medical Help', number: '108', description: 'For medical emergencies and ambulance services.' },
    { department: 'Fire Department', number: '101', description: 'For fire-related emergencies.' },
    { department: 'Tourist Information', number: '1800-987-6543', description: 'For general tourist inquiries and guidance.' },
  ];

  const handleFeedbackSubmit = (e) => {
    e.preventDefault();
    // Mock submission
    console.log('Feedback submitted:', feedback);
    setSubmitted(true);
    setFeedback({ name: '', email: '', issue: '', description: '' });
  };

  return (
    <div style={styles.pageBackground}>
      {/* Dashboard Header - Full Width (Standardized) */}
      {/* <Header /> */}

      <div style={styles.mainContentWrapper}>
        {/* Page-specific Header/Title (Standardized) */}
        <div style={styles.pageHeader}>
          <h1 style={styles.pageTitleText}>Help & Support</h1>
        </div>

        <div style={styles.tabsContainer}> {/* Renamed from tabContainer for consistency */}
          <button
            onClick={() => setActiveTab('faq')}
            style={{ ...styles.tabButton, ...(activeTab === 'faq' && styles.tabButtonActive) }}
          >
            FAQ
          </button>
          <button
            onClick={() => setActiveTab('guide')}
            style={{ ...styles.tabButton, ...(activeTab === 'guide' && styles.tabButtonActive) }}
          >
            Platform Guide
          </button>
          <button
            onClick={() => setActiveTab('helplines')}
            style={{ ...styles.tabButton, ...(activeTab === 'helplines' && styles.tabButtonActive) }}
          >
            Helpline Numbers
          </button>
          <button
            onClick={() => setActiveTab('feedback')}
            style={{ ...styles.tabButton, ...(activeTab === 'feedback' && styles.tabButtonActive) }}
          >
            Feedback/Issues
          </button>
        </div>

        <div style={styles.contentCard}> {/* Renamed from content for consistency */}
          {activeTab === 'faq' && (
            <div style={styles.section}>
              <h2 style={styles.cardSectionTitle}>Frequently Asked Questions</h2> {/* Standardized title */}
              <div style={styles.faqList}>
                {faqs.map((faq, index) => (
                  <div key={index} style={styles.faqItem}>
                    <h3 style={styles.faqQuestion}>{faq.question}</h3>
                    <p style={styles.faqAnswer}>{faq.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'guide' && (
            <div style={styles.section}>
              <h2 style={styles.cardSectionTitle}>Platform Guide</h2> {/* Standardized title */}
              <div style={styles.guideContent}>
                <h3 style={styles.subTitle}>Getting Started</h3> {/* Standardized sub-title */}
                <p style={styles.guideText}>
                  Welcome to SAHYatri! This platform is designed to ensure the safety and convenience of tourists visiting our region.
                  Follow these steps to make the most of our services:
                </p>
                <ul style={styles.guideList}>
                  <li>1. Register for a SAHYatri ID on the Home page.</li>
                  <li>2. Explore the Dashboard for real-time updates and statistics.</li>
                  <li>3. Use the Map & Geo-fencing feature to view safe zones and restricted areas.</li>
                  <li>4. Report any incidents or use the SOS feature in emergencies.</li>
                  <li>5. Access Reports & Analytics for detailed insights.</li>
                  <li>6. Manage your settings in the Settings & Admin section.</li>
                </ul>
                <h3 style={styles.subTitle}>Tips for Safe Travel</h3> {/* Standardized sub-title */}
                <p style={styles.guideText}>
                  - Always keep your SAHYatri ID with you.
                  - Stay within designated safe zones.
                  - Report any suspicious activities immediately.
                  - Use the app's features to stay informed about weather and alerts.
                </p>
              </div>
            </div>
          )}

          {activeTab === 'helplines' && (
            <div style={styles.section}>
              <h2 style={styles.cardSectionTitle}>Helpline Numbers by Department</h2> {/* Standardized title */}
              <div style={styles.helplineList}>
                {helplines.map((helpline, index) => (
                  <div key={index} style={styles.helplineItem}>
                    <div style={styles.helplineHeader}>
                      <h3 style={styles.helplineDepartment}>{helpline.department}</h3>
                      <span style={styles.helplineNumber}>{helpline.number}</span>
                    </div>
                    <p style={styles.helplineDescription}>{helpline.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'feedback' && (
            <div style={styles.section}>
              <h2 style={styles.cardSectionTitle}>Feedback/Issues Form</h2> {/* Standardized title */}
              {submitted ? (
                <div style={styles.successMessage}>
                  <p>Thank you for your feedback! We will review it and get back to you soon.</p>
                  <button onClick={() => setSubmitted(false)} style={styles.primaryActionButton}> {/* Standardized button */}
                    Submit Another
                  </button>
                </div>
              ) : (
                <form onSubmit={handleFeedbackSubmit} style={styles.feedbackForm}>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Name</label> {/* Standardized label */}
                    <input
                      type="text"
                      value={feedback.name}
                      onChange={(e) => setFeedback({ ...feedback, name: e.target.value })}
                      style={styles.formInput} // Standardized input
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Email</label> {/* Standardized label */}
                    <input
                      type="email"
                      value={feedback.email}
                      onChange={(e) => setFeedback({ ...feedback, email: e.target.value })}
                      style={styles.formInput} // Standardized input
                      required
                    />
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Issue Type</label> {/* Standardized label */}
                    <select
                      value={feedback.issue}
                      onChange={(e) => setFeedback({ ...feedback, issue: e.target.value })}
                      style={styles.formSelect} // Standardized select
                      required
                    >
                      <option value="">Select an issue type</option>
                      <option value="bug">Bug Report</option>
                      <option value="feature">Feature Request</option>
                      <option value="general">General Feedback</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div style={styles.formGroup}>
                    <label style={styles.formLabel}>Description</label> {/* Standardized label */}
                    <textarea
                      value={feedback.description}
                      onChange={(e) => setFeedback({ ...feedback, description: e.target.value })}
                      style={styles.formTextarea} // Standardized textarea
                      rows="5"
                      required
                    ></textarea>
                  </div>
                  <button type="submit" style={styles.primaryActionButton}> {/* Standardized button */}
                    Submit Feedback
                  </button>
                </form>
              )}
            </div>
          )}
        </div>
        {/* <Footer_80/> */}
      </div>
      
    </div>
  );
}

// --- Professional Government Website Styles (Standardized across components) ---
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
        width: '80vw', // Set width to 80% of the viewport width
        float: 'right', // Float the container to the right
        padding: '30px 40px', // Adjusted horizontal padding
        boxSizing: 'border-box', // Ensures padding doesn't add to the width
    },
    cardSectionTitle: { // Consistent across components for main section titles (h2s)
        fontSize: '1.5em',
        fontWeight: '700',
        color: '#003366',
        marginBottom: '20px',
        borderBottom: '1px solid #e9ecef',
        paddingBottom: '10px',
    },
    subTitle: { // For sub-sections like Getting Started (h3s)
        fontSize: '1.2em',
        fontWeight: '600',
        color: '#003366',
        marginBottom: '15px',
    },
    // No specific statusBadgeSmall needed on this page, but kept for consistency if it were.

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

    // --- Page-specific Header/Title (Standardized) ---
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

    // --- Tabs for Help & Support ---
    tabsContainer: { // Renamed from tabContainer for consistency
        display: 'flex',
        gap: '10px',
        marginBottom: '30px',
        flexWrap: 'wrap',
        borderBottom: '1px solid #dcdcdc',
    },
    tabButton: {
        padding: '12px 20px',
        border: 'none', // Remove individual borders, rely on container bottom border
        backgroundColor: 'transparent',
        cursor: 'pointer',
        fontSize: '1em',
        color: '#007bff',
        borderBottom: '2px solid transparent',
        transition: 'all 0.3s ease',
        fontWeight: '600',
        borderRadius: '5px 5px 0 0', // Rounded top corners
    },
    tabButtonActive: {
        color: '#003366', // Active tab text color to match main titles
        borderBottom: '3px solid #003366', // Stronger active border
        fontWeight: 'bold',
        backgroundColor: '#f0f4f8', // Slightly darker background for active tab
    },

    // --- Content Area ---
    contentCard: { // Renamed from 'content' for consistency
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      padding: '25px',
      boxShadow: '0 4px 10px rgba(0, 0, 0, 0.08)',
      border: '1px solid #dcdcdc',
    },
    section: { // Generic section styling within a tab
      marginBottom: '0', // Sections within the content card don't need bottom margin, card handles it
    },

    // --- FAQ Styles ---
    faqList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    faqItem: {
      padding: '15px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#fdfdfd',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    },
    faqQuestion: {
      fontSize: '1.1em',
      fontWeight: '600',
      color: '#003366',
      marginBottom: '8px',
      margin: '0',
    },
    faqAnswer: {
      fontSize: '0.95em',
      color: '#495057',
      margin: '0',
    },

    // --- Guide Styles ---
    guideContent: {
      display: 'flex',
      flexDirection: 'column',
      gap: '15px', // Adjusted for consistency
    },
    guideText: {
      fontSize: '0.95em',
      color: '#495057',
      margin: '0',
    },
    guideList: {
      listStyleType: 'decimal', // Numbered list
      paddingLeft: '25px', // Adjusted padding
      color: '#495057',
      fontSize: '0.95em',
      display: 'flex',
      flexDirection: 'column',
      gap: '5px', // Spacing between list items
    },

    // --- Helpline Styles ---
    helplineList: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    helplineItem: {
      padding: '15px',
      border: '1px solid #e0e0e0',
      borderRadius: '8px',
      backgroundColor: '#fdfdfd',
      boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
    },
    helplineHeader: {
      display: 'flex',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: '10px',
    },
    helplineDepartment: {
      fontSize: '1.1em',
      fontWeight: '600',
      color: '#003366',
      margin: '0',
    },
    helplineNumber: {
      fontSize: '1.1em',
      fontWeight: 'bold',
      color: '#007bff',
    },
    helplineDescription: {
      fontSize: '0.95em',
      color: '#495057',
      margin: '0',
    },

    // --- Feedback Form Styles ---
    successMessage: {
      textAlign: 'center',
      padding: '20px',
      backgroundColor: '#e6ffed', // Light green
      borderRadius: '8px', // Slightly more rounded
      border: '1px solid #28a745', // Green border
      color: '#28a745', // Green text
      fontWeight: '500',
    },
    feedbackForm: {
      display: 'flex',
      flexDirection: 'column',
      gap: '20px',
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
    },
    formLabel: { // Standardized label
      fontSize: '0.95em',
      color: '#003366',
      fontWeight: '500',
      marginBottom: '8px',
    },
    formInput: { // Standardized input
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #ced4da',
      fontSize: '1em',
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      // '&:focus': { borderColor: '#007bff', boxShadow: '0 0 0 2px rgba(0,123,255,0.25)' },
    },
    formSelect: { // Standardized select
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
    formTextarea: { // Standardized textarea
      padding: '10px 12px',
      borderRadius: '8px',
      border: '1px solid #ced4da',
      fontSize: '1em',
      resize: 'vertical',
      outline: 'none',
      transition: 'border-color 0.2s ease, box-shadow 0.2s ease',
      // '&:focus': { borderColor: '#007bff', boxShadow: '0 0 0 2px rgba(0,123,255,0.25)' },
    },
    primaryActionButton: { // Standardized submit button
      backgroundColor: '#007bff',
      color: 'white',
      border: 'none',
      padding: '10px 20px',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: '1em',
      fontWeight: '600',
      alignSelf: 'flex-start', // Align to left for forms
      transition: 'background-color 0.2s ease',
      // '&:hover': { backgroundColor: '#0056b3' },
    },
};

export default HelpSupport;