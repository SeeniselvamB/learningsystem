import React from "react";

export default function CourseCard({ course }) {
    return (
        <div className="course-card">
            <h3>{course.title}</h3>
            <p>Code: {course.courseCode}</p>
            <p>{course.description}</p>
        </div>
    );
}