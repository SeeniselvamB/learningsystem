import React, { useState, useEffect } from "react";
import Profile from "./Profile";
import StudentCourses from "./StudentCourses"; // For enrolled courses
import AllCourses from "./AllCourses"; // For all available courses
import { getProfile, getAllCourses } from "../../api";
import "../../styles/StudentDashboard.css";

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState(null);
    const [allCourses, setAllCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    // Get logged-in user from localStorage
    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const username = loggedUser?.username;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (username) {
                    const profileData = await getProfile(username);
                    setUser(profileData);
                    setEnrolledCourses(profileData.enrolledCourses || []);
                }

                const coursesData = await getAllCourses();
                setAllCourses(coursesData);
            } catch (err) {
                console.error(err);
            }
        };
        fetchData();
    }, [username]);

    return (
        <div className="dashboard-container">
            <header>
                <h2>Welcome, {user?.fullName || username}</h2>
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
                </div>
            </header>

            <div className="tab-content">
                {activeTab === "profile" && <Profile user={user} />}
                {activeTab === "enrolled" && <StudentCourses courses={enrolledCourses} username={username} />}
                {activeTab === "all" && <AllCourses courses={allCourses} username={username} />}
            </div>
        </div>
    );
}
