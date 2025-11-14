import './Legal.css'

function Terms() {
  return (
    <main className="main">
      <div className="container">
        <section className="page-header">
          <h1 className="page-title">Terms of Service</h1>
          <p className="page-subtitle">Last updated: January 2025</p>
        </section>

        <section className="legal-content">
          <div className="legal-section">
            <h2 className="section-title">1. Acceptance of Terms</h2>
            <p className="section-text">
              By booking event services with Jashn Events, you accept and agree to be bound by these 
              terms and conditions. If you do not agree to these terms, please do not proceed with 
              booking our services.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">2. Booking and Reservations</h2>
            <p className="section-text">
              All bookings are subject to availability and confirmation by Jashn Events. A booking is 
              considered confirmed only after:
            </p>
            <ul className="legal-list">
              <li>Receipt of signed service agreement</li>
              <li>Payment of required deposit (typically 30-50% of total cost)</li>
              <li>Written confirmation from Jashn Events</li>
              <li>Verification of event date and venue availability</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">3. Payment Terms</h2>
            <p className="section-text">
              Payment schedule and terms:
            </p>
            <ul className="legal-list">
              <li>Deposit: 30-50% due upon booking confirmation</li>
              <li>Second payment: 25-35% due 30 days before event</li>
              <li>Final payment: Remaining balance due 7 days before event</li>
              <li>Late payments may result in service cancellation</li>
              <li>All payments are non-refundable unless otherwise specified</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">4. Cancellation and Refund Policy</h2>
            <p className="section-text">
              Cancellation terms vary based on timing:
            </p>
            <ul className="legal-list">
              <li>More than 90 days before event: 50% refund of deposit</li>
              <li>60-90 days before event: 25% refund of deposit</li>
              <li>30-60 days before event: No refund, deposit forfeited</li>
              <li>Less than 30 days: All payments forfeited</li>
              <li>Cancellations must be submitted in writing</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">5. Event Changes and Modifications</h2>
            <p className="section-text">
              Changes to confirmed bookings:
            </p>
            <ul className="legal-list">
              <li>Date changes subject to availability and may incur additional fees</li>
              <li>Venue changes must be approved by Jashn Events</li>
              <li>Guest count changes must be finalized 14 days before event</li>
              <li>Service additions may be subject to availability and additional costs</li>
              <li>Major changes may require new agreement and deposit</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">6. Client Responsibilities</h2>
            <p className="section-text">
              Clients agree to:
            </p>
            <ul className="legal-list">
              <li>Provide accurate information about event requirements</li>
              <li>Obtain necessary permits and permissions for venues</li>
              <li>Ensure venue access for setup and breakdown</li>
              <li>Communicate changes or concerns promptly</li>
              <li>Treat Jashn Events staff and vendors with respect</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">7. Force Majeure</h2>
            <p className="section-text">
              Jashn Events is not liable for failure to perform services due to circumstances beyond 
              our control, including but not limited to natural disasters, government restrictions, 
              pandemics, venue closures, or other acts of God. In such cases, we will work with clients 
              to reschedule or provide alternative solutions.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">8. Liability and Insurance</h2>
            <p className="section-text">
              Jashn Events maintains appropriate liability insurance. However, we are not responsible for:
            </p>
            <ul className="legal-list">
              <li>Personal injuries to guests or attendees</li>
              <li>Loss or damage to personal property</li>
              <li>Actions of third-party vendors not directly employed by us</li>
              <li>Venue-related issues beyond our control</li>
            </ul>
          </div>

          <div className="legal-section">
            <h2 className="section-title">9. Intellectual Property</h2>
            <p className="section-text">
              All event designs, concepts, and materials created by Jashn Events remain our intellectual 
              property. We reserve the right to photograph events for portfolio and marketing purposes 
              unless explicitly declined in writing by the client.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">10. Dispute Resolution</h2>
            <p className="section-text">
              Any disputes arising from these terms shall be resolved through good faith negotiation. 
              If resolution cannot be reached, disputes will be subject to the jurisdiction of courts 
              in the location where Jashn Events is registered.
            </p>
          </div>

          <div className="legal-section">
            <h2 className="section-title">11. Contact Information</h2>
            <p className="section-text">
              For questions about these terms, please contact us at{' '}
              <a href="mailto:hello@hereco.xyz">hello@hereco.xyz</a>
            </p>
          </div>
        </section>
      </div>
    </main>
  )
}

export default Terms
