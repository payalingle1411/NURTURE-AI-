package com.nurture.backend.dto;

public class FamilyOtpRequest {

    private Long familyMemberId;

    private String patientEmail;

    private String otp;


    // =========================================================
    // GET FAMILY MEMBER ID
    // =========================================================

    public Long getFamilyMemberId() {
        return familyMemberId;
    }


    // =========================================================
    // SET FAMILY MEMBER ID
    // =========================================================

    public void setFamilyMemberId(Long familyMemberId) {
        this.familyMemberId = familyMemberId;
    }


    // =========================================================
    // GET PATIENT EMAIL
    // =========================================================

    public String getPatientEmail() {
        return patientEmail;
    }


    // =========================================================
    // SET PATIENT EMAIL
    // =========================================================

    public void setPatientEmail(String patientEmail) {
        this.patientEmail = patientEmail;
    }


    // =========================================================
    // GET OTP
    // =========================================================

    public String getOtp() {
        return otp;
    }


    // =========================================================
    // SET OTP
    // =========================================================

    public void setOtp(String otp) {
        this.otp = otp;
    }
}