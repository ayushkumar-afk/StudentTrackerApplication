package com.example.StudentTrackerApplication.service;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface StudentServiceImpl {
    StudentEntity createStudent(StudentEntity student);
    List<StudentEntity> getAllStudent();
}
