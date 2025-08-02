package com.example.StudentTrackerApplication.service;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.modals.TaskEntity;
import com.example.StudentTrackerApplication.repository.IAdmin;
import com.example.StudentTrackerApplication.repository.IStudent;
import com.example.StudentTrackerApplication.repository.ITask;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TaskService implements TaskServiceImpl {
    @Autowired
    private IAdmin adminRepository;
    @Autowired
    public IStudent studentReposripry;
    @Autowired
    public ITask taskReposripry;







    @Override
    public TaskEntity assignTask(TaskEntity task, Long adminId, Long StudentId) {
       AdminEntity admin  = adminRepository.findById(adminId).orElseThrow(()-> new RuntimeException("Admin Not Found"));
       StudentEntity student  = studentReposripry.findById(StudentId).orElseThrow(()-> new RuntimeException("Student Not Found"));
       
        return  null;
    }

    @Override
    public List<TaskEntity> getTaskbyAdmin(Long AdminId) {
        return List.of();
    }

    @Override
    public List<TaskEntity> getTaskbyStudent(Long StudentId) {
        return List.of();
    }
}
