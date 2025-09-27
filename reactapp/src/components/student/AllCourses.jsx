import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import * as api from "../../api";
import "../../styles/Course.css";

export default function AllCourses({ username, setMyCourses }) {
    const [courses, setCourses] = useState([]);
    const [enrolledCourseIds, setEnrolledCourseIds] = useState([]);
    const navigate = useNavigate();

    const fetchCourses = async () => {
        try {
            const data = await api.getAllCourses();
            setCourses(data);

            // Fetch enrolled courses for the user
            const enrolledData = await api.getStudentEnrollments(username);
            const ids = enrolledData.map(e => e.courseId);
            setEnrolledCourseIds(ids);

        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    useEffect(() => { fetchCourses(); }, []);

    const handleEnroll = async (course) => {
        try {
            // await api.enrollCourse(username, course.id);
            const loggedUser = JSON.parse(localStorage.getItem("user"));
            const userId = loggedUser?.id;
            await api.enrollCourse(course.id, userId);
            alert("Enrolled successfully!");
            setEnrolledCourseIds(prev => [...prev, course.id]);
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
                    const isEnrolled = enrolledCourseIds.includes(course.id);
                    return (
                        <div key={course.id} className="course-card">
                            <h4>{course.title}</h4>
                            <p>{course.description}</p>
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
