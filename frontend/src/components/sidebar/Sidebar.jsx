import "./Sidebar.css";
import { useLocation, useNavigate } from "react-router-dom";

import {
  FaHome,
  FaRobot,
  FaUser,
  FaAppleAlt,
  FaPills,
  FaCalendarAlt,
  FaChartBar,
  FaUsers,
  FaCog,
  FaSignOutAlt,
} from "react-icons/fa";

function Sidebar() {
  const navigate = useNavigate();
  const location = useLocation();

  const isAppointmentPage =
    location.pathname === "/appointment" ||
    location.pathname === "/appointment-history";

  return (
    <aside className="sidebar">

      {/* LOGO */}
      <div className="logo">
        <h2>Nurture AI</h2>
        <p>Pregnancy Wellness</p>
      </div>

      {/* MENU */}
      <ul className="menu">

        {/* Dashboard */}
        <li
          className={
            location.pathname === "/dashboard"
              ? "active"
              : ""
          }
          onClick={() => navigate("/dashboard")}
        >
          <FaHome className="icon" />
          <span>Dashboard</span>
        </li>

        {/* AI Assistant */}
        <li
          className={
            location.pathname === "/ai-assistant"
              ? "active"
              : ""
          }
          onClick={() => navigate("/ai-assistant")}
        >
          <FaRobot className="icon" />
          <span>AI Assistant</span>
        </li>

        {/* Pregnancy Profile */}
        <li
          className={
            location.pathname === "/profile"
              ? "active"
              : ""
          }
          onClick={() => navigate("/profile")}
        >
          <FaUser className="icon" />
          <span>Pregnancy Profile</span>
        </li>

        {/* Nutrition */}
        <li
          className={
            location.pathname === "/nutrition"
              ? "active"
              : ""
          }
          onClick={() => navigate("/nutrition")}
        >
          <FaAppleAlt className="icon" />
          <span>Nutrition</span>
        </li>

        {/* Medicine */}
        <li
          className={
            location.pathname === "/medicine"
              ? "active"
              : ""
          }
          onClick={() => navigate("/medicine")}
        >
          <FaPills className="icon" />
          <span>Medicine</span>
        </li>

        {/* Appointments */}
        <li
          className={isAppointmentPage ? "active" : ""}
          onClick={() => navigate("/appointment")}
        >
          <FaCalendarAlt className="icon" />
          <span>Appointments</span>
        </li>

        {/* Reports */}
        <li
          className={
            location.pathname === "/reports"
              ? "active"
              : ""
          }
          onClick={() => navigate("/reports")}
        >
          <FaChartBar className="icon" />
          <span>Reports</span>
        </li>

        {/* Family Dashboard */}
        <li
          className={
            location.pathname === "/family-dashboard"
              ? "active"
              : ""
          }
          onClick={() => navigate("/family-dashboard")}
        >
          <FaUsers className="icon" />
          <span>Family Dashboard</span>
        </li>

        {/* Settings */}
        <li
          className={
            location.pathname === "/settings"
              ? "active"
              : ""
          }
          onClick={() => navigate("/settings")}
        >
          <FaCog className="icon" />
          <span>Settings</span>
        </li>

      </ul>

      {/* LOGOUT */}
      <div
        className="logout"
        onClick={() => {
          localStorage.clear();
          navigate("/login");
        }}
      >
        <FaSignOutAlt className="icon" />
        <span>Logout</span>
      </div>

    </aside>
  );
}

export default Sidebar;