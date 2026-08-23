import { useCallback, useEffect, useState } from "react";
import {
  FaArrowLeft,
  FaHeart,
  FaLeaf,
} from "react-icons/fa";

import { useNavigate } from "react-router-dom";

import "./BabyDevelopment.css";

function BabyDevelopment() {

  const navigate = useNavigate();

  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH PROFILE
  // =========================================================

  const fetchProfile = useCallback(async () => {

    try {

      setLoading(true);
      setError("");

      const response = await fetch(
        "http://localhost:8080/api/profile/me",
        {
          method: "GET",
          credentials: "include",
        }
      );

      if (!response.ok) {

        if (response.status === 401) {
          throw new Error(
            "Your session has expired. Please login again."
          );
        }

        throw new Error(
          "Unable to load pregnancy information."
        );
      }

      const data = await response.json();

      console.log(
        "BABY DEVELOPMENT PROFILE:",
        data
      );

      setProfile(data);

    } catch (err) {

      console.error(
        "BabyDevelopment Error:",
        err
      );

      setError(
        err.message ||
        "Unable to load information."
      );

    } finally {

      setLoading(false);

    }

  }, []);

  // =========================================================
  // LOAD
  // =========================================================

  useEffect(() => {

    fetchProfile();

  }, [fetchProfile]);

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {

    return (
      <div className="baby-development-page">

        <div className="baby-loading">

          <div className="loading-fruit">
            🌱
          </div>

          <h2>
            Loading baby development...
          </h2>

          <p>
            Preparing this week's information
          </p>

        </div>

      </div>
    );

  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {

    return (
      <div className="baby-development-page">

        <div className="baby-error">

          <h2>
            Something went wrong
          </h2>

          <p>
            {error}
          </p>

          <button
            onClick={() =>
              navigate(-1)
            }
          >
            Go Back
          </button>

        </div>

      </div>
    );

  }

  // =========================================================
  // PREGNANCY DATA
  // =========================================================

  const pregnancy =
    profile?.pregnancyProfile || {};

  const pregnancyWeek =
    pregnancy.pregnancyWeek ??
    pregnancy.currentWeek ??
    null;

  const babyData =
    getBabyDevelopment(
      pregnancyWeek
    );

  const trimester =
    pregnancy.trimester ||
    getTrimester(pregnancyWeek);

  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="baby-development-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="baby-page-header">

        <button
          className="back-button"
          onClick={() =>
            navigate(-1)
          }
        >
          <FaArrowLeft />
          Back
        </button>

        <div>
          <h1>
            Baby Development This Week
          </h1>

          <p>
            A simple look at your baby's growth
          </p>
        </div>

      </div>


      {/* =====================================================
          MAIN CARD
      ===================================================== */}

      <div className="baby-main-card">

        {/* ===================================================
            FRUIT
        =================================================== */}

        <div className="baby-visual">

          <div className="large-fruit-circle">

            <span>
              {babyData.fruit}
            </span>

          </div>

          <h2>
            {babyData.fruitName}
          </h2>

          <p>
            Approximate size comparison
          </p>

        </div>


        {/* ===================================================
            BABY INFORMATION
        =================================================== */}

        <div className="baby-information">

          <div className="week-badge">
            Week {pregnancyWeek || "--"}
          </div>

          <h2>
            Your baby is approximately
          </h2>

          <h1>
            the size of {babyData.article}{" "}
            {babyData.fruitName}
          </h1>

          <p className="trimester-text">
            {trimester || "Pregnancy"} 
          </p>

        </div>

      </div>


      {/* =====================================================
          DEVELOPMENT HIGHLIGHTS
      ===================================================== */}

      <div className="development-card">

        <div className="section-title">

          <div className="section-icon">
            <FaHeart />
          </div>

          <div>
            <h2>
              Development Highlights
            </h2>

            <p>
              What's happening this week
            </p>
          </div>

        </div>


        <div className="development-list">

          {babyData.highlights.map(
            (item, index) => (

              <div
                className="development-item"
                key={index}
              >

                <span className="check-icon">
                  ✓
                </span>

                <p>
                  {item}
                </p>

              </div>

            )
          )}

        </div>

      </div>


      {/* =====================================================
          MOM WELLNESS
      ===================================================== */}

      <div className="mom-tip-card">

        <div className="tip-icon">
          <FaLeaf />
        </div>

        <div>

          <h2>
            💗 Mom's Wellness Tip
          </h2>

          <p>
            {babyData.tip}
          </p>

        </div>

      </div>


      {/* =====================================================
          DISCLAIMER
      ===================================================== */}

      <p className="baby-disclaimer">

        Fruit comparisons are approximate and are
        provided for simple visualization only.
        For medical advice, always consult your
        healthcare professional.

      </p>

    </div>
  );
}


// =========================================================
// TRIMESTER
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
// BABY DATA
// =========================================================

function getBabyDevelopment(week) {

  if (!week) {

    return {
      fruit: "🌱",
      fruitName: "your baby",
      article: "",
      highlights: [
        "Your pregnancy information will appear here.",
      ],
      tip:
        "Continue following your healthcare professional's advice.",
    };

  }


  if (week <= 4) {

    return {
      fruit: "🌱",
      fruitName: "seed",
      article: "a",
      highlights: [
        "Early development is beginning.",
        "The foundation for major organs is forming.",
        "Your body is adapting to pregnancy.",
      ],
      tip:
        "Focus on rest, hydration, and a balanced diet.",
    };

  }


  if (week <= 7) {

    return {
      fruit: "🫐",
      fruitName: "blueberry",
      article: "a",
      highlights: [
        "Early brain and spinal cord development is underway.",
        "The heart is beginning to develop.",
        "Tiny facial features are starting to form.",
      ],
      tip:
        "Take your prenatal vitamins as recommended and stay hydrated.",
    };

  }


  if (week <= 10) {

    return {
      fruit: "🍓",
      fruitName: "strawberry",
      article: "a",
      highlights: [
        "Major organs continue developing.",
        "Tiny fingers and toes are beginning to form.",
        "Facial features are becoming more defined.",
      ],
      tip:
        "Eat nutritious meals and give yourself plenty of rest.",
    };

  }


  if (week <= 13) {

    return {
      fruit: "🍋",
      fruitName: "lemon",
      article: "a",
      highlights: [
        "Your baby's body is becoming more proportionate.",
        "Movement is developing even though you may not feel it yet.",
        "Bones and muscles continue to develop.",
      ],
      tip:
        "Keep up with prenatal appointments and gentle activity if recommended.",
    };

  }


  if (week <= 16) {

    return {
      fruit: "🥑",
      fruitName: "avocado",
      article: "an",
      highlights: [
        "Your baby is becoming more active.",
        "Facial muscles are developing.",
        "The nervous system continues to mature.",
      ],
      tip:
        "Stay active with pregnancy-safe movement and drink plenty of water.",
    };

  }


  if (week <= 20) {

    return {
      fruit: "🍌",
      fruitName: "banana",
      article: "a",
      highlights: [
        "Your baby's movements are becoming stronger.",
        "Hearing is developing.",
        "Facial features are becoming more defined.",
      ],
      tip:
        "Stay hydrated, eat balanced meals, and get enough rest.",
    };

  }


  if (week <= 24) {

    return {
      fruit: "🌽",
      fruitName: "ear of corn",
      article: "an",
      highlights: [
        "Your baby's movements may become easier to notice.",
        "The lungs continue developing.",
        "Your baby is responding to sounds.",
      ],
      tip:
        "Take regular breaks, stay hydrated, and prioritize comfortable rest.",
    };

  }


  if (week <= 27) {

    return {
      fruit: "🥦",
      fruitName: "broccoli head",
      article: "a",
      highlights: [
        "Your baby continues gaining weight.",
        "The brain is developing rapidly.",
        "Your baby's senses continue becoming more developed.",
      ],
      tip:
        "Maintain a nutritious diet and keep up with regular checkups.",
    };

  }


  if (week <= 30) {

    return {
      fruit: "🍆",
      fruitName: "eggplant",
      article: "an",
      highlights: [
        "Your baby is gaining more body fat.",
        "The brain continues growing quickly.",
        "Your baby's movements may feel stronger.",
      ],
      tip:
        "Get comfortable sleep whenever possible and stay well hydrated.",
    };

  }


  if (week <= 33) {

    return {
      fruit: "🥥",
      fruitName: "coconut",
      article: "a",
      highlights: [
        "Your baby's bones are continuing to strengthen.",
        "The brain and nervous system continue maturing.",
        "Your baby is practicing breathing movements.",
      ],
      tip:
        "Rest when you need to and continue attending prenatal appointments.",
    };

  }


  if (week <= 36) {

    return {
      fruit: "🍈",
      fruitName: "honeydew melon",
      article: "a",
      highlights: [
        "Your baby continues gaining weight.",
        "The lungs are approaching maturity.",
        "Your baby is preparing for birth.",
      ],
      tip:
        "Keep your essentials ready and follow your healthcare provider's guidance.",
    };

  }


  if (week <= 39) {

    return {
      fruit: "🍉",
      fruitName: "small watermelon",
      article: "a",
      highlights: [
        "Your baby is continuing to mature.",
        "The brain and lungs continue developing.",
        "Your baby is getting ready for birth.",
      ],
      tip:
        "Rest, stay hydrated, and contact your healthcare provider about any concerns.",
    };

  }


  return {

    fruit: "🍉",

    fruitName: "watermelon",

    article: "a",

    highlights: [
      "Your baby is in the final stage of development.",
      "The body continues preparing for birth.",
      "Your baby is ready for the journey into the world.",
    ],

    tip:
      "Stay calm, rest when possible, and follow your healthcare provider's birth guidance.",

  };
}

export default BabyDevelopment;