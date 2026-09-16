package com.nurture.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.time.LocalTime;

@Entity
@Table(name = "medicine_log")
public class MedicineLog {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // =====================================================
    // MEDICINE
    // =====================================================

    @ManyToOne(fetch = FetchType.EAGER)
    @JoinColumn(name = "medicine_id", nullable = false)
    private Medicine medicine;

    // =====================================================
    // SCHEDULED DATE
    // =====================================================

    @Column(name = "scheduled_date", nullable = false)
    private LocalDate scheduledDate;

    // =====================================================
    // SCHEDULED TIME
    // =====================================================

    @Column(name = "scheduled_time")
    private LocalTime scheduledTime;

    // =====================================================
    // TAKEN AT
    // =====================================================

    @Column(name = "taken_at")
    private LocalDateTime takenAt;

    // =====================================================
    // STATUS
    // =====================================================

    @Column(nullable = false)
    private String status;

    // =====================================================
    // CONSTRUCTOR
    // =====================================================

    public MedicineLog() {
        this.status = "PENDING";
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
    // MEDICINE
    // =====================================================

    public Medicine getMedicine() {
        return medicine;
    }

    public void setMedicine(Medicine medicine) {
        this.medicine = medicine;
    }

    // =====================================================
    // SCHEDULED DATE
    // =====================================================

    public LocalDate getScheduledDate() {
        return scheduledDate;
    }

    public void setScheduledDate(LocalDate scheduledDate) {
        this.scheduledDate = scheduledDate;
    }

    // =====================================================
    // SCHEDULED TIME
    // =====================================================

    public LocalTime getScheduledTime() {
        return scheduledTime;
    }

    public void setScheduledTime(LocalTime scheduledTime) {
        this.scheduledTime = scheduledTime;
    }

    // =====================================================
    // TAKEN AT
    // =====================================================

    public LocalDateTime getTakenAt() {
        return takenAt;
    }

    public void setTakenAt(LocalDateTime takenAt) {
        this.takenAt = takenAt;
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