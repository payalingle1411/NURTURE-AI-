import Sidebar from "../../components/sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import Tip from "../../components/pregnancyTips/tip";
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
          <Tip/>
          <AppointmentCard />
        </main>
      </div>
    </div>
  );
}

export default Dashboard;