package com.nurture.backend.repository;

import com.nurture.backend.entity.Login;
import com.nurture.backend.entity.UserProfile;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface UserProfileRepository
        extends JpaRepository<UserProfile, Long> {

    Optional<UserProfile> findByUser(Login user);
}