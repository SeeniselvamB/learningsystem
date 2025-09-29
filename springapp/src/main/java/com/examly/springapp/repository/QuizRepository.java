package com.examly.springapp.repository;

import com.examly.springapp.model.Quiz;
import com.examly.springapp.model.CourseModule;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {
    List<Quiz> findByCourse(CourseModule course);
}
