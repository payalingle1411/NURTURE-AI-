package com.nurture.backend.repository;

import com.nurture.backend.entity.Medicine;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MedicineRepository
        extends JpaRepository<Medicine, Long> {

    List<Medicine> findByUser_Id(Long userId);
}