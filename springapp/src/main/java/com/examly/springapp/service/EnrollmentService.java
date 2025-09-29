package com.examly.springapp.service;

import com.examly.springapp.dto.EnrollmentDTO;
import com.examly.springapp.model.Enrollment;
import com.examly.springapp.repository.EnrollmentRepository;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
public class EnrollmentService {

    private final EnrollmentRepository repo;

    public EnrollmentService(EnrollmentRepository repo) {
        this.repo = repo;
    }

    public Enrollment enrollStudent(Long studentId, Long courseId) {
        if (repo.findByStudentIdAndCourseId(studentId, courseId).isPresent()) {
            throw new RuntimeException("Student already enrolled in this course");
        }
        Enrollment enrollment = new Enrollment(studentId, courseId, "ENROLLED");
        return repo.save(enrollment);
    }

    public List<EnrollmentDTO> getStudentEnrollments(Long studentId) {
        return repo.findByStudentId(studentId).stream()
                .map(e -> new EnrollmentDTO(e.getCourseId(), e.getStatus(), e.getScore()))
                .collect(Collectors.toList());
    }

    public List<EnrollmentDTO> getCourseEnrollments(Long courseId) {
        return repo.findByCourseId(courseId).stream()
                .map(e -> new EnrollmentDTO(e.getCourseId(), e.getStatus(), e.getScore()))
                .collect(Collectors.toList());
    }

    public Enrollment updateEnrollmentStatus(Long id, String status) {
        Enrollment enrollment = repo.findById(id)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus(status);
        return repo.save(enrollment);
    }

    public Enrollment completeCourse(Long studentId, Long courseId, int score) {
        Enrollment enrollment = repo.findByStudentIdAndCourseId(studentId, courseId)
                .orElseThrow(() -> new RuntimeException("Enrollment not found"));
        enrollment.setStatus("COMPLETED");
        enrollment.setScore(score);
        return repo.save(enrollment);
    }
}
