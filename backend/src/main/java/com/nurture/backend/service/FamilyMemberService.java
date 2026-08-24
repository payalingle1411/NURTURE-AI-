package com.nurture.backend.service;

import com.nurture.backend.dto.FamilyMemberDetailsRequest;
import com.nurture.backend.entity.FamilyMember;
import com.nurture.backend.entity.Login;
import com.nurture.backend.repository.FamilyMemberRepository;
import com.nurture.backend.repository.LoginRepository;
import org.springframework.stereotype.Service;

@Service
public class FamilyMemberService {

    private final FamilyMemberRepository familyMemberRepository;
    private final LoginRepository loginRepository;

    public FamilyMemberService(
            FamilyMemberRepository familyMemberRepository,
            LoginRepository loginRepository
    ) {
        this.familyMemberRepository = familyMemberRepository;
        this.loginRepository = loginRepository;
    }

    // =========================================================
    // SAVE FAMILY MEMBER DETAILS
    // =========================================================

    public FamilyMember saveFamilyMember(
            FamilyMemberDetailsRequest request
    ) {

        // -----------------------------------------------------
        // CHECK FAMILY MEMBER USER ID
        // -----------------------------------------------------

        if (request.getUserId() == null) {
            throw new IllegalArgumentException(
                    "Family member user ID is required."
            );
        }

        // -----------------------------------------------------
        // CHECK MOTHER USER ID
        // -----------------------------------------------------

        if (request.getPatientUserId() == null) {
            throw new IllegalArgumentException(
                    "Mother user ID is required."
            );
        }

        // -----------------------------------------------------
        // CHECK FAMILY MEMBER ACCOUNT
        // -----------------------------------------------------

        Login familyUser =
                loginRepository.findById(
                        request.getUserId()
                ).orElseThrow(() ->
                        new IllegalArgumentException(
                                "Family member account not found."
                        )
                );

        // -----------------------------------------------------
        // CHECK FAMILY MEMBER ROLE
        // -----------------------------------------------------

        String familyRole =
                familyUser.getRole();

        if (
                familyRole == null ||
                        (
                                !familyRole.equalsIgnoreCase("Family Member") &&
                                        !familyRole.equalsIgnoreCase("FAMILY_MEMBER")
                        )
        ) {
            throw new IllegalArgumentException(
                    "Only family members can create this profile."
            );
        }

        // -----------------------------------------------------
        // CHECK MOTHER ACCOUNT
        // -----------------------------------------------------

        Login mother =
                loginRepository.findById(
                        request.getPatientUserId()
                ).orElseThrow(() ->
                        new IllegalArgumentException(
                                "Mother account not found."
                        )
                );

        // -----------------------------------------------------
        // CHECK MOTHER ROLE
        // -----------------------------------------------------

        String motherRole =
                mother.getRole();

        if (
                motherRole == null ||
                        (
                                !motherRole.equalsIgnoreCase("Mother") &&
                                        !motherRole.equalsIgnoreCase("MOTHER")
                        )
        ) {
            throw new IllegalArgumentException(
                    "Selected account is not a registered mother."
            );
        }

        // -----------------------------------------------------
        // CHECK NAME
        // -----------------------------------------------------

        if (
                request.getMemberName() == null ||
                        request.getMemberName().trim().isEmpty()
        ) {
            throw new IllegalArgumentException(
                    "Family member name is required."
            );
        }

        // -----------------------------------------------------
        // CHECK RELATIONSHIP
        // -----------------------------------------------------

        if (
                request.getRelationship() == null ||
                        request.getRelationship().trim().isEmpty()
        ) {
            throw new IllegalArgumentException(
                    "Relationship is required."
            );
        }

        // -----------------------------------------------------
        // CHECK AGE
        // -----------------------------------------------------

        if (
                request.getAge() == null ||
                        request.getAge() < 1 ||
                        request.getAge() > 120
        ) {
            throw new IllegalArgumentException(
                    "Please enter a valid age."
            );
        }

        // -----------------------------------------------------
        // CHECK PHONE
        // -----------------------------------------------------

        if (
                request.getPhoneNumber() == null ||
                        !request.getPhoneNumber()
                                .matches("\\d{10,15}")
        ) {
            throw new IllegalArgumentException(
                    "Please enter a valid phone number."
            );
        }

        // -----------------------------------------------------
        // CHECK DUPLICATE PROFILE
        // -----------------------------------------------------

        if (
                familyMemberRepository
                        .findByUserId(request.getUserId())
                        .isPresent()
        ) {
            throw new IllegalArgumentException(
                    "Family member profile already exists."
            );
        }

        // =====================================================
        // CREATE FAMILY MEMBER
        // =====================================================

        FamilyMember familyMember =
                new FamilyMember();

        familyMember.setUserId(
                request.getUserId()
        );

        familyMember.setPatientUserId(
                request.getPatientUserId()
        );

        familyMember.setMemberName(
                request.getMemberName().trim()
        );

        familyMember.setRelationship(
                request.getRelationship().trim()
        );

        familyMember.setAge(
                request.getAge()
        );

        familyMember.setPhoneNumber(
                request.getPhoneNumber().trim()
        );

        // =====================================================
        // SAVE
        // =====================================================

        return familyMemberRepository.save(
                familyMember
        );
    }
}