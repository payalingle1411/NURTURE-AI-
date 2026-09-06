package com.nurture.backend.service;

import com.nurture.backend.dto.ReportResponse;
import com.nurture.backend.entity.DailyHealthTracking;
import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.PregnancyProfile;
import com.nurture.backend.repository.DailyHealthTrackingRepository;
import com.nurture.backend.repository.PregnancyProfileRepository;
import com.nurture.backend.repository.LoginRepository;

import org.springframework.stereotype.Service;

import java.time.LocalDate;
import java.util.List;

@Service
public class ReportService {

    private final DailyHealthTrackingRepository healthRepository;
    private final PregnancyProfileRepository pregnancyRepository;
    private final LoginRepository loginRepository;

    public ReportService(
            DailyHealthTrackingRepository healthRepository,
            PregnancyProfileRepository pregnancyRepository,
            LoginRepository loginRepository
    ) {
        this.healthRepository = healthRepository;
        this.pregnancyRepository = pregnancyRepository;
        this.loginRepository = loginRepository;
    }

    public ReportResponse getReport(Long userId) {

        // ==========================================
        // 1. FIND USER
        // ==========================================

        Login user = loginRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException("User not found with ID: " + userId)
                );

        // ==========================================
        // 2. FIND PREGNANCY PROFILE
        // ==========================================

        PregnancyProfile pregnancyProfile =
                pregnancyRepository.findByUser_Id(userId)
                        .orElse(null);

        // ==========================================
        // 3. GET LAST 7 HEALTH RECORDS
        // ==========================================

        List<DailyHealthTracking> currentRecords =
                healthRepository.findTop7ByUser_IdOrderByTrackingDateDesc(userId);

        // ==========================================
        // 4. CREATE RESPONSE
        // ==========================================

        ReportResponse response = new ReportResponse();

        // ==========================================
        // PATIENT
        // ==========================================

        ReportResponse.Patient patient =
                new ReportResponse.Patient();

        patient.setId(user.getId());
        patient.setFullName(user.getFullName());
        patient.setEmail(user.getEmail());
        patient.setPhoneNumber(user.getPhoneNumber());
        patient.setRole(user.getRole());

        response.setPatient(patient);

        // ==========================================
        // PREGNANCY
        // ==========================================

        ReportResponse.Pregnancy pregnancy =
                new ReportResponse.Pregnancy();

        if (pregnancyProfile != null) {

            pregnancy.setPregnancyWeek(
                    pregnancyProfile.getPregnancyWeek()
            );

            pregnancy.setTrimester(
                    pregnancyProfile.getTrimester()
            );

            pregnancy.setBabyCount(
                    pregnancyProfile.getBabyCount()
            );

            pregnancy.setDueDate(
                    pregnancyProfile.getDueDate()
            );
        }

        response.setPregnancy(pregnancy);

        // ==========================================
        // HEALTH
        // ==========================================

        ReportResponse.Health health =
                calculateHealth(currentRecords);

        response.setHealth(health);

        // ==========================================
        // NUTRITION
        // ==========================================

        ReportResponse.Nutrition nutrition =
                calculateNutrition(currentRecords);

        response.setNutrition(nutrition);

        // ==========================================
        // MOOD
        // ==========================================

        ReportResponse.Mood mood =
                calculateMood(currentRecords);

        response.setMood(mood);

        // ==========================================
        // SYMPTOMS
        // ==========================================

        ReportResponse.Symptoms symptoms =
                calculateSymptoms(currentRecords);

        response.setSymptoms(symptoms);

        // ==========================================
        // REPORT PERIOD
        // ==========================================

        ReportResponse.ReportPeriod period =
                new ReportResponse.ReportPeriod();

        LocalDate endDate = LocalDate.now();
        LocalDate startDate = endDate.minusDays(6);

        period.setStartDate(startDate.toString());
        period.setEndDate(endDate.toString());

        response.setReportPeriod(period);

        // ==========================================
        // OVERALL SCORE
        // ==========================================

        Double overallScore = calculateOverallScore(
                health,
                nutrition,
                mood,
                symptoms
        );

        response.setOverallWellnessScore(overallScore);

        // ==========================================
        // SCORE CHANGE
        // ==========================================

        response.setScoreChange(0.0);

        // ==========================================
        // AI INSIGHT
        // ==========================================

        ReportResponse.AiInsight aiInsight =
                generateInsight(
                        health,
                        nutrition,
                        mood,
                        symptoms,
                        overallScore
                );

        response.setAiInsight(aiInsight);

        return response;
    }

    // =========================================================
    // HEALTH CALCULATION
    // =========================================================

    private ReportResponse.Health calculateHealth(
            List<DailyHealthTracking> records
    ) {

        ReportResponse.Health health =
                new ReportResponse.Health();

        if (records == null || records.isEmpty()) {
            return health;
        }

        double steps = records.stream()
                .filter(r -> r.getSteps() != null)
                .mapToDouble(DailyHealthTracking::getSteps)
                .average()
                .orElse(0);

        double activity = records.stream()
                .filter(r -> r.getActivityMinutes() != null)
                .mapToDouble(DailyHealthTracking::getActivityMinutes)
                .average()
                .orElse(0);

        double distance = records.stream()
                .filter(r -> r.getDistanceKm() != null)
                .mapToDouble(DailyHealthTracking::getDistanceKm)
                .average()
                .orElse(0);

        double healthScore = records.stream()
                .filter(r -> r.getHealthScore() != null)
                .mapToDouble(DailyHealthTracking::getHealthScore)
                .average()
                .orElse(0);

        health.setAverageSteps(round(steps));
        health.setAverageActivityMinutes(round(activity));
        health.setAverageDistanceKm(round(distance));
        health.setAverageHealthScore(round(healthScore));

        return health;
    }

    // =========================================================
    // NUTRITION
    // =========================================================

    private ReportResponse.Nutrition calculateNutrition(
            List<DailyHealthTracking> records
    ) {

        ReportResponse.Nutrition nutrition =
                new ReportResponse.Nutrition();

        if (records == null || records.isEmpty()) {
            return nutrition;
        }

        double total = 0;
        int count = 0;

        for (DailyHealthTracking record : records) {

            String quality = record.getNutritionQuality();

            if (quality == null || quality.isBlank()) {
                continue;
            }

            total += nutritionScore(quality);
            count++;
        }

        if (count == 0) {
            return nutrition;
        }

        double score = total / count;

        nutrition.setScore(round(score));
        nutrition.setStatus(getScoreStatus(score));

        return nutrition;
    }

    private double nutritionScore(String quality) {

        String value = quality.trim().toLowerCase();

        if (value.contains("excellent")) {
            return 95;
        }

        if (value.contains("good")) {
            return 85;
        }

        if (value.contains("average")) {
            return 70;
        }

        if (value.contains("poor")) {
            return 45;
        }

        return 60;
    }

    // =========================================================
    // MOOD
    // =========================================================

    private ReportResponse.Mood calculateMood(
            List<DailyHealthTracking> records
    ) {

        ReportResponse.Mood mood =
                new ReportResponse.Mood();

        if (records == null || records.isEmpty()) {
            return mood;
        }

        double total = 0;
        int count = 0;

        for (DailyHealthTracking record : records) {

            String value = record.getMood();

            if (value == null || value.isBlank()) {
                continue;
            }

            total += moodScore(value);
            count++;
        }

        if (count == 0) {
            return mood;
        }

        double score = total / count;

        mood.setScore(round(score));
        mood.setStatus(getScoreStatus(score));

        return mood;
    }

    private double moodScore(String mood) {

        String value = mood.trim().toLowerCase();

        if (value.contains("happy") ||
                value.contains("excellent") ||
                value.contains("great")) {
            return 95;
        }

        if (value.contains("good") ||
                value.contains("calm")) {
            return 85;
        }

        if (value.contains("okay") ||
                value.contains("neutral") ||
                value.contains("normal")) {
            return 70;
        }

        if (value.contains("sad") ||
                value.contains("low")) {
            return 50;
        }

        if (value.contains("anxious") ||
                value.contains("bad") ||
                value.contains("stress")) {
            return 40;
        }

        return 60;
    }

    // =========================================================
    // SYMPTOMS
    // =========================================================

    private ReportResponse.Symptoms calculateSymptoms(
            List<DailyHealthTracking> records
    ) {

        ReportResponse.Symptoms symptoms =
                new ReportResponse.Symptoms();

        if (records == null || records.isEmpty()) {
            return symptoms;
        }

        double totalSeverity = 0;
        int severityCount = 0;
        int symptomDays = 0;

        for (DailyHealthTracking record : records) {

            String symptom = record.getSymptoms();

            if (symptom != null &&
                    !symptom.isBlank()) {

                symptomDays++;
            }

            if (record.getSymptomSeverity() != null) {

                totalSeverity += record.getSymptomSeverity();
                severityCount++;
            }
        }

        double averageSeverity = severityCount == 0
                ? 0
                : totalSeverity / severityCount;

        symptoms.setAverageSeverity(
                round(averageSeverity)
        );

        symptoms.setDaysWithSymptoms(symptomDays);

        if (symptomDays == 0) {

            symptoms.setStatus("Stable");
            symptoms.setTrend("No significant symptoms");

        } else if (averageSeverity <= 3) {

            symptoms.setStatus("Mild");
            symptoms.setTrend("Low symptom severity");

        } else if (averageSeverity <= 6) {

            symptoms.setStatus("Monitor");
            symptoms.setTrend("Moderate symptom severity");

        } else {

            symptoms.setStatus("Needs Attention");
            symptoms.setTrend("Higher symptom severity");
        }

        return symptoms;
    }

    // =========================================================
    // OVERALL SCORE
    // =========================================================

    private Double calculateOverallScore(
            ReportResponse.Health health,
            ReportResponse.Nutrition nutrition,
            ReportResponse.Mood mood,
            ReportResponse.Symptoms symptoms
    ) {

        double total = 0;
        int count = 0;

        if (health.getAverageHealthScore() != null) {

            total += health.getAverageHealthScore();
            count++;
        }

        if (nutrition.getScore() != null) {

            total += nutrition.getScore();
            count++;
        }

        if (mood.getScore() != null) {

            total += mood.getScore();
            count++;
        }

        if (symptoms.getAverageSeverity() != null) {

            double symptomScore =
                    Math.max(
                            0,
                            100 - (symptoms.getAverageSeverity() * 10)
                    );

            total += symptomScore;
            count++;
        }

        if (count == 0) {
            return null;
        }

        return round(total / count);
    }

    // =========================================================
    // AI INSIGHT
    // =========================================================

    private ReportResponse.AiInsight generateInsight(
            ReportResponse.Health health,
            ReportResponse.Nutrition nutrition,
            ReportResponse.Mood mood,
            ReportResponse.Symptoms symptoms,
            Double overallScore
    ) {

        ReportResponse.AiInsight insight =
                new ReportResponse.AiInsight();

        if (overallScore == null) {

            insight.setMessage(
                    "Start tracking your daily health activities to generate a personalized wellness report."
            );

            insight.setSummary(
                    "No sufficient health data is available yet."
            );

            insight.setRecommendation(
                    "Track your steps, activity, mood, symptoms and nutrition regularly."
            );

            return insight;
        }

        if (overallScore >= 85) {

            insight.setMessage(
                    "Your wellness indicators look strong this week."
            );

            insight.setSummary(
                    "Your recent health, nutrition and mood tracking shows positive overall progress."
            );

            insight.setRecommendation(
                    "Continue maintaining your healthy daily routines."
            );

        } else if (overallScore >= 70) {

            insight.setMessage(
                    "Your wellness indicators are generally good."
            );

            insight.setSummary(
                    "There is a good foundation, with some areas that can be improved through consistent tracking and healthy routines."
            );

            insight.setRecommendation(
                    "Focus on regular activity, balanced nutrition and maintaining a positive daily routine."
            );

        } else {

            insight.setMessage(
                    "Your wellness score suggests that some areas need more attention."
            );

            insight.setSummary(
                    "Review your recent activity, nutrition, mood and symptom records."
            );

            insight.setRecommendation(
                    "Continue tracking your health information and discuss persistent concerns with your healthcare professional."
            );
        }

        return insight;
    }

    // =========================================================
    // SCORE STATUS
    // =========================================================

    private String getScoreStatus(double score) {

        if (score >= 85) {
            return "Excellent";
        }

        if (score >= 70) {
            return "Good";
        }

        if (score >= 50) {
            return "Average";
        }

        return "Needs Improvement";
    }

    // =========================================================
    // ROUND
    // =========================================================

    private double round(double value) {

        return Math.round(value * 10.0) / 10.0;
    }
}