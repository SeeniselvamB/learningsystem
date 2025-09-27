package com.examly.springapp.controller;

import com.examly.springapp.model.Enrollment;
import com.examly.springapp.service.EnrollmentService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/enrollments")
@CrossOrigin(origins = "*")
public class EnrollmentController {

    private final EnrollmentService service;

    public EnrollmentController(EnrollmentService service) {
        this.service = service;
    }

    // Enroll student
    @PostMapping("/enroll")
    public ResponseEntity<Enrollment> enrollStudent(@RequestParam Long studentId, @RequestParam Long courseId) {
        Enrollment enrollment = service.enrollStudent(studentId, courseId);
        return ResponseEntity.ok(enrollment);
    }

    // Get all courses a student is enrolled in
    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Enrollment>> getStudentEnrollments(@PathVariable Long studentId) {
        List<Enrollment> enrollments = service.getStudentEnrollments(studentId);
        return ResponseEntity.ok(enrollments);
    }

    // Get all students enrolled in a course
    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Enrollment>> getCourseEnrollments(@PathVariable Long courseId) {
        List<Enrollment> enrollments = service.getCourseEnrollments(courseId);
        return ResponseEntity.ok(enrollments);
    }

    // Update enrollment status
    @PutMapping("/{id}")
    public ResponseEntity<Enrollment> updateEnrollmentStatus(@PathVariable Long id, @RequestParam String status) {
        Enrollment updated = service.updateEnrollmentStatus(id, status);
        return ResponseEntity.ok(updated);
    }
}
