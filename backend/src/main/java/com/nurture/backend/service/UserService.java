package com.nurture.backend.service;

import com.nurture.backend.dto.LoginRequest;
import com.nurture.backend.entity.Login;
import com.nurture.backend.repository.LoginRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final LoginRepository loginRepository;

    public UserService(LoginRepository loginRepository) {
        this.loginRepository = loginRepository;
    }

    public Login login(LoginRequest request) {

        Login user = loginRepository.findByEmail(request.getEmail())
                .orElse(null);

        if (user == null) {
            return null;
        }

        if (!user.getPassword().equals(request.getPassword())) {
            return null;
        }

        return user;
    }
}