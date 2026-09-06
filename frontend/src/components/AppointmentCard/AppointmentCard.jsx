import React, {
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

import { useNavigate } from "react-router-dom";

import API from "../../services/api";

import "./AppointmentCard.css";

const AppointmentCard = () => {
  const navigate = useNavigate();

  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // =========================================================
  // FETCH APPOINTMENTS
  // =========================================================

  const fetchAppointments = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const response = await API.get(
        "/appointments/my",
        {
          withCredentials: true,
        }
      );

      const data = response.data;

      console.log(
        "Appointments received:",
        data
      );

      let appointmentList = [];

      if (Array.isArray(data)) {
        appointmentList = data;
      } else if (
        Array.isArray(data?.appointments)
      ) {
        appointmentList = data.appointments;
      } else if (
        Array.isArray(data?.appointmentHistory)
      ) {
        appointmentList =
          data.appointmentHistory;
      } else if (
        Array.isArray(data?.upcomingAppointments)
      ) {
        appointmentList =
          data.upcomingAppointments;
      } else if (
        Array.isArray(data?.upcoming)
      ) {
        appointmentList =
          data.upcoming;
      } else if (
        Array.isArray(data?.futureAppointments)
      ) {
        appointmentList =
          data.futureAppointments;
      }

      // Remove duplicate appointments
      const uniqueAppointments =
        appointmentList.filter(
          (appointment, index, array) => {

            const id =
              appointment?.id ??
              appointment?.appointmentId;

            if (id === undefined) {
              return index ===
                array.findIndex(
                  (item) =>
                    JSON.stringify(item) ===
                    JSON.stringify(appointment)
                );
            }

            return (
              index ===
              array.findIndex(
                (item) =>
                  (item?.id ??
                    item?.appointmentId) ===
                  id
              )
            );
          }
        );

      setAppointments(
        uniqueAppointments
      );

    } catch (err) {
      console.error(
        "Appointment fetch error:",
        err
      );

      if (
        err.response?.status === 401
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

      setError(
        err.response?.data?.message ||
          err.message ||
          "Unable to load appointment data."
      );

    } finally {
      setLoading(false);
    }
  }, [navigate]);

  // =========================================================
  // LOAD APPOINTMENTS
  // =========================================================

  useEffect(() => {
    fetchAppointments();
  }, [fetchAppointments]);

  // =========================================================
  // FORMAT DATE
  // =========================================================

  const formatDate = (date) => {
    if (!date) {
      return "Date not available";
    }

    try {
      const parsedDate = new Date(date);

      if (Number.isNaN(parsedDate.getTime())) {
        return date;
      }

      return parsedDate.toLocaleDateString(
        "en-IN",
        {
          day: "numeric",
          month: "short",
          year: "numeric",
        }
      );

    } catch {
      return date;
    }
  };

  // =========================================================
  // FORMAT TIME
  // =========================================================

  const formatTime = (time) => {
    if (!time) {
      return "Time not available";
    }

    try {
      const timeString =
        String(time);

      // HH:mm or HH:mm:ss
      const match =
        timeString.match(
          /^(\d{1,2}):(\d{2})/
        );

      if (match) {
        const hours =
          Number(match[1]);

        const minutes =
          Number(match[2]);

        const date =
          new Date();

        date.setHours(
          hours,
          minutes,
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
      }

      const parsed =
        new Date(time);

      if (!Number.isNaN(parsed.getTime())) {
        return parsed.toLocaleTimeString(
          "en-IN",
          {
            hour: "numeric",
            minute: "2-digit",
          }
        );
      }

      return timeString;

    } catch {
      return String(time);
    }
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
      .replace(/[\s_-]+/g, "");
  };

  // =========================================================
  // DISPLAY STATUS
  // =========================================================

  const displayStatus = (status) => {
    if (!status) {
      return "Scheduled";
    }

    const normalized =
      normalizeStatus(status);

    if (
      normalized === "cancelled" ||
      normalized === "canceled"
    ) {
      return "Cancelled";
    }

    if (
      normalized === "completed" ||
      normalized === "complete"
    ) {
      return "Completed";
    }

    if (
      normalized === "confirmed"
    ) {
      return "Confirmed";
    }

    if (
      normalized === "pending"
    ) {
      return "Pending";
    }

    return String(status)
      .charAt(0)
      .toUpperCase() +
      String(status)
        .slice(1)
        .toLowerCase();
  };

  // =========================================================
  // GET APPOINTMENT DATE
  // =========================================================

  const getAppointmentDateObject =
    (appointment) => {

      if (!appointment) {
        return null;
      }

      const date =
        appointment.date ??
        appointment.appointmentDate ??
        appointment.appointment_date ??
        appointment.scheduledDate;

      const time =
        appointment.time ??
        appointment.appointmentTime ??
        appointment.appointment_time ??
        appointment.scheduledTime;

      if (!date) {
        return null;
      }

      try {

        if (time) {
          const dateString =
            `${date}T${time}`;

          const combined =
            new Date(dateString);

          if (
            !Number.isNaN(
              combined.getTime()
            )
          ) {
            return combined;
          }
        }

        const parsed =
          new Date(date);

        if (
          !Number.isNaN(
            parsed.getTime()
          )
        ) {
          return parsed;
        }

      } catch {
        return null;
      }

      return null;
    };

  // =========================================================
  // GET APPOINTMENT CATEGORY
  // =========================================================

  const getAppointmentCategory =
    (appointment) => {

      const normalizedStatus =
        normalizeStatus(
          appointment?.status
        );

      if (
        normalizedStatus ===
          "cancelled" ||
        normalizedStatus ===
          "canceled"
      ) {
        return "cancelled";
      }

      if (
        normalizedStatus ===
          "completed" ||
        normalizedStatus ===
          "complete"
      ) {
        return "completed";
      }

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

      return "upcoming";
    };

  // =========================================================
  // COMPLETED
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
  // UPCOMING
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
        .sort((a, b) => {

          const dateA =
            getAppointmentDateObject(a);

          const dateB =
            getAppointmentDateObject(b);

          if (!dateA && !dateB) {
            return 0;
          }

          if (!dateA) {
            return 1;
          }

          if (!dateB) {
            return -1;
          }

          return (
            dateA.getTime() -
            dateB.getTime()
          );
        });

    }, [appointments]);

  // =========================================================
  // CANCELLED
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
  // NEXT APPOINTMENT
  // =========================================================

  const nextUpcomingAppointment =
    upcomingAppointments.length > 0
      ? upcomingAppointments[0]
      : null;

  // =========================================================
  // APPOINTMENT NAME
  // =========================================================

  const getAppointmentTitle =
    (appointment) => {

      return (
        appointment?.title ||
        appointment?.appointmentType ||
        appointment?.type ||
        appointment?.reason ||
        appointment?.purpose ||
        "Doctor Appointment"
      );
    };

  // =========================================================
  // DOCTOR NAME
  // =========================================================

  const getDoctorName =
    (appointment) => {

      return (
        appointment?.doctorName ||
        appointment?.doctor?.name ||
        appointment?.doctor ||
        appointment?.providerName ||
        "Doctor"
      );
    };

  // =========================================================
  // LOCATION
  // =========================================================

  const getLocation =
    (appointment) => {

      return (
        appointment?.location ||
        appointment?.hospitalName ||
        appointment?.clinicName ||
        appointment?.hospital ||
        "Location not available"
      );
    };

  // =========================================================
  // LOADING
  // =========================================================

  if (loading) {
    return (
      <div className="appointment-card">

        <div className="appointment-header">

          <div>
            <h2>
              📅 Appointments
            </h2>

            <p>
              Your upcoming appointments
            </p>
          </div>

        </div>

        <div className="appointment-loading">
          Loading appointments...
        </div>

      </div>
    );
  }

  // =========================================================
  // ERROR
  // =========================================================

  if (error) {
    return (
      <div className="appointment-card">

        <div className="appointment-header">

          <div>
            <h2>
              📅 Appointments
            </h2>

            <p>
              Your upcoming appointments
            </p>
          </div>

        </div>

        <div className="appointment-error">

          <span>
            ⚠️
          </span>

          <p>
            {error}
          </p>

          <button
            onClick={fetchAppointments}
          >
            Try Again
          </button>

        </div>

      </div>
    );
  }

  // =========================================================
  // MAIN UI
  // =========================================================

  return (
    <div className="appointment-card">

      {/* HEADER */}

      <div className="appointment-header">

        <div>

          <h2>
            📅 Appointments
          </h2>

          <p>
            Manage your pregnancy appointments
          </p>

        </div>

        <button
  className="view-all-button"
  onClick={() => navigate("/appointment-history")}
>
  View All
</button>

      </div>


      {/* STATS */}

      <div className="appointment-stats">

        <div className="appointment-stat">

          <div className="stat-icon">
            ✅
          </div>

          <div>

            <strong>
              {completedAppointments.length}
            </strong>

            <span>
              Completed
            </span>

          </div>

        </div>


        <div className="appointment-stat">

          <div className="stat-icon">
            📅
          </div>

          <div>

            <strong>
              {upcomingAppointments.length}
            </strong>

            <span>
              Upcoming
            </span>

          </div>

        </div>


        <div className="appointment-stat">

          <div className="stat-icon">
            ❌
          </div>

          <div>

            <strong>
              {cancelledAppointments.length}
            </strong>

            <span>
              Cancelled
            </span>

          </div>

        </div>

      </div>


      {/* NEXT APPOINTMENT */}

      <div className="next-appointment-section">

        <div className="section-title">

          <h3>
            Upcoming Appointment
          </h3>

        </div>


        {nextUpcomingAppointment ? (

          <div className="next-appointment">

            <div className="appointment-date-box">

              <span>
                {(() => {

                  const date =
                    getAppointmentDateObject(
                      nextUpcomingAppointment
                    );

                  return date
                    ? date.toLocaleDateString(
                        "en-IN",
                        {
                          day: "2-digit",
                        }
                      )
                    : "--";

                })()}
              </span>

              <small>
                {(() => {

                  const date =
                    getAppointmentDateObject(
                      nextUpcomingAppointment
                    );

                  return date
                    ? date.toLocaleDateString(
                        "en-IN",
                        {
                          month: "short",
                        }
                      )
                    : "";

                })()}
              </small>

            </div>


            <div className="appointment-details">

              <h4>
                {getAppointmentTitle(
                  nextUpcomingAppointment
                )}
              </h4>

              <p>
                👨‍⚕️{" "}
                {getDoctorName(
                  nextUpcomingAppointment
                )}
              </p>

              <p>
                📅{" "}
                {formatDate(
                  nextUpcomingAppointment.date ??
                    nextUpcomingAppointment.appointmentDate ??
                    nextUpcomingAppointment.appointment_date ??
                    nextUpcomingAppointment.scheduledDate
                )}
              </p>

              <p>
                🕐{" "}
                {formatTime(
                  nextUpcomingAppointment.time ??
                    nextUpcomingAppointment.appointmentTime ??
                    nextUpcomingAppointment.appointment_time ??
                    nextUpcomingAppointment.scheduledTime
                )}
              </p>

              <p>
                📍{" "}
                {getLocation(
                  nextUpcomingAppointment
                )}
              </p>

            </div>


            <div
              className={`appointment-status ${normalizeStatus(
                nextUpcomingAppointment.status
              )}`}
            >
              {displayStatus(
                nextUpcomingAppointment.status
              )}
            </div>

          </div>

        ) : (

          <div className="no-appointment">

            <div className="no-appointment-icon">
              📅
            </div>

            <h4>
              No upcoming appointments
            </h4>

            <p>
              You don't have any upcoming appointments.
            </p>

          </div>

        )}

      </div>


      {/* UPCOMING LIST */}

      {upcomingAppointments.length > 1 && (

        <div className="appointment-list-section">

          <div className="section-title">

            <h3>
              More Upcoming Appointments
            </h3>

          </div>


          <div className="appointment-list">

            {upcomingAppointments
              .slice(1, 4)
              .map(
                (appointment, index) => {

                  const id =
                    appointment?.id ??
                    appointment?.appointmentId ??
                    index;

                  return (
                    <div
                      className="appointment-list-item"
                      key={id}
                    >

                      <div className="list-date">

                        <strong>
                          {(() => {

                            const date =
                              getAppointmentDateObject(
                                appointment
                              );

                            return date
                              ? date.getDate()
                              : "--";

                          })()}
                        </strong>

                        <span>
                          {(() => {

                            const date =
                              getAppointmentDateObject(
                                appointment
                              );

                            return date
                              ? date.toLocaleDateString(
                                  "en-IN",
                                  {
                                    month: "short",
                                  }
                                )
                              : "";

                          })()}
                        </span>

                      </div>


                      <div className="list-details">

                        <h4>
                          {getAppointmentTitle(
                            appointment
                          )}
                        </h4>

                        <p>
                          {getDoctorName(
                            appointment
                          )}
                        </p>

                      </div>


                      <div className="list-time">

                        <span>
                          {formatTime(
                            appointment.time ??
                              appointment.appointmentTime ??
                              appointment.appointment_time ??
                              appointment.scheduledTime
                          )}
                        </span>

                      </div>

                    </div>
                  );
                }
              )}

          </div>

        </div>

      )}

    </div>
  );
};

export default AppointmentCard;