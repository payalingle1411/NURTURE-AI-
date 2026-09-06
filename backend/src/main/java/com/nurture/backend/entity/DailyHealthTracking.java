package com.nurture.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

import java.time.LocalDate;
import java.time.LocalDateTime;

@Entity
@Table(
        name = "daily_health_tracking",
        uniqueConstraints = {
                @UniqueConstraint(
                        name = "uk_health_tracking_user_date",
                        columnNames = {"user_id", "tracking_date"}
                )
        }
)
@Data
public class DailyHealthTracking {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // Existing Login/User table
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            nullable = false,
            foreignKey = @ForeignKey(name = "fk_health_tracking_user")
    )
    private Login user;

    @Column(name = "tracking_date", nullable = false)
    private LocalDate trackingDate;

    // Physical activity
    @Column(name = "steps")
    private Integer steps = 0;

    @Column(name = "activity_minutes")
    private Integer activityMinutes = 0;

    @Column(name = "distance_km")
    private Double distanceKm = 0.0;

    @Column(name = "calories_burned")
    private Double caloriesBurned = 0.0;

    // Sleep
    @Column(name = "sleep_hours")
    private Double sleepHours;

    @Column(name = "sleep_quality")
    private String sleepQuality;

    // Hydration
    @Column(name = "water_glasses")
    private Integer waterGlasses = 0;

    // Mood
    @Column(name = "mood")
    private String mood;

    // Symptoms
    @Column(name = "symptoms", length = 1000)
    private String symptoms;

    @Column(name = "symptom_severity")
    private Integer symptomSeverity;

    // Nutrition
    @Column(name = "nutrition_quality")
    private String nutritionQuality;

    // Medication
    @Column(name = "medication_taken")
    private Boolean medicationTaken = false;

    // Score
    @Column(name = "health_score")
    private Integer healthScore;

    @Column(name = "score_status")
    private String scoreStatus;

    // Notes
    @Column(name = "notes", length = 2000)
    private String notes;

    // Timestamps
    @Column(name = "created_at")
    private LocalDateTime createdAt;

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @PrePersist
    protected void onCreate() {
        LocalDateTime now = LocalDateTime.now();

        createdAt = now;
        updatedAt = now;

        if (steps == null) steps = 0;
        if (activityMinutes == null) activityMinutes = 0;
        if (distanceKm == null) distanceKm = 0.0;
        if (caloriesBurned == null) caloriesBurned = 0.0;
        if (waterGlasses == null) waterGlasses = 0;
        if (medicationTaken == null) medicationTaken = false;
    }

    @PreUpdate
    protected void onUpdate() {
        updatedAt = LocalDateTime.now();
    }
}