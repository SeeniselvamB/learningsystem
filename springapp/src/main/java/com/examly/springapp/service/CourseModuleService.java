package com.examly.springapp.service;

import com.examly.springapp.model.CourseModule;
import com.examly.springapp.repository.CourseModuleRepository;
import org.springframework.stereotype.Service;

import java.util.*;

@Service
public class CourseModuleService {

    private final CourseModuleRepository repo;

    public CourseModuleService(CourseModuleRepository repo) {
        this.repo = repo;
    }

    public CourseModule addCourse(CourseModule course) {
        return repo.save(course);
    }

    public List<CourseModule> getAllCourses() {
        return repo.findAll();
    }

    public Optional<CourseModule> getCourse(Long id) {
        return repo.findById(id);
    }

    public CourseModule enrollStudent(Long id, String student) {
        CourseModule course = repo.findById(id).orElseThrow();
        course.getEnrolledStudents().add(student);
        return repo.save(course);
    }

    public CourseModule updateProgress(Long id, String student, int progress) {
        CourseModule course = repo.findById(id).orElseThrow();
        course.getProgress().put(student, progress);
        return repo.save(course);
    }

    public List<String> getQuiz(Long id) {
        CourseModule course = repo.findById(id).orElseThrow();
        return course.getQuizQuestions();
    }

    public String submitScore(Long id, String student, int score) {
        CourseModule course = repo.findById(id).orElseThrow();
        course.getScores().put(student, score);
        repo.save(course);
        return "Score submitted!";
    }
    
    public CourseModule updateCourse(Long id, CourseModule updatedCourse) {
    CourseModule course = repo.findById(id).orElseThrow();
    course.setTitle(updatedCourse.getTitle());
    course.setDescription(updatedCourse.getDescription());
    course.setQuizQuestions(updatedCourse.getQuizQuestions());
    return repo.save(course);
    }

    public void deleteCourse(Long id) {
        repo.deleteById(id);
    }
    

}