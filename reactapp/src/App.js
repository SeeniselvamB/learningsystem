import React from "react";
import { BrowserRouter as Router, Routes, Route,useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./components/Home";
import AuthPage from "./components/AuthPage";
import Footer from "./components/Footer";
import StudentDashboard from "./components/student/StudentDashboard";
import AdminDashboard from "./components/admin/AdminDashboard";
import CoursePage from "./components/admin/Course";
import AdminQuizPage from "./components/admin/QuizPage";
import StudentQuizPage from "./components/student/QuizPage";
import Guest from "./components/Guest";

function App() {
    return (
        <Router>
            <AppContent />
        </Router>
    );
}
function AppContent() {
    const location = useLocation();
    const showFooter = location.pathname === "/";
    return (
        <>
            <Navbar />
            <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/auth" element={<AuthPage />} />
                <Route path="/guest" element={<Guest />} />
                {/* Student */}
                <Route path="/student" element={<StudentDashboard />} />
                <Route path="/student/quiz/:id" element={<StudentQuizPage />} /> 
                <Route path="/student/courses" element={<StudentDashboard />} />

                {/* Admin */}
                <Route path="/admin" element={<AdminDashboard />} />
                <Route path="/admin/courses" element={<CoursePage />} />
                <Route path="/admin/quiz/:courseId" element={<AdminQuizPage />} />
            </Routes>
            {showFooter && <Footer />}
        </>
    );
}

export default App;



