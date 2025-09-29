package com.examly.springapp.controller;

import com.examly.springapp.model.Submission;
import com.examly.springapp.service.SubmissionService;
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
    public Submission submitQuiz(
            @RequestParam Long studentId,
            @RequestParam Long courseId,
            @RequestParam int score
    ) {
        return submissionService.submitQuiz(studentId, courseId, score);
    }

    @GetMapping("/student/{studentId}")
    public List<Submission> getStudentSubmissions(@PathVariable Long studentId) {
        return submissionService.getSubmissionsByStudent(studentId);
    }

    @GetMapping("/course/{courseId}")
    public List<Submission> getCourseSubmissions(@PathVariable Long courseId) {
        return submissionService.getSubmissionsByCourse(courseId);
    }
}
