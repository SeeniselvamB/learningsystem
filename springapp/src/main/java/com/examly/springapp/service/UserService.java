package com.examly.springapp.service;

import com.examly.springapp.model.User;
import com.examly.springapp.repository.UserRepository;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.Optional;

@Service
public class UserService {

    private final UserRepository repo;
    private final BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();

    public UserService(UserRepository repo) {
        this.repo = repo;
    }

    public User register(User user) {
        user.setPassword(encoder.encode(user.getPassword())); // hash password
        return repo.save(user);
    }

    public Optional<User> authenticate(String username, String password) {
        return repo.findByUsername(username)
                .filter(u -> encoder.matches(password, u.getPassword()));
    }

    public User updateProfile(Long id, User updated) {
        User user = repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
        user.setEmail(updated.getEmail());
        user.setFullName(updated.getFullName());
        if (updated.getRole() != null) {
            user.setRole(updated.getRole());
        }
        return repo.save(user);
    }

    public User getProfile(Long id) {
        return repo.findById(id).orElseThrow(() -> new RuntimeException("User not found"));
    }

    public List<User> getAllUsers() {
        return repo.findAll();
    }

    public void deleteUser(Long id) {
        repo.deleteById(id);
    }
    public void deleteAllUsers() {
        repo.deleteAll();
    }

    public boolean existsByEmail(String email) {
        return repo.existsByEmail(email);
    }

}
