package com.nurture.backend.controller;

import com.nurture.backend.dto.RegisterRequest;
import com.nurture.backend.service.RegisterService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class RegisterController {

    private final RegisterService registerService;

    public RegisterController(RegisterService registerService) {
        this.registerService = registerService;
    }

    @PostMapping("/register")
    public String register(@RequestBody RegisterRequest request) {
        return registerService.register(request);
    }
}