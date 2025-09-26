import React, { useState } from "react";
import Login from "./Login";
import Register from "./Register";
import "../styles/auth.css"; 

export default function AuthPage({ onLogin }) {
    const [isLogin, setIsLogin] = useState(true); 

    return (
        <div className="login-wrap">
            <div className="login-box">
                {isLogin ? (
                    <Login onLogin={onLogin} />
                ) : (
                    <Register onLogin={onLogin} />
                )}

                <p className="toggle-text">
                    {isLogin ? "Don't have an account?" : "Already have an account?"}{" "}
                    <span
                        className="toggle-link"
                        onClick={() => setIsLogin(!isLogin)}
                    >
                        {isLogin ? "Register" : "Login"}
                    </span>
                </p>
            </div>
        </div>
    );
}
