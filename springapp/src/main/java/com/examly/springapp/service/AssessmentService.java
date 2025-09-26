package com.examly.springapp.service;

import com.examly.springapp.model.Assessment;
import com.examly.springapp.repository.AssessmentRepository;
import org.springframework.stereotype.Service;
import java.util.List;

@Service
public class AssessmentService {

    private final AssessmentRepository repo;

    public AssessmentService(AssessmentRepository repo) {
        this.repo = repo;
    }

    public Assessment createAssessment(Assessment assessment) {
        return repo.save(assessment);
    }

    public List<Assessment> getByCourse(Long courseId) {
        return repo.findByCourseId(courseId);
    }
}
