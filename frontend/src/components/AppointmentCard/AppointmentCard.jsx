import "./AppointmentCard.css";

import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
} from "chart.js";

import { Doughnut } from "react-chartjs-2";

import {
  useEffect,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

ChartJS.register(
  ArcElement,
  Tooltip
);


// =========================================================
// API
// =========================================================

const API_BASE_URL = "http://localhost:8080/api";


// =========================================================
// APPOINTMENT CARD
// =========================================================

function AppointmentCard() {

  const navigate = useNavigate();

  // =======================================================
  // STATE
  // =======================================================

  const [appointments, setAppointments] = useState([]);

  const [loading, setLoading] = useState(true);

  const [error, setError] = useState("");


  // =======================================================
  // FETCH CURRENT USER'S APPOINTMENTS
  // =======================================================

  const fetchAppointments = async () => {

    try {

      setLoading(true);
      setError("");


      const response = await fetch(
        `${API_BASE_URL}/appointments/my`,
        {
          method: "GET",

          // IMPORTANT:
          // Sends the Spring Boot session cookie
          credentials: "include",

          headers: {
            "Content-Type": "application/json",
          },
        }
      );


      // ===================================================
      // NOT LOGGED IN / SESSION EXPIRED
      // ===================================================

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


      // ===================================================
      // OTHER BACKEND ERROR
      // ===================================================

      if (!response.ok) {

        let message =
          "Unable to load appointment data.";

        try {

          const text =
            await response.text();

          if (text) {
            message = text;
          }

        } catch (readError) {

          console.error(
            "Unable to read backend error:",
            readError
          );

        }

        throw new Error(message);
      }


      // ===================================================
      // SUCCESS
      // ===================================================

      const data =
        await response.json();


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


      setError(
        err.message ||
        "Unable to load appointment data."
      );

    } finally {

      setLoading(false);

    }

  };


  // =======================================================
  // LOAD APPOINTMENTS
  // =======================================================

  useEffect(() => {

    fetchAppointments();

  }, []);


  // =======================================================
  // AUTOMATIC APPOINTMENT STATUS
  // =======================================================

  const getAppointmentStatus = (
    appointment
  ) => {

    // -----------------------------------------------
    // Manually cancelled appointment
    // -----------------------------------------------

    if (
      appointment.status?.toUpperCase() ===
      "CANCELLED"
    ) {

      return "CANCELLED";

    }


    // -----------------------------------------------
    // Missing date/time
    // -----------------------------------------------

    if (
      !appointment.appointmentDate ||
      !appointment.appointmentTime
    ) {

      return "UPCOMING";

    }


    // -----------------------------------------------
    // Appointment date/time
    // -----------------------------------------------

    const appointmentDateTime =
      new Date(
        `${appointment.appointmentDate}T${appointment.appointmentTime}`
      );


    const currentDateTime =
      new Date();


    // -----------------------------------------------
    // Past appointment
    // -----------------------------------------------

    if (
      appointmentDateTime <
      currentDateTime
    ) {

      return "COMPLETED";

    }


    // -----------------------------------------------
    // Future appointment
    // -----------------------------------------------

    return "UPCOMING";

  };


  // =======================================================
  // ADD CALCULATED STATUS
  // =======================================================

  const appointmentsWithStatus =
    appointments.map(
      (appointment) => ({

        ...appointment,

        calculatedStatus:
          getAppointmentStatus(
            appointment
          ),

      })
    );


  // =======================================================
  // COUNTS
  // =======================================================

  const completedCount =
    appointmentsWithStatus.filter(
      (appointment) =>
        appointment.calculatedStatus ===
        "COMPLETED"
    ).length;


  const upcomingCount =
    appointmentsWithStatus.filter(
      (appointment) =>
        appointment.calculatedStatus ===
        "UPCOMING"
    ).length;


  const cancelledCount =
    appointmentsWithStatus.filter(
      (appointment) =>
        appointment.calculatedStatus ===
        "CANCELLED"
    ).length;


  const totalCount =
    appointmentsWithStatus.length;


  // =======================================================
  // FIND NEXT UPCOMING APPOINTMENT
  // =======================================================

  const upcomingAppointments =
    appointmentsWithStatus
      .filter(
        (appointment) =>
          appointment.calculatedStatus ===
          "UPCOMING" &&
          appointment.appointmentDate &&
          appointment.appointmentTime
      )
      .sort(
        (a, b) => {

          const dateA =
            new Date(
              `${a.appointmentDate}T${a.appointmentTime}`
            );


          const dateB =
            new Date(
              `${b.appointmentDate}T${b.appointmentTime}`
            );


          return dateA - dateB;

        }
      );


  const nextAppointment =
    upcomingAppointments.length > 0
      ? upcomingAppointments[0]
      : null;


  // =======================================================
  // FORMAT DATE
  // =======================================================

  const formatDate = (date) => {

    if (!date) {
      return "Not available";
    }


    return new Date(
      `${date}T00:00:00`
    ).toLocaleDateString(
      "en-IN",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    );

  };


  // =======================================================
  // FORMAT TIME
  // =======================================================

  const formatTime = (time) => {

    if (!time) {
      return "Not available";
    }


    const [
      hours,
      minutes,
    ] = time.split(":");


    const date =
      new Date();


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


  // =======================================================
  // CHART DATA
  // =======================================================

  const chartData = {

    labels: [
      "Completed",
      "Upcoming",
      "Cancelled",
    ],

    datasets: [

      {
        data: [
          completedCount,
          upcomingCount,
          cancelledCount,
        ],

        backgroundColor: [
          "#22c55e",
          "#f59e0b",
          "#ef4444",
        ],

        borderWidth: 0,

        hoverOffset: 5,
      },

    ],

  };


  // =======================================================
  // CHART OPTIONS
  // =======================================================

  const chartOptions = {

    responsive: true,

    maintainAspectRatio: false,

    cutout: "70%",

    plugins: {

      legend: {
        display: false,
      },

      tooltip: {

        enabled: true,

        padding: 10,

        backgroundColor: "#1e293b",

        titleFont: {
          size: 13,
        },

        bodyFont: {
          size: 12,
        },

        cornerRadius: 8,

      },

    },

  };


  // =======================================================
  // LOADING
  // =======================================================

  if (loading) {

    return (

      <section className="appointment-dashboard">

        <div className="appointment-section-header">

          <div>

            <h2>
              Appointments
            </h2>

            <p>
              Manage your pregnancy consultations
              and upcoming visits.
            </p>

          </div>

        </div>


        <div className="appointment-loading">

          <div className="loading-spinner"></div>

          <span>
            Loading appointments...
          </span>

        </div>

      </section>

    );

  }


  // =======================================================
  // MAIN UI
  // =======================================================

  return (

    <section className="appointment-dashboard">


      {/* =================================================
          HEADER
      ================================================= */}

      <div className="appointment-section-header">

        <div>

          <h2>
            Appointments
          </h2>

          <p>
            Manage your pregnancy consultations
            and upcoming visits.
          </p>

        </div>


        <button
          type="button"
          className="history-btn"
          onClick={() =>
            navigate("/appointment")
          }
        >

          <span>
            📋
          </span>

          Appointment History

        </button>

      </div>


      {/* =================================================
          ERROR
      ================================================= */}

      {error && (

        <div className="appointment-error">

          <span>
            ⚠️
          </span>

          <span>
            {error}
          </span>

        </div>

      )}


      {/* =================================================
          TWO CARDS
      ================================================= */}

      <div className="appointment-grid">


        {/* =================================================
            STATISTICS CARD
        ================================================= */}

        <div className="appointment-card statistics-card">


          {/* CARD HEADER */}

          <div className="card-header">

            <div className="card-icon statistics-icon">
              📊
            </div>


            <div>

              <h3>
                Appointment Statistics
              </h3>

              <p>
                Your appointment overview
              </p>

            </div>

          </div>


          {/* STATISTICS BODY */}

          <div className="statistics-content">


            {/* DOUGHNUT */}

            <div className="appointment-chart">

              <Doughnut
                data={chartData}
                options={chartOptions}
              />


              {/* CENTER TOTAL */}

              <div className="chart-center">

                <strong>
                  {totalCount}
                </strong>

                <span>
                  Total
                </span>

              </div>

            </div>


            {/* SUMMARY */}

            <div className="statistics-summary">


              {/* COMPLETED */}

              <div className="summary-item">

                <span className="summary-dot completed-dot"></span>

                <div className="summary-text">

                  <strong>
                    {completedCount}
                  </strong>

                  <small>
                    Completed
                  </small>

                </div>

              </div>


              {/* UPCOMING */}

              <div className="summary-item">

                <span className="summary-dot upcoming-dot"></span>

                <div className="summary-text">

                  <strong>
                    {upcomingCount}
                  </strong>

                  <small>
                    Upcoming
                  </small>

                </div>

              </div>


              {/* CANCELLED */}

              <div className="summary-item">

                <span className="summary-dot cancelled-dot"></span>

                <div className="summary-text">

                  <strong>
                    {cancelledCount}
                  </strong>

                  <small>
                    Cancelled
                  </small>

                </div>

              </div>

            </div>

          </div>

        </div>


        {/* =================================================
            UPCOMING APPOINTMENT CARD
        ================================================= */}

        <div className="appointment-card upcoming-card">


          {/* CARD HEADER */}

          <div className="card-header">

            <div className="card-icon upcoming-icon">
              📅
            </div>


            <div>

              <h3>
                Upcoming Appointment
              </h3>

              <p>
                Your next scheduled consultation
              </p>

            </div>

          </div>


          {/* =================================================
              UPCOMING APPOINTMENT EXISTS
          ================================================= */}

          {nextAppointment ? (

            <>


              {/* DOCTOR */}

              <div className="doctor-info">

                <div className="doctor-avatar">
                  👩‍⚕️
                </div>


                <div className="doctor-details">

                  <h4>
                    {nextAppointment.doctorName ||
                      "Dr. Priya Sharma"}
                  </h4>

                  <p>
                    {nextAppointment.specialization ||
                      "Gynecologist"}
                  </p>

                </div>


                <span className="appointment-status">
                  Upcoming
                </span>

              </div>


              {/* INFORMATION */}

              <div className="appointment-info">


                {/* DATE */}

                <div className="info-item">

                  <span className="info-icon">
                    📅
                  </span>

                  <div>

                    <small>
                      Date
                    </small>

                    <strong>
                      {formatDate(
                        nextAppointment.appointmentDate
                      )}
                    </strong>

                  </div>

                </div>


                {/* TIME */}

                <div className="info-item">

                  <span className="info-icon">
                    🕐
                  </span>

                  <div>

                    <small>
                      Time
                    </small>

                    <strong>
                      {formatTime(
                        nextAppointment.appointmentTime
                      )}
                    </strong>

                  </div>

                </div>


                {/* HOSPITAL */}

                <div className="info-item">

                  <span className="info-icon">
                    🏥
                  </span>

                  <div>

                    <small>
                      Hospital
                    </small>

                    <strong>
                      {nextAppointment.hospital ||
                        "Not specified"}
                    </strong>

                  </div>

                </div>


                {/* LOCATION */}

                <div className="info-item">

                  <span className="info-icon">
                    📍
                  </span>

                  <div>

                    <small>
                      Location
                    </small>

                    <strong>
                      {nextAppointment.location ||
                        "Not specified"}
                    </strong>

                  </div>

                </div>

              </div>


              {/* PURPOSE */}

              <div className="appointment-purpose">

                <span>
                  Purpose
                </span>

                <strong>
                  {nextAppointment.purpose ||
                    "Pregnancy Check-up"}
                </strong>

              </div>


              {/* ACTIONS */}

              <div className="appointment-actions">


                <button
                  type="button"
                  className="view-btn"
                  onClick={() =>
                    navigate(
                      `/appointment/${nextAppointment.id}`
                    )
                  }
                >
                  View Details
                </button>


                <button
                  type="button"
                  className="reschedule-btn"
                  onClick={() =>
                    navigate(
                      `/appointment/${nextAppointment.id}`
                    )
                  }
                >
                  Reschedule
                </button>


                <button
                  type="button"
                  className="reminder-btn"
                  onClick={() =>
                    alert(
                      "Reminder feature will be added later."
                    )
                  }
                >
                  🔔 Reminder
                </button>

              </div>

            </>

          ) : (

            /* =================================================
                NO UPCOMING APPOINTMENT
            ================================================= */

            <div className="no-upcoming-appointment">

              <div className="no-appointment-icon">
                📅
              </div>


              <h4>
                No Upcoming Appointment
              </h4>


              <p>
                You don't have any upcoming
                pregnancy consultations.
              </p>


              <button
                type="button"
                className="add-appointment-btn"
                onClick={() =>
                  navigate("/appointment")
                }
              >

                <span>
                  +
                </span>

                Add Appointment

              </button>

            </div>

          )}

        </div>

      </div>

    </section>

  );

}


export default AppointmentCard;