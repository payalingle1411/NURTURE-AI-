package com.nurture.backend.repository;

import com.nurture.backend.entity.Vaccination;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface VaccinationRepository extends JpaRepository<Vaccination, Long> {

    List<Vaccination> findByUser_IdOrderByAvailableFromAsc(Long userId);

    boolean existsByUser_IdAndVaccineName(
            Long userId,
            String vaccineName
    );

    Optional<Vaccination> findByUser_IdAndVaccineName(
            Long userId,
            String vaccineName
    );
}