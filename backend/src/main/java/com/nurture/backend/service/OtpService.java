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

    // =========================================================
    // MOTHER REGISTRATION OTP STORAGE
    // =========================================================

    private final Map<String, OtpData> otpStorage = new HashMap<>();


    // =========================================================
    // FAMILY MEMBER OTP STORAGE
    // =========================================================
    //
    // Key will be:
    //
    // familyMemberId + "_" + patientEmail
    //
    // Example:
    //
    // 35_dhapkaschetan@gmail.com
    //
    // This keeps family-member OTP separate from
    // the normal registration OTP.
    // =========================================================

    private final Map<String, OtpData> familyOtpStorage =
            new HashMap<>();


    // =========================================================
    // NORMAL OTP - CHECK IF OTP CAN BE SENT
    // =========================================================

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


    // =========================================================
    // NORMAL OTP - GENERATE
    // =========================================================

    public String generateOtp(String email) {

        Random random = new Random();

        String otp = String.format(
                "%06d",
                random.nextInt(1000000)
        );

        LocalDateTime now =
                LocalDateTime.now();

        LocalDateTime expiryTime =
                now.plusMinutes(5);

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


    // =========================================================
    // NORMAL OTP - VERIFY
    // =========================================================

    public boolean verifyOtp(
            String email,
            String otp
    ) {

        OtpData otpData =
                otpStorage.get(email);

        if (otpData == null) {
            return false;
        }

        // OTP expired
        if (
                LocalDateTime.now()
                        .isAfter(
                                otpData.getExpiryTime()
                        )
        ) {

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


    // =========================================================
    // FAMILY MEMBER OTP
    // CHECK IF OTP CAN BE SENT
    // =========================================================

    public boolean canSendFamilyOtp(
            Long familyMemberId,
            String patientEmail
    ) {

        String key =
                createFamilyOtpKey(
                        familyMemberId,
                        patientEmail
                );

        OtpData otpData =
                familyOtpStorage.get(key);

        if (otpData == null) {
            return true;
        }

        long seconds =
                Duration.between(
                        otpData.getCreatedAt(),
                        LocalDateTime.now()
                ).getSeconds();

        return seconds >= 60;
    }


    // =========================================================
    // FAMILY MEMBER OTP
    // GENERATE OTP
    // =========================================================

    public String generateFamilyOtp(
            Long familyMemberId,
            String patientEmail
    ) {

        Random random = new Random();

        String otp =
                String.format(
                        "%06d",
                        random.nextInt(1000000)
                );

        LocalDateTime now =
                LocalDateTime.now();

        LocalDateTime expiryTime =
                now.plusMinutes(5);

        String key =
                createFamilyOtpKey(
                        familyMemberId,
                        patientEmail
                );

        familyOtpStorage.put(
                key,
                new OtpData(
                        otp,
                        expiryTime,
                        now
                )
        );

        return otp;
    }


    // =========================================================
    // FAMILY MEMBER OTP
    // VERIFY OTP
    // =========================================================

    public boolean verifyFamilyOtp(
            Long familyMemberId,
            String patientEmail,
            String otp
    ) {

        String key =
                createFamilyOtpKey(
                        familyMemberId,
                        patientEmail
                );

        OtpData otpData =
                familyOtpStorage.get(key);

        if (otpData == null) {
            return false;
        }

        // -----------------------------------------------------
        // CHECK EXPIRY
        // -----------------------------------------------------

        if (
                LocalDateTime.now()
                        .isAfter(
                                otpData.getExpiryTime()
                        )
        ) {

            familyOtpStorage.remove(key);

            return false;
        }

        // -----------------------------------------------------
        // CHECK OTP
        // -----------------------------------------------------

        if (!otpData.getOtp().equals(otp)) {

            return false;
        }

        // -----------------------------------------------------
        // OTP VERIFIED
        // -----------------------------------------------------

        familyOtpStorage.remove(key);

        return true;
    }


    // =========================================================
    // CREATE UNIQUE FAMILY OTP KEY
    // =========================================================

    private String createFamilyOtpKey(
            Long familyMemberId,
            String patientEmail
    ) {

        return familyMemberId
                + "_"
                + patientEmail
                .trim()
                .toLowerCase();
    }

}