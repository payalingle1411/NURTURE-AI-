import "./HealthSummary.css";
import {
  FaHeartbeat,
  FaWeight,
  FaTint,
  FaWalking,
} from "react-icons/fa";

function HealthSummary() {
  return (
    <div className="health-summary">

      <div className="health-header">
        <h2>❤️ Health Summary</h2>
        <p>Your wellness overview for today</p>
      </div>

      <div className="health-cards">

        {/* Health Score */}
        <div className="health-card">
          <div className="health-top">
            <FaHeartbeat className="health-icon heart" />
            <span className="health-value">92%</span>
          </div>

          <div className="health-title">
            Health Score
          </div>

          <div className="health-status">
            Excellent
          </div>
        </div>

        {/* Weight */}
        <div className="health-card">
          <div className="health-top">
            <FaWeight className="health-icon weight" />
            <span className="health-value">64 kg</span>
          </div>

          <div className="health-title">
            Weight
          </div>

          <div className="health-status">
            Normal Range
          </div>
        </div>

        {/* Water Intake */}
        <div className="health-card">
          <div className="health-top">
            <FaTint className="health-icon water" />
            <span className="health-value">6 / 8</span>
          </div>

          <div className="health-title">
            Water Intake
          </div>

          <div className="health-status">
            Glasses
          </div>
        </div>

        {/* Activity */}
        <div className="health-card">
          <div className="health-top">
            <FaWalking className="health-icon steps" />
            <span className="health-value">4,250</span>
          </div>

          <div className="health-title">
            Activity
          </div>

          <div className="health-status">
            Steps Today
          </div>
        </div>

      </div>

    </div>
  );
}

export default HealthSummary;