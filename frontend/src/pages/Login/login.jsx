/*
=========================================================
NURTURE AI - LOGIN PAGE
Premium Lavender + Pink Theme
Mother & Baby • Modern • Elegant • Responsive
=========================================================
*/

import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import API from "../../services/api";

import "./login.css";

function Login() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
      type,
      checked,
    } = e.target;

    setFormData((previous) => ({
      ...previous,
      [name]:
        type === "checkbox"
          ? checked
          : value,
    }));
  };

  // =========================================================
  // CHECK PERSONAL INFORMATION
  // =========================================================

  const checkPersonalInfo = async (userId) => {
    try {
      console.log(
        "Checking Personal Info for user:",
        userId
      );

      const response = await API.get(
        `/profile/exists/${userId}`
      );

      console.log(
        "Personal Info Completed:",
        response.data
      );

      return response.data === true;

    } catch (error) {
      console.error(
        "Personal Info Check Error:",
        error
      );

      if (error.response) {
        console.error(
          "Personal Info Backend Error:",
          error.response.data
        );
      }

      return false;
    }
  };

  // =========================================================
  // CHECK PREGNANCY DETAILS
  // =========================================================

  const checkPregnancyDetails = async (userId) => {
    try {
      console.log(
        "Checking Pregnancy Details for user:",
        userId
      );

      const response = await API.get(
        `/pregnancy/exists/${userId}`
      );

      console.log(
        "Pregnancy Details Completed:",
        response.data
      );

      return response.data === true;

    } catch (error) {
      console.error(
        "Pregnancy Details Check Error:",
        error
      );

      if (error.response) {
        console.error(
          "Pregnancy Backend Error:",
          error.response.data
        );
      }

      return false;
    }
  };

  // =========================================================
  // CHECK MEDICAL HISTORY
  // =========================================================

  const checkMedicalHistory = async (userId) => {
    try {
      console.log(
        "Checking Medical History for user:",
        userId
      );

      const response = await API.get(
        `/medical-history/exists/${userId}`
      );

      console.log(
        "Medical History Completed:",
        response.data
      );

      return response.data === true;

    } catch (error) {
      console.error(
        "Medical History Check Error:",
        error
      );

      if (error.response) {
        console.error(
          "Medical History Backend Error:",
          error.response.data
        );
      }

      return false;
    }
  };

  // =========================================================
  // HANDLE LOGIN
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // =======================================================
    // VALIDATION
    // =======================================================

    if (
      !formData.email.trim() ||
      !formData.password.trim()
    ) {
      alert(
        "Please enter email and password."
      );

      return;
    }

    setLoading(true);

    try {
      // =====================================================
      // LOGIN API
      // =====================================================

      const response = await API.post(
        "/auth/login",
        {
          email: formData.email.trim(),
          password: formData.password,
        },
        {
          withCredentials: true,
        }
      );

      console.log(
        "========== LOGIN RESPONSE =========="
      );

      console.log(response.data);

      if (response.status === 200) {
        const data = response.data;

        // ===================================================
        // GET USER ID
        // ===================================================

        const userId = data.userId;

        console.log(
          "User ID received from backend:",
          userId
        );

        if (
          userId === undefined ||
          userId === null ||
          userId === ""
        ) {
          console.error(
            "Backend did not return userId:",
            data
          );

          alert(
            "Login successful, but the server did not return your user ID."
          );

          return;
        }

        // ===================================================
        // STORE USER INFORMATION
        // ===================================================

        localStorage.setItem(
          "userId",
          String(userId)
        );

        if (data.fullName) {
          localStorage.setItem(
            "fullName",
            data.fullName
          );
        }

        if (data.email) {
          localStorage.setItem(
            "email",
            data.email
          );
        }

        if (data.role) {
          localStorage.setItem(
            "role",
            data.role
          );
        }

        if (
          data.familyVerified !== undefined &&
          data.familyVerified !== null
        ) {
          localStorage.setItem(
            "familyVerified",
            String(data.familyVerified)
          );
        }

        // ===================================================
        // NORMALIZE ROLE
        // ===================================================

        const role = String(
          data.role || ""
        )
          .trim()
          .toLowerCase()
          .replace(/_/g, " ")
          .replace(/\s+/g, " ");

        console.log(
          "Original Role:",
          data.role
        );

        console.log(
          "Normalized Role:",
          role
        );

        // ===================================================
        // FAMILY VERIFICATION
        // ===================================================

        const familyVerified =
          data.familyVerified === true;

        console.log(
          "Family Member Verified:",
          familyVerified
        );

        // ===================================================
        // DEBUG INFORMATION
        // ===================================================

        console.log(
          "Dynamic User ID stored:",
          localStorage.getItem("userId")
        );

        console.log(
          "User Name:",
          data.fullName
        );

        console.log(
          "Email:",
          data.email
        );

        console.log(
          "Role:",
          data.role
        );

        console.log(
          "Profile Completed:",
          data.profileCompleted
        );

        console.log(
          "Family Verified:",
          data.familyVerified
        );

        // ===================================================
        // SUCCESS MESSAGE
        // ===================================================

        alert(
          data.message ||
          "Login Successful ✅"
        );

        // ===================================================
        // FAMILY MEMBER FLOW
        // ===================================================

        if (role === "family member") {

          if (familyVerified) {

            console.log(
              "Family member already verified with mother."
            );

            console.log(
              "Navigating to Family Dashboard..."
            );

            navigate(
              "/family-dashboard",
              {
                replace: true,
              }
            );

          } else {

            console.log(
              "Family member is not verified."
            );

            console.log(
              "Navigating to Family Form..."
            );

            navigate(
              "/family-form",
              {
                replace: true,
              }
            );
          }

          return;
        }

        // ===================================================
        // MOTHER FLOW
        // ===================================================

        if (role === "mother") {

          console.log(
            "Mother login detected."
          );

          const numericUserId =
            Number(userId);

          console.log(
            "Checking mother onboarding..."
          );

          // =================================================
          // STEP 1 - PERSONAL INFORMATION
          // =================================================

          const personalInfoCompleted =
            await checkPersonalInfo(
              numericUserId
            );

          console.log(
            "Personal Info Completed:",
            personalInfoCompleted
          );

          if (!personalInfoCompleted) {

            console.log(
              "❌ Personal information is incomplete."
            );

            console.log(
              "Navigating → /personal-info"
            );

            navigate(
              "/personal-info",
              {
                replace: true,
              }
            );

            return;
          }

          // =================================================
          // STEP 2 - PREGNANCY DETAILS
          // =================================================

          const pregnancyDetailsCompleted =
            await checkPregnancyDetails(
              numericUserId
            );

          console.log(
            "Pregnancy Details Completed:",
            pregnancyDetailsCompleted
          );

          if (!pregnancyDetailsCompleted) {

            console.log(
              "❌ Pregnancy details are incomplete."
            );

            console.log(
              "Navigating → /pregnancy-details"
            );

            navigate(
              "/pregnancy-details",
              {
                replace: true,
              }
            );

            return;
          }

          // =================================================
          // STEP 3 - MEDICAL HISTORY
          // =================================================

          const medicalHistoryCompleted =
            await checkMedicalHistory(
              numericUserId
            );

          console.log(
            "Medical History Completed:",
            medicalHistoryCompleted
          );

          if (!medicalHistoryCompleted) {

            console.log(
              "❌ Medical history is incomplete."
            );

            console.log(
              "Navigating → /medical-history"
            );

            navigate(
              "/medical-history",
              {
                replace: true,
              }
            );

            return;
          }

          // =================================================
          // EVERYTHING COMPLETED
          // =================================================

          console.log(
            "✅ All onboarding forms completed."
          );

          console.log(
            "Navigating → /dashboard"
          );

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );

          return;
        }

        // ===================================================
        // UNKNOWN ROLE
        // ===================================================

        console.error(
          "Unknown user role:",
          data.role
        );

        console.error(
          "Normalized role:",
          role
        );

        alert(
          `Unknown user role: ${data.role}`
        );
      }

    } catch (error) {

      // =====================================================
      // LOGIN ERROR
      // =====================================================

      console.error(
        "Login Error:",
        error
      );

      // =====================================================
      // BACKEND ERROR
      // =====================================================

      if (error.response) {

        console.log(
          "Backend Error:",
          error.response.data
        );

        if (
          typeof error.response.data ===
          "string"
        ) {

          alert(
            error.response.data
          );

        } else {

          alert(
            error.response.data?.message ||
            "Invalid email or password."
          );
        }

      }

      // =====================================================
      // NETWORK ERROR
      // =====================================================

      else if (error.request) {

        alert(
          "Unable to connect to Spring Boot backend.\n\n" +
          "Please make sure your backend is running on port 8080."
        );

      }

      // =====================================================
      // OTHER ERROR
      // =====================================================

      else {

        alert(
          "Something went wrong. Please try again."
        );
      }

    } finally {

      setLoading(false);
    }
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="login-container">

      {/* =====================================================
          LEFT SECTION
      ===================================================== */}

      <div className="login-left">

        <div className="overlay">

          <h1>
            NurtureAI
          </h1>

          <h2>
            Caring for You,
            <br />
            Caring for Baby
          </h2>

          <p>
            Your intelligent pregnancy wellness
            companion designed to support you
            through every stage of your pregnancy
            journey.
          </p>

        </div>

      </div>


      {/* =====================================================
          RIGHT SECTION
      ===================================================== */}

      <div className="login-right">

        <form
          className="login-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              LOGIN HEADING
          ================================================= */}

          <h2>
            Welcome Back
          </h2>

          <p className="subtitle">
            Login to continue your NurtureAI journey
          </p>


          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="input-group">

            <label htmlFor="email">
              Email Address
            </label>

            <div className="input-box">

              <FaEnvelope
                className="input-icon"
              />

              <input
                id="email"
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                disabled={loading}
              />

            </div>

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="input-group">

            <label htmlFor="password">
              Password
            </label>

            <div className="input-box">

              <FaLock
                className="input-icon"
              />

              <input
                id="password"
                type={
                  showPassword
                    ? "text"
                    : "password"
                }
                name="password"
                placeholder="Enter your password"
                value={formData.password}
                onChange={handleChange}
                autoComplete="current-password"
                disabled={loading}
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(
                    (previous) =>
                      !previous
                  )
                }
                disabled={loading}
                aria-label={
                  showPassword
                    ? "Hide password"
                    : "Show password"
                }
              >

                {showPassword ? (
                  <FaEyeSlash />
                ) : (
                  <FaEye />
                )}

              </button>

            </div>

          </div>


          {/* =================================================
              REMEMBER + FORGOT PASSWORD
          ================================================= */}

          <div className="remember">

            <label>

              <input
                type="checkbox"
                name="remember"
                checked={
                  formData.remember
                }
                onChange={handleChange}
                disabled={loading}
              />

              <span>
                Remember me
              </span>

            </label>

            <Link to="/forgot-password">
              Forgot Password?
            </Link>

          </div>


          {/* =================================================
              LOGIN BUTTON
          ================================================= */}

          <button
            type="submit"
            className="login-btn"
            disabled={loading}
          >
            {loading
              ? "Logging in..."
              : "Login"}
          </button>


          {/* =================================================
              DIVIDER
          ================================================= */}

          <div className="divider">

            <span>
              OR
            </span>

          </div>


          {/* =================================================
              GOOGLE LOGIN
          ================================================= */}

          <button
            type="button"
            className="google-btn"
            disabled={loading}
          >

            <FcGoogle
              className="google-icon"
            />

            <span>
              Continue with Google
            </span>

          </button>


          {/* =================================================
              REGISTER
          ================================================= */}

          <p className="register-link">

            Don't have an account?

            <Link to="/register">
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;