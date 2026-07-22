import Navbar from "../../components/Navbar/Navbar";
import Sidebar from "../../components/Sidebar/Sidebar";
import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard">

      <Sidebar />

      <div className="main-content">

        <Navbar />

        <div className="welcome-section">

          <h1>👋 Welcome Back!</h1>

          <p>
            Welcome to <strong>Nurture AI</strong>
          </p>

          <p>
            Your Pregnancy Wellness & Family Support Platform ❤️
          </p>

        </div>

      </div>

    </div>
  );
}

export default Dashboard;