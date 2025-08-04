package com.example.StudentTrackerApplication.controller;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.service.AdminServiceImpl;
import com.example.StudentTrackerApplication.service.StudentService;
import com.example.StudentTrackerApplication.service.StudentServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/student")
public class SingupStudent {


    @Autowired
    private StudentService studentService;

    @PostMapping("/signup")
    public StudentEntity signup(@RequestBody StudentEntity student){
        return studentService.createStudent(student);
    }

    public String login(@RequestParam String username, @RequestParam String password){
        StudentEntity student = studentService.getStudentbyUsername(username);

        if(student != null &&  student.getStudentPassword().equals(password)){
            return "Login successful";
        }else{
            return "Invalid Credentials";
        }
    }
    @GetMapping("/all")
    public List<StudentEntity> getAllStudents(){
        return studentService.getAllStudent();
    }

}
