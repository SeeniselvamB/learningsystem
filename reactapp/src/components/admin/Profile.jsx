import React from "react";
import "../../styles/Profile.css";

export default function Profile({ admin }) {
    return (
        <div className="profile-container">
            <h3>Admin Profile</h3>
            <p><strong>Full Name:</strong> {admin.fullName}</p>
            <p><strong>Username:</strong> {admin.username}</p>
            <p><strong>Role:</strong> {admin.role}</p>
        </div>
    );
}
