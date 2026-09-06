import React, {
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import {
  FaUserCircle,
  FaPhone,
  FaEnvelope,
  FaBirthdayCake,
  FaHeart,
  FaBaby,
  FaCalendarAlt,
  FaPills,
  FaBell,
  FaSignOutAlt,
  FaArrowLeft,
  FaShieldAlt,
  FaClock,
  FaHospital,
  FaUserMd,
  FaCheckCircle,
  FaTimesCircle,
  FaHourglassHalf,
} from "react-icons/fa";

import API from "../../services/api";

import "./FamilyDashboard.css";


function FamilyDashboard() {

  const navigate = useNavigate();


  // =========================================================
  // MOTHER INFORMATION
  // =========================================================

  const [mother, setMother] = useState({
    name: null,
    email: null,
    phone: null,
    age: null,
  });


  // =========================================================
  // PREGNANCY INFORMATION
  // =========================================================

  const [pregnancy, setPregnancy] = useState({
    pregnancyWeek: null,
    trimester: null,
    dueDate: null,
    pregnancyType: null,
    babyCount: null,
    highRisk: null,
  });


  // =========================================================
  // ALL APPOINTMENTS
  // =========================================================

  const [appointments, setAppointments] = useState([]);


  // =========================================================
  // HEALTH SCORE
  // =========================================================

  const [healthScore, setHealthScore] = useState(null);


  // =========================================================
  // LOADING
  // =========================================================

  const [loading, setLoading] = useState(true);


  // =========================================================
  // ERROR
  // =========================================================

  const [error, setError] = useState("");


  // =========================================================
  // LOAD FAMILY DASHBOARD
  // =========================================================

  useEffect(() => {

    let isMounted = true;


    const loadFamilyDashboard = async () => {

      try {

        setLoading(true);
        setError("");


        // =====================================================
        // GET LOGGED-IN FAMILY MEMBER USER ID
        // =====================================================

        const familyMemberUserId =
          localStorage.getItem("userId");


        console.log(
          "========================================"
        );

        console.log(
          "FAMILY DASHBOARD"
        );

        console.log(
          "Logged-in Family Member User ID:",
          familyMemberUserId
        );

        console.log(
          "========================================"
        );


        // =====================================================
        // VALIDATE USER ID
        // =====================================================

        if (
          !familyMemberUserId ||
          familyMemberUserId === "null" ||
          familyMemberUserId === "undefined"
        ) {

          if (isMounted) {

            setError(
              "Your login session was not found. Please login again."
            );

            setLoading(false);

          }

          return;
        }


        // =====================================================
        // HTTPS-COMPATIBLE API REQUEST
        // =====================================================
        //
        // IMPORTANT:
        //
        // Do NOT use:
        //
        // http://localhost:8080/api
        //
        // API service already uses:
        //
        // baseURL: "/api"
        //
        // Vite HTTPS proxy forwards the request
        // to Spring Boot.
        //
        // withCredentials sends the session cookie.
        //
        // =====================================================

        const response =
          await API.get(
            `/family-members/dashboard/${familyMemberUserId}`,
            {
              withCredentials: true,
            }
          );


        console.log(
          "========================================"
        );

        console.log(
          "FAMILY DASHBOARD API RESPONSE:"
        );

        console.log(
          response.data
        );

        console.log(
          "========================================"
        );


        const data =
          response.data;


        // =====================================================
        // CHECK RESPONSE
        // =====================================================

        if (!data) {

          throw new Error(
            "Empty response received from server."
          );
        }


        // =====================================================
        // MOTHER INFORMATION
        // =====================================================

        if (isMounted) {

          setMother({

            name:
              data.name ??
              "Not available",

            email:
              data.email ??
              "Not available",

            phone:
              data.phone ??
              "Not available",

            age:
              data.age ??
              "Not available",

          });

        }


        // =====================================================
        // PREGNANCY INFORMATION
        // =====================================================

        if (isMounted) {

          setPregnancy({

            pregnancyWeek:
              data.pregnancyWeek ??
              null,

            trimester:
              data.trimester ??
              null,

            dueDate:
              data.dueDate ??
              null,

            pregnancyType:
              data.pregnancyType ??
              null,

            babyCount:
              data.babyCount ??
              null,

            highRisk:
              data.highRisk ??
              null,

          });

        }


        // =====================================================
        // ALL APPOINTMENTS
        //
        // Backend response:
        //
        // {
        //    appointments: [...]
        // }
        //
        // =====================================================

        const backendAppointments =
          Array.isArray(data.appointments)
            ? data.appointments
            : [];


        console.log(
          "========================================"
        );

        console.log(
          "MOTHER APPOINTMENTS:"
        );

        console.log(
          backendAppointments
        );

        console.log(
          "TOTAL APPOINTMENTS:",
          backendAppointments.length
        );

        console.log(
          "========================================"
        );


        // =====================================================
        // NORMALIZE APPOINTMENTS
        // =====================================================

        const normalizedAppointments =
          backendAppointments
            .filter(
              (appointment) =>
                appointment &&
                typeof appointment === "object"
            )
            .map(
              (appointment, index) => {

                return {

                  ...appointment,

                  id:
                    appointment.id ??
                    appointment.appointmentId ??
                    `appointment-${index}`,

                  doctorName:
                    appointment.doctorName ??
                    appointment.doctor?.name ??
                    appointment.doctor?.fullName ??
                    null,

                  specialization:
                    appointment.specialization ??
                    appointment.doctor?.specialization ??
                    null,

                  appointmentDate:
                    appointment.appointmentDate ??
                    appointment.date ??
                    null,

                  appointmentTime:
                    appointment.appointmentTime ??
                    appointment.time ??
                    null,

                  hospital:
                    appointment.hospital ??
                    appointment.hospitalName ??
                    null,

                  status:
                    appointment.status ??
                    appointment.appointmentStatus ??
                    "UPCOMING",

                };

              }
            );


        // =====================================================
        // REMOVE DUPLICATE APPOINTMENTS
        // =====================================================

        const uniqueAppointments =
          Array.from(
            new Map(
              normalizedAppointments.map(
                (appointment) => {

                  const key =
                    appointment.id ??
                    `${appointment.appointmentDate}|${appointment.appointmentTime}|${appointment.doctorName}|${appointment.hospital}`;

                  return [
                    String(key),
                    appointment,
                  ];

                }
              )
            ).values()
          );


        // =====================================================
        // SET APPOINTMENTS
        // =====================================================

        if (isMounted) {

          setAppointments(
            uniqueAppointments
          );

        }


        // =====================================================
        // HEALTH SCORE
        // =====================================================

        if (isMounted) {

          setHealthScore(
            data.healthScore ??
            null
          );

        }


        console.log(
          "========================================"
        );

        console.log(
          "FINAL APPOINTMENTS:",
          uniqueAppointments
        );

        console.log(
          "TOTAL:",
          uniqueAppointments.length
        );

        console.log(
          "========================================"
        );


      } catch (requestError) {

        console.error(
          "Unable to load family dashboard:",
          requestError
        );


        // =====================================================
        // BACKEND ERROR
        // =====================================================

        if (requestError.response) {

          console.error(
            "Backend status:",
            requestError.response.status
          );

          console.error(
            "Backend response:",
            requestError.response.data
          );

        }


        if (isMounted) {

          let errorMessage =
            "Unable to load mother's information. Please try again.";


          // ===================================================
          // UNAUTHORIZED
          // ===================================================

          if (
            requestError.response?.status === 401
          ) {

            errorMessage =
              "Your login session has expired. Please login again.";

          }


          // ===================================================
          // NOT FOUND
          // ===================================================

          else if (
            requestError.response?.status === 404
          ) {

            errorMessage =
              "Family member or mother's profile was not found.";

          }


          // ===================================================
          // FORBIDDEN
          // ===================================================

          else if (
            requestError.response?.status === 403
          ) {

            errorMessage =
              "You are not authorized to access the family dashboard.";

          }


          // ===================================================
          // SERVER ERROR
          // ===================================================

          else if (
            requestError.response?.status >= 500
          ) {

            errorMessage =
              "Server error. Please check the backend.";

          }


          // ===================================================
          // NETWORK ERROR
          // ===================================================

          else if (
            !requestError.response
          ) {

            errorMessage =
              "Unable to connect to the server. Please check your connection and make sure the backend is running.";

          }


          setError(
            errorMessage
          );

        }

      } finally {

        if (isMounted) {

          setLoading(false);

        }

      }

    };


    loadFamilyDashboard();


    return () => {

      isMounted = false;

    };

  }, []);


  // =========================================================
  // LOGOUT
  // =========================================================

  const handleLogout = () => {

    localStorage.removeItem("userId");

    localStorage.removeItem(
      "familyMemberId"
    );

    localStorage.removeItem(
      "familyMemberUserId"
    );

    localStorage.removeItem(
      "patientUserId"
    );

    localStorage.removeItem(
      "patientName"
    );

    localStorage.removeItem(
      "patientEmail"
    );

    localStorage.removeItem(
      "patientPhone"
    );

    localStorage.removeItem(
      "patientAge"
    );

    localStorage.removeItem(
      "familyProfileCreated"
    );

    localStorage.removeItem(
      "familyVerified"
    );


    navigate(
      "/login",
      {
        replace: true,
      }
    );

  };


  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {

      return "Not available";

    }


    try {

      const dateObject =
        new Date(date);


      if (
        Number.isNaN(
          dateObject.getTime()
        )
      ) {

        return String(date);

      }


      return dateObject.toLocaleDateString(
        "en-IN",
        {
          day: "2-digit",
          month: "short",
          year: "numeric",
        }
      );

    } catch {

      return String(date);

    }

  };


  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (time) => {

    if (!time) {

      return "Not available";

    }


    const timeString =
      String(time).trim();


    const parts =
      timeString.split(":");


    if (parts.length < 2) {

      return timeString;

    }


    const hours =
      parseInt(
        parts[0],
        10
      );


    const minutes =
      parts[1];


    if (
      Number.isNaN(hours)
    ) {

      return timeString;

    }


    const period =
      hours >= 12
        ? "PM"
        : "AM";


    const displayHour =
      hours % 12 || 12;


    return `${displayHour}:${minutes} ${period}`;

  };


  // =========================================================
  // NORMALIZE STATUS
  // =========================================================

  const normalizeStatus = (status) => {

    if (!status) {

      return "";

    }


    return String(status)
      .trim()
      .toLowerCase()
      .replace(/[\s-]+/g, "_");

  };


  // =========================================================
  // DISPLAY STATUS
  // =========================================================

  const displayStatus = (status) => {

    if (!status) {

      return "Upcoming";

    }


    return String(status)
      .replace(/_/g, " ")
      .replace(/-/g, " ")
      .replace(
        /\b\w/g,
        (letter) =>
          letter.toUpperCase()
      );

  };


  // =========================================================
  // GET APPOINTMENT DATE
  // =========================================================

  const getAppointmentDate = (
    appointment
  ) => {

    return (
      appointment?.appointmentDate ??
      appointment?.date ??
      null
    );

  };


  // =========================================================
  // GET APPOINTMENT TIME
  // =========================================================

  const getAppointmentTime = (
    appointment
  ) => {

    return (
      appointment?.appointmentTime ??
      appointment?.time ??
      null
    );

  };


  // =========================================================
  // GET APPOINTMENT DATE OBJECT
  // =========================================================

  const getAppointmentDateObject = (
    appointment
  ) => {

    const date =
      getAppointmentDate(
        appointment
      );


    const time =
      getAppointmentTime(
        appointment
      );


    if (!date) {

      return null;

    }


    let dateString =
      String(date).trim();


    // =====================================================
    // DATE ALREADY CONTAINS TIME
    // =====================================================

    const hasTime =
      dateString.includes("T") ||
      dateString.includes(" ");


    if (
      time &&
      !hasTime
    ) {

      dateString =
        `${dateString}T${String(time).trim()}`;

    }


    const result =
      new Date(dateString);


    if (
      Number.isNaN(
        result.getTime()
      )
    ) {

      return null;

    }


    return result;

  };


  // =========================================================
  // GET APPOINTMENT CATEGORY
  // =========================================================

  const getAppointmentCategory = (
    appointment
  ) => {

    const status =
      normalizeStatus(
        appointment?.status ??
        appointment?.appointmentStatus
      );


    // =====================================================
    // CANCELLED
    // =====================================================

    if (
      status.includes("cancel") ||
      status.includes("reject")
    ) {

      return "cancelled";

    }


    // =====================================================
    // COMPLETED
    // =====================================================

    if (
      status.includes("complete") ||
      status.includes("completed") ||
      status.includes("done") ||
      status.includes("finished")
    ) {

      return "completed";

    }


    // =====================================================
    // DATE-BASED CHECK
    // =====================================================

    const appointmentDate =
      getAppointmentDateObject(
        appointment
      );


    if (
      appointmentDate &&
      appointmentDate < new Date()
    ) {

      return "completed";

    }


    // =====================================================
    // OTHERWISE UPCOMING
    // =====================================================

    return "upcoming";

  };


  // =========================================================
  // COMPLETED APPOINTMENTS
  // =========================================================

  const completedAppointments =
    useMemo(() => {

      return appointments.filter(
        (appointment) =>
          getAppointmentCategory(
            appointment
          ) === "completed"
      );

    }, [appointments]);


  // =========================================================
  // UPCOMING APPOINTMENTS
  // =========================================================

  const upcomingAppointments =
    useMemo(() => {

      return appointments
        .filter(
          (appointment) =>
            getAppointmentCategory(
              appointment
            ) === "upcoming"
        )
        .sort(
          (a, b) => {

            const dateA =
              getAppointmentDateObject(
                a
              )?.getTime() ??
              Infinity;


            const dateB =
              getAppointmentDateObject(
                b
              )?.getTime() ??
              Infinity;


            return dateA - dateB;

          }
        );

    }, [appointments]);


  // =========================================================
  // CANCELLED APPOINTMENTS
  // =========================================================

  const cancelledAppointments =
    useMemo(() => {

      return appointments.filter(
        (appointment) =>
          getAppointmentCategory(
            appointment
          ) === "cancelled"
      );

    }, [appointments]);


  // =========================================================
  // NEXT UPCOMING APPOINTMENT
  // =========================================================

  const nextUpcomingAppointment =
    upcomingAppointments.length > 0
      ? upcomingAppointments[0]
      : null;


  // =========================================================
  // STATUS CSS CLASS
  // =========================================================

  const getStatusClass = (
    status
  ) => {

    const normalized =
      normalizeStatus(status);


    if (
      normalized.includes("complete")
    ) {

      return "appointment-status completed";

    }


    if (
      normalized.includes("cancel") ||
      normalized.includes("reject")
    ) {

      return "appointment-status cancelled";

    }


    if (
      normalized.includes("pending")
    ) {

      return "appointment-status pending";

    }


    if (
      normalized.includes("confirm")
    ) {

      return "appointment-status confirmed";

    }


    return "appointment-status upcoming";

  };


  // =========================================================
  // STATUS ICON
  // =========================================================

  const getStatusIcon = (
    status
  ) => {

    const normalized =
      normalizeStatus(status);


    if (
      normalized.includes("complete")
    ) {

      return <FaCheckCircle />;

    }


    if (
      normalized.includes("cancel") ||
      normalized.includes("reject")
    ) {

      return <FaTimesCircle />;

    }


    if (
      normalized.includes("pending")
    ) {

      return <FaHourglassHalf />;

    }


    return <FaCalendarAlt />;

  };


  // =========================================================
  // LOADING SCREEN
  // =========================================================

  if (loading) {

    return (

      <div className="family-dashboard-loading">

        <div className="family-loading-spinner"></div>

        <p>
          Loading family dashboard...
        </p>

      </div>

    );

  }


  // =========================================================
  // ERROR SCREEN
  // =========================================================

  if (error) {

    return (

      <div className="family-dashboard-loading">

        <FaTimesCircle
          style={{
            fontSize: "45px",
            marginBottom: "15px",
          }}
        />

        <h3>
          Unable to Load Dashboard
        </h3>

        <p>
          {error}
        </p>

        <button
          className="family-back-btn"
          onClick={() =>
            window.location.reload()
          }
          style={{
            marginTop: "15px",
          }}
        >
          Try Again
        </button>

        <button
          className="family-back-btn"
          onClick={() =>
            navigate("/login", {
              replace: true,
            })
          }
          style={{
            marginTop: "10px",
          }}
        >
          Go to Login
        </button>

      </div>

    );

  }


  // =========================================================
  // DASHBOARD
  // =========================================================

  return (

    <div className="family-dashboard">


      {/* =====================================================
          HEADER
      ===================================================== */}

      <header className="family-dashboard-header">

        <div className="family-header-left">

          <div className="family-logo-icon">
            <FaBaby />
          </div>

          <div>

            <h1>
              Nurture AI
            </h1>

            <span>
              Family Support Dashboard
            </span>

          </div>

        </div>


        <button
          className="family-logout-btn"
          onClick={handleLogout}
        >

          <FaSignOutAlt />

          <span>
            Logout
          </span>

        </button>

      </header>


      {/* =====================================================
          MAIN CONTENT
      ===================================================== */}

      <main className="family-dashboard-content">


        {/* ===================================================
            WELCOME
        =================================================== */}

        <section className="family-welcome">

          <div>

            <p className="family-welcome-small">
              Welcome back 👋
            </p>

            <h2>
              Family Health Dashboard
            </h2>

            <p>
              Stay connected with your
              loved one's pregnancy journey
              and important health information.
            </p>

          </div>


          <div className="family-welcome-icon">
            <FaHeart />
          </div>

        </section>


        {/* ===================================================
            MOTHER INFORMATION
        =================================================== */}

        <section className="family-section">

          <div className="family-section-title">

            <div className="section-title-icon">
              <FaUserCircle />
            </div>

            <div>

              <h3>
                Mother Information
              </h3>

              <p>
                Basic information about the mother
              </p>

            </div>

          </div>


          <div className="mother-profile-card">

            <div className="mother-avatar">
              <FaUserCircle />
            </div>


            <div className="mother-information">

              <h2>
                {mother.name}
              </h2>


              <div className="mother-info-grid">


                {/* EMAIL */}

                <div className="mother-info-item">

                  <FaEnvelope />

                  <div>

                    <span>
                      Email
                    </span>

                    <strong>
                      {mother.email}
                    </strong>

                  </div>

                </div>


                {/* PHONE */}

                <div className="mother-info-item">

                  <FaPhone />

                  <div>

                    <span>
                      Phone
                    </span>

                    <strong>
                      {mother.phone}
                    </strong>

                  </div>

                </div>


                {/* AGE */}

                <div className="mother-info-item">

                  <FaBirthdayCake />

                  <div>

                    <span>
                      Age
                    </span>

                    <strong>
                      {mother.age}
                    </strong>

                  </div>

                </div>


                {/* CONNECTION */}

                <div className="mother-info-item">

                  <FaShieldAlt />

                  <div>

                    <span>
                      Connection
                    </span>

                    <strong className="verified-text">
                      Verified
                    </strong>

                  </div>

                </div>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            PREGNANCY OVERVIEW
        =================================================== */}

        <section className="family-section">

          <div className="family-section-title">

            <div className="section-title-icon">
              <FaBaby />
            </div>

            <div>

              <h3>
                Pregnancy Overview
              </h3>

              <p>
                Keep track of important pregnancy information
              </p>

            </div>

          </div>


          <div className="family-stats-grid">


            {/* PREGNANCY WEEK */}

            <div className="family-stat-card">

              <div className="family-stat-icon">
                <FaBaby />
              </div>

              <div>

                <span>
                  Pregnancy Week
                </span>

                <strong>
                  {pregnancy.pregnancyWeek ??
                    "--"}
                </strong>

                <small>
                  {pregnancy.trimester ??
                    "Pregnancy information"}
                </small>

              </div>

            </div>


            {/* HEALTH SCORE */}

            <div className="family-stat-card">

              <div className="family-stat-icon">
                <FaHeart />
              </div>

              <div>

                <span>
                  Health Score
                </span>

                <strong>
                  {healthScore ??
                    "--"}
                </strong>

                <small>
                  Daily health score
                </small>

              </div>

            </div>


            {/* NEXT APPOINTMENT */}

            <div className="family-stat-card">

              <div className="family-stat-icon">
                <FaCalendarAlt />
              </div>

              <div>

                <span>
                  Next Appointment
                </span>

                <strong>

                  {nextUpcomingAppointment
                    ? formatDate(
                        getAppointmentDate(
                          nextUpcomingAppointment
                        )
                      )
                    : "No appointment"}

                </strong>

                <small>

                  {nextUpcomingAppointment?.doctorName
                    ? `Dr. ${nextUpcomingAppointment.doctorName}`
                    : "No upcoming appointment"}

                </small>

              </div>

            </div>


            {/* DUE DATE */}

            <div className="family-stat-card">

              <div className="family-stat-icon">
                <FaCalendarAlt />
              </div>

              <div>

                <span>
                  Due Date
                </span>

                <strong>

                  {pregnancy.dueDate
                    ? formatDate(
                        pregnancy.dueDate
                      )
                    : "--"}

                </strong>

                <small>
                  Expected delivery date
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            APPOINTMENT SUMMARY
        =================================================== */}

        <section className="family-section">

          <div className="family-section-title">

            <div className="section-title-icon">
              <FaCalendarAlt />
            </div>

            <div>

              <h3>
                Appointment Overview
              </h3>

              <p>
                Overview of all appointment statuses
              </p>

            </div>

          </div>


          <div className="appointment-summary-grid">


            {/* COMPLETED */}

            <div className="appointment-summary-card completed-summary">

              <div className="appointment-summary-icon">
                <FaCheckCircle />
              </div>

              <div>

                <span>
                  Completed
                </span>

                <strong>
                  {completedAppointments.length}
                </strong>

                <small>
                  Completed appointments
                </small>

              </div>

            </div>


            {/* UPCOMING */}

            <div className="appointment-summary-card upcoming-summary">

              <div className="appointment-summary-icon">
                <FaCalendarAlt />
              </div>

              <div>

                <span>
                  Upcoming
                </span>

                <strong>
                  {upcomingAppointments.length}
                </strong>

                <small>
                  Future appointments
                </small>

              </div>

            </div>


            {/* CANCELLED */}

            <div className="appointment-summary-card cancelled-summary">

              <div className="appointment-summary-icon">
                <FaTimesCircle />
              </div>

              <div>

                <span>
                  Cancelled
                </span>

                <strong>
                  {cancelledAppointments.length}
                </strong>

                <small>
                  Cancelled appointments
                </small>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            NEXT UPCOMING APPOINTMENT
        =================================================== */}

        <section className="family-section">

          <div className="family-section-title">

            <div className="section-title-icon">
              <FaCalendarAlt />
            </div>

            <div>

              <h3>
                Upcoming Appointment
              </h3>

              <p>
                Details of the next scheduled appointment
              </p>

            </div>

          </div>


          {/* =================================================
              NO UPCOMING APPOINTMENT
          ================================================= */}

          {!nextUpcomingAppointment ? (

            <div className="family-information-box">

              <FaCalendarAlt />

              <div>

                <h4>
                  No Upcoming Appointment
                </h4>

                <p>
                  There is currently no upcoming
                  appointment available for the mother.
                </p>

              </div>

            </div>

          ) : (

            /* =================================================
               NEXT APPOINTMENT DETAILS
            ================================================= */

            <div className="appointment-details-card">


              {/* HEADER */}

              <div className="appointment-card-header">

                <div>

                  <div className="next-appointment-label">

                    <FaCheckCircle />

                    Next Appointment

                  </div>


                  <h3>
                    Upcoming Medical Appointment
                  </h3>


                  <p>
                    Important appointment information
                    for the mother
                  </p>

                </div>


                <div
                  className={getStatusClass(
                    nextUpcomingAppointment.status
                  )}
                >

                  {getStatusIcon(
                    nextUpcomingAppointment.status
                  )}

                  <span>

                    {displayStatus(
                      nextUpcomingAppointment.status
                    )}

                  </span>

                </div>

              </div>


              {/* APPOINTMENT DETAILS */}

              <div className="appointment-grid">


                {/* DOCTOR */}

                <div className="appointment-info-item">

                  <div className="appointment-info-icon">
                    <FaUserMd />
                  </div>

                  <div>

                    <span>
                      Doctor
                    </span>

                    <strong>

                      {nextUpcomingAppointment.doctorName
                        ? `Dr. ${nextUpcomingAppointment.doctorName}`
                        : "Not available"}

                    </strong>

                  </div>

                </div>


                {/* SPECIALIZATION */}

                <div className="appointment-info-item">

                  <div className="appointment-info-icon">
                    <FaUserMd />
                  </div>

                  <div>

                    <span>
                      Specialization
                    </span>

                    <strong>

                      {nextUpcomingAppointment.specialization ??
                        "Not available"}

                    </strong>

                  </div>

                </div>


                {/* DATE */}

                <div className="appointment-info-item">

                  <div className="appointment-info-icon">
                    <FaCalendarAlt />
                  </div>

                  <div>

                    <span>
                      Date
                    </span>

                    <strong>

                      {formatDate(
                        getAppointmentDate(
                          nextUpcomingAppointment
                        )
                      )}

                    </strong>

                  </div>

                </div>


                {/* TIME */}

                <div className="appointment-info-item">

                  <div className="appointment-info-icon">
                    <FaClock />
                  </div>

                  <div>

                    <span>
                      Time
                    </span>

                    <strong>

                      {formatTime(
                        getAppointmentTime(
                          nextUpcomingAppointment
                        )
                      )}

                    </strong>

                  </div>

                </div>


                {/* HOSPITAL */}

                <div className="appointment-info-item">

                  <div className="appointment-info-icon">
                    <FaHospital />
                  </div>

                  <div>

                    <span>
                      Hospital
                    </span>

                    <strong>

                      {nextUpcomingAppointment.hospital ??
                        "Not available"}

                    </strong>

                  </div>

                </div>


                {/* STATUS */}

                <div className="appointment-info-item">

                  <div className="appointment-info-icon">
                    <FaShieldAlt />
                  </div>

                  <div>

                    <span>
                      Appointment Status
                    </span>

                    <strong
                      className={getStatusClass(
                        nextUpcomingAppointment.status
                      )}
                    >

                      {displayStatus(
                        nextUpcomingAppointment.status
                      )}

                    </strong>

                  </div>

                </div>

              </div>

            </div>

          )}

        </section>


        {/* ===================================================
            HEALTH & SUPPORT
        =================================================== */}

        <section className="family-section">

          <div className="family-section-title">

            <div className="section-title-icon">
              <FaHeart />
            </div>

            <div>

              <h3>
                Health & Support
              </h3>

              <p>
                Important areas to support the mother
              </p>

            </div>

          </div>


          <div className="family-support-grid">


            {/* HEALTH */}

            <div className="family-support-card">

              <div className="support-icon">
                <FaHeart />
              </div>

              <div>

                <h4>
                  Health Status
                </h4>

                <p>
                  Monitor the mother's general
                  health and wellbeing.
                </p>

              </div>

            </div>


            {/* MEDICINES */}

            <div className="family-support-card">

              <div className="support-icon">
                <FaPills />
              </div>

              <div>

                <h4>
                  Medicines
                </h4>

                <p>
                  Important prescribed medicines
                  and medication reminders.
                </p>

              </div>

            </div>


            {/* REMINDERS */}

            <div className="family-support-card">

              <div className="support-icon">
                <FaBell />
              </div>

              <div>

                <h4>
                  Reminders
                </h4>

                <p>
                  Stay informed about important
                  pregnancy reminders.
                </p>

              </div>

            </div>

          </div>

        </section>


        {/* ===================================================
            SECURITY
        =================================================== */}

        <section className="family-information-box">

          <FaShieldAlt />

          <div>

            <h4>
              Your Family Connection is Secure
            </h4>

            <p>
              You are connected to the mother's
              profile through verified email and
              OTP verification. Her health information
              should only be accessed for family
              support and care.
            </p>

          </div>

        </section>


        {/* ===================================================
            BACK BUTTON
        =================================================== */}

        <button
          className="family-back-btn"
          onClick={() =>
            navigate(-1)
          }
        >

          <FaArrowLeft />

          Back

        </button>

      </main>

    </div>

  );
}


export default FamilyDashboard;