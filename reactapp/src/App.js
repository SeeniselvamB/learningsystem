import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import StudentDashboard from "./components/student/StudentDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import CoursePage from "./components/admin/Course";
import QuizPage from "./components/admin/QuizPage";
function App() {
    return (
        <Router>
            <Navbar />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/courses" element={<CoursePage />} />
                <Route path="/admin/quiz/:courseId" element={<QuizPage />} />
            </Routes>
            
        </Router>

    );
    
}

export default App;




