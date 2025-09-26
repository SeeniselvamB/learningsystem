import React, { useEffect, useState } from "react";
import { courses } from "../api";
import CourseCard from "./CourseCard";
import "../styles/Dashboard.css";

export default function Dashboard({ user }) {
    const [courseList, setCourseList] = useState([]);

    useEffect(() => {
        courses.list().then(setCourseList).catch(console.error);
    }, []);

    return (
        <div className="dashboard">
            <h2>Dashboard</h2>
            <div>Welcome, {user ? user.fullName || user.username : "Guest"}</div>
            <section className="cards">
                {courseList.map(c => <CourseCard key={c.id} course={c} />)}
            </section>
        </div>
    );
}
