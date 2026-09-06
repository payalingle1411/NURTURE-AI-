package com.nurture.backend.service;

import com.nurture.backend.dto.HealthTrackingRequest;
import com.nurture.backend.dto.HealthTrackingResponse;
import com.nurture.backend.entity.DailyHealthTracking;
import com.nurture.backend.entity.Login;
import com.nurture.backend.repository.DailyHealthTrackingRepository;
import com.nurture.backend.repository.LoginRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDate;
import java.util.List;

@Service
@RequiredArgsConstructor
public class DailyHealthTrackingService {

    private final DailyHealthTrackingRepository healthRepository;
    private final LoginRepository loginRepository;


    // ============================================================
    // CREATE OR UPDATE TODAY'S HEALTH DATA
    // ============================================================

    @Transactional
    public HealthTrackingResponse saveHealthData(
            Long userId,
            HealthTrackingRequest request
    ) {

        Login user = loginRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with ID: " + userId)
                );

        LocalDate trackingDate =
                request.getTrackingDate() != null
                        ? request.getTrackingDate()
                        : LocalDate.now();

        /*
         * Because we have:
         *
         * UNIQUE(user_id, tracking_date)
         *
         * we first check whether today's record already exists.
         *
         * If it exists → update it.
         * If not → create a new record.
         */

        DailyHealthTracking health =
                healthRepository
                        .findByUser_IdAndTrackingDate(userId, trackingDate)
                        .orElseGet(DailyHealthTracking::new);

        health.setUser(user);
        health.setTrackingDate(trackingDate);

        health.setSteps(
                request.getSteps() != null
                        ? request.getSteps()
                        : 0
        );

        health.setActivityMinutes(
                request.getActivityMinutes() != null
                        ? request.getActivityMinutes()
                        : 0
        );

        health.setDistanceKm(
                request.getDistanceKm() != null
                        ? request.getDistanceKm()
                        : 0.0
        );

        health.setCaloriesBurned(
                request.getCaloriesBurned() != null
                        ? request.getCaloriesBurned()
                        : 0.0
        );

        health.setSleepHours(request.getSleepHours());
        health.setSleepQuality(request.getSleepQuality());

        health.setWaterGlasses(
                request.getWaterGlasses() != null
                        ? request.getWaterGlasses()
                        : 0
        );

        health.setMood(request.getMood());

        health.setSymptoms(request.getSymptoms());
        health.setSymptomSeverity(request.getSymptomSeverity());

        health.setNutritionQuality(
                request.getNutritionQuality()
        );

        health.setMedicationTaken(
                request.getMedicationTaken() != null
                        ? request.getMedicationTaken()
                        : false
        );

        health.setHealthScore(request.getHealthScore());
        health.setScoreStatus(request.getScoreStatus());

        health.setNotes(request.getNotes());

        DailyHealthTracking saved =
                healthRepository.save(health);

        return convertToResponse(saved);
    }


    // ============================================================
    // GET TODAY'S DATA
    // ============================================================

    @Transactional(readOnly = true)
    public HealthTrackingResponse getToday(Long userId) {

        return healthRepository
                .findByUser_IdAndTrackingDate(
                        userId,
                        LocalDate.now()
                )
                .map(this::convertToResponse)
                .orElse(null);
    }


    // ============================================================
    // GET LAST 7 DAYS
    // ============================================================

    @Transactional(readOnly = true)
    public List<HealthTrackingResponse> getLast7Days(Long userId) {

        return healthRepository
                .findTop7ByUser_IdOrderByTrackingDateDesc(userId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // ============================================================
    // GET ALL AVAILABLE HISTORY
    // ============================================================

    @Transactional(readOnly = true)
    public List<HealthTrackingResponse> getHistory(Long userId) {

        return healthRepository
                .findByUser_IdOrderByTrackingDateDesc(userId)
                .stream()
                .map(this::convertToResponse)
                .toList();
    }


    // ============================================================
    // AUTOMATIC 7-DAY CLEANUP
    // ============================================================

    @Scheduled(cron = "0 0 2 * * *")
    @Transactional
    public void deleteOldHealthData() {

        LocalDate cutoffDate =
                LocalDate.now().minusDays(6);

        healthRepository.deleteByTrackingDateBefore(
                cutoffDate
        );

        System.out.println(
                "Old health tracking data cleaned before: "
                        + cutoffDate
        );
    }


    // ============================================================
    // ENTITY → RESPONSE
    // ============================================================

    private HealthTrackingResponse convertToResponse(
            DailyHealthTracking health
    ) {

        HealthTrackingResponse response =
                new HealthTrackingResponse();

        response.setId(health.getId());

        response.setUserId(
                health.getUser().getId()
        );

        response.setTrackingDate(
                health.getTrackingDate()
        );

        response.setSteps(health.getSteps());
        response.setActivityMinutes(
                health.getActivityMinutes()
        );

        response.setDistanceKm(
                health.getDistanceKm()
        );

        response.setCaloriesBurned(
                health.getCaloriesBurned()
        );

        response.setSleepHours(
                health.getSleepHours()
        );

        response.setSleepQuality(
                health.getSleepQuality()
        );

        response.setWaterGlasses(
                health.getWaterGlasses()
        );

        response.setMood(
                health.getMood()
        );

        response.setSymptoms(
                health.getSymptoms()
        );

        response.setSymptomSeverity(
                health.getSymptomSeverity()
        );

        response.setNutritionQuality(
                health.getNutritionQuality()
        );

        response.setMedicationTaken(
                health.getMedicationTaken()
        );

        response.setHealthScore(
                health.getHealthScore()
        );

        response.setScoreStatus(
                health.getScoreStatus()
        );

        response.setNotes(
                health.getNotes()
        );

        response.setCreatedAt(
                health.getCreatedAt()
        );

        response.setUpdatedAt(
                health.getUpdatedAt()
        );

        return response;
    }
}