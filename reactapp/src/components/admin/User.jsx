import React from "react";
import "../../styles/User.css";

export default function User({ users }) {
    return (
        <div className="user-container">
            <h3>All Users</h3>
            <ul className="user-list">
                {users.map(u => (
                    <li key={u.id} className="user-card">
                        <p><strong>Full Name:</strong> {u.fullName}</p>
                        <p><strong>Username:</strong> {u.username}</p>
                        <p><strong>Role:</strong> <span>{u.role}</span></p>
                    </li>
                ))}
            </ul>
        </div>
    );
}
