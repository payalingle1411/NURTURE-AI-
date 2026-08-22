package com.nurture.backend.repository;

import com.nurture.backend.entity.Appointment;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface AppointmentRepository
        extends JpaRepository<Appointment, Long> {

    List<Appointment>
    findByUserIdOrderByAppointmentDateAscAppointmentTimeAsc(
            Long userId
    );
}