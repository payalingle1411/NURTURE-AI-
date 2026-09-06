import React, { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaArrowLeft,
  FaCalendarAlt,
  FaHeartbeat,
  FaWalking,
  FaAppleAlt,
  FaSmile,
  FaNotesMedical,
  FaBaby,
  FaRobot,
  FaDownload,
  FaSpinner,
  FaMoon,
  FaFire,
  FaClipboardCheck,
  FaUser,
  FaPhone,
  FaEnvelope,
  FaChartLine,
  FaShieldAlt,
  FaLightbulb,
  FaTint,
  FaClock,
  FaRoad,
  FaUserMd,
} from "react-icons/fa";

import Sidebar from "../../components/sidebar/Sidebar";
import API from "../../services/api";
import "./Report.css";

/* =========================================================
   GET LOGGED-IN USER ID
========================================================= */

const getUserId = () => {
  const possibleKeys = [
    "userId",
    "user_id",
    "loggedInUserId",
    "patientUserId",
  ];

  for (const key of possibleKeys) {
    const value = localStorage.getItem(key);

    if (value && value !== "null" && value !== "undefined") {
      return value;
    }
  }

  try {
    const user = JSON.parse(localStorage.getItem("user"));

    if (user?.id) return user.id;
    if (user?.userId) return user.userId;
  } catch (error) {
    console.warn("Unable to read logged-in user:", error);
  }

  return null;
};

/* =========================================================
   HELPERS
========================================================= */

const formatDate = (date) => {
  if (!date) return "Not available";

  const parsed = new Date(date);

  if (Number.isNaN(parsed.getTime())) {
    return date;
  }

  return parsed.toLocaleDateString("en-IN", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });
};

const formatNumber = (value, decimals = 0) => {
  if (value === null || value === undefined || value === "") {
    return "--";
  }

  const number = Number(value);

  if (Number.isNaN(number)) {
    return "--";
  }

  return number.toLocaleString("en-IN", {
    maximumFractionDigits: decimals,
  });
};

const numericValue = (value, fallback = null) => {
  if (value === null || value === undefined || value === "") {
    return fallback;
  }

  const number = Number(value);

  return Number.isNaN(number) ? fallback : number;
};

const getScoreStatus = (score) => {
  const value = Number(score);

  if (Number.isNaN(value)) return "No data";
  if (value >= 80) return "Good";
  if (value >= 60) return "Fair";

  return "Needs Attention";
};

const getScoreClass = (score) => {
  const value = Number(score);

  if (Number.isNaN(value)) return "neutral";
  if (value >= 80) return "good";
  if (value >= 60) return "fair";

  return "attention";
};

const getUserName = (data) => {
  return (
    data?.patient?.fullName ||
    data?.user?.fullName ||
    data?.profile?.fullName ||
    data?.fullName ||
    "Patient"
  );
};

const getPhoneNumber = (data) => {
  return (
    data?.patient?.phoneNumber ||
    data?.patient?.mobile ||
    data?.user?.phoneNumber ||
    data?.user?.mobile ||
    data?.profile?.phoneNumber ||
    data?.phoneNumber ||
    data?.mobile ||
    "Not available"
  );
};

const getEmail = (data) => {
  return (
    data?.patient?.email ||
    data?.user?.email ||
    data?.profile?.email ||
    data?.email ||
    "Not available"
  );
};

/* =========================================================
   COMPONENT
========================================================= */

const Report = () => {
  const navigate = useNavigate();

  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  /* =======================================================
     LOAD REPORT
  ======================================================= */

  useEffect(() => {
    const loadReport = async () => {
      const userId = getUserId();

      if (!userId) {
        setError("User session not found. Please login again.");
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError("");

        const response = await API.get(`/reports/${userId}`, {
          withCredentials: true,
        });

        console.log("Report API response:", response.data);

        setReport(response?.data || {});
      } catch (err) {
        console.error("Report loading error:", err);

        setError(
          err?.response?.data?.message ||
            "Unable to load your wellness report."
        );
      } finally {
        setLoading(false);
      }
    };

    loadReport();
  }, []);

  /* =========================================================
     NORMALIZE BACKEND RESPONSE
  ========================================================= */

  const data = useMemo(() => {
    if (!report) return {};

    return {
      patient: report.patient || report.user || {},

      pregnancy:
        report.pregnancy ||
        report.pregnancyProfile ||
        {},

      health:
        report.health ||
        report.healthTracking ||
        {},

      nutrition:
        report.nutrition ||
        report.nutritionSummary ||
        {},

      mood:
        report.mood ||
        report.moodSummary ||
        {},

      symptoms:
        report.symptoms ||
        report.symptomSummary ||
        {},

      ai:
        report.aiInsight ||
        report.ai ||
        {},

      reportPeriod:
        report.reportPeriod ||
        report.period || {
          startDate: report.weekStart,
          endDate: report.weekEnd,
        },

      overallScore:
        report.overallWellnessScore ??
        report.overallScore ??
        null,

      scoreChange:
        report.scoreChange ?? null,
    };
  }, [report]);

  /* =========================================================
     DOWNLOAD
  ========================================================= */

  const handleDownload = () => {
    window.print();
  };

  /* =========================================================
     LOADING
  ========================================================= */

  if (loading) {
    return (
      <div className="report-layout">
        <Sidebar />

        <main className="report-page">
          <div className="report-loading">
            <FaSpinner className="report-spinner" />

            <h2>Preparing your wellness report</h2>

            <p>
              We are preparing your pregnancy wellness summary.
            </p>
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     ERROR
  ========================================================= */

  if (error) {
    return (
      <div className="report-layout">
        <Sidebar />

        <main className="report-page">
          <div className="report-error">
            <div className="report-error-icon">
              <FaNotesMedical />
            </div>

            <span className="error-label">
              REPORT ERROR
            </span>

            <h2>Unable to Load Report</h2>

            <p>{error}</p>

            <button
              className="report-primary-btn"
              onClick={() => navigate("/dashboard")}
            >
              Back to Dashboard
            </button>
          </div>
        </main>
      </div>
    );
  }

  /* =========================================================
     PATIENT INFORMATION
  ========================================================= */

  const patientName = getUserName(data);
  const phoneNumber = getPhoneNumber(data);
  const email = getEmail(data);

  /* =========================================================
     PREGNANCY INFORMATION
  ========================================================= */

  const pregnancyWeek =
    data.pregnancy?.pregnancyWeek ??
    data.pregnancy?.week ??
    "--";

  const trimester =
    data.pregnancy?.trimester ||
    "Not available";

  const babyCount =
    data.pregnancy?.babyCount ??
    data.pregnancy?.numberOfBabies ??
    "--";

  const dueDate =
    data.pregnancy?.dueDate ||
    data.pregnancy?.expectedDueDate;

  const pregnancyType =
    data.pregnancy?.pregnancyType ||
    "Not available";

  const firstPregnancy =
    data.pregnancy?.firstPregnancy;

  const previousPregnancies =
    data.pregnancy?.previousPregnancies;

  const liveBirths =
    data.pregnancy?.liveBirths;

  const miscarriages =
    data.pregnancy?.miscarriages;

  const highRisk =
    data.pregnancy?.highRisk;

  const doctorNotes =
    data.pregnancy?.doctorNotes ||
    "No doctor notes recorded.";

  /* =========================================================
     WEEKLY AVERAGE HEALTH DATA
  ========================================================= */

  const avgSteps =
    data.health?.averageSteps ??
    data.health?.avgSteps ??
    data.health?.stepsAverage;

  const avgActiveMinutes =
    data.health?.averageActivityMinutes ??
    data.health?.averageActiveMinutes ??
    data.health?.avgActiveMinutes;

  const avgDistance =
    data.health?.averageDistanceKm ??
    data.health?.avgDistanceKm ??
    data.health?.averageDistance;

  const avgCalories =
    data.health?.averageCaloriesBurned ??
    data.health?.averageCalories ??
    data.health?.caloriesBurned;

  const avgSleep =
    data.health?.averageSleepHours ??
    data.health?.sleepHours;

  const avgWater =
    data.health?.averageWaterGlasses ??
    data.health?.waterGlasses;

  /* =========================================================
     WELLNESS SCORES
  ========================================================= */

  const healthScore =
    data.health?.averageHealthScore ??
    data.health?.healthScore;

  const nutritionScore =
    data.nutrition?.score ??
    data.nutrition?.nutritionScore;

  const moodScore =
    data.mood?.score ??
    data.mood?.moodScore;

  const symptomStatus =
    data.symptoms?.status ||
    data.symptoms?.trend ||
    "Stable";

  const symptomSeverity =
    data.symptoms?.averageSeverity ??
    data.symptoms?.severity;

  /* =========================================================
     OVERALL SCORE
  ========================================================= */

  const overallScore = numericValue(
    data.overallScore
  );

  const overallStatus =
    getScoreStatus(overallScore);

  const overallScoreClass =
    getScoreClass(overallScore);

  /* =========================================================
     REPORT PERIOD
  ========================================================= */

  const startDate =
    data.reportPeriod?.startDate;

  const endDate =
    data.reportPeriod?.endDate;

  const reportPeriod =
    startDate && endDate
      ? `${formatDate(startDate)} – ${formatDate(endDate)}`
      : "Weekly Report";

  /* =========================================================
     AI INSIGHT
  ========================================================= */

  const aiInsight =
    data.ai?.message ||
    data.ai?.insight ||
    data.ai?.summary ||
    "Your wellness information has been reviewed for this reporting period. Continue following your regular wellness routine and discuss any persistent or concerning symptoms with your healthcare professional.";

  /* =========================================================
     RENDER
  ========================================================= */

  return (
    <div className="report-layout">

      <Sidebar />

      <main className="report-page">

        <div className="report-container">

          {/* =================================================
              TOP BAR
          ================================================= */}

          <div className="report-topbar">

            <button
              className="report-back-btn"
              onClick={() => navigate(-1)}
            >
              <FaArrowLeft />
              <span>Back</span>
            </button>

            <div className="report-actions">

              <span className="secure-report">
                <FaShieldAlt />
                Private Wellness Report
              </span>

              <button
                className="report-download-btn"
                onClick={handleDownload}
              >
                <FaDownload />
                Download PDF
              </button>

            </div>

          </div>

          {/* =================================================
              HEADER
          ================================================= */}

          <section className="report-hero">

            <div className="hero-left">

              <div className="hero-brand">

                <div className="hero-logo">
                  <FaHeartbeat />
                </div>

                <div className="hero-brand-text">
                  <span>NURTURE AI</span>
                  <small>
                    Pregnancy Wellness Platform
                  </small>
                </div>

              </div>

              <div className="hero-title">

                <span className="hero-eyebrow">
                  PERSONALIZED PREGNANCY REPORT
                </span>

                <h1>
                  Pregnancy Wellness
                  <br />
                  <strong>Weekly Report</strong>
                </h1>

                <p>
                  A simple summary of your pregnancy
                  progress and weekly wellness information.
                </p>

              </div>

            </div>

            <div className="hero-right">

              <div className="report-date-box">

                <FaCalendarAlt />

                <div>
                  <span>REPORT PERIOD</span>
                  <strong>{reportPeriod}</strong>
                </div>

              </div>

              <div className="generated-label">
                Generated on {formatDate(new Date())}
              </div>

            </div>

          </section>

          {/* =================================================
              PATIENT INFORMATION
          ================================================= */}

          <section className="patient-card">

            <div className="patient-profile">

              <div className="patient-avatar">
                <FaUser />
              </div>

              <div className="patient-main">

                <span className="card-label">
                  PATIENT
                </span>

                <h2>{patientName}</h2>

                <div className="patient-meta">

                  <span>
                    <FaEnvelope />
                    {email}
                  </span>

                  <span>
                    <FaPhone />
                    {phoneNumber}
                  </span>

                </div>

              </div>

            </div>

            <div className="patient-pregnancy">

              <div>
                <span>Pregnancy</span>

                <strong>
                  {pregnancyWeek !== "--"
                    ? `Week ${pregnancyWeek}`
                    : "--"}
                </strong>
              </div>

              <div>
                <span>Trimester</span>
                <strong>{trimester}</strong>
              </div>

              <div>
                <span>Baby Count</span>
                <strong>{babyCount}</strong>
              </div>

            </div>

          </section>

          {/* =================================================
              01 PREGNANCY OVERVIEW
          ================================================= */}

          <section className="report-section">

            <div className="section-header">

              <div className="section-title-group">

                <span className="section-number">
                  01
                </span>

                <div>
                  <span className="section-label">
                    PREGNANCY OVERVIEW
                  </span>

                  <h2>
                    Your Pregnancy Journey
                  </h2>
                </div>

              </div>

              <FaBaby className="section-header-icon" />

            </div>

            <div className="pregnancy-overview-grid">

              <div className="pregnancy-overview-card">

                <div className="overview-icon">
                  <FaBaby />
                </div>

                <div>
                  <span>Pregnancy Week</span>

                  <strong>
                    {pregnancyWeek !== "--"
                      ? `Week ${pregnancyWeek}`
                      : "--"}
                  </strong>

                  <small>
                    Current pregnancy progress
                  </small>
                </div>

              </div>

              <div className="pregnancy-overview-card">

                <div className="overview-icon">
                  <FaHeartbeat />
                </div>

                <div>
                  <span>Trimester</span>

                  <strong>{trimester}</strong>

                  <small>
                    Current stage of pregnancy
                  </small>
                </div>

              </div>

              <div className="pregnancy-overview-card">

                <div className="overview-icon">
                  <FaBaby />
                </div>

                <div>
                  <span>Baby Count</span>

                  <strong>{babyCount}</strong>

                  <small>
                    Number of babies recorded
                  </small>
                </div>

              </div>

              <div className="pregnancy-overview-card">

                <div className="overview-icon">
                  <FaCalendarAlt />
                </div>

                <div>
                  <span>Expected Due Date</span>

                  <strong>
                    {formatDate(dueDate)}
                  </strong>

                  <small>
                    Recorded expected delivery date
                  </small>
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              02 OVERALL WELLNESS
          ================================================= */}

          <section className="report-section">

            <div className="section-header">

              <div className="section-title-group">

                <span className="section-number">
                  02
                </span>

                <div>
                  <span className="section-label">
                    WELLNESS SCORE
                  </span>

                  <h2>
                    Overall Wellness
                  </h2>
                </div>

              </div>

              <FaChartLine className="section-header-icon" />

            </div>

            <div className="wellness-main-card">

              <div className="score-area">

                <div
                  className="score-ring"
                  style={{
                    "--score":
                      overallScore !== null
                        ? overallScore
                        : 0,
                  }}
                >

                  <div className="score-ring-inner">

                    <span>WELLNESS</span>

                    <strong>
                      {overallScore !== null
                        ? formatNumber(overallScore)
                        : "--"}
                    </strong>

                    <small>/ 100</small>

                  </div>

                </div>

              </div>

              <div className="wellness-summary">

                <div className="wellness-heading">

                  <div>
                    <span>WEEKLY ASSESSMENT</span>

                    <h3>
                      Your Overall Wellness
                    </h3>
                  </div>

                  <div
                    className={`score-badge ${overallScoreClass}`}
                  >
                    {overallStatus}
                  </div>

                </div>

                <p>
                  This score provides a simple summary
                  of the wellness information recorded
                  during this reporting period.
                </p>

                {data.scoreChange !== null &&
                  data.scoreChange !== undefined && (
                    <div className="score-comparison">

                      <FaChartLine />

                      <div>
                        <span>
                          Change from previous report
                        </span>

                        <strong>
                          {Number(data.scoreChange) >= 0
                            ? "↑"
                            : "↓"}{" "}
                          {Math.abs(
                            Number(data.scoreChange)
                          )}
                          %
                        </strong>
                      </div>

                    </div>
                  )}

              </div>

            </div>

          </section>

          {/* =================================================
              03 WEEKLY AVERAGE HEALTH
          ================================================= */}

          <section className="report-section">

            <div className="section-header">

              <div className="section-title-group">

                <span className="section-number">
                  03
                </span>

                <div>
                  <span className="section-label">
                    WEEKLY AVERAGES
                  </span>

                  <h2>
                    Health Summary
                  </h2>
                </div>

              </div>

              <FaWalking className="section-header-icon" />

            </div>

            <p className="section-description">
              Average values from your health tracking
              records during this reporting period.
              Detailed daily activity remains available
              on the Health Tracking page.
            </p>

            <div className="average-health-grid">

              <div className="average-card">

                <div className="average-icon">
                  <FaWalking />
                </div>

                <div className="average-card-content">
                  <span>Average Steps</span>

                  <strong>
                    {formatNumber(avgSteps)}
                  </strong>

                  <small>
                    steps per day
                  </small>
                </div>

              </div>

              <div className="average-card">

                <div className="average-icon">
                  <FaClock />
                </div>

                <div className="average-card-content">
                  <span>Average Active Time</span>

                  <strong>
                    {formatNumber(avgActiveMinutes)}
                  </strong>

                  <small>
                    minutes per day
                  </small>
                </div>

              </div>

              <div className="average-card">

                <div className="average-icon">
                  <FaRoad />
                </div>

                <div className="average-card-content">
                  <span>Average Distance</span>

                  <strong>
                    {formatNumber(avgDistance, 1)}
                  </strong>

                  <small>
                    km per day
                  </small>
                </div>

              </div>

              <div className="average-card">

                <div className="average-icon">
                  <FaFire />
                </div>

                <div className="average-card-content">
                  <span>Average Calories</span>

                  <strong>
                    {formatNumber(avgCalories)}
                  </strong>

                  <small>
                    calories per day
                  </small>
                </div>

              </div>

              <div className="average-card">

                <div className="average-icon">
                  <FaMoon />
                </div>

                <div className="average-card-content">
                  <span>Average Sleep</span>

                  <strong>
                    {formatNumber(avgSleep, 1)}
                  </strong>

                  <small>
                    hours per day
                  </small>
                </div>

              </div>

              <div className="average-card">

                <div className="average-icon">
                  <FaTint />
                </div>

                <div className="average-card-content">
                  <span>Average Water</span>

                  <strong>
                    {formatNumber(avgWater)}
                  </strong>

                  <small>
                    glasses per day
                  </small>
                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              04 PREGNANCY HEALTH
          ================================================= */}

          <section className="report-section">

            <div className="section-header">

              <div className="section-title-group">

                <span className="section-number">
                  04
                </span>

                <div>
                  <span className="section-label">
                    PREGNANCY INFORMATION
                  </span>

                  <h2>
                    Pregnancy Health Summary
                  </h2>
                </div>

              </div>

              <FaUserMd className="section-header-icon" />

            </div>

            <div className="pregnancy-health-box">

              <div className="pregnancy-info-row">

                <div className="pregnancy-info-item">
                  <span>Pregnancy Type</span>

                  <strong>
                    {pregnancyType}
                  </strong>
                </div>

                <div className="pregnancy-info-item">
                  <span>First Pregnancy</span>

                  <strong>
                    {firstPregnancy === true
                      ? "Yes"
                      : firstPregnancy === false
                      ? "No"
                      : "Not recorded"}
                  </strong>
                </div>

              </div>

              <div className="pregnancy-info-row">

                <div className="pregnancy-info-item">
                  <span>Previous Pregnancies</span>

                  <strong>
                    {previousPregnancies ??
                      "Not recorded"}
                  </strong>
                </div>

                <div className="pregnancy-info-item">
                  <span>Live Births</span>

                  <strong>
                    {liveBirths ??
                      "Not recorded"}
                  </strong>
                </div>

              </div>

              <div className="pregnancy-info-row">

                <div className="pregnancy-info-item">
                  <span>Miscarriages</span>

                  <strong>
                    {miscarriages ??
                      "Not recorded"}
                  </strong>
                </div>

                <div className="pregnancy-info-item">
                  <span>High-Risk Pregnancy</span>

                  <strong
                    className={
                      highRisk === true
                        ? "risk-yes"
                        : highRisk === false
                        ? "risk-no"
                        : ""
                    }
                  >
                    {highRisk === true
                      ? "Yes"
                      : highRisk === false
                      ? "No"
                      : "Not recorded"}
                  </strong>
                </div>

              </div>

            </div>

            <div className="doctor-notes">

              <div className="doctor-notes-icon">
                <FaNotesMedical />
              </div>

              <div className="doctor-notes-content">

                <span>DOCTOR NOTES</span>

                <p>{doctorNotes}</p>

              </div>

            </div>

          </section>

          {/* =================================================
              05 WELLNESS SUMMARY
          ================================================= */}

          <section className="report-section">

            <div className="section-header">

              <div className="section-title-group">

                <span className="section-number">
                  05
                </span>

                <div>
                  <span className="section-label">
                    WELLNESS SUMMARY
                  </span>

                  <h2>
                    Nutrition, Mood & Symptoms
                  </h2>
                </div>

              </div>

            </div>

            <div className="wellness-summary-grid">

              {/* NUTRITION */}

              <div className="wellness-summary-card">

                <div className="summary-card-icon">
                  <FaAppleAlt />
                </div>

                <div className="summary-card-content">

                  <span>Nutrition</span>

                  <strong>
                    {formatNumber(nutritionScore)}

                    {nutritionScore !== undefined &&
                      nutritionScore !== null &&
                      " / 100"}
                  </strong>

                  <small
                    className={`summary-status ${getScoreClass(
                      nutritionScore
                    )}`}
                  >
                    {getScoreStatus(nutritionScore)}
                  </small>

                </div>

              </div>

              {/* MOOD */}

              <div className="wellness-summary-card">

                <div className="summary-card-icon">
                  <FaSmile />
                </div>

                <div className="summary-card-content">

                  <span>
                    Emotional Wellbeing
                  </span>

                  <strong>
                    {formatNumber(moodScore)}

                    {moodScore !== undefined &&
                      moodScore !== null &&
                      " / 100"}
                  </strong>

                  <small
                    className={`summary-status ${getScoreClass(
                      moodScore
                    )}`}
                  >
                    {getScoreStatus(moodScore)}
                  </small>

                </div>

              </div>

              {/* SYMPTOMS */}

              <div className="wellness-summary-card">

                <div className="summary-card-icon">
                  <FaNotesMedical />
                </div>

                <div className="summary-card-content">

                  <span>Symptoms</span>

                  <strong>
                    {symptomStatus}
                  </strong>

                  <small>
                    {symptomSeverity !== undefined &&
                    symptomSeverity !== null
                      ? `Average severity: ${symptomSeverity}`
                      : "Based on recorded symptoms"}
                  </small>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              06 AI INSIGHT
          ================================================= */}

          <section className="ai-report-section">

            <div className="ai-report-card">

              <div className="ai-report-icon">
                <FaRobot />
              </div>

              <div className="ai-report-content">

                <div className="ai-report-heading">

                  <div>
                    <span>NURTURE AI</span>

                    <h2>
                      Personalized Wellness Insight
                    </h2>
                  </div>

                  <FaLightbulb />

                </div>

                <p>
                  {aiInsight}
                </p>

                <div className="ai-note">

                  <FaClipboardCheck />

                  <span>
                    This insight is based on the
                    information recorded during this
                    report period.
                  </span>

                </div>

              </div>

            </div>

          </section>

          {/* =================================================
              07 RECOMMENDATIONS
          ================================================= */}

          <section className="recommendation-section">

            <div className="recommendation-card">

              <div className="recommendation-icon">
                <FaLightbulb />
              </div>

              <div className="recommendation-content">

                <span className="section-label">
                  WELLNESS REMINDER
                </span>

                <h3>
                  Continue maintaining healthy habits
                </h3>

                <p>
                  Continue recording your wellness
                  information regularly so your reports
                  can show meaningful changes over time.
                </p>

              </div>

            </div>

            <div className="recommendation-card">

              <div className="recommendation-icon">
                <FaShieldAlt />
              </div>

              <div className="recommendation-content">

                <span className="section-label">
                  IMPORTANT
                </span>

                <h3>
                  When to contact your healthcare professional
                </h3>

                <p>
                  If you experience persistent, unusual,
                  or concerning symptoms, contact your
                  doctor or healthcare professional.
                  This report does not replace medical advice.
                </p>

              </div>

            </div>

          </section>

          {/* =================================================
              FOOTER
          ================================================= */}

          <footer className="report-footer">

            <div className="footer-brand">

              <div className="footer-logo">
                <FaHeartbeat />
              </div>

              <div>
                <strong>Nurture AI</strong>

                <span>
                  Personalized pregnancy wellness support
                </span>
              </div>

            </div>

            <div className="footer-right">

              <span>
                Report generated on{" "}
                {formatDate(new Date())}
              </span>

              <span>
                Confidential Wellness Report
              </span>

            </div>

          </footer>

        </div>

      </main>

    </div>
  );
};

export default Report;