import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import "../styles/Login.css";

export default function Login({ onLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        try {
            const res = await auth.login({ username, password });
            localStorage.setItem("jwt", res.token);
            onLogin(res.user);

            // Redirect based on role
            if (res.user.role === "STUDENT") {
                navigate("/student-dashboard");
            } else {
                navigate("/dashboard");
            }
        } catch (error) {
            setErr(error.message || "Login failed");
        }
    };

    return (
        <div className="login-wrap">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Login</h2>
                {err && <div className="error">{err}</div>}
                <label>Username or Email</label>
                <input
                    type="text"
                    value={username}
                    onChange={e => setUsername(e.target.value)}
                    placeholder="Enter your username or email"
                />
                <label>Password</label>
                <input
                    type="password"
                    value={password}
                    onChange={e => setPassword(e.target.value)}
                    placeholder="Enter your password"
                />
                <button className="btn" type="submit">Login</button>
            </form>
        </div>
    );
}
