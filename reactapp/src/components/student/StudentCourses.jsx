import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api";
import "../../styles/Course.css";

export default function StudentCourses() {
    const [myCourses, setMyCourses] = useState([]);
    const navigate = useNavigate();

    const fetchMyCourses = async () => {
        try {
            const user = JSON.parse(localStorage.getItem("user"));
            if (!user) return;

            const enrolledData = await api.getStudentEnrollments(user.id);
            const allCourses = await api.getAllCourses();

            const merged = enrolledData.map((en) => {
                const course = allCourses.find((c) => c.id === en.courseId);
                return { ...course, ...en };
            });

            setMyCourses(merged);
        } catch (err) {
            console.error("Error fetching my courses:", err);
        }
    };

    useEffect(() => {
        fetchMyCourses();
    }, []);

    if (!myCourses || myCourses.length === 0) {
        return <p>You are not enrolled in any courses yet.</p>;
    }

    const handleStartOrRetake = (courseId) => {
        navigate(`/student/quiz/${courseId}`);
    };

    return (
        <div className="courses-section">
            <h3>My Enrolled Courses</h3>
            <div className="courses-grid">
                {myCourses.map((course) => (
                    <div key={course.id} className="course-card">
                        <h4>{course.title}</h4>
                        <p>{course.description}</p>

                        {course.status === "ENROLLED" && (
                            <button
                                className="start-quiz-btn"
                                onClick={() => handleStartOrRetake(course.id)}
                            >
                                Start Quiz
                            </button>
                        )}

                        {course.status === "COMPLETED" && (
                            <>
                                <button className="completed-btn" disabled>
                                    Completed (Score: {course.score})
                                </button>
                                <button
                                    className="retake-btn"
                                    onClick={() => handleStartOrRetake(course.id)}
                                >
                                    Retake Quiz
                                </button>
                            </>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
