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

    public UserProfile save(UserProfileRequest request) {

        Login user = loginRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        UserProfile profile = new UserProfile();

        profile.setUser(user);

        profile.setDateOfBirth(request.getDateOfBirth());
        profile.setAge(request.getAge());
        profile.setHeightCm(request.getHeightCm());
        profile.setWeightKg(request.getWeightKg());
        profile.setBloodGroup(request.getBloodGroup());
        profile.setCountry(request.getCountry());
        profile.setState(request.getState());
        profile.setCity(request.getCity());
        profile.setAddress(request.getAddress());
        profile.setPincode(request.getPincode());
        profile.setProfilePicture(request.getProfilePicture());
        profile.setProfileCompleted(false);

        return repository.save(profile);
    }
}