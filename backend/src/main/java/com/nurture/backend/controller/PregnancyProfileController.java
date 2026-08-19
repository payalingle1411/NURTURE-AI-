package com.nurture.backend.controller;

import com.nurture.backend.dto.PregnancyProfileRequest;
import com.nurture.backend.entity.PregnancyProfile;
import com.nurture.backend.service.PregnancyProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/pregnancy")
@CrossOrigin(origins = "*")
public class PregnancyProfileController {

    @Autowired
    private PregnancyProfileService service;

    // Save or Update Pregnancy Profile
    @PostMapping("/save")
    public PregnancyProfile save(@RequestBody PregnancyProfileRequest request) {
        return service.save(request);
    }

    // Get Pregnancy Profile by User ID
    @GetMapping("/{userId}")
    public PregnancyProfile getProfile(@PathVariable Long userId) {
        return service.getProfile(userId);
    }

    // Check if Pregnancy Profile Exists
    @GetMapping("/exists/{userId}")
    public boolean exists(@PathVariable Long userId) {
        return service.exists(userId);
    }
}