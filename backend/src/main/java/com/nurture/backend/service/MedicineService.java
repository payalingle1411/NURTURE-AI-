package com.nurture.backend.service;

import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.Medicine;
import com.nurture.backend.entity.MedicineLog;
import com.nurture.backend.repository.LoginRepository;
import com.nurture.backend.repository.MedicineLogRepository;
import com.nurture.backend.repository.MedicineRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;
import java.util.ArrayList;
import java.util.Comparator;
import java.util.List;

@Service
public class MedicineService {

    private final MedicineRepository medicineRepository;
    private final MedicineLogRepository medicineLogRepository;
    private final LoginRepository loginRepository;

    public MedicineService(
            MedicineRepository medicineRepository,
            MedicineLogRepository medicineLogRepository,
            LoginRepository loginRepository) {

        this.medicineRepository = medicineRepository;
        this.medicineLogRepository = medicineLogRepository;
        this.loginRepository = loginRepository;
    }

    // =====================================================
    // ADD MEDICINE
    // =====================================================

    public Medicine addMedicine(Long userId, Medicine medicine) {

        Login user = loginRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        medicine.setUser(user);

        // New medicine is active by default
        medicine.setStatus("ACTIVE");

        // -------------------------------------------------
        // CALCULATE END DATE FROM DURATION
        // -------------------------------------------------
        //
        // Example:
        // Start date = 2026-09-13
        // Duration = 7 days
        //
        // End date = 2026-09-19
        //
        // Formula:
        // startDate + durationDays - 1
        //
        // If duration is 0 or null:
        // Medicine is considered ongoing.
        //

        if (medicine.getStartDate() == null) {
            throw new RuntimeException(
                    "Start date is required"
            );
        }

        if (medicine.getDurationDays() != null
                && medicine.getDurationDays() > 0) {

            LocalDate endDate =
                    medicine.getStartDate()
                            .plusDays(
                                    medicine.getDurationDays() - 1
                            );

            medicine.setEndDate(endDate);

        } else {

            // Ongoing medicine
            medicine.setEndDate(null);
        }

        return medicineRepository.save(medicine);
    }

    // =====================================================
    // GET ALL MEDICINES
    // =====================================================

    public List<Medicine> getMedicines(Long userId) {

        return medicineRepository.findByUser_Id(userId);
    }

    // =====================================================
    // GET TODAY'S MEDICINES
    // =====================================================

    public List<MedicineLog> getTodayMedicines(Long userId) {

        LocalDate today = LocalDate.now();

        List<Medicine> medicines =
                medicineRepository.findByUser_Id(userId);

        List<MedicineLog> logs = new ArrayList<>();

        for (Medicine medicine : medicines) {

            // -------------------------------------------------
            // ONLY ACTIVE MEDICINES
            // -------------------------------------------------

            if (!"ACTIVE".equalsIgnoreCase(
                    medicine.getStatus())) {

                continue;
            }

            // -------------------------------------------------
            // START DATE CHECK
            // -------------------------------------------------

            if (medicine.getStartDate() != null
                    && today.isBefore(
                    medicine.getStartDate())) {

                continue;
            }

            // -------------------------------------------------
            // END DATE CHECK
            // -------------------------------------------------

            if (medicine.getEndDate() != null
                    && today.isAfter(
                    medicine.getEndDate())) {

                // Automatically mark expired medicine
                medicine.setStatus("COMPLETED");

                medicineRepository.save(medicine);

                continue;
            }

            // -------------------------------------------------
            // GET REMINDER TIMES
            // -------------------------------------------------

            List<LocalTime> reminderTimes =
                    getReminderTimes(medicine);

            // -------------------------------------------------
            // CREATE ONE LOG FOR EACH REMINDER
            // -------------------------------------------------

            for (LocalTime reminderTime : reminderTimes) {

                MedicineLog log =
                        medicineLogRepository
                                .findByMedicine_IdAndScheduledDateAndScheduledTime(
                                        medicine.getId(),
                                        today,
                                        reminderTime
                                )
                                .orElse(null);

                // -------------------------------------------------
                // CREATE LOG ONLY IF IT DOES NOT EXIST
                // -------------------------------------------------

                if (log == null) {

                    log = new MedicineLog();

                    log.setMedicine(medicine);

                    log.setScheduledDate(today);

                    log.setScheduledTime(reminderTime);

                    log.setStatus("PENDING");

                    log = medicineLogRepository.save(log);
                }

                logs.add(log);
            }
        }

        // -------------------------------------------------
        // SORT BY REMINDER TIME
        // -------------------------------------------------

        logs.sort(
                Comparator.comparing(
                        MedicineLog::getScheduledTime,
                        Comparator.nullsLast(
                                Comparator.naturalOrder()
                        )
                )
        );

        return logs;
    }

    // =====================================================
    // GET REMINDER TIMES
    // =====================================================

    private List<LocalTime> getReminderTimes(
            Medicine medicine) {

        List<LocalTime> times = new ArrayList<>();

        String frequency =
                medicine.getFrequency();

        if (frequency == null
                || frequency.trim().isEmpty()) {

            frequency = "Daily";
        }

        // -------------------------------------------------
        // DAILY
        // -------------------------------------------------

        if (frequency.equalsIgnoreCase("Daily")) {

            if (medicine.getReminderTime() != null) {

                times.add(
                        medicine.getReminderTime()
                );
            }
        }

        // -------------------------------------------------
        // TWICE DAILY
        // -------------------------------------------------

        else if (frequency.equalsIgnoreCase(
                "Twice Daily")) {

            if (medicine.getReminderTime() != null) {

                times.add(
                        medicine.getReminderTime()
                );
            }

            if (medicine.getReminderTime2() != null) {

                times.add(
                        medicine.getReminderTime2()
                );
            }
        }

        // -------------------------------------------------
        // THREE TIMES DAILY
        // -------------------------------------------------

        else if (frequency.equalsIgnoreCase(
                "Three Times Daily")) {

            if (medicine.getReminderTime() != null) {

                times.add(
                        medicine.getReminderTime()
                );
            }

            if (medicine.getReminderTime2() != null) {

                times.add(
                        medicine.getReminderTime2()
                );
            }

            if (medicine.getReminderTime3() != null) {

                times.add(
                        medicine.getReminderTime3()
                );
            }
        }

        // -------------------------------------------------
        // WEEKLY
        // -------------------------------------------------

        else if (frequency.equalsIgnoreCase("Weekly")) {

            if (medicine.getReminderTime() != null) {

                times.add(
                        medicine.getReminderTime()
                );
            }
        }

        // -------------------------------------------------
        // AS PRESCRIBED
        // -------------------------------------------------

        else if (frequency.equalsIgnoreCase(
                "As Prescribed")) {

            if (medicine.getReminderTime() != null) {

                times.add(
                        medicine.getReminderTime()
                );
            }
        }

        return times;
    }

    // =====================================================
    // MARK MEDICINE AS TAKEN
    // =====================================================

    public MedicineLog markMedicineTaken(Long logId) {

        MedicineLog log =
                medicineLogRepository.findById(logId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Medicine log not found"
                                ));

        // Already taken
        if ("TAKEN".equalsIgnoreCase(
                log.getStatus())) {

            return log;
        }

        log.setStatus("TAKEN");

        log.setTakenAt(
                LocalDateTime.now()
        );

        return medicineLogRepository.save(log);
    }

    // =====================================================
    // STOP MEDICINE
    // =====================================================

    public Medicine stopMedicine(Long medicineId) {

        Medicine medicine =
                medicineRepository.findById(medicineId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Medicine not found"
                                ));

        // Doctor has asked the user to stop it
        medicine.setStatus("STOPPED");

        return medicineRepository.save(medicine);
    }

    // =====================================================
    // DELETE MEDICINE
    // =====================================================

    public void deleteMedicine(Long medicineId) {

        Medicine medicine =
                medicineRepository.findById(medicineId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Medicine not found"
                                ));

        medicineRepository.delete(medicine);
    }
}