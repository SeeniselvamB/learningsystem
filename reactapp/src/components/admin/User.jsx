import React, { useEffect, useState } from "react";
import * as api from "../../api";
import "../../styles/AdminUser.css";

export default function User({ users }) {
    const [enrollmentsMap, setEnrollmentsMap] = useState({});
    const [coursesMap, setCoursesMap] = useState({});
    const [modalUser, setModalUser] = useState(null);

    
    useEffect(() => {
        const fetchCourses = async () => {
            try {
                const allCourses = await api.getAllCourses();
                const map = {};
                allCourses.forEach(c => {
                    map[c.id] = c.title;
                });
                setCoursesMap(map);
            } catch (err) {
                console.error("Error fetching courses:", err);
            }
        };
        fetchCourses();
    }, []);

    
    useEffect(() => {
        const fetchEnrollments = async () => {
            const map = {};
            for (const u of users) {
                try {
                    const enrolledCourses = await api.getStudentEnrollments(u.id);
                    map[u.id] = enrolledCourses;
                } catch (err) {
                    console.error(`Error fetching enrollments for user ${u.id}:`, err);
                    map[u.id] = [];
                }
            }
            setEnrollmentsMap(map);
        };

        if (users.length > 0) fetchEnrollments();
    }, [users]);

    
    useEffect(() => {
        if (modalUser) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "auto";
        }

        return () => {
            document.body.style.overflow = "auto";
        };
    }, [modalUser]);

    return (
        <div className="user-container">
            <h2 className="user-header">All Users & Enrollments</h2>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>S.No</th>
                        <th>Full Name</th>
                        <th>Username</th>
                        <th>Role</th>
                        <th>Courses</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((u, idx) => {
                        const enrollments = enrollmentsMap[u.id] || [];
                        const courseText =
                            enrollments.length === 0
                                ? "None"
                                : `${enrollments.length} Course${enrollments.length > 1 ? "s" : ""}`;

                        return (
                            <tr key={u.id}>
                                <td>{idx + 1}</td>
                                <td>{u.fullName}</td>
                                <td>{u.username}</td>
                                <td>
                                    <span className={`role-badge ${u.role.toLowerCase()}`}>
                                        {u.role}
                                    </span>
                                </td>
                                <td className="courses-cell">
                                    <span>{courseText}</span>
                                    {enrollments.length > 0 && (
                                        <button
                                            className="view-btn-right"
                                            onClick={() =>
                                                setModalUser({ user: u, courses: enrollments })
                                            }
                                        >
                                            View
                                        </button>
                                    )}
                                </td>
                            </tr>
                        );
                    })}
                </tbody>
            </table>

            
            {modalUser && (
                <div className="modal-overlay">
                    <div className="modal-content slide-in">
                        <div className="modal-header">
                            <h3>{modalUser.user.fullName}'s Courses</h3>
                            <button className="close-btn" onClick={() => setModalUser(null)}>
                                ×
                            </button>
                        </div>
                        <div className="modal-body">
                            <table className="modal-table">
                                <thead>
                                    <tr>
                                        <th>S.No</th>
                                        <th>Course Name</th>
                                        <th>Score</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {modalUser.courses.map((c, idx) => (
                                        <tr key={idx}>
                                            <td>{idx + 1}</td>
                                            <td>{coursesMap[c.courseId] || "Unknown"}</td>
                                            <td>
                                                <span
                                                    className={`course-score ${
                                                        c.score !== null ? "completed" : "not-started"
                                                    }`}
                                                >
                                                    {c.score !== null ? c.score : "Not Started"}
                                                </span>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
