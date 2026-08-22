import "./Sidebar.css";
import { useNavigate } from "react-router-dom";
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

  return (
    <div className="sidebar">

      <div className="logo">
        <h2>Nurture AI</h2>
        <p>Pregnancy Wellness</p>
      </div>

      <ul className="menu">

        <li className="active">
          <FaHome className="icon" />
          <span>Dashboard</span>
        </li>

        <li>
          <FaRobot className="icon" />
          <span>AI Assistant</span>
        </li>

        <li onClick={() => navigate("/pregnancy-profile")}>
          <FaUser className="icon" />
          <span>Pregnancy Profile</span>
        </li>

        <li>
          <FaAppleAlt className="icon" />
          <span>Nutrition</span>
        </li>

        <li>
          <FaPills className="icon" />
          <span>Medicine</span>
        </li>

        <li>
          <FaCalendarAlt className="icon" />
          <span>Appointments</span>
        </li>

        <li>
          <FaChartBar className="icon" />
          <span>Reports</span>
        </li>

        <li>
          <FaUsers className="icon" />
          <span>Family Dashboard</span>
        </li>

        <li>
          <FaCog className="icon" />
          <span>Settings</span>
        </li>

      </ul>

      <div className="logout">
        <FaSignOutAlt className="icon" />
        <span>Logout</span>
      </div>

    </div>
  );
}

export default Sidebar;