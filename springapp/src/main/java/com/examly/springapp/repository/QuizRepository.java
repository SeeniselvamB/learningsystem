package com.examly.springapp.repository;

import com.examly.springapp.model.Quiz;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import java.util.List;

public interface QuizRepository extends JpaRepository<Quiz, Long> {

    @Query("SELECT q FROM Quiz q WHERE q.course.id = :courseId")
    List<Quiz> findByCourseId(@Param("courseId") Long courseId);
}
