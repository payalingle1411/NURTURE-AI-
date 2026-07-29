import "./WelcomeCard.css";

function WelcomeCard() {
  return (
    <div className="appointment-card">
      <div className="welcome-message">
  <h2>👋 Welcome to Appointments</h2>
  <p>Manage your pregnancy care appointments easily.</p>
</div>
      <div className="appointment-header">
        <h3>📅 Upcoming Appointment</h3>
        <span className="status">🟢 Confirmed</span>
      </div>

      <div className="doctor-section">
        <div className="doctor-avatar">👩‍⚕️</div>

        <div>
          <h4>Dr. Priya Sharma</h4>
          <p>Senior Gynecologist</p>
        </div>
      </div>

      <div className="appointment-details">
        <p><strong>📅 Date:</strong> 28 July 2026</p>
        <p><strong>🕒 Time:</strong> 10:30 AM</p>
        <p><strong>🏥 Hospital:</strong> City Care Hospital</p>
        <p><strong>📍 Location:</strong> Nagpur</p>
      </div>

      <div className="purpose">
        <h5>Purpose</h5>
        <p>Routine Pregnancy Check-up</p>
      </div>

      <div className="button-group">
        <button className="view-btn">View Details</button>
        <button className="reschedule-btn">Reschedule</button>
      </div>
    </div>
  );
}

export default WelcomeCard;