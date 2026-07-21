package com.nurture.backend.entity;

import jakarta.persistence.*;
import lombok.Data;

@Entity
@Data
@Table(name = "users")
public class Login {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String fullName;

    @Column(unique = true, nullable =false)
    private String email;

    @Column(nullable = false)
    private String mobile;

    @Column(nullable = false)
    private String role;

    @Column(nullable = false)
    private String password;
}