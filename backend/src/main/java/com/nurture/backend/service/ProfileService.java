package com.nurture.backend.service;

import com.nurture.backend.dto.ProfileResponse;
import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.PregnancyProfile;
import com.nurture.backend.entity.UserProfile;
import com.nurture.backend.repository.PregnancyProfileRepository;
import com.nurture.backend.repository.ProfileRepository;
import com.nurture.backend.repository.UserProfileRepository;

import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class ProfileService {

    private final ProfileRepository profileRepository;
    private final PregnancyProfileRepository pregnancyProfileRepository;
    private final UserProfileRepository userProfileRepository;


    // =========================================================
    // CONSTRUCTOR
    // =========================================================

    public ProfileService(
            ProfileRepository profileRepository,
            PregnancyProfileRepository pregnancyProfileRepository,
            UserProfileRepository userProfileRepository
    ) {

        this.profileRepository = profileRepository;

        this.pregnancyProfileRepository =
                pregnancyProfileRepository;

        this.userProfileRepository =
                userProfileRepository;
    }


    // =========================================================
    // GET COMPLETE PROFILE BY USER ID
    // =========================================================

    public ProfileResponse getProfileById(Long userId) {

        // -----------------------------------------------------
        // GET USER
        // -----------------------------------------------------

        Optional<Login> optionalUser =
                profileRepository.findById(userId);


        if (optionalUser.isEmpty()) {

            throw new RuntimeException(
                    "User not found"
            );
        }


        Login user =
                optionalUser.get();


        // -----------------------------------------------------
        // GET PREGNANCY PROFILE
        // -----------------------------------------------------

        Optional<PregnancyProfile> optionalPregnancy =
                pregnancyProfileRepository
                        .findByUser_Id(userId);


        // -----------------------------------------------------
        // CONVERT PREGNANCY PROFILE
        // -----------------------------------------------------

        ProfileResponse.PregnancyProfileResponse
                pregnancyData = null;


        if (optionalPregnancy.isPresent()) {

            PregnancyProfile pregnancy =
                    optionalPregnancy.get();


            pregnancyData =
                    new ProfileResponse
                            .PregnancyProfileResponse(

                            pregnancy.getPregnancyId(),

                            pregnancy.getDueDate(),

                            pregnancy.getPregnancyWeek(),

                            pregnancy.getTrimester(),

                            pregnancy.getLastMenstrualPeriod(),

                            pregnancy.getPregnancyType(),

                            pregnancy.getBabyCount(),

                            pregnancy.getDoctorNotes(),

                            pregnancy.getFirstPregnancy(),

                            pregnancy.getPreviousPregnancies(),

                            pregnancy.getLiveBirths(),

                            pregnancy.getMiscarriages(),

                            pregnancy.getHighRisk(),

                            pregnancy.getIvfPregnancy(),

                            pregnancy.getMultiplePregnancy()
                    );
        }


        // =====================================================
        // RETURN COMPLETE PROFILE
        // =====================================================

        return new ProfileResponse(

                user.getId(),

                user.getFullName(),

                user.getEmail(),

                user.getPhoneNumber(),

                user.getRole(),

                pregnancyData
        );
    }


    // =========================================================
    // CHECK PERSONAL INFO COMPLETION
    // =========================================================
    //
    // Returns true only when:
    // 1. UserProfile exists
    // 2. profile_completed = true
    //
    // =========================================================

    public boolean exists(Long userId) {

        Optional<UserProfile> profile =
                userProfileRepository
                        .findByUser_Id(userId);

        if (profile.isEmpty()) {
            return false;
        }

        return Boolean.TRUE.equals(
                profile.get().getProfileCompleted()
        );
    }
}