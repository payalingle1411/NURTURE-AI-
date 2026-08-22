import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import HealthSummary from "../../components/HealthSummary/HealthSummary";
import AppointmentCard from "../../components/AppointmentCard/AppointmentCard";

import "./dashboard.css";

function Dashboard() {
  return (
    <div className="dashboard-layout">
      <Sidebar />

      <div className="dashboard-main">
        <Navbar />

        <main className="dashboard-content">
          <WelcomeCard />
          <HealthSummary />
          <AppointmentCard />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;