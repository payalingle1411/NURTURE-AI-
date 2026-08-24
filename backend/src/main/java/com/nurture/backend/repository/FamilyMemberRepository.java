package com.nurture.backend.repository;

import com.nurture.backend.entity.FamilyMember;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface FamilyMemberRepository
        extends JpaRepository<FamilyMember, Long> {

    // =========================================================
    // FIND FAMILY MEMBER PROFILE BY LOGIN USER ID
    // =========================================================

    Optional<FamilyMember> findByUserId(Long userId);


    // =========================================================
    // FIND FAMILY MEMBER PROFILE BY MOTHER / PATIENT USER ID
    // =========================================================

    Optional<FamilyMember> findByPatientUserId(Long patientUserId);


    // =========================================================
    // CHECK IF FAMILY MEMBER PROFILE ALREADY EXISTS
    // =========================================================

    boolean existsByUserId(Long userId);
}