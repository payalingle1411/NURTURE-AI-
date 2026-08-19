package com.nurture.backend.service;

import com.nurture.backend.dto.UserProfileRequest;
import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.UserProfile;
import com.nurture.backend.repository.LoginRepository;
import com.nurture.backend.repository.UserProfileRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserProfileService {

    @Autowired
    private UserProfileRepository repository;

    @Autowired
    private LoginRepository loginRepository;


    // =========================================================
    // SAVE PERSONAL INFORMATION
    // =========================================================

    public UserProfile save(UserProfileRequest request) {

        Login user = loginRepository
                .findById(request.getUserId())
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        // If profile already exists, update it
        UserProfile profile =
                repository.findByUser(user)
                        .orElse(new UserProfile());

        profile.setUser(user);

        profile.setDateOfBirth(
                request.getDateOfBirth()
        );

        profile.setAge(
                request.getAge()
        );

        profile.setHeightCm(
                request.getHeightCm()
        );

        profile.setWeightKg(
                request.getWeightKg()
        );

        profile.setBloodGroup(
                request.getBloodGroup()
        );

        profile.setCountry(
                request.getCountry()
        );

        profile.setState(
                request.getState()
        );

        profile.setCity(
                request.getCity()
        );

        profile.setAddress(
                request.getAddress()
        );

        profile.setPincode(
                request.getPincode()
        );

        profile.setProfilePicture(
                request.getProfilePicture()
        );

        profile.setProfileCompleted(true);

        return repository.save(profile);
    }


    // =========================================================
    // GET PERSONAL INFORMATION
    // =========================================================

    public UserProfile getByUserId(Long userId) {

        Login user = loginRepository
                .findById(userId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        return repository
                .findByUser(user)
                .orElseThrow(
                        () -> new RuntimeException(
                                "Personal profile not found"
                        )
                );
    }


    // =========================================================
    // UPDATE PERSONAL INFORMATION
    // =========================================================

    public UserProfile update(
            Long userId,
            UserProfileRequest request) {

        Login user = loginRepository
                .findById(userId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        UserProfile profile =
                repository.findByUser(user)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Personal profile not found"
                                )
                        );

        profile.setDateOfBirth(
                request.getDateOfBirth()
        );

        profile.setAge(
                request.getAge()
        );

        profile.setHeightCm(
                request.getHeightCm()
        );

        profile.setWeightKg(
                request.getWeightKg()
        );

        profile.setBloodGroup(
                request.getBloodGroup()
        );

        profile.setCountry(
                request.getCountry()
        );

        profile.setState(
                request.getState()
        );

        profile.setCity(
                request.getCity()
        );

        profile.setAddress(
                request.getAddress()
        );

        profile.setPincode(
                request.getPincode()
        );

        profile.setProfilePicture(
                request.getProfilePicture()
        );

        profile.setProfileCompleted(true);

        return repository.save(profile);
    }
}