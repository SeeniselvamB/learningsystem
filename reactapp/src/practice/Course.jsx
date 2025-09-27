import React, { useState } from "react";
import "./Course.css"; 

export default function Course() {
    const [courses, setCourses] = useState([]);
    const [showForm, setShowForm] = useState(false);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [visibleCount, setVisibleCount] = useState(5); 

    const handleAddCourse = () => {
        if (title.trim() === "" || description.trim() === "") return;

        const newCourse = { id: Date.now(), title, description };
        setCourses([...courses, newCourse]);
        setTitle("");
        setDescription("");
        setShowForm(false);
    };

    return (
        <div className="course-container">
            <h1 className="course-title">Course Management</h1>

            <button
                onClick={() => setShowForm(!showForm)}
                className="btn btn-primary"
            >
                {showForm ? "Close Form" : "Add Course"}
            </button>

            {showForm && (
                <div className="course-form">
                    <input
                        type="text"
                        placeholder="Course Title"
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className="input-field"
                    />
                    <textarea
                        placeholder="Course Description"
                        value={description}
                        onChange={(e) => setDescription(e.target.value)}
                        className="input-field"
                    />
                    <button onClick={handleAddCourse} className="btn btn-success">
                        Add Course
                    </button>
                </div>
            )}


            <div className="course-grid">
                {courses.slice(0, visibleCount).map((course) => (
                    <div key={course.id} className="course-card">
                        <h2>{course.title}</h2>
                        <p>{course.description}</p>
                    </div>
                ))}
            </div>

            {courses.length > visibleCount && (
                <div className="load-more">
                    <button
                        onClick={() => setVisibleCount(visibleCount + 5)}
                        className="btn btn-load"
                    >
                        Load More
                    </button>
                </div>
            )}
        </div>
    );
}
