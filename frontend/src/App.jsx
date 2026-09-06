import React from "react";

import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";


// =============================================================
// AUTH
// =============================================================

import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";


// =============================================================
// MOTHER DASHBOARD
// =============================================================

import Dashboard from "./pages/Dashboard/dashboard.jsx";


// =============================================================
// COMMON COMPONENTS
// =============================================================

import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";


// =============================================================
// WELCOME
// =============================================================

import Welcome from "./pages/Welcome page/welcome.jsx";


// =============================================================
// MOTHER FORMS
// =============================================================

import PersonalInfo from "./pages/Form/PersonalInfo/personalInfo.jsx";
import PregnancyDetails from "./pages/Form/PregnancyDetails/PregnancyDetails.jsx";


// =============================================================
// APPOINTMENTS
// =============================================================

import Appointment from "./pages/Appointment/Appointment";
import AppointmentHistory from "./pages/Appointment/AppointmentHistory.jsx";


// =============================================================
// PROFILE
// =============================================================

import Profile from "./pages/Profile/Profile.jsx";


// =============================================================
// BABY DEVELOPMENT
// =============================================================

import BabyDevelopment from "./components/WelcomeCard/BabyDevelopment.jsx";


// =============================================================
// FAMILY MEMBER
// =============================================================

import FamilyForm from "./pages/FamilyForm/FForm.jsx";
import FamilyFormDetails from "./pages/FamilyForm/FForm1.jsx";
import FamilyDashboard from "./pages/FamilyDashboard/familyDashboard.jsx";


// =============================================================
// HEALTH TRACKING
// =============================================================

import HealthTracking from "./pages/HealthTracking/HealthTracking.jsx";
import Report from "./pages/Report/Report.jsx";


// =============================================================
// PROTECTED ROUTE
// =============================================================

import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute.jsx";


function App() {

  return (
    <BrowserRouter>

      <Routes>

        {/* =====================================================
            WELCOME
        ===================================================== */}

        <Route
          path="/"
          element={<Welcome />}
        />


        {/* =====================================================
            AUTHENTICATION
        ===================================================== */}

        <Route
          path="/login"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />


        {/* =====================================================
            MOTHER DASHBOARD
        ===================================================== */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            COMMON COMPONENTS
        ===================================================== */}

        <Route
          path="/navbar"
          element={
            <ProtectedRoute
              allowedRoles={["mother", "family member"]}
            >
              <Navbar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/sidebar"
          element={
            <ProtectedRoute
              allowedRoles={["mother", "family member"]}
            >
              <Sidebar />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            MOTHER PERSONAL INFORMATION
        ===================================================== */}

        <Route
          path="/personal-info"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <PersonalInfo />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            PREGNANCY DETAILS
        ===================================================== */}

        <Route
          path="/pregnancy-details"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <PregnancyDetails />
            </ProtectedRoute>
          }
        />

        <Route
          path="/pregnancy-profile"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <PregnancyDetails />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            APPOINTMENTS
            ONLY MOTHER
        ===================================================== */}

        <Route
          path="/appointment"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <Appointment />
            </ProtectedRoute>
          }
        />

        <Route
          path="/appointment-history"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <AppointmentHistory />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            PROFILE
            ONLY MOTHER
        ===================================================== */}

        <Route
          path="/profile"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <Profile />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            BABY DEVELOPMENT
            ONLY MOTHER
        ===================================================== */}

        <Route
          path="/baby-development"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <BabyDevelopment />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            HEALTH TRACKING
            ONLY MOTHER
        ===================================================== */}

        <Route
          path="/health-tracking"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <HealthTracking />
            </ProtectedRoute>
          }
        />

        <Route
          path="/report"
          element={
            <ProtectedRoute
              allowedRoles={["mother"]}
            >
              <Report />
            </ProtectedRoute>
          }
        />

        {/* =====================================================
            FAMILY MEMBER FORM
            ONLY FAMILY MEMBER
        ===================================================== */}

        <Route
          path="/family-form"
          element={
            <ProtectedRoute
              allowedRoles={["family member"]}
            >
              <FamilyForm />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            FAMILY MEMBER DETAILS FORM
            ONLY FAMILY MEMBER
        ===================================================== */}

        <Route
          path="/family-form-details"
          element={
            <ProtectedRoute
              allowedRoles={["family member"]}
            >
              <FamilyFormDetails />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            FAMILY DASHBOARD
            ONLY FAMILY MEMBER
        ===================================================== */}

        <Route
          path="/family-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["family member"]}
            >
              <FamilyDashboard />
            </ProtectedRoute>
          }
        />


        {/* =====================================================
            UNKNOWN ROUTE
        ===================================================== */}

        <Route
          path="*"
          element={<RoleBasedHome />}
        />

      </Routes>

    </BrowserRouter>
  );
}


/* =============================================================
   ROLE BASED HOME

   IMPORTANT:
   We use sessionStorage because the currently logged-in
   user should be isolated per browser tab.
   ============================================================= */

function RoleBasedHome() {

  const userId =
    sessionStorage.getItem("userId");

  const role =
    String(
      sessionStorage.getItem("role") || ""
    )
      .trim()
      .toLowerCase()
      .replace(/_/g, " ")
      .replace(/\s+/g, " ");


  // -----------------------------------------------------------
  // NOT LOGGED IN
  // -----------------------------------------------------------

  if (
    !userId ||
    userId === "null" ||
    userId === "undefined"
  ) {
    return <Welcome />;
  }


  // -----------------------------------------------------------
  // FAMILY MEMBER
  // -----------------------------------------------------------

  if (role === "family member") {

    return (
      <Navigate
        to="/family-dashboard"
        replace
      />
    );
  }


  // -----------------------------------------------------------
  // MOTHER
  // -----------------------------------------------------------

  if (role === "mother") {

    return (
      <Navigate
        to="/dashboard"
        replace
      />
    );
  }


  // -----------------------------------------------------------
  // UNKNOWN ROLE
  // -----------------------------------------------------------

  return (
    <Navigate
      to="/login"
      replace
    />
  );
}


export default App;

