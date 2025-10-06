import React, { useEffect, useState } from "react";
import { useLocation,useNavigate } from "react-router-dom";
import Profile from "./Profile";
import StudentCourses from "./StudentCourses";
import AllCourses from "./AllCourses";
import * as api from "../../api";
import "../../styles/StudentDashboard.css";

export default function StudentDashboard() {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeTab, setActiveTab] = useState(location.state?.activeTab || "profile");
    const [user, setUser] = useState(null);

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const userId = loggedUser?.id;

    useEffect(() => {
        const fetchProfile = async () => {
            if (!userId) return;
            const profileData = await api.getProfile(userId);
            setUser(profileData);
        };
        fetchProfile();
    }, [userId]);

    const handleLogout = () => {
        localStorage.removeItem("user"); 
        navigate("/"); 
    };

    return (
        <div className="dashboard-container">
            <header>
                <h2>Welcome, {user?.fullName || loggedUser?.username}</h2>
                <div className="tabs">
                    <button
                        className={activeTab === "profile" ? "active" : ""}
                        onClick={() => setActiveTab("profile")}
                    >
                        Profile
                    </button>
                    <button
                        className={activeTab === "enrolled" ? "active" : ""}
                        onClick={() => setActiveTab("enrolled")}
                    >
                        My Courses
                    </button>
                    <button
                        className={activeTab === "all" ? "active" : ""}
                        onClick={() => setActiveTab("all")}
                    >
                        All Courses
                    </button>
                    <button className="logout-btn" onClick={handleLogout}>
                        Logout
                    </button>
                </div>
            </header>

            <div className="tab-content">
                {activeTab === "profile" && <Profile user={user} />}
                {activeTab === "enrolled" && <StudentCourses />}
                {activeTab === "all" && <AllCourses />}
            </div>
        </div>
    );
}


