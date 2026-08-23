import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import "./Navbar.css";

function Navbar() {

  const location = useLocation();

  // =========================================================
  // USER DATA
  // =========================================================

  const [user, setUser] = useState({
    userId: "",
    name: "",
    email: "",
    role: "",
  });

  // =========================================================
  // LOAD LOGGED-IN USER
  // =========================================================

  useEffect(() => {

    const userId =
      localStorage.getItem("userId");

    const fullName =
      localStorage.getItem("fullName");

    const email =
      localStorage.getItem("email");

    const role =
      localStorage.getItem("role");

    console.log(
      "========== NAVBAR USER =========="
    );

    console.log(
      "User ID:",
      userId
    );

    console.log(
      "Full Name:",
      fullName
    );

    console.log(
      "Email:",
      email
    );

    console.log(
      "Role:",
      role
    );

    setUser({
      userId: userId || "",
      name: fullName || "User",
      email: email || "",
      role: role || "",
    });

  }, [location.pathname]);

  // =========================================================
  // NAVBAR TITLE
  // =========================================================

  const getNavbarTitle = () => {

    if (
      location.pathname === "/appointment" ||
      location.pathname === "/appointment-history" ||
      location.pathname.startsWith("/appointment/")
    ) {
      return "Appointments";
    }

    if (
      location.pathname === "/ai-assistant"
    ) {
      return "AI Assistant";
    }

    if (
      location.pathname === "/pregnancy-profile"
    ) {
      return "Pregnancy Profile";
    }

    if (
      location.pathname === "/nutrition"
    ) {
      return "Nutrition";
    }

    if (
      location.pathname === "/medicine"
    ) {
      return "Medicine";
    }

    if (
      location.pathname === "/reports"
    ) {
      return "Reports";
    }

    if (
      location.pathname === "/family-dashboard"
    ) {
      return "Family Dashboard";
    }

    if (
      location.pathname === "/settings"
    ) {
      return "Settings";
    }

    if (
      location.pathname === "/dashboard"
    ) {
      return "Dashboard";
    }

    if (
      location.pathname === "/personal-info"
    ) {
      return "Personal Information";
    }

    if (
      location.pathname === "/pregnancy-details"
    ) {
      return "Pregnancy Details";
    }

    return "Dashboard";
  };

  // =========================================================
  // FORMAT ROLE
  // =========================================================

  const formatRole = (role) => {

    if (!role) {
      return "";
    }

    return role
      .toLowerCase()
      .split("_")
      .map((word) =>
        word.charAt(0).toUpperCase() +
        word.slice(1)
      )
      .join(" ");
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (

    <header className="navbar">

      {/* =====================================================
          LEFT
      ===================================================== */}

      <div className="navbar-left">

        <h2>
          {getNavbarTitle()}
        </h2>

      </div>


      {/* =====================================================
          SEARCH
      ===================================================== */}

      <div className="navbar-search">

        <FaSearch
          className="search-icon"
        />

        <input
          type="text"
          placeholder="Search..."
        />

      </div>


      {/* =====================================================
          RIGHT
      ===================================================== */}

      <div className="navbar-right">

        {/* ===================================================
            NOTIFICATION
        =================================================== */}

        <div className="notification">

          <FaBell />

          <span className="badge">
            3
          </span>

        </div>


        {/* ===================================================
            PROFILE
        =================================================== */}

        <div className="profile">

          <FaUserCircle
            className="profile-icon"
          />

          <div className="profile-info">

            <h4>
              {user.name}
            </h4>

            {user.role && (

              <p>
                {formatRole(user.role)}
              </p>

            )}

          </div>

        </div>

      </div>

    </header>
  );
}

export default Navbar;