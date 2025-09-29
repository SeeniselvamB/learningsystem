import React, { useState, useEffect } from "react";
import {useNavigate } from "react-router-dom";
import Course from "./Course";
import Profile from "./Profile";
import User from "./User";
import { getAllUsers, getAllCourses } from "../../api";
import "../../styles/AdminDashboard.css";

export default function AdminDashboard() {
    const admin = { fullName: "Seeniselvam", username: "Seeniselvam", role: "ADMIN" };

    const [activeTab, setActiveTab] = useState("profile");
    const [users, setUsers] = useState([]); 
    const [courses, setCourses] = useState([]);
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("user"); // clear user session
        navigate("/"); // go back to home page
    };


    useEffect(() => {
        const fetchData = async () => {
            try {
                setUsers(await getAllUsers());
                setCourses(await getAllCourses());
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, []);

    return (
        <div className="dashboard-container">
            <header>
                <h2>Admin: {admin.fullName}</h2>
                <div className="tabs">
                    <button
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                    <button
                        className={activeTab === "users" ? "active" : ""}
                        onClick={() => setActiveTab("users")}
                    >
                        Users
                    </button>
                    <button
                        className={activeTab === "courses" ? "active" : ""}
                        onClick={() => setActiveTab("courses")}
                    >
                        Courses
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="tab-content">
                {activeTab === "profile" && <Profile admin={admin} />}
                {activeTab === "users" && <User users={users} />}
                {activeTab === "courses" && <Course courses={courses} setCourses={setCourses} />}
            </div>
        </div>
    );
}
