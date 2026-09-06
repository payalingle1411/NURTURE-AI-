package com.nurture.backend.dto;

import lombok.Data;

import java.time.LocalDate;

@Data
public class HealthTrackingRequest {

    private LocalDate trackingDate;

    private Integer steps;

    private Integer activityMinutes;

    private Double distanceKm;

    private Double caloriesBurned;

    private Double sleepHours;

    private String sleepQuality;

    private Integer waterGlasses;

    private String mood;

    private String symptoms;

    private Integer symptomSeverity;

    private String nutritionQuality;

    private Boolean medicationTaken;

    private Integer healthScore;

    private String scoreStatus;

    private String notes;
}