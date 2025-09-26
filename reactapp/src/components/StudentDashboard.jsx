import React, { useEffect, useState } from "react";
import { getAllCourses, enrollCourse } from "../api";
import "../styles/StudentDashboard.css";

export default function StudentDashboard() {
    const [courses, setCourses] = useState([]);
    const [username, setUsername] = useState("student1"); // placeholder

    // Fetch all courses
    const fetchCourses = async () => {
        try {
            const coursesData = await getAllCourses();
            setCourses(coursesData);
        } catch (err) {
            console.error("Error fetching courses:", err);
        }
    };

    useEffect(() => {
        fetchCourses();
    }, []);

    // Enroll in course
    const handleEnroll = async (courseId) => {
        try {
            await enrollCourse(courseId, username);
            alert("Enrolled successfully!");
            fetchCourses(); // refresh courses after enrolling
        } catch (err) {
            console.error("Enrollment error:", err);
        }
    };

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Welcome, {username}</h2>
            </header>

            <section className="courses-section">
                <h3>Available Courses</h3>
                <div className="courses-grid">
                    {courses.map((course) => {
                        const enrolled = course.enrolledStudents?.includes(username);
                        return (
                            <div key={course.id} className="course-card">
                                <h4 className="course-title">{course.title}</h4>
                                <p className="course-desc">{course.description}</p>
                                <div className="course-footer">
                                    {!enrolled ? (
                                        <button className="enroll-btn" onClick={() => handleEnroll(course.id)}>Enroll</button>
                                    ) : (
                                        <button className="enrolled-btn" disabled>Enrolled</button>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    );
}


