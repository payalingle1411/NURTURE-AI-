import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";

import {
  FaBars,
  FaBell,
  FaSearch,
  FaUserCircle,
} from "react-icons/fa";

import Sidebar from "../sidebar/Sidebar";

import "./Navbar.css";

function Navbar() {
  const location = useLocation();

  // =========================================================
  // SIDEBAR
  // =========================================================

  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  // =========================================================
  // USER DATA
  // =========================================================

  const [user, setUser] = useState({
    userId: "",
    name: "User",
    email: "",
    role: "",
  });

  // =========================================================
  // LOAD LOGGED-IN USER
  // =========================================================

  useEffect(() => {
    const loadUser = () => {
      const userId =
        localStorage.getItem("userId") || "";

      const fullName =
        localStorage.getItem("fullName") || "";

      const email =
        localStorage.getItem("email") || "";

      const role =
        localStorage.getItem("role") || "";

      console.log("========== NAVBAR USER ==========");
      console.log("User ID:", userId);
      console.log("Full Name:", fullName);
      console.log("Email:", email);
      console.log("Role:", role);

      setUser({
        userId,
        name: fullName || "User",
        email,
        role,
      });
    };

    loadUser();

    // Update navbar if another tab/window changes localStorage
    window.addEventListener("storage", loadUser);

    return () => {
      window.removeEventListener(
        "storage",
        loadUser
      );
    };
  }, [location.pathname]);

  // =========================================================
  // CLOSE SIDEBAR WHEN PAGE CHANGES
  // =========================================================

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [location.pathname]);

  // =========================================================
  // NAVBAR TITLE
  // =========================================================

  const getNavbarTitle = () => {
    const path = location.pathname;

    if (
      path === "/appointment" ||
      path === "/appointments" ||
      path === "/appointment-history" ||
      path.startsWith("/appointment/")
    ) {
      return "Appointments";
    }

    if (path === "/ai-assistant") {
      return "AI Assistant";
    }

    if (path === "/pregnancy-profile") {
      return "Pregnancy Profile";
    }

    if (path === "/nutrition") {
      return "Nutrition";
    }

    if (path === "/medicine") {
      return "Medicine";
    }

    if (path === "/reports") {
      return "Reports";
    }

    if (path === "/family-dashboard") {
      return "Family Dashboard";
    }

    if (path === "/settings") {
      return "Settings";
    }

    if (path === "/personal-info") {
      return "Personal Information";
    }

    if (path === "/pregnancy-details") {
      return "Pregnancy Details";
    }

    if (path === "/dashboard") {
      return "Dashboard";
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

    return String(role)
      .toLowerCase()
      .split("_")
      .map((word) => {
        return (
          word.charAt(0).toUpperCase() +
          word.slice(1)
        );
      })
      .join(" ");
  };

  // =========================================================
  // TOGGLE SIDEBAR
  // =========================================================

  const toggleSidebar = () => {
    setIsSidebarOpen((previous) => !previous);
  };

  // =========================================================
  // RETURN
  // =========================================================

  return (
    <>
      {/* =====================================================
          NAVBAR
      ===================================================== */}

      <header className="navbar">

        {/* ===================================================
            LEFT
        =================================================== */}

        <div className="navbar-left">

          {/* HAMBURGER */}

          <button
            type="button"
            className="hamburger-btn"
            onClick={toggleSidebar}
            aria-label={
              isSidebarOpen
                ? "Close Sidebar"
                : "Open Sidebar"
            }
            aria-expanded={isSidebarOpen}
          >
            <FaBars />
          </button>

          {/* PAGE TITLE */}

          <h2>
            {getNavbarTitle()}
          </h2>

        </div>


        {/* ===================================================
            SEARCH
        =================================================== */}

        <div className="navbar-search">

          <FaSearch
            className="search-icon"
          />

          <input
            type="search"
            placeholder="Search..."
            aria-label="Search"
          />

        </div>


        {/* ===================================================
            RIGHT
        =================================================== */}

        <div className="navbar-right">

          {/* =================================================
              NOTIFICATION
          ================================================= */}

          <button
            type="button"
            className="notification"
            aria-label="Notifications"
          >
            <FaBell />

            <span className="badge">
              3
            </span>
          </button>


          {/* =================================================
              PROFILE
          ================================================= */}

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


      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar
        isOpen={isSidebarOpen}
        setIsOpen={setIsSidebarOpen}
      />
    </>
  );
}

export default Navbar;