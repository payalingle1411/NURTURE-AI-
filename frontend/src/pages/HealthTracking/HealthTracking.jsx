import React, {
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";

import "./HealthTracking.css";
import Sidebar from "../../components/sidebar/Sidebar";

import {
  requestMotionPermission,
  startMotionTracking,
  isMotionSupported,
} from "../../utils/deviceHealth";

import {
  resetActivityTracker,
  processMotion,
} from "../../utils/activityTracker";

import API from "../../services/api";

/* =========================
   GET LOGGED-IN USER ID
========================= */

const getUserId = () => {
  const possibleKeys = [
    "userId",
    "user_id",
    "loggedInUserId",
    "patientUserId",
  ];

  for (const key of possibleKeys) {
    const value =
      localStorage.getItem(key) ||
      sessionStorage.getItem(key);

    if (value && !isNaN(Number(value))) {
      return Number(value);
    }
  }

  const storedUser =
    localStorage.getItem("user") ||
    sessionStorage.getItem("user");

  if (storedUser) {
    try {
      const user = JSON.parse(storedUser);

      return Number(
        user.id ||
          user.userId ||
          user.user_id ||
          user.patientUserId
      );
    } catch (error) {
      console.error(
        "Unable to read stored user:",
        error
      );
    }
  }

  return null;
};

/* =========================
   TODAY DATE
========================= */

const todayDate = () => {
  const now = new Date();

  const year = now.getFullYear();
  const month = String(
    now.getMonth() + 1
  ).padStart(2, "0");

  const day = String(
    now.getDate()
  ).padStart(2, "0");

  return `${year}-${month}-${day}`;
};

/* =========================
   ACTIVITY CALCULATIONS
========================= */

const calculateDistance = (steps) => {
  return Number(
    (
      Number(steps || 0) * 0.0007
    ).toFixed(2)
  );
};

const calculateCalories = (steps) => {
  return Number(
    (
      Number(steps || 0) * 0.04
    ).toFixed(1)
  );
};

/* =========================
   HEALTH SCORE
========================= */

const calculateHealthScore = ({
  sleepHours,
  activityMinutes,
  steps,
  mood,
  nutritionQuality,
  medicationTaken,
  symptoms,
}) => {
  let score = 0;

  const sleep = Number(
    sleepHours || 0
  );

  const activity = Number(
    activityMinutes || 0
  );

  const stepValue = Number(
    steps || 0
  );

  if (sleep >= 7) {
    score += 15;
  } else if (sleep >= 5) {
    score += 10;
  }

  if (activity >= 30) {
    score += 15;
  } else if (activity >= 15) {
    score += 10;
  }

  if (stepValue >= 7000) {
    score += 10;
  } else if (stepValue >= 4000) {
    score += 6;
  }

  if (mood === "Good") {
    score += 10;
  } else if (mood === "Average") {
    score += 6;
  }

  if (nutritionQuality === "Good") {
    score += 20;
  } else if (nutritionQuality === "Average") {
    score += 12;
  }

  if (medicationTaken) {
    score += 15;
  }

  if (
    !symptoms ||
    symptoms.trim() === ""
  ) {
    score += 15;
  }

  return Math.min(score, 100);
};

const getScoreStatus = (score) => {
  if (score >= 80) return "Excellent";
  if (score >= 60) return "Good";
  if (score >= 40) return "Average";

  return "Needs Attention";
};

/* =========================
   FORMATTING
========================= */

const formatDate = (date) => {
  if (!date) return "-";

  const parsed = new Date(
    `${date}T00:00:00`
  );

  if (isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
    }
  );
};

const formatNumber = (value) => {
  return Number(
    value || 0
  ).toLocaleString("en-IN");
};

const getMoodClass = (mood) => {
  if (mood === "Good") {
    return "mood-good";
  }

  if (mood === "Average") {
    return "mood-average";
  }

  if (mood === "Low") {
    return "mood-low";
  }

  return "";
};

/* =========================
   COMPONENT
========================= */

function HealthTracking() {
  const userId = useMemo(
    () => getUserId(),
    []
  );

  /* =========================
     SIDEBAR STATE
  ========================= */

  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const cleanupTrackingRef =
    useRef(null);

  const trackingStartRef =
    useRef(null);

  const dataLoadedRef =
    useRef(false);

  const currentDateRef =
    useRef(todayDate());

  /* =========================
     PAGE STATE
  ========================= */

  const [loading, setLoading] =
    useState(true);

  const [error, setError] =
    useState("");

  const [success, setSuccess] =
    useState("");

  const [tracking, setTracking] =
    useState(false);

  const [activitySource, setActivitySource] =
    useState("Browser Estimate");

  /* =========================
     ACTIVITY
  ========================= */

  const [steps, setSteps] =
    useState(0);

  const [manualSteps, setManualSteps] =
    useState("");

  const [activityMinutes, setActivityMinutes] =
    useState(0);

  const [distanceKm, setDistanceKm] =
    useState(0);

  const [caloriesBurned, setCaloriesBurned] =
    useState(0);

  /* =========================
     WELLNESS
  ========================= */

  const [sleepHours, setSleepHours] =
    useState("");

  const [sleepQuality, setSleepQuality] =
    useState("");

  const [waterGlasses, setWaterGlasses] =
    useState(0);

  const [mood, setMood] =
    useState("");

  const [symptoms, setSymptoms] =
    useState("");

  const [symptomSeverity, setSymptomSeverity] =
    useState(0);

  const [nutritionQuality, setNutritionQuality] =
    useState("");

  const [medicationTaken, setMedicationTaken] =
    useState(false);

  const [notes, setNotes] =
    useState("");

  const [last7Days, setLast7Days] =
    useState([]);

  /* =========================
     HEALTH SCORE
  ========================= */

  const healthScore = useMemo(() => {
    return calculateHealthScore({
      sleepHours,
      activityMinutes,
      steps,
      mood,
      nutritionQuality,
      medicationTaken,
      symptoms,
    });
  }, [
    sleepHours,
    activityMinutes,
    steps,
    mood,
    nutritionQuality,
    medicationTaken,
    symptoms,
  ]);

  const scoreStatus =
    getScoreStatus(healthScore);

  /* =========================
     LOAD HEALTH HISTORY
     
     IMPORTANT:
     We DO NOT load today's saved
     data from backend.

     Today's data belongs to the
     current tracking session and
     is saved only when the day
     is completed.
  ========================= */

  const loadHealthData = async () => {
    if (!userId) {
      setError(
        "User information not found. Please login again."
      );

      setLoading(false);
      return;
    }

    try {
      setLoading(true);
      setError("");

      /*
       * Only load previous history.
       *
       * We intentionally DO NOT call:
       *
       * /health-tracking/${userId}/today
       *
       * because today's data should not
       * be restored from the database.
       */

      const historyResponse =
        await API.get(
          `/health-tracking/${userId}/last-7-days`,
          {
            withCredentials: true,
          }
        );

      const historyData =
        historyResponse.data;

      setLast7Days(
        Array.isArray(historyData)
          ? historyData
          : []
      );

      dataLoadedRef.current = true;

      currentDateRef.current =
        todayDate();

    } catch (err) {
      console.error(
        "Health data loading error:",
        err
      );

      if (
        err.response?.status === 401
      ) {
        setError(
          "Your session has expired. Please login again."
        );
      } else {
        setError(
          "Unable to load health history. Please check the backend."
        );
      }
    } finally {
      setLoading(false);
    }
  };

  /* =========================
     INITIAL LOAD
  ========================= */

  useEffect(() => {
    loadHealthData();

    return () => {
      if (
        cleanupTrackingRef.current
      ) {
        cleanupTrackingRef.current();
        cleanupTrackingRef.current =
          null;
      }
    };
  }, []);

  /* =========================
     START MOTION TRACKING
  ========================= */

  const startTracking = async () => {
    setError("");
    setSuccess("");

    if (!isMotionSupported()) {
      setError(
        "Motion tracking is not available here. Please open Nurture AI using HTTPS and allow motion access. You can also enter your phone steps manually."
      );

      return;
    }

    const permissionGranted =
      await requestMotionPermission();

    if (!permissionGranted) {
      setError(
        "Motion permission was not granted. Please allow motion access in your browser settings."
      );

      return;
    }

    resetActivityTracker();

    trackingStartRef.current =
      Date.now();

    const cleanup =
      startMotionTracking(
        (motion) => {
          const currentSteps =
            processMotion(motion);

          setSteps(currentSteps);

          setDistanceKm(
            calculateDistance(
              currentSteps
            )
          );

          setCaloriesBurned(
            calculateCalories(
              currentSteps
            )
          );

          setActivitySource(
            "Browser Estimate"
          );

          if (
            trackingStartRef.current
          ) {
            const minutes =
              Math.floor(
                (Date.now() -
                  trackingStartRef.current) /
                  60000
              );

            setActivityMinutes(
              minutes
            );
          }
        }
      );

    cleanupTrackingRef.current =
      cleanup;

    setTracking(true);

    setSuccess(
      "Activity tracking started. Keep this page open while moving."
    );
  };

  /* =========================
     STOP TRACKING
  ========================= */

  const stopTracking = () => {
    if (
      cleanupTrackingRef.current
    ) {
      cleanupTrackingRef.current();

      cleanupTrackingRef.current =
        null;
    }

    if (
      trackingStartRef.current
    ) {
      const minutes =
        Math.floor(
          (Date.now() -
            trackingStartRef.current) /
            60000
        );

      setActivityMinutes(
        (previous) =>
          Math.max(
            previous,
            minutes
          )
      );
    }

    trackingStartRef.current =
      null;

    setTracking(false);

    setSuccess(
      "Activity tracking stopped. Your estimated activity has been kept for today."
    );
  };

  /* =========================
     MANUAL STEPS
  ========================= */

  const applyManualSteps = () => {
    const value =
      Number(manualSteps);

    if (
      !Number.isFinite(value) ||
      value < 0
    ) {
      setError(
        "Please enter a valid step count."
      );

      return;
    }

    const roundedSteps =
      Math.floor(value);

    setSteps(roundedSteps);

    setDistanceKm(
      calculateDistance(
        roundedSteps
      )
    );

    setCaloriesBurned(
      calculateCalories(
        roundedSteps
      )
    );

    setActivitySource(
      "Manual Phone Steps"
    );

    setError("");

    setSuccess(
      "Phone step count applied successfully. It will be saved automatically when today's 24-hour tracking period is completed."
    );
  };

  /* =========================
     WATER
  ========================= */

  const incrementWater = () => {
    setWaterGlasses(
      (previous) =>
        Math.min(
          previous + 1,
          20
        )
    );
  };

  const decrementWater = () => {
    setWaterGlasses(
      (previous) =>
        Math.max(
          previous - 1,
          0
        )
    );
  };

  /* =========================
     SAVE COMPLETED DAY
     
     This is the ONLY place where
     current-day data is sent to
     the backend.
  ========================= */

  const saveCompletedDay =
    async (dateToSave) => {
      if (!userId) {
        return;
      }

      try {
        const payload = {
          trackingDate:
            dateToSave,

          steps:
            Number(steps || 0),

          activityMinutes:
            Number(
              activityMinutes || 0
            ),

          distanceKm:
            Number(
              distanceKm || 0
            ),

          caloriesBurned:
            Number(
              caloriesBurned || 0
            ),

          sleepHours:
            sleepHours === ""
              ? null
              : Number(
                  sleepHours
                ),

          sleepQuality:
            sleepQuality || null,

          waterGlasses:
            Number(
              waterGlasses || 0
            ),

          mood:
            mood || null,

          symptoms:
            symptoms || null,

          symptomSeverity:
            Number(
              symptomSeverity || 0
            ),

          nutritionQuality:
            nutritionQuality ||
            null,

          medicationTaken:
            Boolean(
              medicationTaken
            ),

          healthScore,

          scoreStatus,

          notes:
            notes || null,
        };

        await API.post(
          `/health-tracking/${userId}`,
          payload,
          {
            withCredentials: true,
          }
        );

        console.log(
          `Health data for ${dateToSave} automatically saved after the daily tracking period completed.`
        );

        return true;
      } catch (err) {
        console.error(
          "Completed day save error:",
          err
        );

        return false;
      }
    };

  /* =========================
     DATE CHANGE
     
     Every 30 seconds we check
     whether a new calendar day
     has started.
     
     If yes:
     
     1. Save yesterday's data
     2. Stop tracking
     3. Clear today's state
     4. Start a fresh day
  ========================= */

  useEffect(() => {
    if (!dataLoadedRef.current) {
      return;
    }

    const checkDateChange =
      async () => {
        const newDate =
          todayDate();

        if (
          currentDateRef.current ===
          newDate
        ) {
          return;
        }

        const completedDate =
          currentDateRef.current;

        /*
         * SAVE PREVIOUS DAY FIRST
         */

        const saved =
          await saveCompletedDay(
            completedDate
          );

        /*
         * Update current date
         */

        currentDateRef.current =
          newDate;

        /*
         * Stop activity tracking
         */

        if (
          cleanupTrackingRef.current
        ) {
          cleanupTrackingRef.current();

          cleanupTrackingRef.current =
            null;
        }

        trackingStartRef.current =
          null;

        setTracking(false);

        /*
         * RESET ACTIVITY
         */

        setSteps(0);

        setManualSteps("");

        setActivityMinutes(0);

        setDistanceKm(0);

        setCaloriesBurned(0);

        /*
         * RESET SLEEP
         */

        setSleepHours("");

        setSleepQuality("");

        /*
         * RESET WATER
         */

        setWaterGlasses(0);

        /*
         * RESET MOOD
         */

        setMood("");

        /*
         * RESET SYMPTOMS
         */

        setSymptoms("");

        setSymptomSeverity(0);

        /*
         * RESET NUTRITION
         */

        setNutritionQuality("");

        /*
         * RESET MEDICATION
         */

        setMedicationTaken(false);

        /*
         * RESET NOTES
         */

        setNotes("");

        /*
         * RESET ACTIVITY SOURCE
         */

        setActivitySource(
          "Browser Estimate"
        );

        /*
         * MESSAGE
         */

        if (saved) {
          setSuccess(
            "Yesterday's health data was automatically saved. A new day has started."
          );
        } else {
          setError(
            "A new day has started, but yesterday's health data could not be saved. Please check your backend connection."
          );
        }

        /*
         * REFRESH HISTORY
         */

        try {
          const historyResponse =
            await API.get(
              `/health-tracking/${userId}/last-7-days`,
              {
                withCredentials: true,
              }
            );

          const historyData =
            historyResponse.data;

          setLast7Days(
            Array.isArray(
              historyData
            )
              ? historyData
              : []
          );
        } catch (err) {
          console.error(
            "History refresh error:",
            err
          );
        }
      };

    const interval =
      setInterval(
        checkDateChange,
        30000
      );

    return () => {
      clearInterval(interval);
    };
  }, [
    userId,
    steps,
    activityMinutes,
    distanceKm,
    caloriesBurned,
    sleepHours,
    sleepQuality,
    waterGlasses,
    mood,
    symptoms,
    symptomSeverity,
    nutritionQuality,
    medicationTaken,
    notes,
    healthScore,
    scoreStatus,
  ]);

  /* =========================
     CLEAR MESSAGES
  ========================= */

  const clearMessages = () => {
    setError("");
    setSuccess("");
  };

  /* =========================
     LOADING
  ========================= */

  if (loading) {
    return (
      <div className="health-page">
        <Sidebar
          isOpen={sidebarOpen}
          setIsOpen={setSidebarOpen}
        />

        <div className="health-main">
          <div className="health-loading">
            <div className="health-spinner"></div>

            <p>
              Loading your health data...
            </p>
          </div>
        </div>
      </div>
    );
  }

  /* =========================
     UI
  ========================= */

  return (
    <div className="health-page">

      {/* SIDEBAR */}

      <Sidebar
        isOpen={sidebarOpen}
        setIsOpen={setSidebarOpen}
      />

      {/* MAIN CONTENT */}

      <div className="health-main">

        <div className="health-container">

          {/* MOBILE MENU BUTTON */}

          <button
            type="button"
            className="health-mobile-menu"
            onClick={() =>
              setSidebarOpen(true)
            }
            aria-label="Open menu"
          >
            ☰
          </button>

          {/* HEADER */}

          <div className="health-header">

            <div>

              <span className="health-label">
                NURTURE AI
              </span>

              <h1>
                Health Tracking
              </h1>

              <p>
                Track your daily wellness
                and activity in one place.
              </p>

            </div>

            <button
              className="refresh-button"
              onClick={loadHealthData}
            >
              ↻ Refresh
            </button>

          </div>

          {/* MESSAGES */}

          {error && (
            <div className="health-message error">

              <span>
                ⚠️
              </span>

              <span>
                {error}
              </span>

              <button
                onClick={
                  clearMessages
                }
              >
                ×
              </button>

            </div>
          )}

          {success && (
            <div className="health-message success">

              <span>
                ✓
              </span>

              <span>
                {success}
              </span>

              <button
                onClick={
                  clearMessages
                }
              >
                ×
              </button>

            </div>
          )}

          {/* ACTIVITY SUMMARY */}

          <div className="activity-section">

            <div className="section-heading">

              <div>

                <h2>
                  Today's Activity
                </h2>

                <p>
                  Your daily movement and
                  activity information.
                </p>

              </div>

              <span
                className={`source-badge ${
                  activitySource ===
                  "Manual Phone Steps"
                    ? "manual-source"
                    : "browser-source"
                }`}
              >
                {activitySource}
              </span>

            </div>

            <div className="activity-cards">

              {/* STEPS */}

              <div className="activity-card">

                <div className="activity-icon">
                  👣
                </div>

                <div className="activity-card-content">

                  <span>
                    Steps
                  </span>

                  <strong>
                    {formatNumber(
                      steps
                    )}
                  </strong>

                  <small>
                    steps today
                  </small>

                </div>

              </div>

              {/* DISTANCE */}

              <div className="activity-card">

                <div className="activity-icon">
                  📏
                </div>

                <div className="activity-card-content">

                  <span>
                    Distance
                  </span>

                  <strong>
                    {Number(
                      distanceKm || 0
                    ).toFixed(2)}

                    <small className="unit">
                      {" "}
                      km
                    </small>
                  </strong>

                  <small>
                    estimated
                  </small>

                </div>

              </div>

              {/* CALORIES */}

              <div className="activity-card">

                <div className="activity-icon">
                  🔥
                </div>

                <div className="activity-card-content">

                  <span>
                    Calories
                  </span>

                  <strong>
                    {Number(
                      caloriesBurned ||
                        0
                    ).toFixed(1)}

                    <small className="unit">
                      {" "}
                      kcal
                    </small>
                  </strong>

                  <small>
                    estimated
                  </small>

                </div>

              </div>

              {/* ACTIVE TIME */}

              <div className="activity-card">

                <div className="activity-icon">
                  ⏱️
                </div>

                <div className="activity-card-content">

                  <span>
                    Active Time
                  </span>

                  <strong>
                    {activityMinutes}

                    <small className="unit">
                      {" "}
                      min
                    </small>
                  </strong>

                  <small>
                    activity time
                  </small>

                </div>

              </div>

            </div>

            {/* AUTOMATIC TRACKING */}

            <div className="tracking-panel">

              <div className="tracking-panel-text">

                <h3>
                  📱 Browser Activity Tracking
                </h3>

                <p>
                  Nurture AI can estimate
                  movement using your device
                  motion sensor while this
                  webpage is open.
                </p>

                <small>
                  For the most accurate daily
                  step total, use the manual
                  option below and enter the
                  steps shown by your phone's
                  health or fitness app.
                </small>

              </div>

              <div className="tracking-actions">

                {!tracking ? (
                  <button
                    className="primary-button"
                    onClick={
                      startTracking
                    }
                  >
                    ▶ Start Tracking
                  </button>
                ) : (
                  <button
                    className="stop-button"
                    onClick={
                      stopTracking
                    }
                  >
                    ■ Stop Tracking
                  </button>
                )}

              </div>

            </div>

            {/* MANUAL PHONE STEPS */}

            <div className="manual-panel">

              <div className="manual-panel-header">

                <div>

                  <h3>
                    📲 Enter Phone Step Count
                  </h3>

                  <p>
                    Copy today's step count
                    from your phone's health
                    or fitness app.
                  </p>

                </div>

                <span className="manual-badge">
                  Recommended
                </span>

              </div>

              <div className="manual-input-row">

                <div className="input-group">

                  <label>
                    Today's Steps
                  </label>

                  <input
                    type="number"
                    min="0"
                    value={
                      manualSteps
                    }
                    onChange={(event) =>
                      setManualSteps(
                        event.target.value
                      )
                    }
                    placeholder="Example: 6500"
                  />

                </div>

                <button
                  className="secondary-button"
                  onClick={
                    applyManualSteps
                  }
                >
                  Use These Steps
                </button>

              </div>

              <p className="manual-note">
                Distance and calories will
                be estimated automatically
                from the entered steps.
                Today's information will be
                automatically saved after the
                daily tracking period is
                completed.
              </p>

            </div>

          </div>

          {/* DAILY INFORMATION */}

          <div className="health-section">

            <div className="section-heading">

              <div>

                <h2>
                  Daily Wellness Information
                </h2>

                <p>
                  Add information about your
                  daily wellness.
                </p>

              </div>

            </div>

            <div className="health-form">

              {/* SLEEP */}

              <div className="form-card">

                <div className="form-card-title">

                  <span>
                    😴
                  </span>

                  <div>

                    <h3>
                      Sleep
                    </h3>

                    <p>
                      How did you sleep?
                    </p>

                  </div>

                </div>

                <div className="form-row">

                  <div className="input-group">

                    <label>
                      Sleep Hours
                    </label>

                    <input
                      type="number"
                      min="0"
                      max="24"
                      step="0.5"
                      value={
                        sleepHours
                      }
                      onChange={(event) =>
                        setSleepHours(
                          event.target.value
                        )
                      }
                      placeholder="7.5"
                    />

                  </div>

                  <div className="input-group">

                    <label>
                      Sleep Quality
                    </label>

                    <select
                      value={
                        sleepQuality
                      }
                      onChange={(event) =>
                        setSleepQuality(
                          event.target.value
                        )
                      }
                    >

                      <option value="">
                        Select quality
                      </option>

                      <option value="Good">
                        Good
                      </option>

                      <option value="Average">
                        Average
                      </option>

                      <option value="Poor">
                        Poor
                      </option>

                    </select>

                  </div>

                </div>

              </div>

              {/* WATER */}

              <div className="form-card">

                <div className="form-card-title">

                  <span>
                    💧
                  </span>

                  <div>

                    <h3>
                      Hydration
                    </h3>

                    <p>
                      Track your water intake.
                    </p>

                  </div>

                </div>

                <div className="water-control">

                  <button
                    onClick={
                      decrementWater
                    }
                    type="button"
                  >
                    −
                  </button>

                  <div>

                    <strong>
                      {waterGlasses}
                    </strong>

                    <span>
                      glasses
                    </span>

                  </div>

                  <button
                    onClick={
                      incrementWater
                    }
                    type="button"
                  >
                    +
                  </button>

                </div>

              </div>

              {/* MOOD */}

              <div className="form-card">

                <div className="form-card-title">

                  <span>
                    😊
                  </span>

                  <div>

                    <h3>
                      Mood
                    </h3>

                    <p>
                      How are you feeling today?
                    </p>

                  </div>

                </div>

                <div className="mood-options">

                  {[
                    "Good",
                    "Average",
                    "Low",
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={`mood-option ${
                        mood === item
                          ? `selected ${getMoodClass(
                              item
                            )}`
                          : ""
                      }`}
                      onClick={() =>
                        setMood(item)
                      }
                    >

                      {item === "Good" &&
                        "😊"}

                      {item === "Average" &&
                        "😐"}

                      {item === "Low" &&
                        "😔"}

                      <span>
                        {item}
                      </span>

                    </button>
                  ))}

                </div>

              </div>

              {/* NUTRITION */}

              <div className="form-card">

                <div className="form-card-title">

                  <span>
                    🥗
                  </span>

                  <div>

                    <h3>
                      Nutrition
                    </h3>

                    <p>
                      How was your overall
                      nutrition today?
                    </p>

                  </div>

                </div>

                <div className="nutrition-options">

                  {[
                    "Good",
                    "Average",
                    "Poor",
                  ].map((item) => (
                    <button
                      type="button"
                      key={item}
                      className={
                        nutritionQuality ===
                        item
                          ? "nutrition-option selected"
                          : "nutrition-option"
                      }
                      onClick={() =>
                        setNutritionQuality(
                          item
                        )
                      }
                    >
                      {item}
                    </button>
                  ))}

                </div>

              </div>

              {/* SYMPTOMS */}

              <div className="form-card full-width">

                <div className="form-card-title">

                  <span>
                    🩺
                  </span>

                  <div>

                    <h3>
                      Symptoms
                    </h3>

                    <p>
                      Record any symptoms you
                      are experiencing.
                    </p>

                  </div>

                </div>

                <div className="input-group">

                  <label>
                    Symptoms
                  </label>

                  <textarea
                    value={
                      symptoms
                    }
                    onChange={(event) =>
                      setSymptoms(
                        event.target.value
                      )
                    }
                    placeholder="Example: Mild back pain, tiredness..."
                    rows="4"
                  />

                </div>

                <div className="severity-wrapper">

                  <label>
                    Symptom Severity:{" "}
                    <strong>
                      {symptomSeverity}/10
                    </strong>
                  </label>

                  <input
                    type="range"
                    min="0"
                    max="10"
                    value={
                      symptomSeverity
                    }
                    onChange={(event) =>
                      setSymptomSeverity(
                        Number(
                          event.target.value
                        )
                      )
                    }
                  />

                  <div className="severity-labels">

                    <span>
                      None
                    </span>

                    <span>
                      Severe
                    </span>

                  </div>

                </div>

              </div>

              {/* MEDICATION */}

              <div className="form-card">

                <div className="form-card-title">

                  <span>
                    💊
                  </span>

                  <div>

                    <h3>
                      Medication
                    </h3>

                    <p>
                      Track your prescribed
                      medication.
                    </p>

                  </div>

                </div>

                <label className="checkbox-row">

                  <input
                    type="checkbox"
                    checked={
                      medicationTaken
                    }
                    onChange={(event) =>
                      setMedicationTaken(
                        event.target.checked
                      )
                    }
                  />

                  <span>
                    I took my medication today
                  </span>

                </label>

              </div>

              {/* NOTES */}

              <div className="form-card">

                <div className="form-card-title">

                  <span>
                    📝
                  </span>

                  <div>

                    <h3>
                      Notes
                    </h3>

                    <p>
                      Add anything you want to
                      remember.
                    </p>

                  </div>

                </div>

                <textarea
                  value={notes}
                  onChange={(event) =>
                    setNotes(
                      event.target.value
                    )
                  }
                  placeholder="Write your notes..."
                  rows="4"
                />

              </div>

            </div>

          </div>

          {/* WELLNESS SCORE */}

          <div className="score-section">

            <div className="score-left">

              <div className="score-circle">

                <div>

                  <strong>
                    {healthScore}
                  </strong>

                  <span>
                    /100
                  </span>

                </div>

              </div>

            </div>

            <div className="score-content">

              <span className="score-label">
                DAILY WELLNESS SCORE
              </span>

              <h2>
                {scoreStatus}
              </h2>

              <p>
                Your score is calculated
                from activity, sleep, mood,
                nutrition, medication and
                symptom information entered
                today.
              </p>

              <div className="score-progress">

                <div
                  style={{
                    width: `${healthScore}%`,
                  }}
                ></div>

              </div>

            </div>

          </div>

          {/* AUTO SAVE INFORMATION */}

          <div className="save-section">

            <div>

              <h3>
                🔄 Automatic Daily Saving
              </h3>

              <p>
                Today's health information is
                kept for the current day and
                will be automatically saved when
                the daily 24-hour tracking period
                is completed.
              </p>

            </div>

            <div className="auto-save-status">
              ✓ Automatic
            </div>

          </div>

          {/* LAST 7 DAYS */}

          <div className="history-section">

            <div className="section-heading">

              <div>

                <h2>
                  Last 7 Days
                </h2>

                <p>
                  Your recent health tracking
                  history.
                </p>

              </div>

            </div>

            {last7Days.length === 0 ? (

              <div className="empty-history">

                <div>
                  📊
                </div>

                <h3>
                  No history available yet
                </h3>

                <p>
                  Complete today's tracking
                  period to build your 7-day
                  history.
                </p>

              </div>

            ) : (

              <div className="history-table-wrapper">

                <table className="history-table">

                  <thead>

                    <tr>

                      <th>
                        Date
                      </th>

                      <th>
                        Steps
                      </th>

                      <th>
                        Distance
                      </th>

                      <th>
                        Calories
                      </th>

                      <th>
                        Sleep
                      </th>

                      <th>
                        Water
                      </th>

                      <th>
                        Mood
                      </th>

                      <th>
                        Score
                      </th>

                    </tr>

                  </thead>

                  <tbody>

                    {last7Days.map(
                      (day) => (
                        <tr
                          key={
                            day.id ||
                            day.trackingDate
                          }
                        >

                          <td>
                            {formatDate(
                              day.trackingDate
                            )}
                          </td>

                          <td>
                            {formatNumber(
                              day.steps
                            )}
                          </td>

                          <td>
                            {Number(
                              day.distanceKm ||
                                0
                            ).toFixed(2)}{" "}
                            km
                          </td>

                          <td>
                            {Number(
                              day.caloriesBurned ||
                                0
                            ).toFixed(1)}
                          </td>

                          <td>
                            {day.sleepHours ??
                              "-"}{" "}
                            hrs
                          </td>

                          <td>
                            {day.waterGlasses ??
                              0}
                          </td>

                          <td>
                            {day.mood || "-"}
                          </td>

                          <td>

                            <span className="history-score">

                              {day.healthScore ??
                                "-"}

                            </span>

                          </td>

                        </tr>
                      )
                    )}

                  </tbody>

                </table>

              </div>

            )}

          </div>

          {/* DISCLAIMER */}

          <div className="health-disclaimer">

            <strong>
              Important:
            </strong>{" "}

            Activity distance and calorie
            values are estimates and should
            not be considered medical
            measurements. Nurture AI is
            intended for wellness tracking
            and does not replace professional
            medical advice.

          </div>

        </div>

      </div>

    </div>
  );
}

export default HealthTracking;