import Navbar from "../../components/Navbar/Navbar";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import HealthSummary from "../../components/HealthSummary/HealthSummary";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";

import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-layout">

      <div className="dashboard-main">

        <Navbar />

        <main className="dashboard-content">

          {/* Welcome */}
          <WelcomeCard />

          {/* Health Summary */}
          <HealthSummary />

          {/* Appointments */}
          <AppointmentCard />

        </main>

      </div>

    </div>
  );
}

export default Dashboard;