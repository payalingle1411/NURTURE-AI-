package com.yourpackage.repository;

import com.yourpackage.entity.WellnessReport;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface WellnessReportRepository
        extends JpaRepository<WellnessReport, Long> {

    Optional<WellnessReport> findFirstByUserIdOrderByReportEndDateDesc(
            Long userId
    );
}