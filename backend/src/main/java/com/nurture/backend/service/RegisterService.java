package com.nurture.backend.service;

import com.nurture.backend.dto.RegisterRequest;
import com.nurture.backend.entity.Login;
import com.nurture.backend.repository.LoginRepository;
import org.springframework.stereotype.Service;

@Service
public class RegisterService {

    private final LoginRepository loginRepository;

    public RegisterService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public String register(RegisterRequest request) {

        if (loginRepository.findByEmail(request.getEmail()).isPresent()) {
            return "Email already exists";
        }

        Login user = new Login();

        user.setFullName(request.getFullName());
        user.setEmail(request.getEmail());
        user.setMobile(request.getMobile());
        user.setRole(request.getRole());
        user.setPassword(request.getPassword());

        loginRepository.save(user);

        return "Registration Successful";
    }
}