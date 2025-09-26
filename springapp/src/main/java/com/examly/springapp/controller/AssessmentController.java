package com.examly.springapp.controller;

import com.examly.springapp.model.Assessment;
import com.examly.springapp.service.AssessmentService;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequestMapping("/api/assessments")
@CrossOrigin(origins = "*")
public class AssessmentController {

    private final AssessmentService service;

    public AssessmentController(AssessmentService service) {
        this.service = service;
    }

    @PostMapping
    public Assessment createAssessment(@RequestBody Assessment assessment) {
        return service.createAssessment(assessment);
    }
    


    @GetMapping("/course/{courseId}")
    public List<Assessment> getByCourse(@PathVariable Long courseId) {
        return service.getByCourse(courseId);
    }
}
