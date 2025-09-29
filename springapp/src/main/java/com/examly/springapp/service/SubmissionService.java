package com.examly.springapp.service;

import com.examly.springapp.model.Submission;
import com.examly.springapp.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class SubmissionService {

    private final SubmissionRepository submissionRepository;

    public SubmissionService(SubmissionRepository submissionRepository) {
        this.submissionRepository = submissionRepository;
    }

    public Submission submitQuiz(Long studentId, Long courseId, int score) {
        Submission submission = new Submission();
        submission.setStudentId(studentId);
        submission.setCourseId(courseId);
        submission.setScore(score);
        submission.setSubmittedAt(LocalDateTime.now()); // ✅ Use LocalDateTime

        return submissionRepository.save(submission);
    }

    public List<Submission> getSubmissionsByStudent(Long studentId) {
        return submissionRepository.findByStudentId(studentId);
    }

    public List<Submission> getSubmissionsByCourse(Long courseId) {
        return submissionRepository.findByCourseId(courseId);
    }

    public Submission getSubmission(Long studentId, Long courseId) {
        return submissionRepository.findByStudentIdAndCourseId(studentId, courseId)
                .orElse(null);
    }
}
