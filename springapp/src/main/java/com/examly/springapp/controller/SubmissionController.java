package com.examly.springapp.controller;

import com.examly.springapp.model.Submission;
import com.examly.springapp.service.SubmissionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {

    private final SubmissionService submissionService;

    public SubmissionController(SubmissionService submissionService) {
        this.submissionService = submissionService;
    }

    @PostMapping("/submit")
    public ResponseEntity<Submission> submitQuiz(
            @RequestParam Long studentId,
            @RequestParam Long courseId,
            @RequestParam int score
    ) {
        Submission submission = submissionService.submitQuiz(studentId, courseId, score);
        return ResponseEntity.ok(submission);
    }

    @GetMapping("/student/{studentId}")
    public ResponseEntity<List<Submission>> getByStudent(@PathVariable Long studentId) {
        List<Submission> submissions = submissionService.getSubmissionsByStudent(studentId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/course/{courseId}")
    public ResponseEntity<List<Submission>> getByCourse(@PathVariable Long courseId) {
        List<Submission> submissions = submissionService.getSubmissionsByCourse(courseId);
        return ResponseEntity.ok(submissions);
    }

    @GetMapping("/student/{studentId}/course/{courseId}")
    public ResponseEntity<Submission> getSubmission(
            @PathVariable Long studentId,
            @PathVariable Long courseId
    ) {
        Submission submission = submissionService.getSubmission(studentId, courseId);
        return ResponseEntity.ok(submission);
    }
}
