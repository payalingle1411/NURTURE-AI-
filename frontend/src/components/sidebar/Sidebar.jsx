import "./Sidebar.css";
import {
  FaHome,
  FaUser,
  FaHeartbeat,
  FaCalendarAlt,
  FaRobot,
} from "react-icons/fa";

function Sidebar() {
  return (
    <aside className="sidebar">
      <h2 className="logo">🌸 Nurture AI</h2>

      <ul>
        <li>
          <FaHome /> Dashboard
        </li>

        <li>
          <FaUser /> Profile
        </li>

        <li>
          <FaHeartbeat /> Health
        </li>

        <li>
          <FaCalendarAlt /> Appointments
        </li>

        <li>
          <FaRobot /> AI Assistant
        </li>
      </ul>
    </aside>
  );
}

export default Sidebar;