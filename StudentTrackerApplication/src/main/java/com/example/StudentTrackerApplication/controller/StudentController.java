package com.example.StudentTrackerApplication.controller;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/students")
public class StudentController {

    @Autowired
    private StudentServiceImpl studentService;

    // Create new student
    @PostMapping("/create")
    public StudentEntity createStudent(@RequestBody StudentEntity student) {
        return studentService.createStudent(student);
    }


    // Get all students
    @GetMapping("/all")
    public List<StudentEntity> getAllStudents() {
        return studentService.getAllStudent();
    }
}
