import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaCalendarAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import "./WelcomeCard.css";

function WelcomeCard() {
  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH LOGGED-IN USER PROFILE
  // =========================================================

  const fetchProfile = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get("/profile/me", {
        withCredentials: true,
      });

      const data = response.data;

      console.log("WELCOME CARD PROFILE:", data);

      setProfile(data);

    } catch (err) {
      console.error("WelcomeCard Error:", err);

      if (err.response?.status === 401) {
        setError(
          "Your session has expired. Please login again."
        );
      } else {
        setError(
          err.response?.data?.message ||
          err.message ||
          "Unable to load profile."
        );
      }

    } finally {
      setLoading(false);
    }
  }, []);

  // =========================================================
  // LOAD PROFILE
  // =========================================================

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="welcome-card">
        <div className="welcome-content">
          <div className="welcome-text">
            <h2>👋 Welcome back!</h2>

            <p>
              Loading your pregnancy information...
            </p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="welcome-card">
        <div className="welcome-content">
          <div className="welcome-text">
            <h2>👋 Welcome back!</h2>

            <p>{error}</p>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================
  // NO PROFILE
  // =========================================================

  if (!profile) {
    return null;
  }

  // =========================================================
  // USER INFORMATION
  // =========================================================

  const fullName = profile.fullName || "User";

  // =========================================================
  // PREGNANCY DATA
  // =========================================================

  const pregnancy =
    profile.pregnancyProfile || {};

  const pregnancyWeek =
    pregnancy.pregnancyWeek ??
    pregnancy.currentWeek ??
    null;

  const trimester =
    pregnancy.trimester ||
    getTrimester(pregnancyWeek);

  // =========================================================
  // BABY DEVELOPMENT DATA
  // =========================================================

  const babyData = getBabyDevelopment(
    pregnancyWeek
  );

  // =========================================================
  // HEALTH STATUS
  // =========================================================

  const healthStatus =
    profile.healthStatus || "Healthy";

  const healthMessage =
    profile.healthMessage ||
    "Keep following your healthy routine";

  // =========================================================
  // TODAY'S GOAL
  // =========================================================

  const todayGoal =
    profile.todayGoal ||
    "Drink 8 glasses of water";

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="welcome-card">

      {/* =====================================================
          BABY FRUIT CIRCLE
      ===================================================== */}

      <button
        className="baby-fruit-circle"
        onClick={() =>
          navigate("/baby-development")
        }
        title="View Baby Development"
      >
        <span className="fruit-emoji">
          {babyData.fruit}
        </span>

        <span className="fruit-week">
          {pregnancyWeek
            ? `W${pregnancyWeek}`
            : "Baby"}
        </span>
      </button>

      <div className="welcome-content">

        {/* =================================================
            LEFT SIDE
        ================================================= */}

        <div className="welcome-text">

          <h2>
            👋 Good Morning, {fullName}!
          </h2>

          <p>
            Welcome back to{" "}
            <span>Nurture AI</span>
          </p>

          <div className="welcome-info">

            {/* =============================================
                PREGNANCY WEEK
            ============================================= */}

            <div className="info-box">

              <FaCalendarAlt
                className="info-icon"
              />

              <div>
                <h4>
                  {pregnancyWeek
                    ? `Week ${pregnancyWeek}`
                    : "Pregnancy Week"}
                </h4>

                <p>
                  {trimester ||
                    "Pregnancy information"}
                </p>
              </div>

            </div>

            {/* =============================================
                HEALTH STATUS
            ============================================= */}

            <div className="info-box">

              <FaHeart
                className="info-icon"
              />

              <div>
                <h4>
                  {healthStatus}
                </h4>

                <p>
                  {healthMessage}
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* =================================================
            RIGHT SIDE
        ================================================= */}

        <div className="welcome-right">

          <h3>
            🌸 Today's Goal
          </h3>

          <p>
            {todayGoal}
          </p>

          {/* Small baby information */}

          {pregnancyWeek && (
            <button
              className="baby-development-link"
              onClick={() =>
                navigate("/baby-development")
              }
            >
              {babyData.fruit} Baby ≈{" "}
              {babyData.fruitName}

              <span>
                View development →
              </span>
            </button>
          )}

        </div>

      </div>

    </div>
  );
}

// =========================================================
// CALCULATE TRIMESTER
// =========================================================

function getTrimester(week) {
  if (!week) {
    return null;
  }

  if (week <= 13) {
    return "First Trimester";
  }

  if (week <= 27) {
    return "Second Trimester";
  }

  return "Third Trimester";
}

// =========================================================
// BABY DEVELOPMENT DATA
// =========================================================

function getBabyDevelopment(week) {

  if (!week) {
    return {
      fruit: "🌱",
      fruitName: "your baby",
    };
  }

  if (week <= 4) {
    return {
      fruit: "🌱",
      fruitName: "a seed",
    };
  }

  if (week <= 7) {
    return {
      fruit: "🫐",
      fruitName: "a blueberry",
    };
  }

  if (week <= 10) {
    return {
      fruit: "🍓",
      fruitName: "a strawberry",
    };
  }

  if (week <= 13) {
    return {
      fruit: "🍋",
      fruitName: "a lemon",
    };
  }

  if (week <= 16) {
    return {
      fruit: "🥑",
      fruitName: "an avocado",
    };
  }

  if (week <= 20) {
    return {
      fruit: "🍌",
      fruitName: "a banana",
    };
  }

  if (week <= 24) {
    return {
      fruit: "🌽",
      fruitName: "an ear of corn",
    };
  }

  if (week <= 27) {
    return {
      fruit: "🥦",
      fruitName: "a broccoli head",
    };
  }

  if (week <= 30) {
    return {
      fruit: "🍆",
      fruitName: "an eggplant",
    };
  }

  if (week <= 33) {
    return {
      fruit: "🥥",
      fruitName: "a coconut",
    };
  }

  if (week <= 36) {
    return {
      fruit: "🍈",
      fruitName: "a honeydew melon",
    };
  }

  if (week <= 39) {
    return {
      fruit: "🍉",
      fruitName: "a small watermelon",
    };
  }

  return {
    fruit: "🍉",
    fruitName: "a watermelon",
  };
}

export default WelcomeCard;
