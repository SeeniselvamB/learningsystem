package com.examly.springapp.service;

import com.examly.springapp.model.Quiz;
import com.examly.springapp.model.CourseModule;
import com.examly.springapp.repository.QuizRepository;
import com.examly.springapp.repository.CourseModuleRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class QuizService {

    private final QuizRepository quizRepo;
    private final CourseModuleRepository courseRepo;

    public QuizService(QuizRepository quizRepo, CourseModuleRepository courseRepo) {
        this.quizRepo = quizRepo;
        this.courseRepo = courseRepo;
    }

    public Quiz addQuiz(Long courseId, Quiz quiz) {
        CourseModule course = courseRepo.findById(courseId).orElseThrow();
        quiz.setCourse(course);
        return quizRepo.save(quiz);
    }

    public Quiz updateQuiz(Long id, Quiz updatedQuiz) {
        Quiz quiz = quizRepo.findById(id).orElseThrow();
        quiz.setQuestion(updatedQuiz.getQuestion());
        quiz.setOptions(updatedQuiz.getOptions());
        quiz.setCorrectIndex(updatedQuiz.getCorrectIndex());
        return quizRepo.save(quiz);
    }

    public void deleteQuiz(Long id) {
        quizRepo.deleteById(id);
    }

    public List<Quiz> getAllQuizzesByCourse(Long courseId) {
        CourseModule course = courseRepo.findById(courseId).orElseThrow();
        return quizRepo.findByCourse(course);
    }

    public Quiz getQuizById(Long id) {
        return quizRepo.findById(id).orElseThrow();
    }
}
