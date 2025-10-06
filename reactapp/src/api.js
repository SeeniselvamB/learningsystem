import axios from "axios";

const api = axios.create({
    baseURL: "http://localhost:8080/api",
    headers: { "Content-Type": "application/json" },
});

// Users
export const register = (user) => api.post("/users/register", user).then(res => res.data);
export const login = (username, password) => api.post("/users/login", { username, password }).then(res => res.data);
export const getProfile = (id) => api.get(`/users/${id}`).then(res => res.data);
export const getAllUsers = () => api.get("/users").then(res => res.data);
export const deleteUser = (id) => api.delete(`/users/${id}`).then(res => res.data);
export const updateUser = (id, user) => api.put(`/users/${id}`, user).then(res => res.data);

// Courses
export const getAllCourses = () => api.get("/courses").then(res => res.data);
export const addCourse = (course) => api.post("/courses", course).then(res => res.data);
export const updateCourse = (id, course) => api.put(`/courses/${id}`, course).then(res => res.data);
export const deleteCourse = (id) => api.delete(`/courses/${id}`).then(res => res.data);


// Quiz
export const addQuiz = (courseId, quiz) => api.post(`/quiz/${courseId}`, quiz).then(res => res.data);
export const updateQuiz = (quizId, quiz) => api.put(`/quiz/${quizId}`, quiz).then(res => res.data);
export const deleteQuiz = (quizId) => api.delete(`/quiz/${quizId}`).then(res => res.data);
export const getQuizzesByCourse = (courseId) => api.get(`/quiz/course/${courseId}`).then(res => res.data);

// Progress (optional)
export const updateProgress = (courseId, student, progress) =>
    api.put(`/courses/${courseId}/progress`, null, { params: { student, progress } }).then(res => res.data);


// Enrollment
export const enrollCourse = (courseId, studentId) =>
    api.post(`/enrollments/enroll`, null, {
        params: { studentId, courseId },
    }).then(res => res.data);

export const getStudentEnrollments = (studentId) =>
    api.get(`/enrollments/student/${studentId}`).then(res => res.data);

export const completeCourse = (courseId, studentId, score) =>
    api.put(`/enrollments/complete`, null, {
        params: { studentId, courseId, score },
    }).then(res => res.data);