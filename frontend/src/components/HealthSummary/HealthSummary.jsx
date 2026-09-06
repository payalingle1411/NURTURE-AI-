import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";

import {
  FaHeartbeat,
  FaWalking,
  FaFire,
  FaRoad,
  FaClock,
  FaSpinner,
} from "react-icons/fa";

import API from "../../services/api";
import "./HealthSummary.css";

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

/* =========================================================
   FORMAT NUMBER
   ========================================================= */

const formatNumber = (value) => {
  return Number(value || 0).toLocaleString("en-IN");
};

/* =========================================================
   HEALTH STATUS
   ========================================================= */

const getHealthStatus = (score) => {
  const value = Number(score || 0);

  if (value >= 80) {
    return "Excellent";
  }

  if (value >= 60) {
    return "Good";
  }

  if (value >= 40) {
    return "Average";
  }

  return "Needs Attention";
};

/* =========================================================
   HEALTH SUMMARY
   ========================================================= */

function HealthSummary() {
  /* =======================================================
     NAVIGATION
     ======================================================= */

  const navigate = useNavigate();

  const [healthData, setHealthData] = useState({
    healthScore: 0,
    steps: 0,
    caloriesBurned: 0,
    distanceKm: 0,
    activityMinutes: 0,
    trackingDate: null,
  });

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");

  /* =======================================================
     LOAD HEALTH DATA FROM DATABASE
     ======================================================= */

  useEffect(() => {
    const loadHealthSummary = async () => {
      const userId = getUserId();

      if (!userId) {
        setError(
          "User information not found."
        );

        setLoading(false);

        return;
      }

      try {
        setLoading(true);

        setError("");

        /*
         * Get last 7 completed tracking records
         * from database.
         */

        const response = await API.get(
          `/health-tracking/${userId}/last-7-days`,
          {
            withCredentials: true,
          }
        );

        const data = response.data;

        /*
         * Make sure response is an array.
         */

        const history =
          Array.isArray(data)
            ? data
            : [];

        /*
         * Get latest completed health record.
         */

        const latestRecord =
          [...history].sort((a, b) => {
            return (
              new Date(
                b.trackingDate || 0
              ) -
              new Date(
                a.trackingDate || 0
              )
            );
          })[0];

        if (!latestRecord) {
          /*
           * No completed health data yet.
           */

          setHealthData({
            healthScore: 0,
            steps: 0,
            caloriesBurned: 0,
            distanceKm: 0,
            activityMinutes: 0,
            trackingDate: null,
          });

          return;
        }

        /*
         * Store latest database record.
         */

        setHealthData({
          healthScore:
            Number(
              latestRecord.healthScore || 0
            ),

          steps:
            Number(
              latestRecord.steps || 0
            ),

          caloriesBurned:
            Number(
              latestRecord.caloriesBurned || 0
            ),

          distanceKm:
            Number(
              latestRecord.distanceKm || 0
            ),

          activityMinutes:
            Number(
              latestRecord.activityMinutes || 0
            ),

          trackingDate:
            latestRecord.trackingDate ||
            null,
        });

      } catch (err) {
        console.error(
          "Health Summary Error:",
          err
        );

        setError(
          err.response?.data?.message ||
            "Unable to load health summary."
        );

      } finally {
        setLoading(false);
      }
    };

    loadHealthSummary();
  }, []);

  /* =======================================================
     SCORE STATUS
     ======================================================= */

  const scoreStatus = useMemo(() => {
    return getHealthStatus(
      healthData.healthScore
    );
  }, [healthData.healthScore]);

  /* =======================================================
     LOADING
     ======================================================= */

  if (loading) {
    return (
      <section className="health-summary">

        <div className="health-summary-header">

          <div>
            <span className="health-summary-label">
              TODAY'S WELLNESS
            </span>

            <h2>
              Health Summary
            </h2>

            <p>
              Your latest health and activity
              overview.
            </p>
          </div>

        </div>

        <div className="health-summary-loading">

          <FaSpinner className="health-summary-spinner" />

          <span>
            Loading your health summary...
          </span>

        </div>

      </section>
    );
  }

  /* =======================================================
     ERROR
     ======================================================= */

  if (error) {
    return (
      <section className="health-summary">

        <div className="health-summary-header">

          <div>
            <span className="health-summary-label">
              TODAY'S WELLNESS
            </span>

            <h2>
              Health Summary
            </h2>

            <p>
              Your latest health and activity
              overview.
            </p>
          </div>

        </div>

        <div className="health-summary-empty">

          <div className="health-empty-icon">
            ❤️
          </div>

          <h3>
            Health data unavailable
          </h3>

          <p>
            {error}
          </p>

        </div>

      </section>
    );
  }

  /* =======================================================
     MAIN UI
     ======================================================= */

  return (
    <section className="health-summary">

      {/* ===================================================
          HEADER
          =================================================== */}

      <div className="health-summary-header">

        <div>

          <span className="health-summary-label">
            WELLNESS OVERVIEW
          </span>

          <h2>
            Health Summary
          </h2>

          <p>
            Your latest health and activity
            information.
          </p>

        </div>

        {/* =================================================
            HEADER ACTIONS
            ================================================= */}

        <div className="health-summary-actions">

          <div className="health-summary-today">

            <span className="health-today-dot"></span>

            Latest Record

          </div>

          {/* =================================================
              TRACK HEALTH BUTTON
              ================================================= */}

          <button
            type="button"
            className="health-tracking-btn"
            onClick={() =>
              navigate("/health-tracking")
            }
          >
            <FaWalking />

            Track Health
          </button>

        </div>

      </div>


      {/* ===================================================
          MAIN SCORE + ACTIVITY
          =================================================== */}

      <div className="health-summary-content">

        {/* =================================================
            OVERALL SCORE
            ================================================= */}

        <div className="health-score-card">

          <div className="health-score-decoration"></div>

          <div className="health-score-icon">
            <FaHeartbeat />
          </div>

          <div className="health-score-info">

            <span className="health-score-small-title">
              OVERALL HEALTH SCORE
            </span>

            <div className="health-score-value-row">

              <strong>
                {healthData.healthScore}
              </strong>

              <span>
                /100
              </span>

            </div>

            <div
              className={`health-score-status ${
                healthData.healthScore >= 80
                  ? "score-excellent"
                  : healthData.healthScore >= 60
                  ? "score-good"
                  : healthData.healthScore >= 40
                  ? "score-average"
                  : "score-attention"
              }`}
            >

              <span></span>

              {scoreStatus}

            </div>

          </div>

          <div className="health-score-progress">

            <div
              style={{
                width: `${Math.min(
                  Math.max(
                    Number(
                      healthData.healthScore || 0
                    ),
                    0
                  ),
                  100
                )}%`,
              }}
            ></div>

          </div>

        </div>


        {/* =================================================
            SMALL ACTIVITY CARDS
            ================================================= */}

        <div className="health-mini-grid">

          {/* STEPS */}

          <div className="health-mini-card">

            <div className="health-mini-icon steps-icon">
              <FaWalking />
            </div>

            <div>

              <span>
                Steps
              </span>

              <strong>
                {formatNumber(
                  healthData.steps
                )}
              </strong>

              <small>
                steps recorded
              </small>

            </div>

          </div>


          {/* CALORIES */}

          <div className="health-mini-card">

            <div className="health-mini-icon calories-icon">
              <FaFire />
            </div>

            <div>

              <span>
                Calories
              </span>

              <strong>
                {Number(
                  healthData.caloriesBurned || 0
                ).toFixed(1)}

                <em>
                  {" "}kcal
                </em>

              </strong>

              <small>
                estimated
              </small>

            </div>

          </div>


          {/* DISTANCE */}

          <div className="health-mini-card">

            <div className="health-mini-icon distance-icon">
              <FaRoad />
            </div>

            <div>

              <span>
                Distance
              </span>

              <strong>
                {Number(
                  healthData.distanceKm || 0
                ).toFixed(2)}

                <em>
                  {" "}km
                </em>

              </strong>

              <small>
                estimated
              </small>

            </div>

          </div>


          {/* ACTIVE TIME */}

          <div className="health-mini-card">

            <div className="health-mini-icon activity-icon">
              <FaClock />
            </div>

            <div>

              <span>
                Active Time
              </span>

              <strong>
                {Number(
                  healthData.activityMinutes || 0
                )}

                <em>
                  {" "}min
                </em>

              </strong>

              <small>
                activity time
              </small>

            </div>

          </div>

        </div>

      </div>


      {/* ===================================================
          FOOTER NOTE
          =================================================== */}

      <div className="health-summary-footer">

        <span>
          ❤️
        </span>

        <p>
          Your health score is calculated
          from your recorded daily activity
          and wellness information.
        </p>

      </div>

    </section>
  );
}

export default HealthSummary;