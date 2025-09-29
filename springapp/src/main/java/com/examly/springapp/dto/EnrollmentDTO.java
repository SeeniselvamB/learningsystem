package com.examly.springapp.dto;

public class EnrollmentDTO {
    private Long courseId;
    private String status;
    private Integer score;

    public EnrollmentDTO() {}

    public EnrollmentDTO(Long courseId, String status, Integer score) {
        this.courseId = courseId;
        this.status = status;
        this.score = score;
    }

    public Long getCourseId() { return courseId; }
    public void setCourseId(Long courseId) { this.courseId = courseId; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public Integer getScore() { return score; }
    public void setScore(Integer score) { this.score = score; }
}
