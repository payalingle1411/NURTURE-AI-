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

        // =====================================================
        // IF PROFILE ALREADY EXISTS → UPDATE
        // OTHERWISE → CREATE NEW PROFILE
        // =====================================================

        UserProfile profile =
                repository.findByUser(user)
                        .orElse(new UserProfile());

        // =====================================================
        // LINK PROFILE WITH LOGIN USER
        // =====================================================

        profile.setUser(user);

        // =====================================================
        // PERSONAL INFORMATION
        // =====================================================

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

        // =====================================================
        // ADDRESS INFORMATION
        // =====================================================

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

        // =====================================================
        // PROFILE PICTURE
        // =====================================================

        profile.setProfilePicture(
                request.getProfilePicture()
        );

        // =====================================================
        // MARK PROFILE AS COMPLETED
        // =====================================================

        profile.setProfileCompleted(true);

        // =====================================================
        // SAVE PROFILE
        // =====================================================

        return repository.save(profile);
    }


    // =========================================================
    // GET PERSONAL INFORMATION
    // =========================================================

    public UserProfile getByUserId(Long userId) {

        // =====================================================
        // FIND LOGIN USER
        // =====================================================

        Login user = loginRepository
                .findById(userId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        // =====================================================
        // FIND USER PROFILE
        // =====================================================

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
            UserProfileRequest request
    ) {

        // =====================================================
        // FIND LOGIN USER
        // =====================================================

        Login user = loginRepository
                .findById(userId)
                .orElseThrow(
                        () -> new RuntimeException(
                                "User not found"
                        )
                );

        // =====================================================
        // FIND EXISTING PROFILE
        // =====================================================

        UserProfile profile =
                repository.findByUser(user)
                        .orElseThrow(
                                () -> new RuntimeException(
                                        "Personal profile not found"
                                )
                        );

        // =====================================================
        // UPDATE PERSONAL INFORMATION
        // =====================================================

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

        // =====================================================
        // UPDATE ADDRESS
        // =====================================================

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

        // =====================================================
        // UPDATE PROFILE PICTURE
        // =====================================================

        profile.setProfilePicture(
                request.getProfilePicture()
        );

        // =====================================================
        // PROFILE IS COMPLETED
        // =====================================================

        profile.setProfileCompleted(true);

        // =====================================================
        // SAVE UPDATED PROFILE
        // =====================================================

        return repository.save(profile);
    }
}