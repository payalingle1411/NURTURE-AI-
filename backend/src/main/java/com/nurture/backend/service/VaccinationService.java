package com.nurture.backend.service;

import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.Vaccination;
import com.nurture.backend.entity.PregnancyProfile;
import com.nurture.backend.repository.VaccinationRepository;
import com.nurture.backend.repository.LoginRepository;
import com.nurture.backend.repository.PregnancyProfileRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class VaccinationService {

    private final VaccinationRepository vaccinationRepository;
    private final LoginRepository loginRepository;
    private final PregnancyProfileRepository pregnancyProfileRepository;

    public VaccinationService(
            VaccinationRepository vaccinationRepository,
            LoginRepository loginRepository,
            PregnancyProfileRepository pregnancyProfileRepository) {

        this.vaccinationRepository = vaccinationRepository;
        this.loginRepository = loginRepository;
        this.pregnancyProfileRepository = pregnancyProfileRepository;
    }

    // =========================================================
    // INITIALIZE DEFAULT VACCINATIONS
    // =========================================================

    public void initializeVaccinations(Long userId) {

        Login user = loginRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found"));

        // -----------------------------------------------------
        // Td-1
        // -----------------------------------------------------

        boolean tdExists =
                vaccinationRepository
                        .existsByUser_IdAndVaccineName(
                                userId,
                                "Td"
                        );

        if (!tdExists) {

            Vaccination td1 = new Vaccination();

            td1.setUser(user);
            td1.setVaccineName("Td");
            td1.setDoseNumber("Td-1");

            LocalDate today = LocalDate.now();

            td1.setAvailableFrom(today);
            td1.setScheduledDate(today);

            td1.setStatus("DUE");
            td1.setSource("SYSTEM");

            td1.setNotes(
                    "Td vaccination as per pregnancy immunization schedule"
            );

            vaccinationRepository.save(td1);
        }

        // -----------------------------------------------------
        // Create pregnancy-specific vaccinations
        // -----------------------------------------------------

        initializePregnancyVaccinations(user);
    }


    // =========================================================
    // PREGNANCY VACCINATIONS
    // =========================================================

    private void initializePregnancyVaccinations(Login user) {

        Long userId = user.getId();

        // Get pregnancy profile
        PregnancyProfile profile =
                pregnancyProfileRepository
                        .findByUser_Id(userId)
                        .orElse(null);

        // If pregnancy profile does not exist,
        // don't create pregnancy-specific vaccines.
        if (profile == null) {
            return;
        }

        // -----------------------------------------------------
        // Calculate pregnancy week
        // -----------------------------------------------------

        /*
         * PregnancyProfile uses:
         *
         * lastMenstrualPeriod
         *
         * Therefore we use:
         *
         * getLastMenstrualPeriod()
         */
        LocalDate lmp = profile.getLastMenstrualPeriod();

        if (lmp == null) {
            return;
        }

        LocalDate today = LocalDate.now();

        long daysPregnant =
                java.time.temporal.ChronoUnit.DAYS
                        .between(lmp, today);

        int pregnancyWeek =
                (int) (daysPregnant / 7);

        // -----------------------------------------------------
        // FLU VACCINE
        // -----------------------------------------------------

        createFluVaccination(
                user,
                lmp,
                pregnancyWeek
        );

        /*
         * Anti-D vaccination has been temporarily removed here
         * because PregnancyProfile currently does not contain
         * a bloodGroup field.
         *
         * Once blood group is available in the correct entity,
         * Anti-D logic can be added back safely.
         */
    }


    // =========================================================
    // CREATE FLU VACCINE
    // =========================================================

    private void createFluVaccination(
            Login user,
            LocalDate lmp,
            int pregnancyWeek) {

        boolean exists =
                vaccinationRepository
                        .existsByUser_IdAndVaccineName(
                                user.getId(),
                                "Flu"
                        );

        if (exists) {
            return;
        }

        // 28 weeks from LMP
        LocalDate fluDate =
                lmp.plusWeeks(28);

        Vaccination flu =
                new Vaccination();

        flu.setUser(user);
        flu.setVaccineName("Flu");
        flu.setDoseNumber("Flu-1");

        flu.setAvailableFrom(fluDate);
        flu.setScheduledDate(fluDate);

        // If pregnancy has reached 28 weeks
        if (pregnancyWeek >= 28) {

            flu.setStatus("DUE");

        } else {

            flu.setStatus("LOCKED");
        }

        flu.setSource("SYSTEM");

        flu.setNotes(
                "Flu vaccination scheduled at 28 weeks " +
                        "according to the Nurture AI application schedule"
        );

        vaccinationRepository.save(flu);
    }


    // =========================================================
    // GET ALL VACCINATIONS
    // =========================================================

    public List<Vaccination> getVaccinations(Long userId) {

        // Make sure default vaccinations exist
        initializeVaccinations(userId);

        List<Vaccination> vaccinations =
                vaccinationRepository
                        .findByUser_IdOrderByAvailableFromAsc(userId);

        LocalDate today = LocalDate.now();

        for (Vaccination vaccination : vaccinations) {

            // Already completed
            if ("COMPLETED".equals(
                    vaccination.getStatus())) {

                continue;
            }

            LocalDate availableFrom =
                    vaccination.getAvailableFrom();

            LocalDate scheduledDate =
                    vaccination.getScheduledDate();

            // Future vaccination
            if (availableFrom != null &&
                    today.isBefore(availableFrom)) {

                vaccination.setStatus("LOCKED");
            }

            // Vaccination date passed
            else if (scheduledDate != null &&
                    today.isAfter(scheduledDate)) {

                vaccination.setStatus("OVERDUE");
            }

            // Vaccination available today
            else {

                vaccination.setStatus("DUE");
            }
        }

        return vaccinationRepository.saveAll(
                vaccinations
        );
    }


    // =========================================================
    // MARK VACCINATION AS TAKEN
    // =========================================================

    public Vaccination markTaken(Long vaccinationId) {

        Vaccination vaccination =
                vaccinationRepository.findById(vaccinationId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Vaccination not found"
                                ));

        LocalDate today = LocalDate.now();

        // Cannot take locked vaccination
        if (vaccination.getAvailableFrom() != null &&
                today.isBefore(
                        vaccination.getAvailableFrom())) {

            throw new RuntimeException(
                    "This vaccination is not available yet"
            );
        }

        // Mark completed
        vaccination.setTakenDate(today);
        vaccination.setStatus("COMPLETED");

        Vaccination saved =
                vaccinationRepository.save(
                        vaccination
                );

        // -----------------------------------------------------
        // If Td-1 is completed, create Td-2
        // -----------------------------------------------------

        if ("Td".equalsIgnoreCase(
                vaccination.getVaccineName())

                &&

                "Td-1".equalsIgnoreCase(
                        vaccination.getDoseNumber())) {

            createTd2(
                    vaccination.getUser(),
                    today
            );
        }

        return saved;
    }


    // =========================================================
    // CREATE Td-2
    // =========================================================

    private void createTd2(
            Login user,
            LocalDate td1Date) {

        List<Vaccination> existing =
                vaccinationRepository
                        .findByUser_IdOrderByAvailableFromAsc(
                                user.getId()
                        );

        // Avoid duplicate Td-2
        for (Vaccination vaccination : existing) {

            if ("Td-2".equalsIgnoreCase(
                    vaccination.getDoseNumber())) {

                return;
            }
        }

        // 28 days after Td-1
        LocalDate td2Date =
                td1Date.plusDays(28);

        Vaccination td2 =
                new Vaccination();

        td2.setUser(user);
        td2.setVaccineName("Td");
        td2.setDoseNumber("Td-2");

        td2.setAvailableFrom(td2Date);
        td2.setScheduledDate(td2Date);

        td2.setTakenDate(null);

        td2.setStatus("LOCKED");
        td2.setSource("SYSTEM");

        td2.setNotes(
                "Td-2 should be taken after the required " +
                        "interval from Td-1"
        );

        vaccinationRepository.save(td2);
    }


    // =========================================================
    // ADD CUSTOM VACCINATION
    // =========================================================

    public Vaccination addCustomVaccination(
            Long userId,
            Vaccination vaccination) {

        Login user =
                loginRepository.findById(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "User not found"
                                ));

        vaccination.setUser(user);
        vaccination.setSource("USER");

        LocalDate today =
                LocalDate.now();

        // If no available date is provided
        if (vaccination.getAvailableFrom() == null) {

            vaccination.setAvailableFrom(today);
        }

        // If no scheduled date is provided
        if (vaccination.getScheduledDate() == null) {

            vaccination.setScheduledDate(
                    vaccination.getAvailableFrom()
            );
        }

        // Set initial status
        if (today.isBefore(
                vaccination.getAvailableFrom())) {

            vaccination.setStatus("LOCKED");

        } else {

            vaccination.setStatus("DUE");
        }

        return vaccinationRepository.save(
                vaccination
        );
    }
}