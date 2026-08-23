import React from "react";
import "./Tip.css";

import {
  FaTint,
  FaAppleAlt,
  FaWalking,
  FaMoon,
  FaMagic,
  FaHeartbeat,
  FaBaby,
  FaLeaf,
  FaUtensils,
  FaDumbbell,
  FaBed,
  FaCalendarCheck,
} from "react-icons/fa";

function Tip({ pregnancyWeek = 7 }) {

  // =========================================================
  // DETERMINE TRIMESTER
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

  const trimester = getTrimester(pregnancyWeek);


  // =========================================================
  // TRIMESTER DATA
  // =========================================================

  const trimesterData = {

    // =======================================================
    // FIRST TRIMESTER
    // =======================================================

    "First Trimester": {
      subtitle: "Supporting you and your baby during early pregnancy",

      badge: "Early Pregnancy",

      description:
        "Your body is going through important changes. Focus on rest, hydration and nutritious food.",

      tips: [
        {
          icon: <FaTint />,
          title: "Stay Hydrated",
          text: "Drink enough water throughout the day to stay hydrated.",
          className: "tip-water",
        },

        {
          icon: <FaAppleAlt />,
          title: "Eat Nutritious Food",
          text: "Choose fruits, vegetables, whole grains and protein-rich foods.",
          className: "tip-food",
        },

        {
          icon: <FaMoon />,
          title: "Get Enough Rest",
          text: "Fatigue is common early in pregnancy, so give your body enough rest.",
          className: "tip-rest",
        },

        {
          icon: <FaHeartbeat />,
          title: "Take Care of Yourself",
          text: "Follow your healthcare provider's advice and attend scheduled checkups.",
          className: "tip-health",
        },
      ],
    },


    // =======================================================
    // SECOND TRIMESTER
    // =======================================================

    "Second Trimester": {
      subtitle: "Supporting your growing baby during the middle of pregnancy",

      badge: "Growing Baby",

      description:
        "Your baby is growing rapidly. Focus on balanced nutrition, comfortable activity and regular checkups.",

      tips: [
        {
          icon: <FaAppleAlt />,
          title: "Balanced Nutrition",
          text: "Include protein, iron, calcium and fresh fruits and vegetables in your meals.",
          className: "tip-food",
        },

        {
          icon: <FaWalking />,
          title: "Stay Active",
          text: "Take comfortable walks and stay physically active as recommended by your doctor.",
          className: "tip-active",
        },

        {
          icon: <FaTint />,
          title: "Keep Hydrated",
          text: "Drink plenty of fluids, especially during warm weather or physical activity.",
          className: "tip-water",
        },

        {
          icon: <FaCalendarCheck />,
          title: "Attend Checkups",
          text: "Keep your regular prenatal appointments and discuss any concerns with your doctor.",
          className: "tip-health",
        },
      ],
    },


    // =======================================================
    // THIRD TRIMESTER
    // =======================================================

    "Third Trimester": {
      subtitle: "Preparing you and your baby for the final stage",

      badge: "Almost There",

      description:
        "Your baby is getting ready for birth. Focus on rest, nutrition, comfort and preparing for delivery.",

      tips: [
        {
          icon: <FaBed />,
          title: "Prioritize Rest",
          text: "Take regular breaks and get enough sleep as your body needs more rest.",
          className: "tip-rest",
        },

        {
          icon: <FaAppleAlt />,
          title: "Eat Well",
          text: "Continue eating balanced meals with protein, iron, calcium and vegetables.",
          className: "tip-food",
        },

        {
          icon: <FaWalking />,
          title: "Gentle Activity",
          text: "Stay comfortably active if approved by your healthcare provider.",
          className: "tip-active",
        },

        {
          icon: <FaBaby />,
          title: "Prepare for Baby",
          text: "Start preparing your hospital bag and important items for your baby's arrival.",
          className: "tip-baby",
        },
      ],
    },
  };


  // =========================================================
  // CURRENT TRIMESTER DATA
  // =========================================================

  const currentData = trimesterData[trimester];


  // =========================================================
  // SAFE WEEK VALUE
  // =========================================================

  const safeWeek = Math.min(Math.max(Number(pregnancyWeek), 1), 40);


  // =========================================================
  // PROGRESS
  // =========================================================

  const progress = Math.round((safeWeek / 40) * 100);


  // =========================================================
  // RENDER
  // =========================================================

  return (
    <section className="pregnancy-tips">

      {/* =====================================================
          TOP HEADER
      ===================================================== */}

      <div className="tips-top">

        <div className="tips-heading">

          <div className="tips-main-icon">
            <FaMagic />
          </div>

          <div className="tips-heading-text">

            <div className="tips-title-row">

              <h2>Today's Pregnancy Tips</h2>

              <span className="trimester-badge">
                {currentData.badge}
              </span>

            </div>

            <p>
              {currentData.subtitle}
            </p>

          </div>

        </div>


        {/* =================================================
            WEEK INFORMATION
        ================================================= */}

        <div className="pregnancy-week-box">

          <div className="week-icon">
            <FaBaby />
          </div>

          <div className="week-information">

            <span className="week-label">
              Pregnancy Week
            </span>

            <strong>
              Week {safeWeek}
            </strong>

          </div>

        </div>

      </div>


      {/* =====================================================
          PROGRESS
      ===================================================== */}

      <div className="pregnancy-progress">

        <div className="progress-header">

          <span>
            {trimester}
          </span>

          <span>
            {progress}% of pregnancy
          </span>

        </div>

        <div className="progress-bar">

          <div
            className="progress-fill"
            style={{
              width: `${progress}%`,
            }}
          />

        </div>

      </div>


      {/* =====================================================
          DESCRIPTION
      ===================================================== */}

      <div className="tips-description">

        <FaLeaf />

        <p>
          {currentData.description}
        </p>

      </div>


      {/* =====================================================
          TIPS
      ===================================================== */}

      <div className="tips-container">

        {currentData.tips.map((tip, index) => (

          <React.Fragment key={index}>

            <div className="tip-item">

              <div className={`tip-icon ${tip.className}`}>
                {tip.icon}
              </div>

              <div className="tip-content">

                <h3>
                  {tip.title}
                </h3>

                <p>
                  {tip.text}
                </p>

              </div>

            </div>

            {index !== currentData.tips.length - 1 && (
              <div className="tip-divider" />
            )}

          </React.Fragment>

        ))}

      </div>

    </section>
  );
}

export default Tip;