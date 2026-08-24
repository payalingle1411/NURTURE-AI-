import React, { useState } from "react";
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
  // GET LOGGED-IN USER ID
  // =========================================================

  const userId = localStorage.getItem("userId");

  // =========================================================
  // FORM STATE
  // =========================================================

  const [formData, setFormData] = useState({
    memberName: "",
    relationship: "",
    age: "",
    phoneNumber: "",
  });

  const [loading, setLoading] = useState(false);

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
    // PHONE NUMBER
    // -------------------------------------------------------

    if (name === "phoneNumber") {
      const numericValue = value
        .replace(/\D/g, "")
        .slice(0, 15);

      setFormData((previous) => ({
        ...previous,
        phoneNumber: numericValue,
      }));

      return;
    }

    // -------------------------------------------------------
    // OTHER FIELDS
    // -------------------------------------------------------

    setFormData((previous) => ({
      ...previous,
      [name]: value,
    }));
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
    // TRIM VALUES
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
        "Please enter your full name."
      );

      return;
    }

    if (memberName.length < 2) {
      alert(
        "Please enter a valid name."
      );

      return;
    }

    // -------------------------------------------------------
    // RELATIONSHIP VALIDATION
    // -------------------------------------------------------

    if (!relationship) {
      alert(
        "Please select your relationship."
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
        "Please enter a valid phone number."
      );

      return;
    }

    setLoading(true);

    try {
      // =====================================================
      // SAVE FAMILY MEMBER DETAILS
      // =====================================================

      const response = await axios.post(
        "http://localhost:8080/api/family-members/details",
        {
          userId: Number(userId),

          memberName: memberName,

          relationship: relationship,

          age: numericAge,

          phoneNumber: phoneNumber,
        },
        {
          withCredentials: true,
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
        // SAVE FAMILY MEMBER INFORMATION LOCALLY
        // ---------------------------------------------------

        if (data.familyMemberId) {
          localStorage.setItem(
            "familyMemberId",
            String(data.familyMemberId)
          );
        }

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

        localStorage.setItem(
          "familyProfileCreated",
          "true"
        );

        // ---------------------------------------------------
        // SUCCESS MESSAGE
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
            "Unable to save family member details."
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
            Tell us a little about yourself to
            complete your Nurture AI family profile.
          </p>

        </div>


        {/* ===================================================
            SECURITY INFORMATION
        =================================================== */}

        <div className="fform1-security">

          <FaShieldAlt />

          <p>
            Your information is securely stored
            and used only to provide your
            personalized family support experience.
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
              FULL NAME
          ================================================= */}

          <div className="fform1-input-group">

            <label htmlFor="memberName">
              Full Name
            </label>

            <div className="fform1-input-box">

              <FaUser
                className="fform1-input-icon"
              />

              <input
                id="memberName"
                type="text"
                name="memberName"
                placeholder="Enter your full name"
                value={formData.memberName}
                onChange={handleChange}
                autoComplete="name"
                maxLength={100}
                required
              />

            </div>

          </div>


          {/* =================================================
              RELATIONSHIP
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
              AGE
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
              PHONE NUMBER
          ================================================= */}

          <div className="fform1-input-group">

            <label htmlFor="phoneNumber">
              Phone Number
            </label>

            <div className="fform1-input-box">

              <FaPhone
                className="fform1-input-icon"
              />

              <input
                id="phoneNumber"
                type="tel"
                name="phoneNumber"
                placeholder="Enter your phone number"
                value={formData.phoneNumber}
                onChange={handleChange}
                inputMode="numeric"
                autoComplete="tel"
                maxLength={15}
                required
              />

            </div>

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