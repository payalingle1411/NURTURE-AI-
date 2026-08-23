import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import {
  FaEye,
  FaEyeSlash,
  FaEnvelope,
  FaLock,
} from "react-icons/fa";

import { FcGoogle } from "react-icons/fc";

import axios from "axios";

import "./login.css";

function Login() {

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [loading, setLoading] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    remember: false,
  });


  // =========================================================
  // HANDLE INPUT
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
  // LOGIN
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

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

      const response = await axios.post(

        "http://localhost:8080/api/auth/login",

        {
          email:
            formData.email.trim(),

          password:
            formData.password,
        },

        {
          withCredentials: true,
        }
      );


      console.log(
        "========== LOGIN RESPONSE =========="
      );

      console.log(
        response.data
      );


      if (response.status === 200) {

        const data =
          response.data;


        // ===================================================
        // GET DYNAMIC USER ID FROM BACKEND
        // ===================================================

        const userId =
          data.userId;


        console.log(
          "User ID received from backend:",
          userId
        );


        // ===================================================
        // IMPORTANT
        // NEVER USE STATIC USER ID
        // ===================================================

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
        // SAVE DYNAMIC USER ID
        // ===================================================

        localStorage.setItem(
          "userId",
          String(userId)
        );


        // ===================================================
        // SAVE OTHER USER INFORMATION
        // ===================================================

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


        // ===================================================
        // VERIFY WHAT WAS STORED
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


        // ===================================================
        // LOGIN SUCCESS
        // ===================================================

        alert(
          data.message ||
          "Login Successful ✅"
        );


        // ===================================================
        // NAVIGATION
        // ===================================================

        if (
          data.profileCompleted === true
        ) {

          navigate(
            "/dashboard",
            {
              replace: true,
            }
          );

        } else {

          navigate(
            "/personal-info",
            {
              replace: true,
            }
          );
        }

      }

    } catch (error) {

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
            🤱 Nurture AI
          </h1>

          <h2>
            Welcome Back!
          </h2>

          <p>
            Your trusted pregnancy wellness
            companion. Stay healthy, track
            your baby's growth, receive
            AI-powered guidance, and keep
            your family connected throughout
            your motherhood journey.
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

          <h2>
            Login
          </h2>

          <p className="subtitle">
            Sign in to continue your pregnancy journey.
          </p>


          {/* =================================================
              EMAIL
          ================================================= */}

          <div className="input-group">

            <label>
              Email Address
            </label>

            <div className="input-box">

              <FaEnvelope
                className="input-icon"
              />

              <input
                type="email"
                name="email"
                placeholder="Enter your email"
                value={formData.email}
                onChange={handleChange}
                autoComplete="email"
                required
              />

            </div>

          </div>


          {/* =================================================
              PASSWORD
          ================================================= */}

          <div className="input-group">

            <label>
              Password
            </label>

            <div className="input-box">

              <FaLock
                className="input-icon"
              />

              <input
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
                required
              />

              <button
                type="button"
                className="show-btn"
                onClick={() =>
                  setShowPassword(
                    !showPassword
                  )
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
              REMEMBER ME
          ================================================= */}

          <div className="remember">

            <label>

              <input
                type="checkbox"
                name="remember"
                checked={
                  formData.remember
                }
                onChange={
                  handleChange
                }
              />

              <span>
                Remember Me
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
              GOOGLE
          ================================================= */}

          <button
            type="button"
            className="google-btn"
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
              {" "}
              Create Account
            </Link>

          </p>

        </form>

      </div>

    </div>
  );
}

export default Login;