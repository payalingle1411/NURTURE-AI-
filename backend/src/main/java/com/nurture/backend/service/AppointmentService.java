package com.nurture.backend.service;

import com.nurture.backend.entity.Appointment;
import com.nurture.backend.repository.AppointmentRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class AppointmentService {

    private final AppointmentRepository repository;

    public AppointmentService(
            AppointmentRepository repository
    ) {
        this.repository = repository;
    }

    // =========================================================
    // CREATE APPOINTMENT
    // =========================================================

    public Appointment createAppointment(
            Appointment appointment
    ) {

        // -----------------------------------------------------
        // VALIDATE DOCTOR
        // -----------------------------------------------------

        if (appointment.getDoctorName() == null ||
                appointment.getDoctorName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Doctor name is required"
            );
        }

        // -----------------------------------------------------
        // VALIDATE DATE
        // -----------------------------------------------------

        if (appointment.getAppointmentDate() == null) {

            throw new RuntimeException(
                    "Appointment date is required"
            );
        }

        // -----------------------------------------------------
        // VALIDATE TIME
        // -----------------------------------------------------

        if (appointment.getAppointmentTime() == null) {

            throw new RuntimeException(
                    "Appointment time is required"
            );
        }

        // -----------------------------------------------------
        // CALCULATE STATUS AUTOMATICALLY
        // -----------------------------------------------------

        appointment.setStatus(
                calculateStatus(
                        appointment.getAppointmentDate(),
                        appointment.getAppointmentTime()
                )
        );

        // -----------------------------------------------------
        // SAVE
        // -----------------------------------------------------

        return repository.save(appointment);
    }

    // =========================================================
    // GET USER APPOINTMENTS
    // =========================================================

    public List<Appointment> getAppointmentsByUserId(
            Long userId
    ) {

        List<Appointment> appointments =
                repository
                        .findByUserIdOrderByAppointmentDateAscAppointmentTimeAsc(
                                userId
                        );

        LocalDateTime now =
                LocalDateTime.now();

        // -----------------------------------------------------
        // AUTOMATICALLY UPDATE OLD APPOINTMENTS
        // -----------------------------------------------------

        for (Appointment appointment : appointments) {

            // -------------------------------------------------
            // NEVER CHANGE CANCELLED APPOINTMENTS
            // -------------------------------------------------

            if ("CANCELLED".equalsIgnoreCase(
                    appointment.getStatus()
            )) {

                continue;
            }

            // -------------------------------------------------
            // INVALID RECORD
            // -------------------------------------------------

            if (appointment.getAppointmentDate() == null ||
                    appointment.getAppointmentTime() == null) {

                continue;
            }

            LocalDateTime appointmentDateTime =
                    LocalDateTime.of(
                            appointment.getAppointmentDate(),
                            appointment.getAppointmentTime()
                    );

            // -------------------------------------------------
            // UPCOMING -> COMPLETED
            // -------------------------------------------------

            if (appointmentDateTime.isBefore(now) &&
                    !"COMPLETED".equalsIgnoreCase(
                            appointment.getStatus()
                    )) {

                appointment.setStatus("COMPLETED");

                repository.save(appointment);
            }
        }

        return appointments;
    }

    // =========================================================
    // GET SINGLE APPOINTMENT
    // =========================================================

    public Appointment getAppointmentById(
            Long id
    ) {

        Appointment appointment =
                repository.findById(id)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Appointment not found"
                                )
                        );

        // -----------------------------------------------------
        // AUTOMATIC STATUS UPDATE
        // -----------------------------------------------------

        if (!"CANCELLED".equalsIgnoreCase(
                appointment.getStatus()
        )) {

            if (appointment.getAppointmentDate() != null &&
                    appointment.getAppointmentTime() != null) {

                LocalDateTime appointmentDateTime =
                        LocalDateTime.of(
                                appointment.getAppointmentDate(),
                                appointment.getAppointmentTime()
                        );

                if (appointmentDateTime.isBefore(
                        LocalDateTime.now()
                ) &&
                        !"COMPLETED".equalsIgnoreCase(
                                appointment.getStatus()
                        )) {

                    appointment.setStatus("COMPLETED");

                    appointment =
                            repository.save(appointment);
                }
            }
        }

        return appointment;
    }

    // =========================================================
    // UPDATE / RESCHEDULE
    // =========================================================

    public Appointment updateAppointment(
            Long id,
            Appointment updatedAppointment
    ) {

        Appointment appointment =
                getAppointmentById(id);

        // -----------------------------------------------------
        // CANCELLED CANNOT BE RESCHEDULED
        // -----------------------------------------------------

        if ("CANCELLED".equalsIgnoreCase(
                appointment.getStatus()
        )) {

            throw new RuntimeException(
                    "Cancelled appointments cannot be rescheduled"
            );
        }

        // -----------------------------------------------------
        // DOCTOR VALIDATION
        // -----------------------------------------------------

        if (updatedAppointment.getDoctorName() == null ||
                updatedAppointment.getDoctorName().trim().isEmpty()) {

            throw new RuntimeException(
                    "Doctor name is required"
            );
        }

        appointment.setDoctorName(
                updatedAppointment.getDoctorName().trim()
        );

        // -----------------------------------------------------
        // SPECIALIZATION
        // -----------------------------------------------------

        appointment.setSpecialization(
                updatedAppointment.getSpecialization()
        );

        // -----------------------------------------------------
        // DATE VALIDATION
        // -----------------------------------------------------

        if (updatedAppointment.getAppointmentDate() == null) {

            throw new RuntimeException(
                    "Appointment date is required"
            );
        }

        appointment.setAppointmentDate(
                updatedAppointment.getAppointmentDate()
        );

        // -----------------------------------------------------
        // TIME VALIDATION
        // -----------------------------------------------------

        if (updatedAppointment.getAppointmentTime() == null) {

            throw new RuntimeException(
                    "Appointment time is required"
            );
        }

        appointment.setAppointmentTime(
                updatedAppointment.getAppointmentTime()
        );

        // -----------------------------------------------------
        // HOSPITAL
        // -----------------------------------------------------

        appointment.setHospital(
                updatedAppointment.getHospital()
        );

        // -----------------------------------------------------
        // LOCATION
        // -----------------------------------------------------

        appointment.setLocation(
                updatedAppointment.getLocation()
        );

        // -----------------------------------------------------
        // PURPOSE
        // -----------------------------------------------------

        appointment.setPurpose(
                updatedAppointment.getPurpose()
        );

        // -----------------------------------------------------
        // RECALCULATE STATUS
        // -----------------------------------------------------

        appointment.setStatus(
                calculateStatus(
                        appointment.getAppointmentDate(),
                        appointment.getAppointmentTime()
                )
        );

        return repository.save(appointment);
    }

    // =========================================================
    // CANCEL APPOINTMENT
    // =========================================================

    public Appointment cancelAppointment(
            Long id
    ) {

        Appointment appointment =
                getAppointmentById(id);

        // -----------------------------------------------------
        // ALREADY CANCELLED
        // -----------------------------------------------------

        if ("CANCELLED".equalsIgnoreCase(
                appointment.getStatus()
        )) {

            throw new RuntimeException(
                    "Appointment is already cancelled"
            );
        }

        // -----------------------------------------------------
        // COMPLETED CANNOT BE CANCELLED
        // -----------------------------------------------------

        if ("COMPLETED".equalsIgnoreCase(
                appointment.getStatus()
        )) {

            throw new RuntimeException(
                    "Completed appointments cannot be cancelled"
            );
        }

        // -----------------------------------------------------
        // CANCEL
        // -----------------------------------------------------

        appointment.setStatus("CANCELLED");

        return repository.save(appointment);
    }

    // =========================================================
    // DELETE APPOINTMENT
    // =========================================================

    public void deleteAppointment(
            Long id
    ) {

        if (!repository.existsById(id)) {

            throw new RuntimeException(
                    "Appointment not found"
            );
        }

        repository.deleteById(id);
    }

    // =========================================================
    // STATUS CALCULATOR
    // =========================================================

    private String calculateStatus(
            java.time.LocalDate appointmentDate,
            java.time.LocalTime appointmentTime
    ) {

        LocalDateTime appointmentDateTime =
                LocalDateTime.of(
                        appointmentDate,
                        appointmentTime
                );

        if (appointmentDateTime.isBefore(
                LocalDateTime.now()
        )) {

            return "COMPLETED";

        } else {

            return "UPCOMING";
        }
    }
}