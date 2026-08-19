package com.nurture.backend.util;

import java.time.LocalDateTime;

public class OtpData {

    private String otp;
    private LocalDateTime expiryTime;
    private LocalDateTime createdAt;

    public OtpData(String otp,
                   LocalDateTime expiryTime,
                   LocalDateTime createdAt) {

        this.otp = otp;
        this.expiryTime = expiryTime;
        this.createdAt = createdAt;
    }

    public String getOtp() {
        return otp;
    }

    public LocalDateTime getExpiryTime() {
        return expiryTime;
    }

    public LocalDateTime getCreatedAt() {
        return createdAt;
    }
}