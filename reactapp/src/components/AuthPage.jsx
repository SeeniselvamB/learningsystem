import React, { useState } from "react";
import { login, register } from "../api";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/auth.css";

export default function AuthPage() {
    const location = useLocation();
    const navigate = useNavigate();
    const queryParams = new URLSearchParams(location.search);
    const mode = queryParams.get("mode"); 
    
    const [isLogin, setIsLogin] = useState(mode !== "register");
    const [form, setForm] = useState({
        fullName: "",
        email: "",
        username: "",
        password: "",
        role: "STUDENT",
    });
    const [error, setError] = useState(null);

    const handleChange = (e) =>
        setForm({ ...form, [e.target.name]: e.target.value });

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (isLogin && form.username === "Seeniselvam" && form.password === "Selvam@123") {
                navigate("/admin");
                return;
            }

            if (isLogin) {
                const user = await login(form.username, form.password);
                const role = user.role.toUpperCase();
                if (role === "STUDENT") navigate("/student");
                else navigate("/home"); 
                localStorage.setItem("user", JSON.stringify(user));
            } else {
                form.role = "STUDENT";
                await register(form);
                alert("Registration successful! Please login.");
                setIsLogin(true);
            }
        } catch (err) {
            setError("Invalid credentials or server error");
        }
    };

    return (
        <div className="login-wrap">
            <div className="login-box">
                <h2>{isLogin ? "Login" : "Register"}</h2>
                <form onSubmit={handleSubmit}>
                    {!isLogin && (
                        <>
                            <input
                                name="fullName"
                                placeholder="Full Name"
                                value={form.fullName}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="email"
                                name="email"
                                placeholder="Email"
                                value={form.email}
                                onChange={handleChange}
                                required
                            />
                            <input
                                name="username"
                                placeholder="User Name"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                            <select name="role" value="STUDENT">
                                <option value="STUDENT">Student</option>
                            </select>
                        </>
                    )}
                    {isLogin && (
                        <>
                            <input
                                name="username"
                                placeholder="User Name"
                                value={form.username}
                                onChange={handleChange}
                                required
                            />
                            <input
                                type="password"
                                name="password"
                                placeholder="Password"
                                value={form.password}
                                onChange={handleChange}
                                required
                            />
                        </>
                    )}
                    <button type="submit">{isLogin ? "Login" : "Register"}</button>
                </form>
                {error && <p className="error">{error}</p>}
                <p
                    onClick={() => setIsLogin(!isLogin)}
                    className="switch-link"
                >
                    {isLogin ? "New user? Register here" : "Already registered? Login here"}
                </p>
            </div>
        </div>
    );
}

