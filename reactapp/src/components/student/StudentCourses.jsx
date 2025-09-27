import React from "react";
import { useNavigate } from "react-router-dom";
import "../../styles/Course.css";

export default function StudentCourses({ courses, username }) {
    const navigate = useNavigate();

    if (!courses || courses.length === 0) {
        return <p>You are not enrolled in any courses yet.</p>;
    }

    return (
        <div className="courses-section">
            <h3>My Enrolled Courses</h3>
            <div className="courses-grid">
                {courses.map(course => (
                    <div key={course.id} className="course-card">
                        <h4>{course.title}</h4>
                        <p>{course.description}</p>
                        <button
                            className="start-quiz-btn"
                            onClick={() => navigate(`/student/quiz/${course.id}`)}
                        >
                            Go to Quiz
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
}
