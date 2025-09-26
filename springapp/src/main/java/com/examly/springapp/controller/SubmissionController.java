package com.examly.springapp.controller;

import com.examly.springapp.model.Submission;
import com.examly.springapp.service.SubmissionService;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/submissions")
@CrossOrigin(origins = "*")
public class SubmissionController {

    private final SubmissionService service;

    public SubmissionController(SubmissionService service) {
        this.service = service;
    }

    @PostMapping
    public Submission submit(@RequestBody Submission submission) {
        return service.submit(submission);
    }

    @GetMapping("/{id}")
    public Submission getSubmission(@PathVariable Long id) {
        return service.getSubmission(id);
    }
}
