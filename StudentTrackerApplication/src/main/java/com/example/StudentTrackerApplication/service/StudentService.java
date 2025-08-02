package com.example.StudentTrackerApplication.service;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.repository.IStudent;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class StudentService implements StudentServiceImpl {

    @Autowired
    private IStudent StudentRespository;

    @Override
    public StudentEntity createStudent(StudentEntity student) {
        return StudentRespository.save(student);
    }

    @Override
    public List<StudentEntity> getAllStudent() {
        return StudentRespository.findAll();
    }
}
