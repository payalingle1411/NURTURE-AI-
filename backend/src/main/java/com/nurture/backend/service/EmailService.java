package com.nurture.backend.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    public void sendOtp(String toEmail, String otp) {

        try {

            SimpleMailMessage message = new SimpleMailMessage();

            message.setTo(toEmail);
            message.setSubject("Nurture AI - Email Verification OTP");

            message.setText(
                    "Dear User,\n\n" +
                            "Your OTP for Nurture AI registration is:\n\n" +
                            otp +
                            "\n\nThis OTP is valid for 5 minutes.\n\n" +
                            "Please do not share this OTP with anyone.\n\n" +
                            "Regards,\n" +
                            "Team Nurture AI"
            );

            mailSender.send(message);

            System.out.println("MAIL SENT SUCCESSFULLY");

        } catch(Exception e) {

            System.out.println("========== MAIL ERROR ==========");
            e.printStackTrace();

        }
    }
}