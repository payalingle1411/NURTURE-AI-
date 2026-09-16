package com.nurture.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Table(name = "medical_history")
@Data
public class MedicalHistory {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "history_id")
    private Long historyId;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(
            name = "user_id",
            referencedColumnName = "user_id",
            nullable = false,
            unique = true
    )
    private Login user;

    @Column(name = "diabetes")
    private Boolean diabetes = false;

    @Column(name = "hypertension")
    private Boolean hypertension = false;

    @Column(name = "thyroid")
    private Boolean thyroid = false;

    @Column(name = "pcos")
    private Boolean pcos = false;

    @Column(name = "asthma")
    private Boolean asthma = false;

    @Column(name = "heart_disease")
    private Boolean heartDisease = false;

    @Column(name = "other_disease", columnDefinition = "TEXT")
    private String otherDisease;
}