import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getPregnancyDetails, savePregnancyDetails, updatePregnancyDetails } from "../../../services/pregnancyApi";
import "./PregnancyDetails.css";

const PersonalDetails = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [profileExists, setProfileExists] = useState(false);

  const [formData, setFormData] = useState({
    dueDate: "",
    pregnancyWeek: 0,
    trimester: "",

    lastMenstrualPeriod: "",
    pregnancyType: "Natural",
    babyCount: 1,

    firstPregnancy: true,
    previousPregnancies: 0,
    liveBirths: 0,
    miscarriages: 0,

    highRisk: false,
    ivfPregnancy: false,
    multiplePregnancy: false,

    doctorNotes: "",
  });

  // =========================================================
  // LOAD EXISTING PROFILE
  // =========================================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    try {
      const userId = localStorage.getItem("userId");

      if (!userId) {
        return;
      }

      const response = await getPregnancyDetails(Number(userId));

      if (response.data) {
        setProfileExists(true);

        setFormData({
          ...formData,
          ...response.data,
        });
      }
    } catch (error) {
      console.log("No existing pregnancy profile found.");
    }
  };

  // =========================================================
  // CALCULATE PREGNANCY WEEK
  // =========================================================

  const calculateWeek = (dueDate) => {
    const today = new Date();

    const totalPregnancyDays = 280;

    const remainingDays = Math.ceil(
      (dueDate.getTime() - today.getTime()) /
        (1000 * 60 * 60 * 24)
    );

    const completedDays =
      totalPregnancyDays - remainingDays;

    let week = Math.floor(completedDays / 7);

    if (week < 1) {
      week = 1;
    }

    if (week > 40) {
      week = 40;
    }

    return week;
  };

  // =========================================================
  // GET TRIMESTER
  // =========================================================

  const getTrimester = (week) => {
    if (week <= 13) {
      return "First Trimester";
    }

    if (week <= 27) {
      return "Second Trimester";
    }

    return "Third Trimester";
  };

  // =========================================================
  // HANDLE INPUT CHANGE
  // =========================================================

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // =========================================================
  // DUE DATE CHANGE
  // =========================================================

  const handleDueDateChange = (e) => {
    const value = e.target.value;

    if (!value) {
      setFormData((prev) => ({
        ...prev,
        dueDate: "",
        pregnancyWeek: 0,
        trimester: "",
      }));

      return;
    }

    const date = new Date(value);

    const week = calculateWeek(date);

    setFormData((prev) => ({
      ...prev,
      dueDate: value,
      pregnancyWeek: week,
      trimester: getTrimester(week),
    }));
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validate = () => {
    if (!formData.dueDate) {
      alert("Please select Due Date.");
      return false;
    }

    if (!formData.lastMenstrualPeriod) {
      alert("Please select Last Menstrual Period.");
      return false;
    }

    if (Number(formData.babyCount) < 1) {
      alert("Baby count must be at least 1.");
      return false;
    }

    return true;
  };

  // =========================================================
  // SAVE / UPDATE
  // =========================================================

  const handleSave = async (e) => {
    e.preventDefault();

    if (!validate()) {
      return;
    }

    try {
      setLoading(true);

      const userId = localStorage.getItem("userId");

      if (!userId) {
        alert("Please login again.");
        return;
      }

      const request = {
        ...formData,

        userId: Number(userId),

        babyCount: Number(formData.babyCount),
        previousPregnancies: Number(
          formData.previousPregnancies
        ),
        liveBirths: Number(formData.liveBirths),
        miscarriages: Number(formData.miscarriages),

        firstPregnancy:
          formData.firstPregnancy === true ||
          formData.firstPregnancy === "true",

        highRisk:
          formData.highRisk === true ||
          formData.highRisk === "true",

        ivfPregnancy:
          formData.ivfPregnancy === true ||
          formData.ivfPregnancy === "true",

        multiplePregnancy:
          formData.multiplePregnancy === true ||
          formData.multiplePregnancy === "true",
      };

      console.log("Pregnancy Request:", request);

      if (profileExists) {
        await updatePregnancyDetails(
          Number(userId),
          request
        );

        alert(
          "Pregnancy profile updated successfully."
        );
      } else {
        await savePregnancyDetails(request);

        alert(
          "Pregnancy profile saved successfully."
        );
      }

      navigate("/home");

    } catch (error) {
      console.error(error);

      alert(
        "Unable to save pregnancy details. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // SKIP
  // =========================================================

  const handleSkip = () => {
    navigate("/home");
  };

  // =========================================================
  // UI
  // =========================================================

  return (
    <div className="personal-page">

      <div className="personal-card">

        {/* =====================================================
            HEADER
        ===================================================== */}

        <div className="personal-header">

          <div className="header-icon">
            🤰
          </div>

          <h1>
            Pregnancy Details
          </h1>

          <p>
            Help Nurture AI understand your pregnancy
            journey so we can provide more personalized
            care and support.
          </p>

          <div className="personal-quote">
            <span>“</span>
            Every pregnancy is a beautiful journey.
            Let us walk beside you with care, comfort
            and confidence.
          </div>

        </div>

        {/* =====================================================
            FORM
        ===================================================== */}

        <form onSubmit={handleSave}>

          {/* ===================================================
              PREGNANCY DATES
          =================================================== */}

          <div className="section-title">
            <span>📅</span>
            Pregnancy Timeline
          </div>

          <div className="form-row">

            {/* Due Date */}

            <div className="form-group">

              <label>
                Due Date
                <span>*</span>
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={handleDueDateChange}
              />

            </div>

            {/* LMP */}

            <div className="form-group">

              <label>
                Last Menstrual Period
                <span>*</span>
              </label>

              <input
                type="date"
                name="lastMenstrualPeriod"
                value={
                  formData.lastMenstrualPeriod
                }
                onChange={handleChange}
              />

            </div>

          </div>

          {/* ===================================================
              PREGNANCY WEEK / TRIMESTER
          =================================================== */}

          <div className="form-row">

            <div className="form-group">

              <label>
                Pregnancy Week
              </label>

              <div className="readonly-input">
                {formData.pregnancyWeek
                  ? `Week ${formData.pregnancyWeek}`
                  : "Automatically calculated"}
              </div>

            </div>

            <div className="form-group">

              <label>
                Trimester
              </label>

              <div className="readonly-input">
                {formData.trimester ||
                  "Automatically calculated"}
              </div>

            </div>

          </div>

          {/* ===================================================
              PREGNANCY INFORMATION
          =================================================== */}

          <div className="section-title">
            <span>🌸</span>
            Pregnancy Information
          </div>

          <div className="form-row">

            {/* Pregnancy Type */}

            <div className="form-group">

              <label>
                Pregnancy Type
              </label>

              <select
                name="pregnancyType"
                value={
                  formData.pregnancyType
                }
                onChange={handleChange}
              >

                <option value="Natural">
                  Natural
                </option>

                <option value="IVF">
                  IVF
                </option>

              </select>

            </div>

            {/* Baby Count */}

            <div className="form-group">

              <label>
                Number of Babies
              </label>

              <input
                type="number"
                min="1"
                name="babyCount"
                value={formData.babyCount}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* First Pregnancy */}

          <div className="form-group">

            <label>
              Is this your first pregnancy?
            </label>

            <select
              name="firstPregnancy"
              value={
                String(
                  formData.firstPregnancy
                )
              }
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  firstPregnancy:
                    e.target.value === "true",
                }))
              }
            >

              <option value="true">
                Yes
              </option>

              <option value="false">
                No
              </option>

            </select>

          </div>

          {/* ===================================================
              PREGNANCY HISTORY
          =================================================== */}

          <div className="section-title">
            <span>💗</span>
            Pregnancy History
          </div>

          <div className="form-row">

            {/* Previous Pregnancies */}

            <div className="form-group">

              <label>
                Previous Pregnancies
              </label>

              <input
                type="number"
                min="0"
                name="previousPregnancies"
                value={
                  formData.previousPregnancies
                }
                onChange={handleChange}
              />

            </div>

            {/* Live Births */}

            <div className="form-group">

              <label>
                Live Births
              </label>

              <input
                type="number"
                min="0"
                name="liveBirths"
                value={formData.liveBirths}
                onChange={handleChange}
              />

            </div>

          </div>

          {/* Miscarriages */}

          <div className="form-group">

            <label>
              Previous Miscarriages
            </label>

            <input
              type="number"
              min="0"
              name="miscarriages"
              value={formData.miscarriages}
              onChange={handleChange}
            />

          </div>

          {/* ===================================================
              HEALTH INFORMATION
          =================================================== */}

          <div className="section-title">
            <span>🩺</span>
            Health Information
          </div>

          <div className="form-row">

            {/* High Risk */}

            <div className="form-group">

              <label>
                High Risk Pregnancy
              </label>

              <select
                value={String(
                  formData.highRisk
                )}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    highRisk:
                      e.target.value === "true",
                  }))
                }
              >

                <option value="false">
                  No
                </option>

                <option value="true">
                  Yes
                </option>

              </select>

            </div>

            {/* IVF */}

            <div className="form-group">

              <label>
                IVF Pregnancy
              </label>

              <select
                value={String(
                  formData.ivfPregnancy
                )}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    ivfPregnancy:
                      e.target.value === "true",
                  }))
                }
              >

                <option value="false">
                  No
                </option>

                <option value="true">
                  Yes
                </option>

              </select>

            </div>

          </div>

          {/* Multiple Pregnancy */}

          <div className="form-group">

            <label>
              Multiple Pregnancy
            </label>

            <select
              value={String(
                formData.multiplePregnancy
              )}
              onChange={(e) =>
                setFormData((prev) => ({
                  ...prev,
                  multiplePregnancy:
                    e.target.value === "true",
                }))
              }
            >

              <option value="false">
                No
              </option>

              <option value="true">
                Yes
              </option>

            </select>

          </div>

          {/* ===================================================
              DOCTOR NOTES
          =================================================== */}

          <div className="section-title">
            <span>📝</span>
            Additional Information
          </div>

          <div className="form-group">

            <label>
              Doctor Notes
            </label>

            <textarea
              name="doctorNotes"
              placeholder="Add any important notes, instructions or information from your doctor..."
              value={formData.doctorNotes}
              onChange={handleChange}
            />

          </div>

          {/* ===================================================
              BUTTONS
          =================================================== */}

          <div className="button-container">

            <button
              type="button"
              className="skip-button"
              onClick={handleSkip}
              disabled={loading}
            >
              Skip for Now
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
                    ? "Update Details"
                    : "Save & Continue"}

                  <span>→</span>
                </>
              )}

            </button>

          </div>

        </form>

      </div>

    </div>
  );
};

export default PersonalDetails;