import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  savePersonalInfo,
  getPersonalInfo,
  updatePersonalInfo,
} from "../../../services/profileApi";

import "./PersonalInfo.css";

const PersonalInfo = () => {
  const navigate = useNavigate();

  // =========================================================
  // STATES
  // =========================================================

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [profileExists, setProfileExists] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    dateOfBirth: "",
    age: "",
    heightCm: "",
    weightKg: "",
    bloodGroup: "",
    country: "",
    state: "",
    city: "",
    address: "",
    pincode: "",
    profilePicture: "",
  });

  // =========================================================
  // GET USER ID
  // =========================================================

  const getUserId = () => {
    return (
      localStorage.getItem("userId") ||
      sessionStorage.getItem("userId")
    );
  };

  // =========================================================
  // SESSION STORAGE KEY
  // =========================================================

  const getStorageKey = () => {
    const userId = getUserId();

    if (!userId) {
      return null;
    }

    return `personalInfo_${userId}`;
  };

  // =========================================================
  // SAVE FORM DATA LOCALLY
  // =========================================================

  const saveToSession = (data) => {
    try {
      const key = getStorageKey();

      if (!key) {
        return;
      }

      sessionStorage.setItem(
        key,
        JSON.stringify(data)
      );

      console.log(
        "Personal information saved to session storage"
      );

    } catch (error) {
      console.error(
        "Session storage error:",
        error
      );
    }
  };

  // =========================================================
  // GET FORM DATA FROM SESSION
  // =========================================================

  const getFromSession = () => {
    try {
      const key = getStorageKey();

      if (!key) {
        return null;
      }

      const savedData =
        sessionStorage.getItem(key);

      if (!savedData) {
        return null;
      }

      return JSON.parse(savedData);

    } catch (error) {
      console.error(
        "Unable to read session data:",
        error
      );

      return null;
    }
  };

  // =========================================================
  // CALCULATE AGE
  // =========================================================

  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) {
      return "";
    }

    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age =
      today.getFullYear() -
      dob.getFullYear();

    const monthDiff =
      today.getMonth() -
      dob.getMonth();

    if (
      monthDiff < 0 ||
      (
        monthDiff === 0 &&
        today.getDate() < dob.getDate()
      )
    ) {
      age--;
    }

    return age >= 0 ? age : "";
  };

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDateForInput = (date) => {
    if (!date) {
      return "";
    }

    if (
      typeof date === "string" &&
      /^\d{4}-\d{2}-\d{2}$/.test(date)
    ) {
      return date;
    }

    const parsedDate = new Date(date);

    if (isNaN(parsedDate.getTime())) {
      return "";
    }

    return parsedDate
      .toISOString()
      .split("T")[0];
  };

  // =========================================================
  // LOAD PERSONAL INFORMATION
  // =========================================================

  useEffect(() => {
    loadPersonalInfo();
  }, []);

  const loadPersonalInfo = async () => {
    const userId = getUserId();

    if (!userId) {
      setError(
        "User not found. Please login again."
      );

      setFetching(false);

      return;
    }

    try {
      setFetching(true);
      setError("");

      console.log(
        "Loading personal information for user:",
        userId
      );

      // =====================================================
      // FIRST TRY BACKEND
      // =====================================================

      try {
        const response =
          await getPersonalInfo(
            Number(userId)
          );

        console.log(
          "Personal information API response:",
          response?.data
        );

        const data =
          response?.data?.data ??
          response?.data;

        // ===================================================
        // DATABASE DATA FOUND
        // ===================================================

        if (
          data &&
          typeof data === "object" &&
          !Array.isArray(data)
        ) {
          const loadedData = {
            dateOfBirth:
              formatDateForInput(
                data.dateOfBirth
              ),

            age:
              data.age ??
              calculateAge(
                data.dateOfBirth
              ),

            heightCm:
              data.heightCm ?? "",

            weightKg:
              data.weightKg ?? "",

            bloodGroup:
              data.bloodGroup ?? "",

            country:
              data.country ?? "",

            state:
              data.state ?? "",

            city:
              data.city ?? "",

            address:
              data.address ?? "",

            pincode:
              data.pincode ?? "",

            profilePicture:
              data.profilePicture ?? "",
          };

          setFormData(loadedData);

          // Keep local copy synchronized
          saveToSession(loadedData);

          setProfileExists(true);

          console.log(
            "Personal information loaded from DATABASE"
          );

          return;
        }

      } catch (apiError) {

        // ===================================================
        // 404 = PROFILE NOT FOUND
        // ===================================================

        if (
          apiError.response?.status === 404
        ) {
          console.log(
            "Personal profile API returned 404. Checking session storage..."
          );
        } else {
          throw apiError;
        }
      }

      // =====================================================
      // BACKEND DATA NOT FOUND
      // CHECK SESSION STORAGE
      // =====================================================

      const localData =
        getFromSession();

      if (localData) {

        console.log(
          "Personal information loaded from SESSION STORAGE"
        );

        setFormData({
          dateOfBirth:
            localData.dateOfBirth || "",

          age:
            localData.age || "",

          heightCm:
            localData.heightCm || "",

          weightKg:
            localData.weightKg || "",

          bloodGroup:
            localData.bloodGroup || "",

          country:
            localData.country || "",

          state:
            localData.state || "",

          city:
            localData.city || "",

          address:
            localData.address || "",

          pincode:
            localData.pincode || "",

          profilePicture:
            localData.profilePicture || "",
        });

        setProfileExists(true);

        return;
      }

      // =====================================================
      // NO DATABASE + NO SESSION DATA
      // =====================================================

      console.log(
        "No personal information found"
      );

      setProfileExists(false);

    } catch (err) {

      console.error(
        "Load personal information error:",
        err
      );

      setError(
        "Unable to load your personal information."
      );

    } finally {

      setFetching(false);

    }
  };

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    setError("");

    let updatedData;

    if (name === "dateOfBirth") {

      updatedData = {
        ...formData,

        dateOfBirth: value,

        age: calculateAge(value),
      };

    } else {

      updatedData = {
        ...formData,

        [name]: value,
      };
    }

    setFormData(updatedData);

    // =======================================================
    // IMPORTANT:
    // SAVE EVERY CHANGE TO SESSION STORAGE
    // =======================================================

    saveToSession(updatedData);
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validateForm = () => {

    if (!formData.dateOfBirth) {

      setError(
        "Please select your date of birth."
      );

      return false;
    }

    if (
      !formData.heightCm ||
      Number(formData.heightCm) <= 0
    ) {

      setError(
        "Please enter a valid height."
      );

      return false;
    }

    if (
      !formData.weightKg ||
      Number(formData.weightKg) <= 0
    ) {

      setError(
        "Please enter a valid weight."
      );

      return false;
    }

    if (!formData.bloodGroup) {

      setError(
        "Please select your blood group."
      );

      return false;
    }

    if (!formData.country.trim()) {

      setError(
        "Please enter your country."
      );

      return false;
    }

    if (!formData.state.trim()) {

      setError(
        "Please enter your state."
      );

      return false;
    }

    if (!formData.city.trim()) {

      setError(
        "Please enter your city."
      );

      return false;
    }

    if (!formData.address.trim()) {

      setError(
        "Please enter your address."
      );

      return false;
    }

    if (
      !/^\d{6}$/.test(
        formData.pincode
      )
    ) {

      setError(
        "Please enter a valid 6-digit pincode."
      );

      return false;
    }

    setError("");

    return true;
  };

  // =========================================================
  // SAVE / UPDATE
  // =========================================================

  const handleSubmit = async (e) => {

    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userId = getUserId();

    if (!userId) {

      setError(
        "User not found. Please login again."
      );

      return;
    }

    try {

      setLoading(true);
      setError("");

      const request = {

        userId:
          Number(userId),

        dateOfBirth:
          formData.dateOfBirth,

        age:
          Number(formData.age),

        heightCm:
          Number(formData.heightCm),

        weightKg:
          Number(formData.weightKg),

        bloodGroup:
          formData.bloodGroup,

        country:
          formData.country.trim(),

        state:
          formData.state.trim(),

        city:
          formData.city.trim(),

        address:
          formData.address.trim(),

        pincode:
          formData.pincode,

        profilePicture:
          formData.profilePicture || "",
      };

      console.log(
        "Personal Information Request:",
        request
      );

      // =====================================================
      // UPDATE EXISTING PROFILE
      // =====================================================

      if (profileExists) {

        await updatePersonalInfo(
          Number(userId),
          request
        );

        alert(
          "Personal information updated successfully!"
        );

      }

      // =====================================================
      // CREATE NEW PROFILE
      // =====================================================

      else {

        await savePersonalInfo(
          request
        );

        setProfileExists(true);

        alert(
          "Personal information saved successfully!"
        );
      }

      // =====================================================
      // VERY IMPORTANT
      // SAVE LATEST DATA LOCALLY
      // =====================================================

      saveToSession({
        dateOfBirth:
          formData.dateOfBirth,

        age:
          formData.age,

        heightCm:
          formData.heightCm,

        weightKg:
          formData.weightKg,

        bloodGroup:
          formData.bloodGroup,

        country:
          formData.country,

        state:
          formData.state,

        city:
          formData.city,

        address:
          formData.address,

        pincode:
          formData.pincode,

        profilePicture:
          formData.profilePicture,
      });

      // =====================================================
      // GO TO PREGNANCY DETAILS
      // =====================================================

      navigate(
        "/pregnancy-details"
      );

    } catch (err) {

      console.error(
        "Personal information error:",
        err
      );

      if (err.response) {

        setError(
          err.response.data?.message ||
          "Unable to save personal information."
        );

      } else if (err.request) {

        setError(
          "Unable to connect to backend server. Please check your backend connection."
        );

      } else {

        setError(
          "Something went wrong. Please try again."
        );
      }

    } finally {

      setLoading(false);

    }
  };

  // =========================================================
  // BACK BUTTON
  // =========================================================

  const handleBack = () => {

    /*
     * Before going back, save the current form.
     *
     * Therefore, if the user has typed something
     * but has not submitted yet, it will still
     * appear when they return.
     */

    saveToSession(formData);

    navigate("/dashboard");

  };

  // =========================================================
  // SKIP
  // =========================================================

  const handleSkip = () => {

    const confirmSkip =
      window.confirm(
        "You can complete your personal information later. Do you want to skip?"
      );

    if (confirmSkip) {

      navigate("/dashboard", {
        replace: true,
      });

    }
  };

  // =========================================================
  // LOADING
  // =========================================================

  if (fetching) {

    return (
      <div className="personal-loading">

        <div className="loading-spinner"></div>

        <p>
          Loading your profile...
        </p>

      </div>
    );
  }

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="personal-page">

      <div className="personal-card">

        {/* HEADER */}

        <div className="personal-header">

          <div className="header-icon">
            👤
          </div>

          <h1>
            Personal Information
          </h1>

          <p>
            Tell us a little about yourself so
            Nurture AI can personalize your
            pregnancy journey.
          </p>

          <div className="personal-quote">

            <span>“</span>

            Every mother deserves care that feels
            personal, supportive, and informed.

          </div>

          {profileExists && (

            <div className="profile-status">

              ✓ Your information is already saved.
              You can review or update it below.

            </div>

          )}

        </div>

        {/* ERROR */}

        {error && (

          <div className="error-message">

            <span>⚠</span>

            {error}

          </div>

        )}

        {/* FORM */}

        <form onSubmit={handleSubmit}>

          {/* DATE OF BIRTH */}

          <div className="form-group">

            <label>
              Date of Birth
              <span>*</span>
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={
                formData.dateOfBirth
              }
              onChange={handleChange}
              max={
                new Date()
                  .toISOString()
                  .split("T")[0]
              }
            />

          </div>

          {/* AGE */}

          <div className="form-group">

            <label>
              Age
            </label>

            <div className="readonly-input">

              {formData.age
                ? `${formData.age} Years`
                : "Automatically calculated"}

            </div>

          </div>

          {/* HEIGHT / WEIGHT */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Height (cm)
                <span>*</span>
              </label>

              <input
                type="number"
                name="heightCm"
                placeholder="Enter height"
                value={
                  formData.heightCm
                }
                onChange={handleChange}
                min="1"
                max="250"
              />

            </div>

            <div className="form-group">

              <label>
                Weight (kg)
                <span>*</span>
              </label>

              <input
                type="number"
                name="weightKg"
                placeholder="Enter weight"
                value={
                  formData.weightKg
                }
                onChange={handleChange}
                min="1"
                max="300"
                step="0.1"
              />

            </div>

          </div>

          {/* BLOOD GROUP */}

          <div className="form-group">

            <label>
              Blood Group
              <span>*</span>
            </label>

            <select
              name="bloodGroup"
              value={
                formData.bloodGroup
              }
              onChange={handleChange}
            >

              <option value="">
                Select Blood Group
              </option>

              <option value="A+">A+</option>
              <option value="A-">A-</option>
              <option value="B+">B+</option>
              <option value="B-">B-</option>
              <option value="AB+">AB+</option>
              <option value="AB-">AB-</option>
              <option value="O+">O+</option>
              <option value="O-">O-</option>

            </select>

          </div>

          {/* LOCATION */}

          <div className="section-title">

            <span>📍</span>

            Location Details

          </div>

          {/* COUNTRY */}

          <div className="form-group">

            <label>
              Country
              <span>*</span>
            </label>

            <input
              type="text"
              name="country"
              placeholder="Enter country"
              value={
                formData.country
              }
              onChange={handleChange}
            />

          </div>

          {/* STATE / CITY */}

          <div className="form-row">

            <div className="form-group">

              <label>
                State
                <span>*</span>
              </label>

              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={
                  formData.state
                }
                onChange={handleChange}
              />

            </div>

            <div className="form-group">

              <label>
                City
                <span>*</span>
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={
                  formData.city
                }
                onChange={handleChange}
              />

            </div>

          </div>

          {/* ADDRESS */}

          <div className="form-group">

            <label>
              Address
              <span>*</span>
            </label>

            <textarea
              name="address"
              placeholder="House No., Street, Area"
              value={
                formData.address
              }
              onChange={handleChange}
              rows="4"
            />

          </div>

          {/* PINCODE */}

          <div className="form-group">

            <label>
              Pincode
              <span>*</span>
            </label>

            <input
              type="text"
              name="pincode"
              placeholder="Enter 6-digit pincode"
              value={
                formData.pincode
              }
              onChange={(e) => {

                const value =
                  e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 6);

                const updatedData = {
                  ...formData,
                  pincode: value,
                };

                setFormData(
                  updatedData
                );

                saveToSession(
                  updatedData
                );

              }}
            />

          </div>

          {/* BUTTONS */}

          <div className="button-container">

            <button
              type="button"
              className="back-button"
              onClick={handleBack}
              disabled={loading}
            >
              ← Back
            </button>

            <button
              type="button"
              className="skip-button"
              onClick={handleSkip}
              disabled={loading}
            >
              Skip
            </button>

            <button
              type="submit"
              className="next-button"
              disabled={loading}
            >

              {loading ? (

                <>
                  <span className="button-spinner"></span>
                  Saving...
                </>

              ) : (

                <>
                  {profileExists
                    ? "Update & Continue"
                    : "Save & Continue"}

                  <span>
                    →
                  </span>
                </>

              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default PersonalInfo;