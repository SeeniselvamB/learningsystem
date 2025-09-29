package com.examly.springapp.repository;

import com.examly.springapp.model.Submission;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface SubmissionRepository extends JpaRepository<Submission, Long> {

    List<Submission> findByStudentId(Long studentId);

    List<Submission> findByCourseId(Long courseId);

    Optional<Submission> findByStudentIdAndCourseId(Long studentId, Long courseId);
}
