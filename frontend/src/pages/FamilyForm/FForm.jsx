import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaEnvelope,
  FaLock,
  FaArrowLeft,
  FaPaperPlane,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

import "./FForm.css";

function FForm() {

  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");

  const [otpSent, setOtpSent] = useState(false);

  const [loading, setLoading] = useState(false);
  const [verifying, setVerifying] = useState(false);

  const [countdown, setCountdown] = useState(0);


  // =========================================================
  // GET LOGGED-IN FAMILY MEMBER USER ID
  // =========================================================
  //
  // This is the ID stored during login:
  //
  // localStorage.setItem("userId", userId)
  //
  // It represents the Login/User ID.
  //
  // =========================================================

  const familyMemberUserId =
    localStorage.getItem("userId");


  // =========================================================
  // OTP COUNTDOWN
  // =========================================================

  useEffect(() => {

    if (countdown <= 0) {
      return;
    }

    const timer = setInterval(() => {

      setCountdown((previous) => {

        if (previous <= 1) {

          clearInterval(timer);

          return 0;
        }

        return previous - 1;
      });

    }, 1000);

    return () => clearInterval(timer);

  }, [countdown]);


  // =========================================================
  // SEND OTP
  // =========================================================

  const handleSendOtp = async (e) => {

    e.preventDefault();


    // =======================================================
    // CHECK FAMILY MEMBER LOGIN
    // =======================================================

    if (!familyMemberUserId) {

      alert(
        "Your session has expired. Please login again."
      );

      navigate("/login", {
        replace: true,
      });

      return;
    }


    // =======================================================
    // EMAIL VALIDATION
    // =======================================================

    const trimmedEmail =
      email.trim().toLowerCase();


    if (!trimmedEmail) {

      alert(
        "Please enter the pregnant mother's email address."
      );

      return;
    }


    // Correct email validation
    const emailRegex =
      /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


    if (!emailRegex.test(trimmedEmail)) {

      alert(
        "Please enter a valid email address."
      );

      return;
    }


    setLoading(true);


    try {

      // =====================================================
      // SEND FAMILY MEMBER OTP
      // =====================================================

      const response = await axios.post(

        "http://localhost:8080/api/family-members/send-otp",

        {
          familyMemberId:
            Number(familyMemberUserId),

          patientEmail:
            trimmedEmail,
        },

        {
          withCredentials: true,
        }

      );


      console.log(
        "========== FAMILY OTP RESPONSE =========="
      );

      console.log(response.data);


      // =====================================================
      // SUCCESS
      // =====================================================

      if (
        response.status === 200 ||
        response.status === 201
      ) {

        setEmail(trimmedEmail);

        setOtp("");

        setOtpSent(true);

        setCountdown(60);


        alert(
          response.data?.message ||
          "OTP has been sent to the mother's email."
        );
      }


    } catch (error) {

      console.error(
        "Send Family OTP Error:",
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
            "Unable to send OTP."
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
  // VERIFY OTP
  // =========================================================

  const handleVerifyOtp = async (e) => {

    e.preventDefault();


    // =======================================================
    // OTP VALIDATION
    // =======================================================

    const trimmedOtp =
      otp.trim();


    if (!trimmedOtp) {

      alert(
        "Please enter the OTP."
      );

      return;
    }


    if (
      !/^[0-9]{6}$/.test(trimmedOtp)
    ) {

      alert(
        "Please enter a valid 6-digit OTP."
      );

      return;
    }


    // =======================================================
    // FAMILY MEMBER LOGIN CHECK
    // =======================================================

    if (!familyMemberUserId) {

      alert(
        "Your session has expired. Please login again."
      );

      navigate("/login", {
        replace: true,
      });

      return;
    }


    // =======================================================
    // CHECK OTP EXPIRY
    // =======================================================

    if (countdown <= 0) {

      alert(
        "OTP has expired. Please request a new OTP."
      );

      return;
    }


    setVerifying(true);


    try {

      // =====================================================
      // VERIFY FAMILY MEMBER OTP
      // =====================================================

      const response = await axios.post(

        "http://localhost:8080/api/family-members/verify-otp",

        {
          familyMemberId:
            Number(familyMemberUserId),

          patientEmail:
            email.trim().toLowerCase(),

          otp:
            trimmedOtp,
        },

        {
          withCredentials: true,
        }

      );


      console.log(
        "========== OTP VERIFICATION RESPONSE =========="
      );

      console.log(response.data);


      // =====================================================
      // SUCCESS
      // =====================================================

      if (response.status === 200) {

        const data = response.data;


        // ===================================================
        // CHECK BACKEND VERIFICATION
        // ===================================================

        if (data.verified !== true) {

          alert(
            data.message ||
            "Patient verification failed."
          );

          return;
        }


        // ===================================================
        // SAVE PATIENT USER ID
        // ===================================================

        if (
          data.patientUserId !== undefined &&
          data.patientUserId !== null
        ) {

          localStorage.setItem(
            "patientUserId",
            String(data.patientUserId)
          );
        }


        // ===================================================
        // SAVE PATIENT NAME
        // ===================================================

        if (data.patientName) {

          localStorage.setItem(
            "patientName",
            data.patientName
          );
        }


        // ===================================================
        // SAVE PATIENT EMAIL
        // ===================================================

        if (data.patientEmail) {

          localStorage.setItem(
            "patientEmail",
            data.patientEmail
          );
        }


        // ===================================================
        // SAVE FAMILY MEMBER USER ID
        // ===================================================

        if (
          data.familyMemberUserId !== undefined &&
          data.familyMemberUserId !== null
        ) {

          localStorage.setItem(
            "familyMemberUserId",
            String(data.familyMemberUserId)
          );

        } else {

          // Fallback to currently logged-in user ID

          localStorage.setItem(
            "familyMemberUserId",
            String(familyMemberUserId)
          );
        }


        // ===================================================
        // SAVE VERIFICATION STATUS
        // ===================================================

        localStorage.setItem(
          "familyPatientVerified",
          "true"
        );


        // ===================================================
        // CLEAR OTP
        // ===================================================

        setOtp("");

        setCountdown(0);


        // ===================================================
        // SUCCESS MESSAGE
        // ===================================================

        alert(
          data.message ||
          "Patient verified successfully! ❤️"
        );


        // ===================================================
        // GO TO FAMILY FORM DETAILS
        // =====================================================
        //
        // Change this to /family-dashboard if you want
        // the family member to directly open dashboard
        // immediately after OTP verification.
        //
        // =====================================================

        navigate(
          "/family-form-details",
          {
            replace: true,
          }
        );
      }


    } catch (error) {

      console.error(
        "OTP Verification Error:",
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
            "Invalid OTP or patient verification failed."
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

      setVerifying(false);
    }
  };


  // =========================================================
  // CHANGE EMAIL
  // =========================================================

  const handleChangeEmail = () => {

    setOtpSent(false);

    setOtp("");

    setCountdown(0);
  };


  // =========================================================
  // UI
  // =========================================================

  return (

    <div className="fform-page">

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <button
        type="button"
        className="fform-back-btn"
        onClick={() => navigate("/login")}
      >

        <FaArrowLeft />

        <span>
          Back
        </span>

      </button>


      {/* =====================================================
          CARD
      ===================================================== */}

      <div className="fform-card">


        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="fform-header">

          <div className="fform-icon">

            <FaShieldAlt />

          </div>


          <h1>
            Connect to Pregnancy Profile
          </h1>


          <p>
            Enter the pregnant mother's registered
            email address to securely connect to
            her Nurture AI pregnancy profile.
          </p>

        </div>


        {/* ===================================================
            SEND OTP FORM
        =================================================== */}

        {!otpSent && (

          <form
            className="fform-form"
            onSubmit={handleSendOtp}
          >


            {/* ===============================================
                EMAIL
            =============================================== */}

            <div className="fform-input-group">

              <label htmlFor="patientEmail">

                Mother's Email Address

              </label>


              <div className="fform-input-box">

                <FaEnvelope
                  className="fform-input-icon"
                />


                <input
                  id="patientEmail"
                  type="email"
                  name="patientEmail"
                  placeholder="Enter mother's registered email"
                  value={email}
                  onChange={(e) =>
                    setEmail(e.target.value)
                  }
                  autoComplete="email"
                  required
                />

              </div>

            </div>


            {/* ===============================================
                SECURITY INFORMATION
            =============================================== */}

            <div className="fform-info">

              <FaShieldAlt />

              <p>
                For privacy and security, an OTP
                will be sent to the mother's registered
                email address before you can access
                her pregnancy information.
              </p>

            </div>


            {/* ===============================================
                SEND OTP BUTTON
            =============================================== */}

            <button
              type="submit"
              className="fform-submit-btn"
              disabled={loading}
            >

              <FaPaperPlane />

              <span>

                {loading
                  ? "Sending OTP..."
                  : "Send OTP"}

              </span>

            </button>

          </form>
        )}


        {/* ===================================================
            OTP VERIFICATION FORM
        =================================================== */}

        {otpSent && (

          <form
            className="fform-form"
            onSubmit={handleVerifyOtp}
          >


            {/* ===============================================
                EMAIL DISPLAY
            =============================================== */}

            <div className="fform-email-display">

              <FaEnvelope />

              <div>

                <span>
                  OTP sent to
                </span>

                <strong>
                  {email}
                </strong>

              </div>

            </div>


            {/* ===============================================
                OTP INPUT
            =============================================== */}

            <div className="fform-input-group">

              <label htmlFor="otp">

                Enter 6-Digit OTP

              </label>


              <div className="fform-input-box">

                <FaLock
                  className="fform-input-icon"
                />


                <input
                  id="otp"
                  type="text"
                  name="otp"
                  placeholder="Enter OTP"
                  value={otp}
                  onChange={(e) =>
                    setOtp(
                      e.target.value
                        .replace(/\D/g, "")
                        .slice(0, 6)
                    )
                  }
                  maxLength={6}
                  inputMode="numeric"
                  autoComplete="one-time-code"
                  required
                />

              </div>

            </div>


            {/* ===============================================
                COUNTDOWN
            =============================================== */}

            <div className="fform-otp-info">

              <span>
                OTP expires in
              </span>

              <strong>

                {countdown > 0
                  ? `${countdown}s`
                  : "Expired"}

              </strong>

            </div>


            {/* ===============================================
                VERIFY BUTTON
            =============================================== */}

            <button
              type="submit"
              className="fform-submit-btn"
              disabled={
                verifying ||
                otp.length !== 6 ||
                countdown <= 0
              }
            >

              <FaCheckCircle />

              <span>

                {verifying
                  ? "Verifying..."
                  : "Verify & Continue"}

              </span>

            </button>


            {/* ===============================================
                CHANGE EMAIL
            =============================================== */}

            <button
              type="button"
              className="fform-change-btn"
              onClick={handleChangeEmail}
            >

              Change Email

            </button>

          </form>
        )}

      </div>

    </div>
  );
}

export default FForm;