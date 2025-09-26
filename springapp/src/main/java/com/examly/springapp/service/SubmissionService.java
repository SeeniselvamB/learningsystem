package com.examly.springapp.service;

import com.examly.springapp.model.Submission;
import com.examly.springapp.repository.SubmissionRepository;
import org.springframework.stereotype.Service;

@Service
public class SubmissionService {

    private final SubmissionRepository repo;

    public SubmissionService(SubmissionRepository repo) {
        this.repo = repo;
    }

    public Submission submit(Submission submission) {
        // scoring logic can be added here
        return repo.save(submission);
    }

    public Submission getSubmission(Long id) {
        return repo.findById(id).orElseThrow();
    }
}
