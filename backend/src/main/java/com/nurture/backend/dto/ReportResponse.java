package com.nurture.backend.dto;

import lombok.Data;

@Data
public class ReportResponse {

    private Patient patient;
    private Pregnancy pregnancy;
    private Health health;
    private Nutrition nutrition;
    private Mood mood;
    private Symptoms symptoms;
    private AiInsight aiInsight;
    private ReportPeriod reportPeriod;

    private Double overallWellnessScore;
    private Double scoreChange;

    @Data
    public static class Patient {
        private Long id;
        private String fullName;
        private String email;
        private String phoneNumber;
        private String role;
    }

    @Data
    public static class Pregnancy {
        private Integer pregnancyWeek;
        private String trimester;
        private Integer babyCount;
        private String dueDate;
    }

    @Data
    public static class Health {
        private Double averageSteps;
        private Double averageActivityMinutes;
        private Double averageDistanceKm;
        private Double averageHealthScore;
    }

    @Data
    public static class Nutrition {
        private Double score;
        private String status;
    }

    @Data
    public static class Mood {
        private Double score;
        private String status;
    }

    @Data
    public static class Symptoms {
        private String status;
        private String trend;
        private Double averageSeverity;
        private Integer daysWithSymptoms;
    }

    @Data
    public static class AiInsight {
        private String message;
        private String summary;
        private String recommendation;
    }

    @Data
    public static class ReportPeriod {
        private String startDate;
        private String endDate;
    }
}