// src/components/student/QuizPage.jsx
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getQuizzesByCourse, updateProgress } from "../../api";
import "../../styles/QuizPage.css";

export default function QuizPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [quizzes, setQuizzes] = useState([]);
    const [answers, setAnswers] = useState({});

    // Fetch quizzes for this course
    const fetchQuizzes = async () => {
        try {
            const data = await getQuizzesByCourse(courseId);
            setQuizzes(data);
        } catch (err) {
            console.error("Error fetching quizzes:", err);
        }
    };

    useEffect(() => {
        fetchQuizzes();
    }, [courseId]);

    // Handle selecting an answer
    const handleAnswerChange = (quizIndex, optionIndex) => {
        setAnswers({ ...answers, [quizIndex]: optionIndex });
    };

    // Handle quiz submission
    const handleSubmitQuiz = async () => {
        try {
            let score = 0;
            quizzes.forEach((quiz, index) => {
                if (answers[index] === quiz.correctIndex) score++;
            });

            const user = JSON.parse(localStorage.getItem("user")); // 👈 logged-in user
            if (!user) {
                alert("You must be logged in to submit the quiz.");
                return;
            }

            await updateProgress(courseId, user.username, score);
            alert(`Quiz submitted! Your score: ${score}/${quizzes.length}`);
            navigate("/student"); // back to dashboard
        } catch (err) {
            console.error("Error submitting quiz:", err);
        }
    };

    return (
        <div className="quizpage-container">
            <h2>Course Quiz</h2>

            {quizzes.length === 0 ? (
                <p>No quizzes available for this course.</p>
            ) : (
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        handleSubmitQuiz();
                    }}
                >
                    {quizzes.map((quiz, qIndex) => (
                        <div key={quiz.id} className="quiz-question">
                            <h4>{quiz.question}</h4>
                            <ul>
                                {quiz.options.map((option, oIndex) => (
                                    <li key={oIndex}>
                                        <label>
                                            <input
                                                type="radio"
                                                name={`quiz-${qIndex}`}
                                                value={oIndex}
                                                checked={answers[qIndex] === oIndex}
                                                onChange={() =>
                                                    handleAnswerChange(qIndex, oIndex)
                                                }
                                            />
                                            {option}
                                        </label>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    ))}

                    <button type="submit" className="submit-btn">
                        Submit Quiz
                    </button>
                </form>
            )}
        </div>
    );
}
