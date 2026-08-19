import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { savePersonalInfo, getPersonalInfo } from "../../../services/profileApi";
import "./PersonalInfo.css";

const PersonalInfo = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);
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

  // Get logged-in user ID
  const getUserId = () => {
    return (
      localStorage.getItem("userId") ||
      sessionStorage.getItem("userId")
    );
  };

  // Calculate age from DOB
  const calculateAge = (dateOfBirth) => {
    if (!dateOfBirth) return "";

    const dob = new Date(dateOfBirth);
    const today = new Date();

    let age = today.getFullYear() - dob.getFullYear();

    const monthDiff = today.getMonth() - dob.getMonth();

    if (
      monthDiff < 0 ||
      (monthDiff === 0 && today.getDate() < dob.getDate())
    ) {
      age--;
    }

    return age >= 0 ? age : "";
  };

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "dateOfBirth") {
      setFormData((prev) => ({
        ...prev,
        dateOfBirth: value,
        age: calculateAge(value),
      }));

      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Load existing personal information
  useEffect(() => {
    const loadPersonalInfo = async () => {
      const userId = getUserId();

      if (!userId) {
        setFetching(false);
        setError("User not found. Please login again.");
        return;
      }

      try {
        const response = await getPersonalInfo(userId);

        // Adjust this depending on your Spring Boot response structure
        const data = response?.data?.data || response?.data;

        if (data) {
          setFormData({
            dateOfBirth: data.dateOfBirth || "",
            age: data.age || "",
            heightCm: data.heightCm || "",
            weightKg: data.weightKg || "",
            bloodGroup: data.bloodGroup || "",
            country: data.country || "",
            state: data.state || "",
            city: data.city || "",
            address: data.address || "",
            pincode: data.pincode || "",
            profilePicture: data.profilePicture || "",
          });
        }
      } catch (err) {
        // If profile does not exist yet, don't block the form.
        console.log("Personal information not found:", err);
      } finally {
        setFetching(false);
      }
    };

    loadPersonalInfo();
  }, []);

  // Validate form
  const validateForm = () => {
    if (!formData.dateOfBirth) {
      setError("Please select your date of birth.");
      return false;
    }

    if (!formData.heightCm) {
      setError("Please enter your height.");
      return false;
    }

    if (!formData.weightKg) {
      setError("Please enter your weight.");
      return false;
    }

    if (!formData.bloodGroup) {
      setError("Please select your blood group.");
      return false;
    }

    if (!formData.country.trim()) {
      setError("Please enter your country.");
      return false;
    }

    if (!formData.state.trim()) {
      setError("Please enter your state.");
      return false;
    }

    if (!formData.city.trim()) {
      setError("Please enter your city.");
      return false;
    }

    if (!formData.address.trim()) {
      setError("Please enter your address.");
      return false;
    }

    if (!/^\d{6}$/.test(formData.pincode)) {
      setError("Please enter a valid 6-digit pincode.");
      return false;
    }

    setError("");
    return true;
  };

  // Save personal information
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    const userId = getUserId();

    if (!userId) {
      setError("User not found. Please login again.");
      return;
    }

    try {
      setLoading(true);
      setError("");

      const request = {
        userId: Number(userId),

        dateOfBirth: formData.dateOfBirth,
        age: Number(formData.age),
        heightCm: Number(formData.heightCm),
        weightKg: Number(formData.weightKg),

        bloodGroup: formData.bloodGroup,

        country: formData.country.trim(),
        state: formData.state.trim(),
        city: formData.city.trim(),
        address: formData.address.trim(),
        pincode: formData.pincode,

        profilePicture: formData.profilePicture || "",
      };

      console.log("Personal Info Request:", request);

      await savePersonalInfo(request);

      alert("Personal information saved successfully!");

      // Continue to pregnancy details
      navigate("/pregnancy-details");
    } catch (err) {
      console.error("Save personal information error:", err);

      if (err.response) {
        setError(
          err.response.data?.message ||
            "Unable to save personal information."
        );
      } else if (err.request) {
        setError(
          "Unable to connect to the backend server. Please check your backend connection."
        );
      } else {
        setError("Something went wrong. Please try again.");
      }
    } finally {
      setLoading(false);
    }
  };

  // Skip profile
  const handleSkip = () => {
    const confirmSkip = window.confirm(
      "You can complete your profile later. Do you want to skip?"
    );

    if (confirmSkip) {
      navigate("/home", { replace: true });
    }
  };

  if (fetching) {
    return (
      <div className="personal-loading">
        <div className="loading-spinner"></div>
        <p>Loading your profile...</p>
      </div>
    );
  }

  return (
    <div className="personal-page">

      <div className="personal-card">

        {/* Header */}
        <div className="personal-header">
  <div className="header-icon">
    👤
  </div>

  <h1>Personal Information</h1>

  <p>
    Tell us a little about yourself so Nurture AI can
    personalize your pregnancy journey.
  </p>

  <div className="personal-quote">
    <span>“</span>
    Every mother deserves care that feels personal, supportive,
    and informed.
  </div>
</div>

        {/* Error */}
        {error && (
          <div className="error-message">
            <span>⚠</span>
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit}>

          {/* Date of Birth */}
          <div className="form-group">
            <label>
              Date of Birth <span>*</span>
            </label>

            <input
              type="date"
              name="dateOfBirth"
              value={formData.dateOfBirth}
              onChange={handleChange}
              max={new Date().toISOString().split("T")[0]}
            />
          </div>

          {/* Age */}
          <div className="form-group">
            <label>Age</label>

            <div className="readonly-input">
              {formData.age
                ? `${formData.age} Years`
                : "Automatically calculated"}
            </div>
          </div>

          {/* Height + Weight */}
          <div className="form-row">

            <div className="form-group">
              <label>
                Height (cm) <span>*</span>
              </label>

              <input
                type="number"
                name="heightCm"
                placeholder="Enter height"
                value={formData.heightCm}
                onChange={handleChange}
                min="1"
                max="250"
              />
            </div>

            <div className="form-group">
              <label>
                Weight (kg) <span>*</span>
              </label>

              <input
                type="number"
                name="weightKg"
                placeholder="Enter weight"
                value={formData.weightKg}
                onChange={handleChange}
                min="1"
                max="300"
                step="0.1"
              />
            </div>

          </div>

          {/* Blood Group */}
          <div className="form-group">
            <label>
              Blood Group <span>*</span>
            </label>

            <select
              name="bloodGroup"
              value={formData.bloodGroup}
              onChange={handleChange}
            >
              <option value="">Select Blood Group</option>
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

          {/* Location */}
          <div className="section-title">
            <span>📍</span>
            Location Details
          </div>

          {/* Country */}
          <div className="form-group">
            <label>
              Country <span>*</span>
            </label>

            <input
              type="text"
              name="country"
              placeholder="Enter country"
              value={formData.country}
              onChange={handleChange}
            />
          </div>

          {/* State + City */}
          <div className="form-row">

            <div className="form-group">
              <label>
                State <span>*</span>
              </label>

              <input
                type="text"
                name="state"
                placeholder="Enter state"
                value={formData.state}
                onChange={handleChange}
              />
            </div>

            <div className="form-group">
              <label>
                City <span>*</span>
              </label>

              <input
                type="text"
                name="city"
                placeholder="Enter city"
                value={formData.city}
                onChange={handleChange}
              />
            </div>

          </div>

          {/* Address */}
          <div className="form-group">
            <label>
              Address <span>*</span>
            </label>

            <textarea
              name="address"
              placeholder="House No., Street, Area"
              value={formData.address}
              onChange={handleChange}
              rows="4"
            />
          </div>

          {/* Pincode */}
          <div className="form-group">
            <label>
              Pincode <span>*</span>
            </label>

            <input
              type="text"
              name="pincode"
              placeholder="Enter 6-digit pincode"
              value={formData.pincode}
              onChange={(e) => {
                const value = e.target.value
                  .replace(/\D/g, "")
                  .slice(0, 6);

                setFormData((prev) => ({
                  ...prev,
                  pincode: value,
                }));
              }}
            />
          </div>

          {/* Buttons */}
          <div className="button-container">

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
                "Save & Continue →"
              )}
            </button>

          </div>

        </form>
      </div>
    </div>
  );
};

export default PersonalInfo;