package com.nurture.backend.controller;

import com.nurture.backend.dto.UserProfileRequest;
import com.nurture.backend.entity.UserProfile;
import com.nurture.backend.service.UserProfileService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/profile")
@CrossOrigin("*")
public class UserProfileController {

    @Autowired
    private UserProfileService service;

    @PostMapping("/personal-info")
    public UserProfile savePersonalInfo(@RequestBody UserProfileRequest request) {

        return service.save(request);

    }

}