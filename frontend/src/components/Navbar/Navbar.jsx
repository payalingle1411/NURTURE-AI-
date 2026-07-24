import "./Navbar.css";
import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

function Navbar() {
  return (
    <header className="navbar">

      {/* Left Section */}
      <div className="navbar-left">
        <h2>Dashboard</h2>
      </div>

      {/* Center Section */}
      <div className="navbar-search">
        <FaSearch className="search-icon" />
        <input
          type="text"
          placeholder="Search..."
        />
      </div>

      {/* Right Section */}
      <div className="navbar-right">

        <div className="notification">
          <FaBell />
          <span className="badge">3</span>
        </div>

        <div className="profile">
          <FaUserCircle className="profile-icon" />

          <div>
            <h4>Chetan</h4>
            <p>Mother</p>
          </div>
        </div>

      </div>

    </header>
  );
}

export default Navbar;