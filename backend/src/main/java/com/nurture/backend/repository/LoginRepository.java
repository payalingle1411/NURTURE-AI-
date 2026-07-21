package com.nurture.backend.repository;

import com.nurture.backend.entity.Login;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;


public interface LoginRepository extends JpaRepository<Login,Long>{

    Optional<Login> findByEmail(String email);

}