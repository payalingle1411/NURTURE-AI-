import "./Dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-container">
      <div className="dashboard-card">
        <h1>Welcome to Dashboard 🎉</h1>
        <p>You have successfully logged in.</p>

        <button className="dashboard-btn">
          Get Started
        </button>
      </div>
    </div>
  );
}

export default Dashboard;