package com.nurture.backend.dto;

public class LoginResponse {

    private Long userId;
    private String fullName;
    private String email;
    private String role;
    private String message;

    private boolean profileCompleted;

    // Family member verification status
    private boolean familyVerified;

    public LoginResponse() {
    }

    public LoginResponse(
            Long userId,
            String fullName,
            String email,
            String role,
            String message,
            boolean profileCompleted,
            boolean familyVerified
    ) {

        this.userId = userId;
        this.fullName = fullName;
        this.email = email;
        this.role = role;
        this.message = message;
        this.profileCompleted = profileCompleted;
        this.familyVerified = familyVerified;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public String getFullName() {
        return fullName;
    }

    public void setFullName(String fullName) {
        this.fullName = fullName;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public String getRole() {
        return role;
    }

    public void setRole(String role) {
        this.role = role;
    }

    public String getMessage() {
        return message;
    }

    public void setMessage(String message) {
        this.message = message;
    }

    public boolean isProfileCompleted() {
        return profileCompleted;
    }

    public void setProfileCompleted(boolean profileCompleted) {
        this.profileCompleted = profileCompleted;
    }

    public boolean isFamilyVerified() {
        return familyVerified;
    }

    public void setFamilyVerified(boolean familyVerified) {
        this.familyVerified = familyVerified;
    }
}