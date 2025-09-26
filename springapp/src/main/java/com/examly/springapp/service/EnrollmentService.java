package com.examly.springapp.service;

import com.examly.springapp.model.Enrollment;
import com.examly.springapp.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class EnrollmentService {

    private final EnrollmentRepository repo;

    public EnrollmentService(EnrollmentRepository repo) {
        this.repo = repo;
    }

    public Enrollment enrollStudent(Enrollment enrollment) {
        enrollment.setStatus("ENROLLED");
        return repo.save(enrollment);
    }

    public List<Enrollment> getStudentEnrollments(Long studentId) {
        return repo.findByStudentId(studentId);
    }

    public List<Enrollment> getCourseEnrollments(Long courseId) {
        return repo.findByCourseId(courseId);
    }

    public Enrollment updateEnrollment(Long id, String status) {
        Enrollment enrollment = repo.findById(id).orElseThrow();
        enrollment.setStatus(status);
        return repo.save(enrollment);
    }
}
