import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../api";
import "../styles/Dashboard.css";

export default function StudentDashboard() {
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        api.fetchCourses().then((allCourses) => {
            const studentCourses = allCourses.filter((c) => c.enrolled === true);
            setEnrolledCourses(studentCourses);
        });
    }, []);

    return (
        <div className="dashboard-container">
            <h2 className="dashboard-title">🎓 Student Dashboard</h2>
            <p>Welcome! Here are your enrolled courses:</p>

            {enrolledCourses.length === 0 ? (
                <p>You are not enrolled in any courses yet.</p>
            ) : (
                <ul className="dashboard-course-list">
                    {enrolledCourses.map((c) => (
                        <li key={c.id} className="dashboard-course-item">
                            <h3>{c.title}</h3>
                            <p>{c.description}</p>
                            <div className="dashboard-buttons">
                                <button
                                    onClick={() => navigate(`/progress/${c.id}`)}
                                    className="btn"
                                >
                                    Track Progress
                                </button>
                                <button
                                    onClick={() => navigate(`/quiz/${c.id}`)}
                                    className="btn"
                                >
                                    Take Quiz
                                </button>
                            </div>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}
