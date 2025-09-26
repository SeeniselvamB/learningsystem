import React from "react";
import { NavLink, useNavigate } from "react-router-dom";
import "../styles/Navbar.css";

export default function Navbar({ user, setUser }) {
    const navigate = useNavigate();

    const handleLogout = () => {
        localStorage.removeItem("jwt"); // remove the stored token
        setUser(null);                  // update App state
        navigate("/");                  // redirect to home
    };

    return (
        <nav className="navbar">
            <div className="navbar-left">
                <h1 className="navbar-title">Learning Management System</h1>
            </div>
            <div className="navbar-right">
                <NavLink to="/" className="nav-link" end>
                    Home
                </NavLink>
                <NavLink to="/courses" className="nav-link">
                    Courses
                </NavLink>
                <NavLink to="/add" className="nav-link">
                    Add Course
                </NavLink>

                {user ? (
                    <NavLink
                        to="/"
                        className="nav-link"
                        onClick={handleLogout}
                    >
                        Logout
                    </NavLink>
                ) : (
                    <NavLink to="/auth" className="nav-link">
                        Login
                    </NavLink>
                )}
            </div>
        </nav>
    );
}
