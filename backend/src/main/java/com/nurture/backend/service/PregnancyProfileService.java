package com.nurture.backend.service;

import com.nurture.backend.dto.PregnancyProfileRequest;
import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.PregnancyProfile;
import com.nurture.backend.repository.LoginRepository;
import com.nurture.backend.repository.PregnancyProfileRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class PregnancyProfileService {

    @Autowired
    private PregnancyProfileRepository repository;

    @Autowired
    private LoginRepository loginRepository;

    // Save or Update Pregnancy Profile
    public PregnancyProfile save(PregnancyProfileRequest request) {

        Login user = loginRepository.findById(request.getUserId())
                .orElseThrow(() -> new RuntimeException("User not found"));

        PregnancyProfile profile = repository.findByUser_Id(request.getUserId())
                .orElse(new PregnancyProfile());

        profile.setUser(user);

        // Pregnancy Information
        profile.setDueDate(request.getDueDate());
        profile.setPregnancyWeek(request.getPregnancyWeek());
        profile.setTrimester(request.getTrimester());

        // New Fields
        profile.setLastMenstrualPeriod(request.getLastMenstrualPeriod());
        profile.setPregnancyType(request.getPregnancyType());
        profile.setBabyCount(request.getBabyCount());
        profile.setDoctorNotes(request.getDoctorNotes());

        // Pregnancy History
        profile.setFirstPregnancy(request.getFirstPregnancy());
        profile.setPreviousPregnancies(request.getPreviousPregnancies());
        profile.setLiveBirths(request.getLiveBirths());
        profile.setMiscarriages(request.getMiscarriages());

        // Risk Details
        profile.setHighRisk(request.getHighRisk());
        profile.setIvfPregnancy(request.getIvfPregnancy());
        profile.setMultiplePregnancy(request.getMultiplePregnancy());

        return repository.save(profile);
    }

    // Get Pregnancy Profile by User ID
    public PregnancyProfile getProfile(Long userId) {
        return repository.findByUser_Id(userId)
                .orElse(null);
    }

    // Check if Pregnancy Profile Exists
    public boolean exists(Long userId) {
        return repository.existsByUser_Id(userId);
    }
}