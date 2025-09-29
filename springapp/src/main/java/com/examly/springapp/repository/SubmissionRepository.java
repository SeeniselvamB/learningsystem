package com.examly.springapp.repository;

import com.examly.springapp.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {
    List<Submission> findByStudentId(Long studentId);
    List<Submission> findByCourseId(Long courseId);
    Submission findByStudentIdAndCourseId(Long studentId, Long courseId);
}
