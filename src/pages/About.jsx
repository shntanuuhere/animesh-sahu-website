import './About.css'

function About() {
  return (
    <main className="main">
      <div className="container">
        <section className="page-header">
          <h1 className="page-title">About Jashn Events</h1>
          <p className="page-subtitle">Creating Unforgettable Moments for Your Special Occasions</p>
        </section>

        <section className="about-content">
          <div className="about-grid">
            <div className="about-section">
              <h2 className="section-title">Our Mission</h2>
              <p className="section-text">
                Jashn Events is dedicated to creating unforgettable celebrations that bring joy and lasting memories. 
                We believe every event is unique and deserves personalized attention to detail. From intimate gatherings 
                to grand celebrations, we transform your vision into reality with creativity, professionalism, and passion.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-title">What We Do</h2>
              <p className="section-text">
                We specialize in comprehensive event planning and management services. Our expertise includes wedding planning, 
                birthday celebrations, corporate events, anniversary parties, engagement ceremonies, and custom event design. 
                We handle everything from concept to execution, ensuring a seamless and stress-free experience for our clients.
              </p>
            </div>

            <div className="about-section">
              <h2 className="section-title">Our Values</h2>
              <ul className="values-list">
                <li><strong>Creativity:</strong> Unique, personalized event experiences tailored to you</li>
                <li><strong>Reliability:</strong> On-time, on-budget execution you can count on</li>
                <li><strong>Attention to Detail:</strong> Every moment matters, no detail overlooked</li>
                <li><strong>Customer Focus:</strong> Your vision, our expertise, perfect harmony</li>
              </ul>
            </div>

            <div className="about-section">
              <h2 className="section-title">Our Services</h2>
              <p className="section-text">
                We offer full-service event planning including venue selection, décor design, catering coordination, 
                entertainment booking, photography and videography, guest management, and day-of coordination. 
                Our experienced team ensures every aspect of your event exceeds expectations.
              </p>
            </div>
          </div>

          <div className="team-section">
            <h2 className="section-title">Meet the Founder</h2>
            <div className="team-grid">
              <div className="team-member">
                <div className="member-avatar">
                  <span className="avatar-text">AS</span>
                </div>
                <h3 className="member-name">Animesh Sahu</h3>
                <p className="member-role">Founder & Event Planner</p>
                <p className="member-bio">
                  Passionate about creating magical moments and bringing dreams to life. 
                  With years of experience in event management, Animesh ensures every celebration 
                  is executed flawlessly with creativity and precision.
                </p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  )
}

export default About
