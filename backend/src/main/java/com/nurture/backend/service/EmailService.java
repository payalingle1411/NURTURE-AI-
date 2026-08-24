package com.nurture.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    // =========================================================
    // SEND FAMILY MEMBER VERIFICATION OTP
    // =========================================================

    public void sendOtp(String toEmail, String otp) {

        try {

            SimpleMailMessage message =
                    new SimpleMailMessage();

            // -------------------------------------------------
            // RECEIVER
            // -------------------------------------------------

            message.setTo(toEmail);

            // -------------------------------------------------
            // SUBJECT
            // -------------------------------------------------

            message.setSubject(
                    "Nurture AI - Family Access Verification OTP"
            );

            // -------------------------------------------------
            // EMAIL BODY
            // -------------------------------------------------

            message.setText(
                    "Dear User,\n\n" +

                            "A family member is requesting secure access " +
                            "to your Nurture AI pregnancy profile.\n\n" +

                            "Your verification OTP is:\n\n" +

                            otp +

                            "\n\n" +

                            "This OTP is valid for 5 minutes.\n\n" +

                            "If you approve this access, you may share " +
                            "this OTP with the family member who is " +
                            "requesting access.\n\n" +

                            "If you did not request or approve this access, " +
                            "please do not share the OTP with anyone.\n\n" +

                            "Regards,\n" +
                            "Team Nurture AI"
            );

            // -------------------------------------------------
            // SEND EMAIL
            // -------------------------------------------------

            mailSender.send(message);

            System.out.println(
                    "========================================"
            );

            System.out.println(
                    "FAMILY MEMBER OTP MAIL SENT SUCCESSFULLY"
            );

            System.out.println(
                    "OTP sent to: " + toEmail
            );

            System.out.println(
                    "========================================"
            );

        } catch (Exception e) {

            System.out.println(
                    "========== MAIL ERROR =========="
            );

            e.printStackTrace();
        }
    }
}