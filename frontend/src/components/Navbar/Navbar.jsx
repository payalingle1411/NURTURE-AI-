import "./Navbar.css";
import { FaBell, FaUserCircle } from "react-icons/fa";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2>Nurture AI</h2>
      </div>

      <div className="navbar-right">
        <FaBell className="nav-icon" />
        <FaUserCircle className="profile-icon" />
      </div>
    </nav>
  );
}

export default Navbar;