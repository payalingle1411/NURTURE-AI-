package com.nurture.backend.service;

import com.nurture.backend.util.OtpData;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;
import java.util.Random;

@Service
public class OtpService {

    private final Map<String, OtpData> otpStorage = new HashMap<>();

    // ============================
    // Check if OTP can be sent
    // ============================
    public boolean canSendOtp(String email) {

        OtpData otpData = otpStorage.get(email);

        if (otpData == null) {
            return true;
        }

        long seconds = Duration.between(
                otpData.getCreatedAt(),
                LocalDateTime.now()
        ).getSeconds();

        return seconds >= 60;
    }

    // ============================
    // Generate OTP
    // ============================
    public String generateOtp(String email) {

        Random random = new Random();

        String otp = String.format("%06d", random.nextInt(1000000));

        LocalDateTime now = LocalDateTime.now();

        LocalDateTime expiryTime = now.plusMinutes(5);

        otpStorage.put(
                email,
                new OtpData(
                        otp,
                        expiryTime,
                        now
                )
        );

        return otp;
    }

    // ============================
    // Verify OTP
    // ============================
    public boolean verifyOtp(String email, String otp) {

        OtpData otpData = otpStorage.get(email);

        if (otpData == null) {
            return false;
        }

        // OTP expired
        if (LocalDateTime.now().isAfter(otpData.getExpiryTime())) {

            otpStorage.remove(email);

            return false;
        }

        // OTP incorrect
        if (!otpData.getOtp().equals(otp)) {
            return false;
        }

        // OTP verified
        otpStorage.remove(email);

        return true;
    }

}