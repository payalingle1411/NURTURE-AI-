package com.nurture.backend.repository;

import com.nurture.backend.entity.MedicalHistory;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MedicalHistoryRepository extends JpaRepository<MedicalHistory, Long> {

    Optional<MedicalHistory> findByUser_Id(Long userId);

    boolean existsByUser_Id(Long userId);
}