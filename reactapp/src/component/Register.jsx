import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../api";
import "../styles/Login.css";

export default function Register({ onLogin }) {
    const [form, setForm] = useState({ username: "", password: "", email: "", fullName: "", role: "STUDENT" });
    const [err, setErr] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErr(null);
        try {
            const res = await auth.register(form);
            localStorage.setItem("jwt", res.token);
            onLogin(res.user);
            navigate("/dashboard");
        } catch (error) {
            setErr(error.message || "Register failed");
        }
    };

    return (
        <div className="login-wrap">
            <form className="login-box" onSubmit={handleSubmit}>
                <h2>Register</h2>
                {err && <div className="error">{err}</div>}
                <label>Full name</label>
                <input value={form.fullName} onChange={(e) => setForm({ ...form, fullName: e.target.value })} />
                <label>Email</label>
                <input value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
                <label>Username</label>
                <input value={form.username} onChange={(e) => setForm({ ...form, username: e.target.value })} />
                <label>Password</label>
                <input type="password" value={form.password} onChange={(e) => setForm({ ...form, password: e.target.value })} />
                <label>Role</label>
                <select value={form.role} onChange={(e) => setForm({ ...form, role: e.target.value })}>
                    <option value="STUDENT">Student</option>
                    <option value="INSTRUCTOR">Instructor</option>
                    <option value="CONTENT_CREATOR">Content Creator</option>
                </select>
                <button className="btn" type="submit">Create account</button>
            </form>
        </div>
    );
}
