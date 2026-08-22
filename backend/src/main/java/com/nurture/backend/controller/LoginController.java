package com.nurture.backend.controller;

import com.nurture.backend.dto.LoginRequest;
import com.nurture.backend.dto.LoginResponse;
import com.nurture.backend.entity.Login;
import com.nurture.backend.service.UserService;

import jakarta.servlet.http.HttpSession;

import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(
        origins = "http://localhost:5173",
        allowCredentials = "true"
)
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(
            @RequestBody LoginRequest request,
            HttpSession session
    ) {

        Login user = userService.login(request);

        if (user == null) {
            return ResponseEntity
                    .status(HttpStatus.UNAUTHORIZED)
                    .body("Invalid Email or Password");
        }

        // =====================================================
        // STORE LOGGED-IN USER ID IN SERVER SESSION
        // =====================================================

        session.setAttribute("USER_ID", user.getId());

        System.out.println(
                "Logged-in USER_ID stored in session: "
                        + user.getId()
        );

        // =====================================================
        // CHECK PROFILE
        // =====================================================

        boolean profileCompleted =
                userService.isProfileCompleted(user.getId());

        LoginResponse response =
                new LoginResponse(
                        user.getId(),
                        user.getFullName(),
                        user.getEmail(),
                        user.getRole(),
                        "Login Successful",
                        profileCompleted
                );

        return ResponseEntity.ok(response);
    }

    // =========================================================
    // OPTIONAL: LOGOUT
    // =========================================================

    @PostMapping("/logout")
    public ResponseEntity<?> logout(
            HttpSession session
    ) {

        session.invalidate();

        return ResponseEntity.ok(
                "Logout successful"
        );
    }
}