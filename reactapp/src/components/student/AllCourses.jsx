import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api";
import "../../styles/Course.css";

export default function AllCourses({ username, setMyCourses }) {
    const [courses, setCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);
    const navigate = useNavigate();

    // Fetch courses from backend
    const fetchCourses = async () => {
        try {
            const data = await api.getAllCourses();
            setCourses(data);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    useEffect(() => { fetchCourses(); }, []);

    const handleEnroll = async (course) => {
        try {
            await api.enrollCourse(course.id, username);
            alert("Enrolled successfully!");
            setEnrolledCourses([...enrolledCourses, course.id]);

            // Add to My Courses page
            if (setMyCourses) setMyCourses(prev => [...prev, course]);
        } catch (err) {
            console.error("Enrollment error:", err);
        }
    };

    return (
        <div className="courses-section">
            <h3>All Available Courses</h3>
            <div className="courses-grid">
                {courses.map(course => {
                    const isEnrolled = enrolledCourses.includes(course.id) || course.enrolledStudents?.includes(username);
                    return (
                        <div key={course.id} className="course-card">
                            <h4 className="course-title">{course.title}</h4>
                            <p className="course-desc">{course.description}</p>
                            {!isEnrolled ? (
                                <button
                                    className="enroll-btn"
                                    onClick={() => handleEnroll(course)}
                                >
                                    Enroll
                                </button>
                            ) : (
                                <button
                                    className="start-quiz-btn"
                                    onClick={() => navigate(`/student/quiz/${course.id}`)}
                                >
                                    Start Quiz
                                </button>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
