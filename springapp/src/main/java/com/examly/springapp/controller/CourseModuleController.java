package com.examly.springapp.controller;

import com.examly.springapp.model.CourseModule;
import com.examly.springapp.service.CourseModuleService;
import org.springframework.web.bind.annotation.*;

import java.util.*;

@RestController
@RequestMapping("/api/courses")
@CrossOrigin(origins = "*")
public class CourseModuleController {

    private final CourseModuleService service;

    public CourseModuleController(CourseModuleService service) {
        this.service = service;
    }

    @PostMapping
    public CourseModule addCourse(@RequestBody CourseModule course) {
        return service.addCourse(course);
    }

    @GetMapping
    public List<CourseModule> getAllCourses() {
        return service.getAllCourses();
    }

    @PutMapping("/{id}/enroll")
    public CourseModule enrollStudent(@PathVariable Long id, @RequestParam String student) {
        return service.enrollStudent(id, student);
    }


    @PutMapping("/{id}/progress")
    public CourseModule updateProgress(@PathVariable Long id,
            @RequestParam String student,
            @RequestParam int progress) {
        return service.updateProgress(id, student, progress);
    }

    @PutMapping("/{id}/enrolled")
    public CourseModule enrollStudent(@PathVariable Long id, @RequestBody Map<String, String> body) {
        String student = body.get("student");
            return service.enrollStudent(id, student);
    }


    @GetMapping("/{id}/quiz")
    public List<String> getQuiz(@PathVariable Long id) {
        return service.getQuiz(id);
    }

    @PostMapping("/{id}/quiz")
    public String submitScore(@PathVariable Long id,
            @RequestParam String student,
            @RequestParam int score) {
        return service.submitScore(id, student, score);
    }

    @PutMapping("/{id}")
    public CourseModule updateCourse(@PathVariable Long id, @RequestBody CourseModule course) {
    return service.updateCourse(id, course);
    }

    @DeleteMapping("/{id}")
    public void deleteCourse(@PathVariable Long id) {
        service.deleteCourse(id);
    }

}