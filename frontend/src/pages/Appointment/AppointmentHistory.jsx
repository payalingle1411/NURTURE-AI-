import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

import Sidebar from "../../components/Sidebar/Sidebar";
import Navbar from "../../components/Navbar/Navbar";

import "./AppointmentHistory.css";

function AppointmentHistory() {
  const navigate = useNavigate();

  // =========================================================
  // STATE
  // =========================================================

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // API URL
  // =========================================================

  const API_URL = "http://localhost:8080/api";

  // =========================================================
  // FETCH CURRENT USER APPOINTMENTS
  // =========================================================

  const fetchAppointments = async () => {
    try {
      setLoading(true);
      setError("");

      const response = await fetch(
        `${API_URL}/appointments/my`,
        {
          method: "GET",

          // Send JSESSIONID session cookie
          credentials: "include",

          headers: {
            Accept: "application/json",
          },
        }
      );

      // =======================================================
      // SESSION EXPIRED
      // =======================================================

      if (response.status === 401) {
        setError(
          "Your login session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login", {
            replace: true,
          });
        }, 1500);

        return;
      }

      // =======================================================
      // BACKEND ERROR
      // =======================================================

      if (!response.ok) {
        let errorMessage =
          "Unable to fetch appointments.";

        try {
          const errorText =
            await response.text();

          if (errorText) {
            errorMessage = errorText;
          }
        } catch (readError) {
          console.error(
            "Error reading backend response:",
            readError
          );
        }

        throw new Error(errorMessage);
      }

      // =======================================================
      // SUCCESS
      // =======================================================

      const data = await response.json();

      console.log(
        "Appointments received:",
        data
      );

      setAppointments(
        Array.isArray(data)
          ? data
          : []
      );

    } catch (err) {
      console.error(
        "Appointment fetch error:",
        err
      );

      /*
       * Network error normally means:
       *
       * - Spring Boot is not running
       * - wrong API URL
       * - CORS problem
       * - server unavailable
       */

      if (err instanceof TypeError) {
        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );
      } else {
        setError(
          err.message ||
            "Unable to load your appointments. Please try again."
        );
      }

    } finally {
      setLoading(false);
    }
  };

  // =========================================================
  // LOAD APPOINTMENTS WHEN PAGE OPENS
  // =========================================================

  useEffect(() => {
    fetchAppointments();
  }, []);

  // =========================================================
  // GET APPOINTMENT STATUS
  // =========================================================
  //
  // Priority:
  //
  // CANCELLED
  //     ↓
  // Past date/time = COMPLETED
  //     ↓
  // Future date/time = UPCOMING
  //
  // =========================================================

  const getAppointmentStatus = (appointment) => {

    // ---------------------------------------------------------
    // 1. CANCELLED HAS HIGHEST PRIORITY
    // ---------------------------------------------------------

    if (
      appointment.status &&
      appointment.status.toUpperCase() ===
        "CANCELLED"
    ) {
      return "CANCELLED";
    }

    // ---------------------------------------------------------
    // 2. MISSING DATE/TIME
    // ---------------------------------------------------------

    if (
      !appointment.appointmentDate ||
      !appointment.appointmentTime
    ) {
      return "UPCOMING";
    }

    // ---------------------------------------------------------
    // 3. CREATE DATE/TIME
    // ---------------------------------------------------------

    const appointmentDateTime =
      new Date(
        `${appointment.appointmentDate}T${appointment.appointmentTime}`
      );

    // ---------------------------------------------------------
    // 4. INVALID DATE
    // ---------------------------------------------------------

    if (
      Number.isNaN(
        appointmentDateTime.getTime()
      )
    ) {
      return "UPCOMING";
    }

    const currentDateTime =
      new Date();

    // ---------------------------------------------------------
    // 5. PAST = COMPLETED
    // ---------------------------------------------------------

    if (
      appointmentDateTime.getTime() <
      currentDateTime.getTime()
    ) {
      return "COMPLETED";
    }

    // ---------------------------------------------------------
    // 6. FUTURE = UPCOMING
    // ---------------------------------------------------------

    return "UPCOMING";
  };

  // =========================================================
  // SORT APPOINTMENTS
  // =========================================================
  //
  // Required order:
  //
  // COMPLETED
  // UPCOMING
  // CANCELLED
  //
  // =========================================================

  const getSortedAppointments = () => {

    const statusOrder = {
      COMPLETED: 1,
      UPCOMING: 2,
      CANCELLED: 3,
    };

    return [...appointments].sort(
      (a, b) => {

        const statusA =
          getAppointmentStatus(a);

        const statusB =
          getAppointmentStatus(b);

        // -----------------------------------------------------
        // FIRST: STATUS
        // -----------------------------------------------------

        if (
          statusOrder[statusA] !==
          statusOrder[statusB]
        ) {
          return (
            statusOrder[statusA] -
            statusOrder[statusB]
          );
        }

        // -----------------------------------------------------
        // SECOND: DATE + TIME
        // -----------------------------------------------------

        const dateA =
          new Date(
            `${a.appointmentDate}T${a.appointmentTime}`
          );

        const dateB =
          new Date(
            `${b.appointmentDate}T${b.appointmentTime}`
          );

        const timeA =
          dateA.getTime();

        const timeB =
          dateB.getTime();

        // Invalid dates go to the end
        if (Number.isNaN(timeA)) {
          return 1;
        }

        if (Number.isNaN(timeB)) {
          return -1;
        }

        return timeA - timeB;
      }
    );
  };

  // =========================================================
  // SORTED APPOINTMENTS
  // =========================================================

  const sortedAppointments =
    getSortedAppointments();

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {

    if (!date) {
      return "-";
    }

    const formattedDate =
      new Date(
        `${date}T00:00:00`
      );

    if (
      Number.isNaN(
        formattedDate.getTime()
      )
    ) {
      return "-";
    }

    return formattedDate.toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }
    );
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (time) => {

    if (!time) {
      return "-";
    }

    const [
      hours,
      minutes,
    ] = time.split(":");

    const date = new Date();

    date.setHours(
      Number(hours),
      Number(minutes),
      0,
      0
    );

    return date.toLocaleTimeString(
      "en-IN",
      {
        hour: "numeric",
        minute: "2-digit",
      }
    );
  };

  // =========================================================
  // STATUS ICON
  // =========================================================

  const getStatusIcon = (status) => {

    switch (status) {

      case "COMPLETED":
        return "✓";

      case "CANCELLED":
        return "×";

      case "UPCOMING":
        return "•";

      default:
        return "•";
    }
  };

  // =========================================================
  // COUNTS
  // =========================================================

  const completedCount =
    appointments.filter(
      (appointment) =>
        getAppointmentStatus(
          appointment
        ) === "COMPLETED"
    ).length;

  const upcomingCount =
    appointments.filter(
      (appointment) =>
        getAppointmentStatus(
          appointment
        ) === "UPCOMING"
    ).length;

  const cancelledCount =
    appointments.filter(
      (appointment) =>
        getAppointmentStatus(
          appointment
        ) === "CANCELLED"
    ).length;

  // =========================================================
  // CANCEL APPOINTMENT
  // =========================================================

  const handleCancelAppointment = async (
    appointmentId
  ) => {

    // ---------------------------------------------------------
    // CONFIRMATION
    // ---------------------------------------------------------

    const confirmed =
      window.confirm(
        "Are you sure you want to cancel this appointment?"
      );

    if (!confirmed) {
      return;
    }

    try {

      setError("");

      // -------------------------------------------------------
      // CALL BACKEND
      // -------------------------------------------------------

      const response =
        await fetch(
          `${API_URL}/appointments/${appointmentId}/cancel`,
          {
            method: "PUT",

            credentials: "include",

            headers: {
              Accept: "application/json",
            },
          }
        );

      // -------------------------------------------------------
      // SESSION EXPIRED
      // -------------------------------------------------------

      if (
        response.status === 401
      ) {

        setError(
          "Your login session has expired. Please login again."
        );

        setTimeout(() => {
          navigate("/login", {
            replace: true,
          });
        }, 1500);

        return;
      }

      // -------------------------------------------------------
      // NOT FOUND
      // -------------------------------------------------------

      if (
        response.status === 404
      ) {

        throw new Error(
          "Appointment not found."
        );
      }

      // -------------------------------------------------------
      // FORBIDDEN
      // -------------------------------------------------------

      if (
        response.status === 403
      ) {

        throw new Error(
          "You cannot cancel this appointment."
        );
      }

      // -------------------------------------------------------
      // OTHER ERROR
      // -------------------------------------------------------

      if (!response.ok) {

        let errorMessage =
          "Unable to cancel appointment.";

        try {

          const errorText =
            await response.text();

          if (errorText) {
            errorMessage =
              errorText;
          }

        } catch (readError) {

          console.error(
            "Error reading cancel response:",
            readError
          );

        }

        throw new Error(
          errorMessage
        );
      }

      // -------------------------------------------------------
      // SUCCESS
      // -------------------------------------------------------

      const cancelledAppointment =
        await response.json();

      console.log(
        "Appointment cancelled successfully:",
        cancelledAppointment
      );

      // -------------------------------------------------------
      // REFRESH LIST
      // -------------------------------------------------------

      await fetchAppointments();

    } catch (err) {

      console.error(
        "Cancel appointment error:",
        err
      );

      /*
       * Handle browser/network failure.
       */

      if (
        err instanceof TypeError
      ) {

        setError(
          "Unable to connect to the server. Please make sure the backend is running."
        );

      } else {

        setError(
          err.message ||
            "Unable to cancel appointment. Please try again."
        );
      }
    }
  };

  // =========================================================
  // RENDER
  // =========================================================

  return (
    <div className="appointment-history-layout">

      {/* =====================================================
          SIDEBAR
      ===================================================== */}

      <Sidebar />


      <div className="appointment-history-main">

        {/* ===================================================
            NAVBAR
        =================================================== */}

        <Navbar />


        <main className="appointment-history-content">

          {/* =================================================
              PAGE HEADER
          ================================================= */}

          <section className="history-header">

            <div className="history-heading">

              <div className="history-title-icon">
                📅
              </div>

              <div>

                <h1>
                  Appointment History
                </h1>

                <p>
                  Keep track of your pregnancy
                  consultations and upcoming visits.
                </p>

              </div>

            </div>


            <button
              type="button"
              className="add-history-btn"
              onClick={() =>
                navigate("/appointment")
              }
            >

              <span className="add-history-icon">
                +
              </span>

              Add Appointment

            </button>

          </section>


          {/* =================================================
              STATISTICS
          ================================================= */}

          {!loading &&
            !error &&
            appointments.length > 0 && (

              <section className="history-mini-stats">

                {/* TOTAL */}

                <div className="mini-stat total-stat">

                  <div className="mini-stat-icon">
                    📋
                  </div>

                  <div>

                    <span>
                      Total
                    </span>

                    <strong>
                      {appointments.length}
                    </strong>

                  </div>

                </div>


                {/* COMPLETED */}

                <div className="mini-stat completed-stat">

                  <div className="mini-stat-icon">
                    ✓
                  </div>

                  <div>

                    <span>
                      Completed
                    </span>

                    <strong>
                      {completedCount}
                    </strong>

                  </div>

                </div>


                {/* UPCOMING */}

                <div className="mini-stat upcoming-stat">

                  <div className="mini-stat-icon">
                    🕐
                  </div>

                  <div>

                    <span>
                      Upcoming
                    </span>

                    <strong>
                      {upcomingCount}
                    </strong>

                  </div>

                </div>


                {/* CANCELLED */}

                <div className="mini-stat cancelled-stat">

                  <div className="mini-stat-icon">
                    ×
                  </div>

                  <div>

                    <span>
                      Cancelled
                    </span>

                    <strong>
                      {cancelledCount}
                    </strong>

                  </div>

                </div>

              </section>

            )}


          {/* =================================================
              ERROR
          ================================================= */}

          {error && (

            <div className="history-error">

              <div className="error-icon">
                !
              </div>

              <div>

                <strong>
                  Something went wrong
                </strong>

                <p>
                  {error}
                </p>

              </div>

              <button
                type="button"
                onClick={fetchAppointments}
              >
                Retry
              </button>

            </div>

          )}


          {/* =================================================
              LOADING
          ================================================= */}

          {loading && (

            <div className="history-loading">

              <div className="loading-animation">

                <span></span>
                <span></span>
                <span></span>

              </div>

              <h3>
                Loading appointments
              </h3>

              <p>
                Please wait while we fetch
                your records.
              </p>

            </div>

          )}


          {/* =================================================
              EMPTY
          ================================================= */}

          {!loading &&
            !error &&
            appointments.length === 0 && (

              <section className="history-empty">

                <div className="empty-calendar">

                  <div className="calendar-top"></div>

                  <div className="calendar-body">
                    📅
                  </div>

                </div>

                <h2>
                  No Appointments Yet
                </h2>

                <p>
                  You don't have any pregnancy
                  consultations recorded yet.
                </p>

                <button
                  type="button"
                  className="empty-add-btn"
                  onClick={() =>
                    navigate("/appointment")
                  }
                >

                  <span>
                    +
                  </span>

                  Add Your First Appointment

                </button>

              </section>

            )}


          {/* =================================================
              APPOINTMENT LIST
          ================================================= */}

          {!loading &&
            !error &&
            sortedAppointments.length > 0 && (

              <section className="appointments-section">

                {/* =================================================
                    SECTION HEADER
                ================================================= */}

                <div className="appointments-section-header">

                  <div>

                    <h2>
                      Your Appointments
                    </h2>

                    <p>
                      Completed, upcoming and
                      cancelled consultations
                    </p>

                  </div>

                  <span className="appointment-count">

                    {sortedAppointments.length}

                    {" "}

                    {sortedAppointments.length === 1
                      ? "Record"
                      : "Records"}

                  </span>

                </div>


                {/* =================================================
                    APPOINTMENT LIST
                ================================================= */}

                <div className="appointment-list">

                  {sortedAppointments.map(
                    (appointment) => {

                      const status =
                        getAppointmentStatus(
                          appointment
                        );

                      return (

                        <article
                          className="history-appointment-card"
                          key={appointment.id}
                        >

                          {/* =================================================
                              DATE
                          ================================================= */}

                          <div className="appointment-date-block">

                            <div className="date-icon">
                              📅
                            </div>

                            <strong>
                              {formatDate(
                                appointment.appointmentDate
                              )}
                            </strong>

                            <span>
                              {formatTime(
                                appointment.appointmentTime
                              )}
                            </span>

                          </div>


                          {/* =================================================
                              MAIN
                          ================================================= */}

                          <div className="history-appointment-main">

                            {/* =================================================
                                DOCTOR + STATUS
                            ================================================= */}

                            <div className="doctor-row">

                              <div className="history-doctor-avatar">
                                👩‍⚕️
                              </div>

                              <div className="history-doctor-info">

                                <h3>
                                  {appointment.doctorName ||
                                    "Doctor not assigned"}
                                </h3>

                                <p>
                                  {appointment.specialization ||
                                    "Gynecologist"}
                                </p>

                              </div>


                              {/* STATUS */}

                              <span
                                className={`history-status ${status.toLowerCase()}`}
                              >

                                <span className="status-dot">

                                  {getStatusIcon(
                                    status
                                  )}

                                </span>

                                {status}

                              </span>

                            </div>


                            {/* =================================================
                                DETAILS
                            ================================================= */}

                            <div className="appointment-details-grid">

                              {/* HOSPITAL */}

                              <div className="appointment-detail">

                                <span className="detail-icon">
                                  🏥
                                </span>

                                <div>

                                  <small>
                                    Hospital
                                  </small>

                                  <strong>
                                    {appointment.hospital ||
                                      "Hospital not specified"}
                                  </strong>

                                </div>

                              </div>


                              {/* LOCATION */}

                              <div className="appointment-detail">

                                <span className="detail-icon">
                                  📍
                                </span>

                                <div>

                                  <small>
                                    Location
                                  </small>

                                  <strong>
                                    {appointment.location ||
                                      "Location not specified"}
                                  </strong>

                                </div>

                              </div>


                              {/* PURPOSE */}

                              <div className="appointment-detail">

                                <span className="detail-icon">
                                  🩺
                                </span>

                                <div>

                                  <small>
                                    Purpose
                                  </small>

                                  <strong>
                                    {appointment.purpose ||
                                      "Purpose not specified"}
                                  </strong>

                                </div>

                              </div>

                            </div>

                          </div>


                          {/* =================================================
                              ACTIONS
                          ================================================= */}

                          <div className="history-card-action">

                            {/* =================================================
                                UPCOMING ACTIONS
                            ================================================= */}

                            {status === "UPCOMING" && (

                              <>

                                <button
                                  type="button"
                                  className="reschedule-small-btn"
                                  onClick={() =>
                                    navigate(
                                      `/appointment/${appointment.id}`
                                    )
                                  }
                                >
                                  Reschedule
                                </button>


                                <button
                                  type="button"
                                  className="cancel-small-btn"
                                  onClick={() =>
                                    handleCancelAppointment(
                                      appointment.id
                                    )
                                  }
                                >
                                  Cancel
                                </button>

                              </>

                            )}


                            {/* =================================================
                                VIEW
                            ================================================= */}

                            <button
                              type="button"
                              className="view-small-btn"
                              onClick={() =>
                                navigate(
                                  `/appointment/${appointment.id}`
                                )
                              }
                            >

                              View

                              <span>
                                →
                              </span>

                            </button>

                          </div>

                        </article>

                      );
                    }
                  )}

                </div>

              </section>

            )}

        </main>

      </div>

    </div>
  );
}

export default AppointmentHistory;