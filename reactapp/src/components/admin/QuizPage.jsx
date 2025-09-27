import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as api from "../../api";
import "../../styles/QuizPage.css";

export default function QuizPage() {
    const { courseId } = useParams();
    const navigate = useNavigate();

    const [course, setCourse] = useState(null);
    const [quizzes, setQuizzes] = useState([]);
    const [newQuiz, setNewQuiz] = useState({ question: "", options: ["", "", "", ""], correctIndex: 0 });
    const [editingQuiz, setEditingQuiz] = useState(null);

    useEffect(() => {
        const fetchCourse = async () => {
            try {
                const courses = await api.getAllCourses();
                const c = courses.find(c => c.id === parseInt(courseId));
                setCourse(c);
            } catch (err) { console.error(err); }
        };

        const fetchQuizzes = async () => {
            try {
                const data = await api.getQuizzesByCourse(courseId);
                setQuizzes(data);
            } catch (err) { console.error(err); }
        };

        fetchCourse();
        fetchQuizzes();
    }, [courseId]); 

    const handleSaveQuiz = async () => {
        try {
            if (editingQuiz) {
                await api.updateQuiz(editingQuiz.id, { ...newQuiz, courseId: parseInt(courseId) });
            } else {
                await api.addQuiz(parseInt(courseId), newQuiz);
            }
            setNewQuiz({ question: "", options: ["", "", "", ""], correctIndex: 0 });
            setEditingQuiz(null);
            const data = await api.getQuizzesByCourse(courseId);
            setQuizzes(data);
        } catch (err) { console.error(err); }
    };

    const handleEditQuiz = (quiz) => {
        setEditingQuiz(quiz);
        setNewQuiz({ question: quiz.question, options: quiz.options, correctIndex: quiz.correctIndex });
    };

    const handleDeleteQuiz = async (id) => {
        if (!window.confirm("Delete this quiz?")) return;
        try {
            await api.deleteQuiz(id);
            const data = await api.getQuizzesByCourse(courseId);
            setQuizzes(data);
        } catch (err) { console.error(err); }
    };

    return (
        <div className="quizpage-container">
            <h2>Quiz Management for "{course?.title}"</h2>
            <button onClick={() => navigate("/admin/courses")}>Back to Courses</button>

            <div className="quiz-form">
                <input
                    type="text"
                    placeholder="Question"
                    value={newQuiz.question}
                    onChange={e => setNewQuiz({ ...newQuiz, question: e.target.value })}
                />
                {newQuiz.options.map((opt, i) => (
                    <input
                        key={i}
                        type="text"
                        placeholder={`Option ${i + 1}`}
                        value={opt}
                        onChange={e => {
                            const updatedOptions = [...newQuiz.options];
                            updatedOptions[i] = e.target.value;
                            setNewQuiz({ ...newQuiz, options: updatedOptions });
                        }}
                    />
                ))}
                <input
                    type="number"
                    min="0"
                    max="3"
                    placeholder="Correct Index"
                    value={newQuiz.correctIndex}
                    onChange={e => setNewQuiz({ ...newQuiz, correctIndex: parseInt(e.target.value) })}
                />
                <button onClick={handleSaveQuiz}>
                    {editingQuiz ? "Update Quiz" : "Add Quiz"}
                </button>
                <button
                    onClick={() => {
                        setEditingQuiz(null);
                        setNewQuiz({ question: "", options: ["", "", "", ""], correctIndex: 0 });
                    }}
                >
                    Cancel
                </button>
            </div>

            <ul className="quiz-list">
                {quizzes.map(q => (
                    <li key={q.id}>
                        <strong>{q.question}</strong>
                        <ul>{q.options.map((o, idx) => <li key={idx}>{o}</li>)}</ul>
                        <p>Correct Index: {q.correctIndex}</p>
                        <button onClick={() => handleEditQuiz(q)}>Edit</button>
                        <button onClick={() => handleDeleteQuiz(q.id)}>Delete</button>
                    </li>
                ))}
            </ul>
        </div>
    );
}
