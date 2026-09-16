package com.nurture.backend.service;

import com.nurture.backend.dto.MedicalHistoryRequest;
import com.nurture.backend.dto.MedicalHistoryResponse;
import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.MedicalHistory;
import com.nurture.backend.repository.LoginRepository;
import com.nurture.backend.repository.MedicalHistoryRepository;

import jakarta.transaction.Transactional;
import org.springframework.stereotype.Service;

@Service
public class MedicalHistoryService {

    private final MedicalHistoryRepository medicalHistoryRepository;
    private final LoginRepository loginRepository;

    public MedicalHistoryService(
            MedicalHistoryRepository medicalHistoryRepository,
            LoginRepository loginRepository
    ) {
        this.medicalHistoryRepository = medicalHistoryRepository;
        this.loginRepository = loginRepository;
    }

    // =========================
    // SAVE MEDICAL HISTORY
    // =========================

    @Transactional
    public MedicalHistoryResponse saveMedicalHistory(
            Long userId,
            MedicalHistoryRequest request
    ) {

        Login user = loginRepository.findById(userId)
                .orElseThrow(() ->
                        new RuntimeException(
                                "User not found with ID: " + userId
                        )
                );

        // Because one user can have only one medical history,
        // update existing record if it already exists.
        MedicalHistory medicalHistory =
                medicalHistoryRepository
                        .findByUser_Id(userId)
                        .orElse(new MedicalHistory());

        medicalHistory.setUser(user);

        medicalHistory.setDiabetes(
                request.getDiabetes() != null
                        ? request.getDiabetes()
                        : false
        );

        medicalHistory.setHypertension(
                request.getHypertension() != null
                        ? request.getHypertension()
                        : false
        );

        medicalHistory.setThyroid(
                request.getThyroid() != null
                        ? request.getThyroid()
                        : false
        );

        medicalHistory.setPcos(
                request.getPcos() != null
                        ? request.getPcos()
                        : false
        );

        medicalHistory.setAsthma(
                request.getAsthma() != null
                        ? request.getAsthma()
                        : false
        );

        medicalHistory.setHeartDisease(
                request.getHeartDisease() != null
                        ? request.getHeartDisease()
                        : false
        );

        medicalHistory.setOtherDisease(
                request.getOtherDisease()
        );

        MedicalHistory saved =
                medicalHistoryRepository.save(medicalHistory);

        return convertToResponse(saved);
    }


    // =========================
    // GET MEDICAL HISTORY
    // =========================

    public MedicalHistoryResponse getMedicalHistory(Long userId) {

        MedicalHistory medicalHistory =
                medicalHistoryRepository
                        .findByUser_Id(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Medical history not found for user ID: "
                                                + userId
                                )
                        );

        return convertToResponse(medicalHistory);
    }


    // =========================
    // UPDATE MEDICAL HISTORY
    // =========================

    @Transactional
    public MedicalHistoryResponse updateMedicalHistory(
            Long userId,
            MedicalHistoryRequest request
    ) {

        MedicalHistory medicalHistory =
                medicalHistoryRepository
                        .findByUser_Id(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Medical history not found for user ID: "
                                                + userId
                                )
                        );

        medicalHistory.setDiabetes(
                request.getDiabetes() != null
                        ? request.getDiabetes()
                        : false
        );

        medicalHistory.setHypertension(
                request.getHypertension() != null
                        ? request.getHypertension()
                        : false
        );

        medicalHistory.setThyroid(
                request.getThyroid() != null
                        ? request.getThyroid()
                        : false
        );

        medicalHistory.setPcos(
                request.getPcos() != null
                        ? request.getPcos()
                        : false
        );

        medicalHistory.setAsthma(
                request.getAsthma() != null
                        ? request.getAsthma()
                        : false
        );

        medicalHistory.setHeartDisease(
                request.getHeartDisease() != null
                        ? request.getHeartDisease()
                        : false
        );

        medicalHistory.setOtherDisease(
                request.getOtherDisease()
        );

        MedicalHistory updated =
                medicalHistoryRepository.save(medicalHistory);

        return convertToResponse(updated);
    }


    // =========================
    // DELETE MEDICAL HISTORY
    // =========================

    @Transactional
    public void deleteMedicalHistory(Long userId) {

        MedicalHistory medicalHistory =
                medicalHistoryRepository
                        .findByUser_Id(userId)
                        .orElseThrow(() ->
                                new RuntimeException(
                                        "Medical history not found for user ID: "
                                                + userId
                                )
                        );

        medicalHistoryRepository.delete(medicalHistory);
    }


    // =========================
    // ENTITY → RESPONSE
    // =========================

    private MedicalHistoryResponse convertToResponse(
            MedicalHistory medicalHistory
    ) {

        MedicalHistoryResponse response =
                new MedicalHistoryResponse();

        response.setHistoryId(
                medicalHistory.getHistoryId()
        );

        response.setUserId(
                medicalHistory.getUser().getId()
        );

        response.setDiabetes(
                medicalHistory.getDiabetes()
        );

        response.setHypertension(
                medicalHistory.getHypertension()
        );

        response.setThyroid(
                medicalHistory.getThyroid()
        );

        response.setPcos(
                medicalHistory.getPcos()
        );

        response.setAsthma(
                medicalHistory.getAsthma()
        );

        response.setHeartDisease(
                medicalHistory.getHeartDisease()
        );

        response.setOtherDisease(
                medicalHistory.getOtherDisease()
        );

        return response;
    }
}