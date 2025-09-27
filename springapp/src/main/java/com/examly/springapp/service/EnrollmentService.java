package com.examly.springapp.service;

import com.examly.springapp.model.Enrollment;
import com.examly.springapp.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EnrollmentService {

    private final EnrollmentRepository repo;

    public EnrollmentService(EnrollmentRepository repo) {
        this.repo = repo;
    }

    public Enrollment enrollStudent(Long studentId, Long courseId) {
        // Check if already enrolled
        if (repo.findByStudentIdAndCourseId(studentId, courseId).isPresent()) {
            throw new RuntimeException("Student already enrolled in this course");
        }

        Enrollment enrollment = new Enrollment(studentId, courseId, "ENROLLED");
        return repo.save(enrollment);
    }

    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return repo.findByStudentId(studentId);
    }

    public List<Enrollment> getCourseEnrollments(Long courseId) {
        return repo.findByCourseId(courseId);
    }

    public Enrollment updateEnrollmentStatus(Long id, String status) {
        Enrollment enrollment = repo.findById(id).orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus(status);
        return repo.save(enrollment);
    }
}
