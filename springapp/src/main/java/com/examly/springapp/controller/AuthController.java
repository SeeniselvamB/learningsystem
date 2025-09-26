package com.examly.springapp.controller;

import com.examly.springapp.model.User;
import com.examly.springapp.service.UserService;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "*")
public class AuthController {

    private final UserService service;

    public AuthController(UserService service) {
        this.service = service;
    }

    @PostMapping("/register")
    public User register(@RequestBody User user) {
        return service.register(user);
    }

    @PostMapping("/login")
    public String login(@RequestBody Map<String, String> body) {
        return service.authenticate(body.get("username"), body.get("password"))
                .map(u -> "Login successful")
                .orElse("Invalid credentials");
    }

    @PostMapping("/logout")
    public String logout() {
        return "User logged out";
    }
}
