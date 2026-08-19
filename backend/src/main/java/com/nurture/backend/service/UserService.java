package com.nurture.backend.service;

import com.nurture.backend.dto.LoginRequest;
import com.nurture.backend.entity.Login;
import com.nurture.backend.repository.LoginRepository;
import com.nurture.backend.repository.PregnancyProfileRepository;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    private final LoginRepository loginRepository;
    private final PregnancyProfileRepository pregnancyProfileRepository;

    public UserService(LoginRepository loginRepository,
                       PregnancyProfileRepository pregnancyProfileRepository) {

        this.loginRepository = loginRepository;
        this.pregnancyProfileRepository = pregnancyProfileRepository;
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

    public boolean isProfileCompleted(Long userId) {
        return pregnancyProfileRepository.existsByUser_Id(userId);
    }
}