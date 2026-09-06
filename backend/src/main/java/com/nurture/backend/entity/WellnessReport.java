package com.yourpackage.entity;

import jakarta.persistence.*;
import java.time.LocalDate;

@Entity
@Table(name = "wellness_reports")
public class WellnessReport {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private Long userId;

    private String patientName;

    // Pregnancy
    private Integer pregnancyWeek;
    private String trimester;
    private Integer babyCount;
    private LocalDate dueDate;

    // Report period
    private LocalDate reportStartDate;
    private LocalDate reportEndDate;

    // Overall wellness
    private Double overallWellnessScore;
    private Double scoreChange;

    // Health
    private Double averageSteps;
    private Double averageActivityMinutes;
    private Double averageDistanceKm;
    private Double averageHealthScore;

    // Nutrition
    private Double nutritionScore;

    // Mood
    private Double moodScore;

    // Symptoms
    private String symptomStatus;

    // AI
    @Column(length = 2000)
    private String aiInsight;

    public WellnessReport() {
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getPatientName() {
        return patientName;
    }

    public void setPatientName(String patientName) {
        this.patientName = patientName;
    }

    public Integer getPregnancyWeek() {
        return pregnancyWeek;
    }

    public void setPregnancyWeek(Integer pregnancyWeek) {
        this.pregnancyWeek = pregnancyWeek;
    }

    public String getTrimester() {
        return trimester;
    }

    public void setTrimester(String trimester) {
        this.trimester = trimester;
    }

    public Integer getBabyCount() {
        return babyCount;
    }

    public void setBabyCount(Integer babyCount) {
        this.babyCount = babyCount;
    }

    public LocalDate getDueDate() {
        return dueDate;
    }

    public void setDueDate(LocalDate dueDate) {
        this.dueDate = dueDate;
    }

    public LocalDate getReportStartDate() {
        return reportStartDate;
    }

    public void setReportStartDate(LocalDate reportStartDate) {
        this.reportStartDate = reportStartDate;
    }

    public LocalDate getReportEndDate() {
        return reportEndDate;
    }

    public void setReportEndDate(LocalDate reportEndDate) {
        this.reportEndDate = reportEndDate;
    }

    public Double getOverallWellnessScore() {
        return overallWellnessScore;
    }

    public void setOverallWellnessScore(Double overallWellnessScore) {
        this.overallWellnessScore = overallWellnessScore;
    }

    public Double getScoreChange() {
        return scoreChange;
    }

    public void setScoreChange(Double scoreChange) {
        this.scoreChange = scoreChange;
    }

    public Double getAverageSteps() {
        return averageSteps;
    }

    public void setAverageSteps(Double averageSteps) {
        this.averageSteps = averageSteps;
    }

    public Double getAverageActivityMinutes() {
        return averageActivityMinutes;
    }

    public void setAverageActivityMinutes(Double averageActivityMinutes) {
        this.averageActivityMinutes = averageActivityMinutes;
    }

    public Double getAverageDistanceKm() {
        return averageDistanceKm;
    }

    public void setAverageDistanceKm(Double averageDistanceKm) {
        this.averageDistanceKm = averageDistanceKm;
    }

    public Double getAverageHealthScore() {
        return averageHealthScore;
    }

    public void setAverageHealthScore(Double averageHealthScore) {
        this.averageHealthScore = averageHealthScore;
    }

    public Double getNutritionScore() {
        return nutritionScore;
    }

    public void setNutritionScore(Double nutritionScore) {
        this.nutritionScore = nutritionScore;
    }

    public Double getMoodScore() {
        return moodScore;
    }

    public void setMoodScore(Double moodScore) {
        this.moodScore = moodScore;
    }

    public String getSymptomStatus() {
        return symptomStatus;
    }

    public void setSymptomStatus(String symptomStatus) {
        this.symptomStatus = symptomStatus;
    }

    public String getAiInsight() {
        return aiInsight;
    }

    public void setAiInsight(String aiInsight) {
        this.aiInsight = aiInsight;
    }
}