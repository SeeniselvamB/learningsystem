import React, { useState, useEffect } from "react";
import Course from "./Course";
import Profile from "./Profile";
import User from "./User";
import QuizPage from "./QuizPage";
import { getAllUsers, getAllCourses } from "../../api";
import { useNavigate } from "react-router-dom";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
    const admin = { fullName: "Seeniselvam", username: "Seeniselvam", role: "ADMIN" };

    const [activeTab, setActiveTab] = useState("profile");
    const [users, setUsers] = useState([]);
    const [courses, setCourses] = useState([]);
    const [selectedCourseId, setSelectedCourseId] = useState(null);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user");
        navigate("/");
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                setUsers(await getAllUsers());
                setCourses(await getAllCourses());
            } catch (err) { console.error(err); }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <header className="dashboard-header">
                <h2>Admin Dashboard</h2>
                <div className="admin-info">
                    <span>Welcome, <strong>{admin.fullName}</strong></span>
                    <button className="logout-btn" onClick={handleLogout}>Logout</button>
                </div>
                <div className="tabs">
                    {["profile", "users", "courses"].map(tab => (
                        <button
                            key={tab}
                            className={`tab-btn ${activeTab === tab ? "active" : ""}`}
                            onClick={() => {
                                setActiveTab(tab);
                                setSelectedCourseId(null); 
                            }}
                        >
                            {tab.charAt(0).toUpperCase() + tab.slice(1)}
                        </button>
                    ))}
                </div>
            </header>

            <div className="tab-content">
                {activeTab === "profile" && <Profile admin={admin} />}
                {activeTab === "users" && <User users={users} />}
                {activeTab === "courses" && !selectedCourseId && (
                    <Course
                        courses={courses}
                        setCourses={setCourses}
                        onManageQuiz={(courseId) => setSelectedCourseId(courseId)}
                    />
                )}
                {selectedCourseId && <QuizPage courseId={selectedCourseId} />}
            </div>
        </div>
    );
}
