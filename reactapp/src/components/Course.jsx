import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import CourseForm from "./CourseForm";
import * as api from "../api";
import "../styles/Course.css";

export default function Course() {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [editingCourse, setEditingCourse] = useState(null);

    const navigate = useNavigate(); // router navigation

    const fetchCourses = async () => {
        try {
            const data = await api.getAllCourses();
            setCourses(data);
        } catch (err) {
            console.error(err);
        }
    };

    useEffect(() => { fetchCourses(); }, []);

    const toggleForm = () => {
        setEditingCourse(null);
        setShowForm(!showForm);
    };

    const handleAddCourse = async (course) => {
        try {
            const added = await api.addCourse(course);
            setCourses([...courses, added]);
            setShowForm(false);
        } catch (err) { console.error(err); }
    };

    const handleDeleteCourse = async (id) => {
        if (!window.confirm("Are you sure you want to delete this course?")) return;
        try {
            await api.deleteCourse(id);
            setCourses(courses.filter(c => c.id !== id));
        } catch (err) { console.error(err); }
    };

    const handleManageQuiz = (course) => {
        navigate(`/admin/quiz/${course.id}`);
    };

    return (
        <div className="course-container">
            {!showForm ? (
                <>
                    <button className="add-course-btn" onClick={toggleForm}>Add Course</button>
                    <div className="courses-grid">
                        {courses.map(course => (
                            <div key={course.id} className="course-card">
                                <h3 className="course-title">{course.title}</h3>
                                <p className="course-desc">{course.description}</p>
                                <div className="course-buttons">
                                    <button onClick={() => handleManageQuiz(course)}>Manage Quiz</button>
                                    <button className="delete-btn" onClick={() => handleDeleteCourse(course.id)}>Delete</button>
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            ) : (
                <CourseForm
                    courseData={editingCourse}
                    onSave={handleAddCourse}
                    onCancel={() => setShowForm(false)}
                />
            )}
        </div>
    );
}
