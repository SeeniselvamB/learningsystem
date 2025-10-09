import React from "react";
import "../../styles/AdminUser.css";

export default function User({ users }) {
    return (
        <div className="user-container">
            <h2 className="user-header">All Users</h2>
            <div className="user-grid">
                {users.map(u => (
                    <div key={u.id} className="user-card">
                        <div className="user-info">
                            <p><strong>Full Name:</strong> {u.fullName}</p>
                            <p><strong>Username:</strong> {u.username}</p>
                            <p><strong>Role:</strong> <span className={`role-badge ${u.role.toLowerCase()}`}>{u.role}</span></p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
