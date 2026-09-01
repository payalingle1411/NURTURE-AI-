import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  FaUser,
  FaUsers,
  FaBirthdayCake,
  FaPhone,
  FaArrowLeft,
  FaCheckCircle,
  FaShieldAlt,
} from "react-icons/fa";

import "./FForm1.css";

function FForm1() {
  const navigate = useNavigate();

  // =========================================================
  // GET LOGGED-IN FAMILY MEMBER USER ID
  // =========================================================

  const userId =
    localStorage.getItem("familyMemberUserId") ||
    localStorage.getItem("userId");

  // =========================================================
  // GET VERIFIED MOTHER / PATIENT ID
  // =========================================================

  const patientUserId =
    localStorage.getItem("patientUserId");

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    memberName: "",
    relationship: "",
    age: "",
    phoneNumber: "",
  });

  // =========================================================
  // LOADING STATES
  // =========================================================

  const [loadingUser, setLoadingUser] = useState(true);
  const [loading, setLoading] = useState(false);

  // =========================================================
  // LOAD FAMILY MEMBER REGISTERED INFORMATION
  // =========================================================

  useEffect(() => {
    const loadFamilyMemberData = async () => {
      try {
        // -----------------------------------------------------
        // CHECK USER ID
        // -----------------------------------------------------

        if (
          !userId ||
          userId === "null" ||
          userId === "undefined"
        ) {
          alert(
            "Your login session was not found. Please login again."
          );

          navigate("/login", {
            replace: true,
          });

          return;
        }

        console.log(
          "Loading registered family member information..."
        );

        console.log(
          "Family Member User ID:",
          userId
        );

        // -----------------------------------------------------
        // GET USER INFORMATION FROM DATABASE
        // -----------------------------------------------------
        // IMPORTANT:
        // withCredentials is removed because your backend
        // currently does not return:
        //
        // Access-Control-Allow-Credentials: true
        //
        // This was causing your CORS error.
        // -----------------------------------------------------

        const response = await axios.get(
          `http://localhost:8080/api/users/${userId}`
        );

        console.log(
          "========== REGISTERED USER DATA =========="
        );

        console.log(response.data);

        const data = response.data;

        // -----------------------------------------------------
        // GET NAME FROM DATABASE
        // -----------------------------------------------------

        const registeredName =
          data.fullName ??
          data.name ??
          data.memberName ??
          "";

        // -----------------------------------------------------
        // GET PHONE FROM DATABASE
        // -----------------------------------------------------

        const registeredPhone =
          data.mobile ??
          data.phone ??
          data.phoneNumber ??
          "";

        // -----------------------------------------------------
        // SET DATABASE VALUES
        // -----------------------------------------------------

        setFormData((previous) => ({
          ...previous,

          memberName: registeredName,

          phoneNumber: registeredPhone,
        }));

        console.log(
          "Family member name:",
          registeredName
        );

        console.log(
          "Family member phone:",
          registeredPhone
        );

      } catch (error) {
        console.error(
          "Unable to load family member information:",
          error
        );

        if (error.response) {
          console.error(
            "Backend status:",
            error.response.status
          );

          console.error(
            "Backend response:",
            error.response.data
          );
        }

        alert(
          "Unable to load your registered name and phone number. Please try again."
        );
      } finally {
        setLoadingUser(false);
      }
    };

    loadFamilyMemberData();
  }, [userId, navigate]);

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    // -------------------------------------------------------
    // AGE
    // -------------------------------------------------------

    if (name === "age") {
      const numericValue = value
        .replace(/\D/g, "")
        .slice(0, 3);

      setFormData((previous) => ({
        ...previous,
        age: numericValue,
      }));

      return;
    }

    // -------------------------------------------------------
    // RELATIONSHIP
    // -------------------------------------------------------

    if (name === "relationship") {
      setFormData((previous) => ({
        ...previous,
        relationship: value,
      }));

      return;
    }
  };

  // =========================================================
  // SUBMIT FORM
  // =========================================================

  const handleSubmit = async (e) => {
    e.preventDefault();

    // -------------------------------------------------------
    // CHECK LOGIN
    // -------------------------------------------------------

    if (!userId) {
      alert(
        "Your session has expired. Please login again."
      );

      navigate("/login");

      return;
    }

    // -------------------------------------------------------
    // CHECK MOTHER VERIFICATION
    // -------------------------------------------------------

    if (!patientUserId) {
      alert(
        "Mother verification is incomplete. Please verify the mother's email again."
      );

      navigate("/family-form");

      return;
    }

    // -------------------------------------------------------
    // GET VALUES
    // -------------------------------------------------------

    const memberName =
      formData.memberName.trim();

    const relationship =
      formData.relationship.trim();

    const age =
      formData.age.trim();

    const phoneNumber =
      formData.phoneNumber.trim();

    // -------------------------------------------------------
    // NAME VALIDATION
    // -------------------------------------------------------

    if (!memberName) {
      alert(
        "Family member name could not be loaded from the database."
      );

      return;
    }

    // -------------------------------------------------------
    // RELATIONSHIP VALIDATION
    // -------------------------------------------------------

    if (!relationship) {
      alert(
        "Please select your relationship with the mother."
      );

      return;
    }

    // -------------------------------------------------------
    // AGE VALIDATION
    // -------------------------------------------------------

    const numericAge = Number(age);

    if (
      !age ||
      Number.isNaN(numericAge) ||
      numericAge < 1 ||
      numericAge > 120
    ) {
      alert(
        "Please enter a valid age between 1 and 120."
      );

      return;
    }

    // -------------------------------------------------------
    // PHONE VALIDATION
    // -------------------------------------------------------

    if (!/^\d{10,15}$/.test(phoneNumber)) {
      alert(
        "Registered phone number is not valid."
      );

      return;
    }

    // -------------------------------------------------------
    // START LOADING
    // -------------------------------------------------------

    setLoading(true);

    try {
      // =====================================================
      // SAVE FAMILY MEMBER PROFILE
      // =====================================================

      const response = await axios.post(
        "http://localhost:8080/api/family-members/create-profile",
        {
          // -------------------------------------------------
          // FAMILY MEMBER LOGIN USER ID
          // -------------------------------------------------

          userId: Number(userId),

          // -------------------------------------------------
          // VERIFIED MOTHER USER ID
          // -------------------------------------------------

          patientUserId: Number(patientUserId),

          // -------------------------------------------------
          // THESE COME FROM DATABASE
          // -------------------------------------------------

          memberName: memberName,

          phoneNumber: phoneNumber,

          // -------------------------------------------------
          // THESE ARE ENTERED IN THIS FORM
          // -------------------------------------------------

          relationship: relationship,

          age: numericAge,
        }
      );

      console.log(
        "========== FAMILY MEMBER RESPONSE =========="
      );

      console.log(response.data);

      // =====================================================
      // SUCCESS
      // =====================================================

      if (
        response.status === 200 ||
        response.status === 201
      ) {
        const data = response.data;

        // ---------------------------------------------------
        // SAVE FAMILY MEMBER ID
        // ---------------------------------------------------

        if (data.familyMemberId) {
          localStorage.setItem(
            "familyMemberId",
            String(data.familyMemberId)
          );
        }

        // ---------------------------------------------------
        // SAVE INFORMATION
        // ---------------------------------------------------

        localStorage.setItem(
          "familyMemberName",
          memberName
        );

        localStorage.setItem(
          "familyMemberRelationship",
          relationship
        );

        localStorage.setItem(
          "familyMemberAge",
          String(numericAge)
        );

        localStorage.setItem(
          "familyMemberPhone",
          phoneNumber
        );

        // ---------------------------------------------------
        // PROFILE CREATED
        // ---------------------------------------------------

        localStorage.setItem(
          "familyProfileCreated",
          "true"
        );

        // ---------------------------------------------------
        // SUCCESS
        // ---------------------------------------------------

        alert(
          data.message ||
            "Family member profile created successfully!"
        );

        // ---------------------------------------------------
        // GO TO FAMILY DASHBOARD
        // ---------------------------------------------------

        navigate(
          "/family-dashboard",
          {
            replace: true,
          }
        );
      }

    } catch (error) {
      console.error(
        "Family Member Profile Error:",
        error
      );

      // -----------------------------------------------------
      // BACKEND ERROR
      // -----------------------------------------------------

      if (error.response) {
        console.log(
          "Backend Error:",
          error.response.data
        );

        if (
          typeof error.response.data === "string"
        ) {
          alert(
            error.response.data
          );
        } else {
          alert(
            error.response.data?.message ||
              "Unable to save family member details."
          );
        }

      }

      // -----------------------------------------------------
      // NETWORK ERROR
      // -----------------------------------------------------

      else if (error.request) {
        alert(
          "Unable to connect to Spring Boot backend.\n\n" +
            "Please make sure your backend is running on port 8080."
        );
      }

      // -----------------------------------------------------
      // OTHER ERROR
      // -----------------------------------------------------

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
  // LOADING SCREEN
  // =========================================================

  if (loadingUser) {
    return (
      <div className="fform1-page">

        <div className="fform1-card fform1-loading-card">

          <div className="fform1-icon">
            <FaUser />
          </div>

          <h1>
            Loading Your Information
          </h1>

          <p>
            Getting your registered name and
            phone number...
          </p>

          <div className="fform1-loading-spinner"></div>

        </div>

      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="fform1-page">

      {/* =====================================================
          BACK BUTTON
      ===================================================== */}

      <button
        type="button"
        className="fform1-back-btn"
        onClick={() => navigate(-1)}
      >
        <FaArrowLeft />

        <span>
          Back
        </span>
      </button>

      {/* =====================================================
          CARD
      ===================================================== */}

      <div className="fform1-card">

        {/* ===================================================
            HEADER
        =================================================== */}

        <div className="fform1-header">

          <div className="fform1-icon">
            <FaUser />
          </div>

          <h1>
            Family Member Profile
          </h1>

          <p>
            Your registered information has been
            automatically loaded. Just complete
            the remaining details.
          </p>

        </div>

        {/* ===================================================
            SECURITY INFORMATION
        =================================================== */}

        <div className="fform1-security">

          <FaShieldAlt />

          <p>
            Your name and phone number are taken
            directly from your registered account.
            They cannot be changed here.
          </p>

        </div>

        {/* ===================================================
            FORM
        =================================================== */}

        <form
          className="fform1-form"
          onSubmit={handleSubmit}
        >

          {/* =================================================
              FULL NAME - DATABASE
          ================================================= */}

          <div className="fform1-input-group">

            <label htmlFor="memberName">
              Full Name
            </label>

            <div className="fform1-input-box fform1-readonly-box">

              <FaUser
                className="fform1-input-icon"
              />

              <input
                id="memberName"
                type="text"
                name="memberName"
                value={formData.memberName}
                readOnly
                disabled
                autoComplete="name"
              />

              <span className="fform1-db-badge">
                From Account
              </span>

            </div>

          </div>

          {/* =================================================
              RELATIONSHIP - USER ENTERS
          ================================================= */}

          <div className="fform1-input-group">

            <label htmlFor="relationship">
              Relationship with Mother
            </label>

            <div className="fform1-input-box">

              <FaUsers
                className="fform1-input-icon"
              />

              <select
                id="relationship"
                name="relationship"
                value={formData.relationship}
                onChange={handleChange}
                required
              >

                <option value="">
                  Select your relationship
                </option>

                <option value="Husband">
                  Husband
                </option>

                <option value="Father">
                  Father
                </option>

                <option value="Mother">
                  Mother
                </option>

                <option value="Brother">
                  Brother
                </option>

                <option value="Sister">
                  Sister
                </option>

                <option value="Son">
                  Son
                </option>

                <option value="Daughter">
                  Daughter
                </option>

                <option value="Other Family Member">
                  Other Family Member
                </option>

              </select>

            </div>

          </div>

          {/* =================================================
              AGE - USER ENTERS
          ================================================= */}

          <div className="fform1-input-group">

            <label htmlFor="age">
              Age
            </label>

            <div className="fform1-input-box">

              <FaBirthdayCake
                className="fform1-input-icon"
              />

              <input
                id="age"
                type="text"
                name="age"
                placeholder="Enter your age"
                value={formData.age}
                onChange={handleChange}
                inputMode="numeric"
                maxLength={3}
                required
              />

            </div>

          </div>

          {/* =================================================
              PHONE NUMBER - DATABASE
          ================================================= */}

          <div className="fform1-input-group">

            <label htmlFor="phoneNumber">
              Phone Number
            </label>

            <div className="fform1-input-box fform1-readonly-box">

              <FaPhone
                className="fform1-input-icon"
              />

              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                value={formData.phoneNumber}
                readOnly
                disabled
                autoComplete="tel"
              />

              <span className="fform1-db-badge">
                From Account
              </span>

            </div>

          </div>

          {/* =================================================
              INFORMATION MESSAGE
          ================================================= */}

          <div className="fform1-auto-info">

            <FaShieldAlt />

            <span>
              Name and phone number are automatically
              taken from your registration details.
            </span>

          </div>

          {/* =================================================
              SUBMIT BUTTON
          ================================================= */}

          <button
            type="submit"
            className="fform1-submit-btn"
            disabled={loading}
          >

            <FaCheckCircle />

            <span>
              {loading
                ? "Saving Profile..."
                : "Complete Profile"}
            </span>

          </button>

        </form>

      </div>

    </div>
  );
}

export default FForm1;