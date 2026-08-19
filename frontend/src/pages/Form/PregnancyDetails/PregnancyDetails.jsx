import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  getPregnancyDetails,
  savePregnancyDetails,
  updatePregnancyDetails,
} from "../../../services/PregnancyAPI";

import "./PregnancyDetails.css";

const PREGNANCY_DRAFT_KEY = "nurturePregnancyDraft";

const defaultFormData = {
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
};

const PersonalDetails = () => {
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [profileExists, setProfileExists] = useState(false);
  const [error, setError] = useState("");

  const [formData, setFormData] = useState(defaultFormData);

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
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {
    loadProfile();
  }, []);

  const loadProfile = async () => {
    const userId = getUserId();

    if (!userId) {
      setError("User not found. Please login again.");
      setFetching(false);
      return;
    }

    try {
      setFetching(true);
      setError("");

      // =====================================================
      // FIRST CHECK BACKEND
      // =====================================================

      try {
        const response = await getPregnancyDetails(
          Number(userId)
        );

        const data =
          response?.data?.data ||
          response?.data;

        console.log(
          "Pregnancy profile from backend:",
          data
        );

        if (data && data.id) {
          setProfileExists(true);

          const backendData = {
            dueDate: data.dueDate || "",

            pregnancyWeek:
              data.pregnancyWeek ?? 0,

            trimester:
              data.trimester || "",

            lastMenstrualPeriod:
              data.lastMenstrualPeriod || "",

            pregnancyType:
              data.pregnancyType || "Natural",

            babyCount:
              data.babyCount ?? 1,

            firstPregnancy:
              data.firstPregnancy ?? true,

            previousPregnancies:
              data.previousPregnancies ?? 0,

            liveBirths:
              data.liveBirths ?? 0,

            miscarriages:
              data.miscarriages ?? 0,

            highRisk:
              data.highRisk ?? false,

            ivfPregnancy:
              data.ivfPregnancy ?? false,

            multiplePregnancy:
              data.multiplePregnancy ?? false,

            doctorNotes:
              data.doctorNotes || "",
          };

          setFormData(backendData);

          // Backend data is saved, so remove old draft
          sessionStorage.removeItem(
            PREGNANCY_DRAFT_KEY
          );

          return;
        }

      } catch (backendError) {

        // 404 means no profile yet
        if (
          backendError.response?.status !== 404
        ) {
          throw backendError;
        }
      }

      // =====================================================
      // NO BACKEND PROFILE
      // LOAD TEMPORARY DRAFT
      // =====================================================

      const savedDraft =
        sessionStorage.getItem(
          PREGNANCY_DRAFT_KEY
        );

      if (savedDraft) {
        try {
          const parsedDraft =
            JSON.parse(savedDraft);

          console.log(
            "Loading pregnancy draft:",
            parsedDraft
          );

          setFormData({
            ...defaultFormData,
            ...parsedDraft,
          });

        } catch (draftError) {
          console.error(
            "Invalid pregnancy draft:",
            draftError
          );

          sessionStorage.removeItem(
            PREGNANCY_DRAFT_KEY
          );
        }
      }

      setProfileExists(false);

    } catch (error) {

      console.error(
        "Load pregnancy profile error:",
        error
      );

      setError(
        "Unable to load pregnancy information."
      );

    } finally {
      setFetching(false);
    }
  };

  // =========================================================
  // SAVE DRAFT
  // =========================================================

  const saveDraft = (data) => {
    try {
      sessionStorage.setItem(
        PREGNANCY_DRAFT_KEY,
        JSON.stringify(data)
      );

      console.log(
        "Pregnancy draft saved:",
        data
      );

    } catch (error) {
      console.error(
        "Unable to save pregnancy draft:",
        error
      );
    }
  };

  // =========================================================
  // CALCULATE WEEK
  // =========================================================

  const calculateWeek = (dueDate) => {
    if (!dueDate) {
      return 0;
    }

    const today = new Date();

    const totalPregnancyDays = 280;

    const remainingDays = Math.ceil(
      (
        dueDate.getTime() -
        today.getTime()
      ) /
        (1000 * 60 * 60 * 24)
    );

    const completedDays =
      totalPregnancyDays -
      remainingDays;

    let week = Math.floor(
      completedDays / 7
    );

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
    if (!week) {
      return "";
    }

    if (week <= 13) {
      return "First Trimester";
    }

    if (week <= 27) {
      return "Second Trimester";
    }

    return "Third Trimester";
  };

  // =========================================================
  // HANDLE NORMAL CHANGE
  // =========================================================

  const handleChange = (e) => {
    const {
      name,
      value,
    } = e.target;

    const updatedData = {
      ...formData,
      [name]: value,
    };

    setFormData(updatedData);

    // Save immediately
    saveDraft(updatedData);

    setError("");
  };

  // =========================================================
  // DUE DATE CHANGE
  // =========================================================

  const handleDueDateChange = (e) => {
    const value = e.target.value;

    if (!value) {

      const updatedData = {
        ...formData,
        dueDate: "",
        pregnancyWeek: 0,
        trimester: "",
      };

      setFormData(updatedData);

      saveDraft(updatedData);

      return;
    }

    const date = new Date(value);

    const week =
      calculateWeek(date);

    const trimester =
      getTrimester(week);

    const updatedData = {
      ...formData,

      dueDate: value,

      pregnancyWeek: week,

      trimester: trimester,
    };

    setFormData(updatedData);

    saveDraft(updatedData);

    setError("");
  };

  // =========================================================
  // BOOLEAN CHANGE
  // =========================================================

  const handleBooleanChange = (
    field,
    value
  ) => {

    const updatedData = {
      ...formData,

      [field]:
        value === "true",
    };

    setFormData(updatedData);

    saveDraft(updatedData);

    setError("");
  };

  // =========================================================
  // VALIDATION
  // =========================================================

  const validate = () => {

    if (!formData.dueDate) {
      setError(
        "Please select your Due Date."
      );
      return false;
    }

    if (!formData.lastMenstrualPeriod) {
      setError(
        "Please select your Last Menstrual Period."
      );
      return false;
    }

    if (
      Number(formData.babyCount) < 1
    ) {
      setError(
        "Number of babies must be at least 1."
      );
      return false;
    }

    if (
      Number(formData.previousPregnancies) < 0
    ) {
      setError(
        "Previous pregnancies cannot be negative."
      );
      return false;
    }

    if (
      Number(formData.liveBirths) < 0
    ) {
      setError(
        "Live births cannot be negative."
      );
      return false;
    }

    if (
      Number(formData.miscarriages) < 0
    ) {
      setError(
        "Previous miscarriages cannot be negative."
      );
      return false;
    }

    setError("");

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

        userId: Number(userId),

        dueDate:
          formData.dueDate,

        pregnancyWeek:
          Number(formData.pregnancyWeek),

        trimester:
          formData.trimester,

        lastMenstrualPeriod:
          formData.lastMenstrualPeriod,

        pregnancyType:
          formData.pregnancyType,

        babyCount:
          Number(formData.babyCount),

        firstPregnancy:
          formData.firstPregnancy === true ||
          formData.firstPregnancy === "true",

        previousPregnancies:
          Number(
            formData.previousPregnancies
          ),

        liveBirths:
          Number(formData.liveBirths),

        miscarriages:
          Number(formData.miscarriages),

        highRisk:
          formData.highRisk === true ||
          formData.highRisk === "true",

        ivfPregnancy:
          formData.ivfPregnancy === true ||
          formData.ivfPregnancy === "true",

        multiplePregnancy:
          formData.multiplePregnancy === true ||
          formData.multiplePregnancy === "true",

        doctorNotes:
          formData.doctorNotes?.trim() || "",
      };

      console.log(
        "Pregnancy Request:",
        request
      );

      // =====================================================
      // UPDATE
      // =====================================================

      if (profileExists) {

        await updatePregnancyDetails(
          Number(userId),
          request
        );

        alert(
          "Pregnancy information updated successfully!"
        );

      }

      // =====================================================
      // CREATE
      // =====================================================

      else {

        const response =
          await savePregnancyDetails(
            request
          );

        console.log(
          "Pregnancy Save Response:",
          response
        );

        setProfileExists(true);

        alert(
          "Pregnancy information saved successfully!"
        );
      }

      // =====================================================
      // CLEAR DRAFT AFTER SUCCESS
      // =====================================================

      sessionStorage.removeItem(
        PREGNANCY_DRAFT_KEY
      );

      // =====================================================
      // GO HOME
      // =====================================================

      navigate("/home");

    } catch (error) {

      console.error(
        "Pregnancy save/update error:",
        error
      );

      if (error.response) {

        setError(
          error.response.data?.message ||
          "Unable to save pregnancy information."
        );

      } else if (error.request) {

        setError(
          "Unable to connect to backend server. Please check your connection."
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
  // BACK
  // =========================================================

  const handleBack = () => {

    /*
     * IMPORTANT:
     * Save current pregnancy form before going back.
     * Therefore, when the user returns, all values
     * will still be available.
     */

    saveDraft(formData);

    navigate("/personal-info");
  };

  // =========================================================
  // SKIP
  // =========================================================

  const handleSkip = () => {

    const confirmSkip =
      window.confirm(
        "You can complete your pregnancy details later. Do you want to skip?"
      );

    if (confirmSkip) {

      // Keep draft because user may come back later
      saveDraft(formData);

      navigate("/home");
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
          Loading your pregnancy information...
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

        <div className="personal-header">

          <div className="header-icon">
            🤰
          </div>

          <h1>
            Pregnancy Details
          </h1>

          <p>
            Help Nurture AI understand your
            pregnancy journey so we can provide
            more personalized care and support.
          </p>

          <div className="personal-quote">

            <span>“</span>

            Every pregnancy is a beautiful journey.
            Let us walk beside you with care,
            comfort and confidence.

          </div>

          {profileExists && (
            <div className="profile-status">
              ✓ Your pregnancy information is already saved
            </div>
          )}

        </div>

        {error && (
          <div className="error-message">

            <span>⚠</span>

            {error}

          </div>
        )}

        <form onSubmit={handleSave}>

          {/* =================================================
              TIMELINE
          ================================================= */}

          <div className="section-title">
            <span>📅</span>
            Pregnancy Timeline
          </div>

          <div className="form-row">

            <div className="form-group">

              <label>
                Due Date <span>*</span>
              </label>

              <input
                type="date"
                name="dueDate"
                value={formData.dueDate}
                onChange={
                  handleDueDateChange
                }
              />

            </div>

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

          {/* =================================================
              WEEK / TRIMESTER
          ================================================= */}

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

          {/* =================================================
              PREGNANCY INFORMATION
          ================================================= */}

          <div className="section-title">
            <span>🌸</span>
            Pregnancy Information
          </div>

          <div className="form-row">

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

            <div className="form-group">

              <label>
                Number of Babies
              </label>

              <input
                type="number"
                min="1"
                name="babyCount"
                value={
                  formData.babyCount
                }
                onChange={handleChange}
              />

            </div>

          </div>

          {/* FIRST PREGNANCY */}

          <div className="form-group">

            <label>
              Is this your first pregnancy?
            </label>

            <select
              value={
                String(
                  formData.firstPregnancy
                )
              }
              onChange={(e) =>
                handleBooleanChange(
                  "firstPregnancy",
                  e.target.value
                )
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

          {/* =================================================
              HISTORY
          ================================================= */}

          <div className="section-title">
            <span>💗</span>
            Pregnancy History
          </div>

          <div className="form-row">

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

            <div className="form-group">

              <label>
                Live Births
              </label>

              <input
                type="number"
                min="0"
                name="liveBirths"
                value={
                  formData.liveBirths
                }
                onChange={handleChange}
              />

            </div>

          </div>

          <div className="form-group">

            <label>
              Previous Miscarriages
            </label>

            <input
              type="number"
              min="0"
              name="miscarriages"
              value={
                formData.miscarriages
              }
              onChange={handleChange}
            />

          </div>

          {/* =================================================
              HEALTH
          ================================================= */}

          <div className="section-title">
            <span>🩺</span>
            Health Information
          </div>

          <div className="form-row">

            <div className="form-group">

              <label>
                High Risk Pregnancy
              </label>

              <select
                value={
                  String(
                    formData.highRisk
                  )
                }
                onChange={(e) =>
                  handleBooleanChange(
                    "highRisk",
                    e.target.value
                  )
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

            <div className="form-group">

              <label>
                IVF Pregnancy
              </label>

              <select
                value={
                  String(
                    formData.ivfPregnancy
                  )
                }
                onChange={(e) =>
                  handleBooleanChange(
                    "ivfPregnancy",
                    e.target.value
                  )
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

          <div className="form-group">

            <label>
              Multiple Pregnancy
            </label>

            <select
              value={
                String(
                  formData.multiplePregnancy
                )
              }
              onChange={(e) =>
                handleBooleanChange(
                  "multiplePregnancy",
                  e.target.value
                )
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

          {/* =================================================
              DOCTOR NOTES
          ================================================= */}

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
              value={
                formData.doctorNotes
              }
              onChange={handleChange}
              rows="5"
            />

          </div>

          {/* =================================================
              BUTTONS
          ================================================= */}

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