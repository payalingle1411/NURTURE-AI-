
import "./AppointmentCard.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

function AppointmentCard() {
  const chartData = {
    labels: ["Completed", "Upcoming", "Cancelled"],
    datasets: [
      {
        data: [7, 5, 0],
        backgroundColor: ["#4CAF50", "#FFB300", "#EF5350"],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="appointment-dashboard">

      {/* Statistics */}
      <div className="stats-container">

        <div className="stat-card total">
          <div className="icon">📅</div>
          <h2>12</h2>
          <p>Total Appointments</p>
        </div>

        <div className="stat-card completed">
          <div className="icon">✅</div>
          <h2>7</h2>
          <p>Completed</p>
        </div>

        <div className="stat-card upcoming">
          <div className="icon">⏳</div>
          <h2>5</h2>
          <p>Upcoming</p>
        </div>

        <div className="stat-card cancelled">
          <div className="icon">❌</div>
          <h2>0</h2>
          <p>Cancelled</p>
        </div>

      </div>

      {/* Chart + Upcoming */}
      <div className="top-section">

        <div className="chart-card">

          <h3>📊 Appointment Statistics</h3>

          <div className="chart">
            <Doughnut data={chartData} />
          </div>

        </div>

        <div className="upcoming-card">

          <h3>📅 Upcoming Appointment</h3>

          <div className="doctor">

            <div className="avatar">
              👩‍⚕️
            </div>

            <div>

              <h4>Dr. Priya Sharma</h4>

              <p>Senior Gynecologist</p>

            </div>

          </div>

          <div className="details">

            <p><strong>Date:</strong> 28 July 2026</p>

            <p><strong>Time:</strong> 10:30 AM</p>

            <p><strong>Hospital:</strong> City Care Hospital</p>

            <p><strong>Location:</strong> Nagpur</p>

            <p><strong>Purpose:</strong> Routine Pregnancy Check-up</p>

          </div>

          <div className="button-group">

            <button className="view-btn">
              View Details
            </button>

            <button className="reschedule-btn">
              Reschedule
            </button>

            <button className="reminder-btn">
              🔔 Reminder
            </button>

          </div>

        </div>

      </div>

      {/* History */}

      <div className="history">

        <h2>📂 Appointment History</h2>

        <div className="history-card">

          <div className="history-header">

            <h3>Appointment #1</h3>

            <span className="completed-badge">
              Completed
            </span>

          </div>

          <p>
            <strong>Date:</strong> 10 Jan 2026
          </p>

          <p>
            <strong>Doctor:</strong> Dr. Priya Sharma
          </p>

          <hr />

          <div className="upload-section">

            <h4>🧾 Medical Report</h4>

            <input type="file" accept="image/*" />

            <div className="file-buttons">

              <button>👁 View</button>

              <button>📄 Download PDF</button>

            </div>

          </div>

          <div className="upload-section">

            <h4>💊 Prescription</h4>

            <input type="file" accept="image/*" />

            <div className="file-buttons">

              <button>👁 View</button>

              <button>📄 Download PDF</button>

            </div>

          </div>

        </div>

      </div>

    </div>
  );
}

export default AppointmentCard;