import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";
import WelcomeCard from "../../components/WelcomeCard/WelcomeCard";
import HealthSummary from "../../components/HealthSummary/HealthSummary";
import "./dashboard.css";

function Dashboard() {
  return (
    <>
      <Sidebar />
      <Navbar />

      <div style={{ marginLeft: "250px", padding: "20px" }}>
        <WelcomeCard />
        <HealthSummary />
      </div>
    </>
  );
}

export default Dashboard;