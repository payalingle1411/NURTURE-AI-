package com.nurture.backend.repository;

import com.nurture.backend.entity.DailyHealthTracking;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDate;
import java.util.List;
import java.util.Optional;

@Repository
public interface DailyHealthTrackingRepository
        extends JpaRepository<DailyHealthTracking, Long> {

    Optional<DailyHealthTracking> findByUser_IdAndTrackingDate(
            Long userId,
            LocalDate trackingDate
    );

    List<DailyHealthTracking> findByUser_IdOrderByTrackingDateDesc(
            Long userId
    );

    List<DailyHealthTracking> findTop7ByUser_IdOrderByTrackingDateDesc(
            Long userId
    );

    void deleteByTrackingDateBefore(LocalDate date);
}