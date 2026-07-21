package com.nurture.backend.controller;

import com.nurture.backend.dto.LoginRequest;
import com.nurture.backend.service.UserService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class LoginController {

    private final UserService userService;

    public LoginController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping("/login")
    public String login(@RequestBody LoginRequest request) {
        return userService.login(request);
    }
}