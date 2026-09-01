import React from "react";
import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import Login from "./pages/Login/login.jsx";
import Register from "./pages/Register/register.jsx";

import Dashboard from "./pages/Dashboard/dashboard.jsx";

import Navbar from "./components/Navbar/Navbar.jsx";
import Sidebar from "./components/sidebar/Sidebar.jsx";

import Welcome from "./pages/Welcome page/welcome.jsx";

import PersonalInfo from "./pages/Form/PersonalInfo/personalInfo.jsx";
import PregnancyDetails from "./pages/Form/PregnancyDetails/PregnancyDetails.jsx";

import Appointment from "./pages/Appointment/Appointment";
import AppointmentHistory from "./pages/Appointment/AppointmentHistory.jsx";

import Profile from "./pages/Profile/Profile.jsx";
import BabyDevelopment from "./components/WelcomeCard/BabyDevelopment.jsx";

import FamilyForm from "./pages/FamilyForm/FForm.jsx";
import FamilyFormDetails from "./pages/FamilyForm/FForm1.jsx";
import FamilyDashboard from "./pages/FamilyDashboard/familyDashboard.jsx";

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
            ONLY MOTHER CAN ACCESS
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
          path="/Navbar"
          element={
            <ProtectedRoute
              allowedRoles={["mother", "family member"]}
            >
              <Navbar />
            </ProtectedRoute>
          }
        />

        <Route
          path="/Sidebar"
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
          element={
            <RoleBasedHome />
          }
        />

      </Routes>

    </BrowserRouter>
  );
}


/* =============================================================
   ROLE BASED HOME
   ============================================================= */

function RoleBasedHome() {

  const userId =
    localStorage.getItem("userId");

  const role =
    String(
      localStorage.getItem("role") || ""
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