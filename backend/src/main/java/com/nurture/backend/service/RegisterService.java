package com.nurture.backend.service;

import com.nurture.backend.dto.RegisterRequest;
import com.nurture.backend.entity.Login;
import com.nurture.backend.repository.LoginRepository;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    private final LoginRepository loginRepository;
    private final OtpService otpService;

    public RegisterService(LoginRepository loginRepository,
                           OtpService otpService) {
        this.loginRepository = loginRepository;
        this.otpService = otpService;
    }

    public String register(RegisterRequest request) {

        // Validate Email
        if (request.getEmail() == null || request.getEmail().trim().isEmpty()) {
            return "Email is required";
        }

        // Validate OTP
        if (request.getOtp() == null || request.getOtp().trim().isEmpty()) {
            return "OTP is required";
        }

        // Check Email Already Exists
        if (loginRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        // Verify OTP
        if (!otpService.verifyOtp(request.getEmail(), request.getOtp())) {
            return "Invalid or Expired OTP";
        }

        // Create User
        Login user = new Login();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setPassword(request.getPassword());
        user.setPhoneNumber(request.getPhoneNumber());
        user.setRole(request.getRole());

        loginRepository.save(user);

        return "Registration Successful";
    }
}