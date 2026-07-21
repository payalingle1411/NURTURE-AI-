package com.nurture.backend.service;

import com.nurture.backend.dto.LoginRequest;
import com.nurture.backend.entity.Login;
import com.nurture.backend.repository.LoginRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final LoginRepository userRepository;

    public UserService(LoginRepository userRepository) {
        this.userRepository = userRepository;
    }

    public String login(LoginRequest request) {

        Login user = userRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return "User not found";
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return "Invalid password";
        }

        return "Login Successful";
    }
}