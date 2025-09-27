import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Profile from "./Profile";
import StudentCourses from "./StudentCourses";
import AllCourses from "./AllCourses";
import * as api from "../../api";
import "../../styles/StudentDashboard.css";

export default function StudentDashboard() {
    const [activeTab, setActiveTab] = useState("profile");
    const [user, setUser] = useState(null);
    const [allCourses, setAllCourses] = useState([]);
    const [enrolledCourses, setEnrolledCourses] = useState([]);

    const loggedUser = JSON.parse(localStorage.getItem("user"));
    const userId = loggedUser?.id;

    useEffect(() => {
        const fetchData = async () => {
            try {
                if (!userId) return;

                // Get profile
                const profileData = await api.getProfile(userId);
                setUser(profileData);

                // Get enrollments
                const enrollments = await api.getStudentEnrollments(userId);
                const enrolledCourseIds = enrollments.map(e => e.courseId);

                // Get all courses
                const coursesData = await api.getAllCourses();
                setAllCourses(coursesData);

                // Filter enrolled course objects
                setEnrolledCourses(coursesData.filter(c => enrolledCourseIds.includes(c.id)));

            } catch (err) {
                console.error(err);
            }
        };

        fetchData();
    }, [userId]);

    return (
        <div className="dashboard-container">
            <header>
                <h2>Welcome, {user?.fullName || loggedUser?.username}</h2>
                <div className="tabs">
                    <button className={activeTab === "profile" ? "active" : ""} onClick={() => setActiveTab("profile")}>
                        Profile
                    </button>
                    <button className={activeTab === "enrolled" ? "active" : ""} onClick={() => setActiveTab("enrolled")}>
                        My Courses
                    </button>
                    <button className={activeTab === "all" ? "active" : ""} onClick={() => setActiveTab("all")}>
                        All Courses
                    </button>
                </div>
            </header>

            <div className="tab-content">
                {activeTab === "profile" && <Profile user={user} />}
                {activeTab === "enrolled" && <StudentCourses courses={enrolledCourses} />}
                {activeTab === "all" && <AllCourses userId={userId} setMyCourses={setEnrolledCourses} />}
            </div>
        </div>
    );
}
