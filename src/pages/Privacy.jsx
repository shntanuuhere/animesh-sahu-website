import './Legal.css'

function Privacy() {
  return (
    <main className="main">
      <div className="container">
        <section className="page-header">
          <h1 className="page-title">Privacy Policy</h1>
          <p className="page-subtitle">Last updated: January 2025</p>
        </section>

        <section className="legal-content">
          <div className="legal-section">
            <h2 className="section-title">1. Information We Collect</h2>
            <p className="section-text">
              When you book event services with Jashn Events, we collect information necessary to 
              plan and execute your event. This includes:
            </p>
            <ul className="legal-list">
              <li>Personal information: Name, email address, phone number</li>
              <li>Event details: Event type, date, venue preferences, guest count</li>
              <li>Budget and service preferences</li>
              <li>Payment information (processed securely through third-party providers)</li>
              <li>Communication history and special requests</li>
              <li>Photos and videos from your event (with permission)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">2. How We Use Your Information</h2>
            <p className="section-text">
              We use the information we collect to:
            </p>
            <ul className="legal-list">
              <li>Plan, coordinate, and execute your event</li>
              <li>Communicate with you about event details and updates</li>
              <li>Process payments and send invoices</li>
              <li>Coordinate with vendors and service providers</li>
              <li>Send booking confirmations and reminders</li>
              <li>Improve our services and customer experience</li>
              <li>Send promotional materials (with your consent)</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">3. Information Sharing</h2>
            <p className="section-text">
              We do not sell your personal information. We may share your information with:
            </p>
            <ul className="legal-list">
              <li>Vendors and service providers necessary for your event (caterers, venues, photographers)</li>
              <li>Payment processors for secure transaction handling</li>
              <li>Legal authorities when required by law</li>
              <li>With your explicit consent for marketing purposes</li>
            </ul>
            <p className="section-text">
              All third parties are required to maintain confidentiality and use your information 
              only for the purposes we specify.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">4. Data Security</h2>
            <p className="section-text">
              We implement industry-standard security measures to protect your personal information:
            </p>
            <ul className="legal-list">
              <li>Secure data storage with encryption</li>
              <li>Limited access to personal information (need-to-know basis)</li>
              <li>Regular security audits and updates</li>
              <li>Secure payment processing through certified providers</li>
              <li>Confidentiality agreements with all staff and vendors</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">5. Data Retention</h2>
            <p className="section-text">
              We retain your information for:
            </p>
            <ul className="legal-list">
              <li>Active bookings: Duration of event planning and execution</li>
              <li>Completed events: Up to 3 years for records and potential future bookings</li>
              <li>Financial records: As required by law (typically 7 years)</li>
              <li>Marketing communications: Until you unsubscribe</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">6. Your Rights</h2>
            <p className="section-text">
              You have the right to:
            </p>
            <ul className="legal-list">
              <li>Access your personal information and booking details</li>
              <li>Correct inaccurate or incomplete information</li>
              <li>Request deletion of your data (subject to legal requirements)</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to use of your photos/videos for marketing</li>
              <li>Request a copy of your data</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">7. Cookies and Website Analytics</h2>
            <p className="section-text">
              Our website uses cookies to improve your browsing experience and analyze website traffic. 
              You can control cookie settings through your browser preferences. We use analytics to 
              understand how visitors use our website and improve our services.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">8. Children's Privacy</h2>
            <p className="section-text">
              Our services are not directed to children under 13. We do not knowingly collect personal 
              information from children. If you believe we have collected information from a child, 
              please contact us immediately.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">9. Changes to Privacy Policy</h2>
            <p className="section-text">
              We may update this privacy policy periodically. Changes will be posted on this page with 
              an updated "Last updated" date. Continued use of our services after changes constitutes 
              acceptance of the updated policy.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">10. Contact Us</h2>
            <p className="section-text">
              For questions about this privacy policy or to exercise your rights, contact us at{' '}
              <a href="mailto:hello@hereco.xyz">hello@hereco.xyz</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Privacy
