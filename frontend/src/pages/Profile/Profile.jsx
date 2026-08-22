import { useCallback, useEffect, useState } from "react";
import "./Profile.css";

function Profile() {
  const [user, setUser] = useState(null);
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

          // IMPORTANT:
          // Sends the Spring Boot session cookie
          credentials: "include",
        }
      );

      // =====================================================
      // HANDLE RESPONSE ERRORS
      // =====================================================

      if (!response.ok) {
        let errorMessage = "";

        try {
          errorMessage = await response.text();
        } catch {
          errorMessage = "";
        }

        if (response.status === 401) {
          throw new Error(
            errorMessage ||
              "Your session has expired. Please login again."
          );
        }

        if (response.status === 404) {
          throw new Error(
            errorMessage ||
              "Profile information was not found."
          );
        }

        throw new Error(
          errorMessage ||
            "Unable to fetch profile information."
        );
      }

      // =====================================================
      // GET JSON
      // =====================================================

      const data = await response.json();

      console.log("=================================");
      console.log("PROFILE DATA FROM BACKEND");
      console.log(data);
      console.log("=================================");

      setUser(data);
    } catch (err) {
      console.error("Profile Error:", err);

      setError(
        err.message ||
          "Unable to load profile information."
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
      <div className="profile-page">
        <div className="profile-loading">
          <div className="loader"></div>

          <h3>Loading Profile</h3>

          <p>
            Please wait while we load your information...
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
      <div className="profile-page">
        <div className="profile-error">
          <div className="error-icon">!</div>

          <h3>Unable to Load Profile</h3>

          <p>{error}</p>

          <button
            className="retry-btn"
            type="button"
            onClick={fetchProfile}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // NO USER
  // =========================================================

  if (!user) {
    return (
      <div className="profile-page">
        <div className="profile-error">
          <div className="error-icon">!</div>

          <h3>Profile Not Found</h3>

          <p>
            We could not find your profile.
          </p>

          <button
            className="retry-btn"
            type="button"
            onClick={fetchProfile}
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // =========================================================
  // USER INFORMATION
  // =========================================================

  const fullName =
    user.fullName || "User";

  const email =
    user.email || "No email available";

  const mobile =
    user.mobile ||
    user.phoneNumber ||
    "Not provided";

  const role =
    user.role || "User";

  const userId =
    user.id ||
    user.userId ||
    "Not available";

  // =========================================================
  // PREGNANCY PROFILE
  // =========================================================

  const pregnancy =
    user.pregnancyProfile;

  // =========================================================
  // PROFILE PAGE
  // =========================================================

  return (
    <div className="profile-page">

      {/* =====================================================
          HEADER
      ===================================================== */}

      <div className="profile-header">

        <div>
          <h1>My Profile</h1>

          <p>
            View and manage your personal information
          </p>
        </div>

        <button
          className="edit-profile-btn"
          type="button"
        >
          ✏️ Edit Profile
        </button>

      </div>


      {/* =====================================================
          PROFILE OVERVIEW
      ===================================================== */}

      <div className="profile-overview">

        <div className="profile-avatar">
          {fullName
            .charAt(0)
            .toUpperCase()}
        </div>

        <div className="profile-main-info">

          <h2>{fullName}</h2>

          <p className="profile-email">
            {email}
          </p>

          <div className="profile-badges">

            <span className="profile-role">
              {role}
            </span>

            <span className="profile-status">
              <span className="status-dot"></span>
              Active
            </span>

          </div>

        </div>

      </div>


      {/* =====================================================
          PERSONAL INFORMATION
      ===================================================== */}

      <div className="profile-section">

        <div className="section-heading">

          <div className="section-icon">
            👤
          </div>

          <div>
            <h2>Personal Information</h2>

            <p>
              Your basic personal details
            </p>
          </div>

        </div>


        <div className="profile-grid">

          <ProfileItem
            label="Full Name"
            value={user.fullName}
          />

          <ProfileItem
            label="Email Address"
            value={user.email}
          />

          <ProfileItem
            label="Mobile Number"
            value={mobile}
          />

          <ProfileItem
            label="Role"
            value={user.role}
          />

        </div>

      </div>


      {/* =====================================================
          ACCOUNT INFORMATION
      ===================================================== */}

      <div className="profile-section">

        <div className="section-heading">

          <div className="section-icon">
            🔐
          </div>

          <div>
            <h2>Account Information</h2>

            <p>
              Information related to your account
            </p>
          </div>

        </div>


        <div className="profile-grid">

          <ProfileItem
            label="User ID"
            value={userId}
          />

          <ProfileItem
            label="Account Role"
            value={role}
          />

          <ProfileItem
            label="Account Status"
            value="Active"
          />

          <ProfileItem
            label="Email Verification"
            value="Verified"
          />

        </div>

      </div>


      {/* =====================================================
          PREGNANCY INFORMATION
      ===================================================== */}

      {pregnancy && (
        <div className="profile-section">

          <div className="section-heading">

            <div className="section-icon pregnancy-icon">
              ❤️
            </div>

            <div>
              <h2>Pregnancy Information</h2>

              <p>
                Your pregnancy profile details
              </p>
            </div>

          </div>


          {/* =================================================
              BASIC PREGNANCY INFORMATION
          ================================================= */}

          <div className="profile-subheading">
            <h3>Pregnancy Details</h3>
          </div>


          <div className="profile-grid">

            <ProfileItem
              label="Due Date"
              value={pregnancy.dueDate}
            />

            <ProfileItem
              label="Pregnancy Week"
              value={
                pregnancy.pregnancyWeek !== null &&
                pregnancy.pregnancyWeek !== undefined
                  ? `Week ${pregnancy.pregnancyWeek}`
                  : null
              }
            />

            <ProfileItem
              label="Trimester"
              value={pregnancy.trimester}
            />

            <ProfileItem
              label="Last Menstrual Period"
              value={
                pregnancy.lastMenstrualPeriod
              }
            />

            <ProfileItem
              label="Pregnancy Type"
              value={
                pregnancy.pregnancyType
              }
            />

            <ProfileItem
              label="Baby Count"
              value={
                pregnancy.babyCount
              }
            />

          </div>


          {/* =================================================
              PREGNANCY HISTORY
          ================================================= */}

          <div className="profile-subheading">
            <h3>Pregnancy History</h3>
          </div>


          <div className="profile-grid">

            <ProfileItem
              label="First Pregnancy"
              value={formatBoolean(
                pregnancy.firstPregnancy
              )}
            />

            <ProfileItem
              label="Previous Pregnancies"
              value={
                pregnancy.previousPregnancies
              }
            />

            <ProfileItem
              label="Live Births"
              value={
                pregnancy.liveBirths
              }
            />

            <ProfileItem
              label="Miscarriages"
              value={
                pregnancy.miscarriages
              }
            />

          </div>


          {/* =================================================
              PREGNANCY RISK INFORMATION
          ================================================= */}

          <div className="profile-subheading">
            <h3>Pregnancy Risk & Medical Information</h3>
          </div>


          <div className="profile-grid">

            <ProfileItem
              label="High Risk Pregnancy"
              value={formatBoolean(
                pregnancy.highRisk
              )}
            />

            <ProfileItem
              label="IVF Pregnancy"
              value={formatBoolean(
                pregnancy.ivfPregnancy
              )}
            />

            <ProfileItem
              label="Multiple Pregnancy"
              value={formatBoolean(
                pregnancy.multiplePregnancy
              )}
            />

          </div>


          {/* =================================================
              DOCTOR NOTES
          ================================================= */}

          <div className="doctor-notes">

            <div className="doctor-notes-header">
              <span className="doctor-notes-icon">
                🩺
              </span>

              <div>
                <h3>Doctor Notes</h3>

                <p>
                  Medical notes saved by your doctor
                </p>
              </div>
            </div>


            <div className="doctor-notes-content">

              {pregnancy.doctorNotes
                ? pregnancy.doctorNotes
                : "No doctor notes available."}

            </div>

          </div>

        </div>
      )}


      {/* =====================================================
          NO PREGNANCY PROFILE
      ===================================================== */}

      {!pregnancy && (
        <div className="profile-section">

          <div className="section-heading">

            <div className="section-icon pregnancy-icon">
              ❤️
            </div>

            <div>
              <h2>Pregnancy Information</h2>

              <p>
                Your pregnancy profile details
              </p>
            </div>

          </div>


          <div className="no-pregnancy">

            <div className="no-pregnancy-icon">
              📋
            </div>

            <h3>
              Pregnancy Profile Not Available
            </h3>

            <p>
              Your pregnancy information has not
              been added yet.
            </p>

          </div>

        </div>
      )}

    </div>
  );
}


// =========================================================
// FORMAT BOOLEAN VALUES
// =========================================================

function formatBoolean(value) {

  if (
    value === true
  ) {
    return "Yes";
  }

  if (
    value === false
  ) {
    return "No";
  }

  return null;
}


// =========================================================
// REUSABLE PROFILE ITEM
// =========================================================

function ProfileItem({ label, value }) {

  return (
    <div className="profile-item">

      <span className="profile-label">
        {label}
      </span>

      <span className="profile-value">

        {value !== null &&
        value !== undefined &&
        value !== ""
          ? value
          : "Not provided"}

      </span>

    </div>
  );
}


export default Profile;