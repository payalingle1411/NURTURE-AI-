import "./WelcomeCard.css";
import { FaHeart, FaCalendarAlt } from "react-icons/fa";

function WelcomeCard() {
  return (
    <div className="welcome-card">
      <div className="welcome-content">

        <div className="welcome-text">
          <h2>👋 Good Morning, Chetan!</h2>

          <p>Welcome back to <span>Nurture AI</span></p>

          <div className="welcome-info">

            <div className="info-box">
              <FaCalendarAlt className="info-icon" />

              <div>
                <h4>Week 22</h4>
                <p>Second Trimester</p>
              </div>
            </div>

            <div className="info-box">
              <FaHeart className="info-icon" />

              <div>
                <h4>Healthy</h4>
                <p>Everything looks good</p>
              </div>
            </div>

          </div>
        </div>

        <div className="welcome-right">
          <h3>🌸 Today's Goal</h3>
          <p>Drink 8 glasses of water</p>
        </div>

      </div>
    </div>
  );
}

export default WelcomeCard;