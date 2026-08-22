package com.nurture.backend.repository;

import com.nurture.backend.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

public interface ProfileRepository extends JpaRepository<Login, Long> {

}