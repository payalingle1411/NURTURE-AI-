package com.nurture.backend.repository;

import com.nurture.backend.entity.PregnancyProfile;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PregnancyProfileRepository extends JpaRepository<PregnancyProfile, Long> {

    Optional<PregnancyProfile> findByUser_Id(Long id);

    boolean existsByUser_Id(Long id);

}