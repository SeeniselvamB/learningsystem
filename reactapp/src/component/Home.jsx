import React from "react";
import { Link } from "react-router-dom";
import "../styles/Home.css";

export default function Home() {
    return (
        <div className="home">
            <header className="home-header">
                <h1>LMS Lite</h1>
                <p>Lightweight learning management for institutions — demo scaffold.</p>
            </header>
            <section className="home-features">
                <div className="feature">
                    <h3>Course Management</h3>
                    <p>Create, publish and manage courses.</p>
                </div>
                <div className="feature">
                    <h3>Assessments</h3>
                    <p>Create quizzes and assignments (starter).</p>
                </div>
                <div className="feature">
                    <h3>Analytics</h3>
                    <p>Basic progress tracking & reporting dashboards (starter).</p>
                </div>
            </section>
        </div>
    );
}
