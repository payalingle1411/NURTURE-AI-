package com.nurture.backend.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalTime;

@Entity
@Table(name = "medicine")
public class Medicine {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id", nullable = false)
    private Login user;

    @Column(name = "medicine_name", nullable = false)
    private String medicineName;

    @Column(name = "dosage")
    private String dosage;

    @Column(name = "frequency")
    private String frequency;

    @Column(name = "start_date", nullable = false)
    private LocalDate startDate;

    // Duration in days.
    // 0 or null = ongoing medicine.
    @Column(name = "duration_days")
    private Integer durationDays;

    // Automatically calculated by backend
    @Column(name = "end_date")
    private LocalDate endDate;

    // First reminder
    @Column(name = "reminder_time")
    private LocalTime reminderTime;

    // Second reminder
    @Column(name = "reminder_time_2")
    private LocalTime reminderTime2;

    // Third reminder
    @Column(name = "reminder_time_3")
    private LocalTime reminderTime3;

    @Column(name = "instructions", length = 500)
    private String instructions;

    @Column(nullable = false)
    private String status;

    public Medicine() {
        this.status = "ACTIVE";
    }

    // =====================================================
    // ID
    // =====================================================

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    // =====================================================
    // USER
    // =====================================================

    public Login getUser() {
        return user;
    }

    public void setUser(Login user) {
        this.user = user;
    }

    // =====================================================
    // MEDICINE NAME
    // =====================================================

    public String getMedicineName() {
        return medicineName;
    }

    public void setMedicineName(String medicineName) {
        this.medicineName = medicineName;
    }

    // =====================================================
    // DOSAGE
    // =====================================================

    public String getDosage() {
        return dosage;
    }

    public void setDosage(String dosage) {
        this.dosage = dosage;
    }

    // =====================================================
    // FREQUENCY
    // =====================================================

    public String getFrequency() {
        return frequency;
    }

    public void setFrequency(String frequency) {
        this.frequency = frequency;
    }

    // =====================================================
    // START DATE
    // =====================================================

    public LocalDate getStartDate() {
        return startDate;
    }

    public void setStartDate(LocalDate startDate) {
        this.startDate = startDate;
    }

    // =====================================================
    // DURATION
    // =====================================================

    public Integer getDurationDays() {
        return durationDays;
    }

    public void setDurationDays(Integer durationDays) {
        this.durationDays = durationDays;
    }

    // =====================================================
    // END DATE
    // =====================================================

    public LocalDate getEndDate() {
        return endDate;
    }

    public void setEndDate(LocalDate endDate) {
        this.endDate = endDate;
    }

    // =====================================================
    // REMINDER TIME 1
    // =====================================================

    public LocalTime getReminderTime() {
        return reminderTime;
    }

    public void setReminderTime(LocalTime reminderTime) {
        this.reminderTime = reminderTime;
    }

    // =====================================================
    // REMINDER TIME 2
    // =====================================================

    public LocalTime getReminderTime2() {
        return reminderTime2;
    }

    public void setReminderTime2(LocalTime reminderTime2) {
        this.reminderTime2 = reminderTime2;
    }

    // =====================================================
    // REMINDER TIME 3
    // =====================================================

    public LocalTime getReminderTime3() {
        return reminderTime3;
    }

    public void setReminderTime3(LocalTime reminderTime3) {
        this.reminderTime3 = reminderTime3;
    }

    // =====================================================
    // INSTRUCTIONS
    // =====================================================

    public String getInstructions() {
        return instructions;
    }

    public void setInstructions(String instructions) {
        this.instructions = instructions;
    }

    // =====================================================
    // STATUS
    // =====================================================

    public String getStatus() {
        return status;
    }

    public void setStatus(String status) {
        this.status = status;
    }
}