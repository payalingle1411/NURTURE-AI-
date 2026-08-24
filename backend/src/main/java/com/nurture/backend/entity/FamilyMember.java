package com.nurture.backend.entity;

import jakarta.persistence.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "family_members")
public class FamilyMember {

    // =========================================================
    // FAMILY MEMBER ID
    // =========================================================

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "family_member_id")
    private Long familyMemberId;


    // =========================================================
    // FAMILY MEMBER USER ID
    // =========================================================

    @Column(name = "user_id", nullable = false)
    private Long userId;


    // =========================================================
    // MOTHER / PATIENT USER ID
    // =========================================================

    @Column(name = "patient_user_id", nullable = false)
    private Long patientUserId;


    // =========================================================
    // MEMBER NAME
    // =========================================================

    @Column(name = "member_name", nullable = false, length = 100)
    private String memberName;


    // =========================================================
    // RELATIONSHIP
    // =========================================================

    @Column(name = "relationship", length = 50)
    private String relationship;


    // =========================================================
    // AGE
    // =========================================================

    @Column(name = "age")
    private Integer age;


    // =========================================================
    // PHONE NUMBER
    // =========================================================

    @Column(name = "phone_number", length = 15)
    private String phoneNumber;


    // =========================================================
    // CREATED AT
    // =========================================================

    @Column(
            name = "created_at",
            insertable = false,
            updatable = false
    )
    private LocalDateTime createdAt;


    // =========================================================
    // DEFAULT CONSTRUCTOR
    // =========================================================

    public FamilyMember() {
    }


    // =========================================================
    // GETTERS AND SETTERS
    // =========================================================

    public Long getFamilyMemberId() {
        return familyMemberId;
    }

    public void setFamilyMemberId(Long familyMemberId) {
        this.familyMemberId = familyMemberId;
    }


    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }


    public Long getPatientUserId() {
        return patientUserId;
    }

    public void setPatientUserId(Long patientUserId) {
        this.patientUserId = patientUserId;
    }


    public String getMemberName() {
        return memberName;
    }

    public void setMemberName(String memberName) {
        this.memberName = memberName;
    }


    public String getRelationship() {
        return relationship;
    }

    public void setRelationship(String relationship) {
        this.relationship = relationship;
    }


    public Integer getAge() {
        return age;
    }

    public void setAge(Integer age) {
        this.age = age;
    }


    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }


    public LocalDateTime getCreatedAt() {
        return createdAt;
    }

    public void setCreatedAt(LocalDateTime createdAt) {
        this.createdAt = createdAt;
    }
}