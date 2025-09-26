package com.examly.springapp.controller;

import com.examly.springapp.model.Enrollment;
import com.examly.springapp.service.EnrollmentService;
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

    @PostMapping
    public Enrollment enrollStudent(@RequestBody Enrollment enrollment) {
        return service.enrollStudent(enrollment);
    }

    @GetMapping("/student/{studentId}")
    public List<Enrollment> getStudentEnrollments(@PathVariable Long studentId) {
        return service.getStudentEnrollments(studentId);
    }

    @GetMapping("/course/{courseId}")
    public List<Enrollment> getCourseEnrollments(@PathVariable Long courseId) {
        return service.getCourseEnrollments(courseId);
    }

    @PutMapping("/{id}")
    public Enrollment updateEnrollment(@PathVariable Long id, @RequestParam String status) {
        return service.updateEnrollment(id, status);
    }
}
