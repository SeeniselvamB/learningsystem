package com.examly.springapp.controller;

import com.examly.springapp.dto.EnrollmentDTO;
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

    @PostMapping("/enroll")
    public ResponseEntity<Enrollment> enrollStudent(@RequestParam Long studentId, @RequestParam Long courseId) {
        Enrollment enrollment = service.enrollStudent(studentId, courseId);
        return ResponseEntity.ok(enrollment);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<EnrollmentDTO>> getStudentEnrollments(@PathVariable Long studentId) {
        return ResponseEntity.ok(service.getStudentEnrollments(studentId));
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<EnrollmentDTO>> getCourseEnrollments(@PathVariable Long courseId) {
        return ResponseEntity.ok(service.getCourseEnrollments(courseId));
    }

    @PutMapping("/{id}")
    public ResponseEntity<Enrollment> updateEnrollmentStatus(@PathVariable Long id, @RequestParam String status) {
        Enrollment updated = service.updateEnrollmentStatus(id, status);
        return ResponseEntity.ok(updated);
    }

    @PutMapping("/complete")
    public ResponseEntity<Enrollment> completeCourse(
            @RequestParam Long studentId,
            @RequestParam Long courseId,
            @RequestParam int score) {
        Enrollment enrollment = service.completeCourse(studentId, courseId, score);
        return ResponseEntity.ok(enrollment);
    }
}
