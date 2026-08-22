import { useCallback, useEffect, useState } from "react";
import { FaHeart, FaCalendarAlt } from "react-icons/fa";

import "./WelcomeCard.css";

function WelcomeCard() {

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
          "Unable to load profile information."
        );
      }


      const data = await response.json();

      console.log(
        "WELCOME CARD PROFILE:",
        data
      );


      setProfile(data);

    } catch (err) {

      console.error(
        "WelcomeCard Error:",
        err
      );

      setError(
        err.message ||
        "Unable to load profile."
      );

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

            <h2>
              👋 Welcome back!
            </h2>

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

            <h2>
              👋 Welcome back!
            </h2>

            <p>
              {error}
            </p>

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

  const fullName =
    profile.fullName ||
    "User";


  // =========================================================
  // PREGNANCY DATA
  // =========================================================

  const pregnancy =
    profile.pregnancyProfile ||
    {};


  const pregnancyWeek =
    pregnancy.pregnancyWeek ??
    pregnancy.currentWeek ??
    null;


  const trimester =
    pregnancy.trimester ||
    getTrimester(pregnancyWeek);


  // =========================================================
  // HEALTH STATUS
  // =========================================================

  /*
   * For now we display a general status.
   *
   * Later we can connect this with:
   * HealthScore table / API.
   */

  const healthStatus =
    profile.healthStatus ||
    "Healthy";


  const healthMessage =
    profile.healthMessage ||
    "Keep following your healthy routine";


  // =========================================================
  // TODAY'S GOAL
  // =========================================================

  /*
   * Later this can come from your
   * Daily Goals / Reminder table.
   */

  const todayGoal =
    profile.todayGoal ||
    "Drink 8 glasses of water";


  // =========================================================
  // RENDER
  // =========================================================

  return (

    <div className="welcome-card">

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
            <span>
              Nurture AI
            </span>
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


export default WelcomeCard;