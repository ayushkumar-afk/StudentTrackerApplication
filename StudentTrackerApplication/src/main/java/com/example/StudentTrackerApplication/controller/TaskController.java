package com.example.StudentTrackerApplication.controller;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.modals.TaskEntity;
import com.example.StudentTrackerApplication.service.AdminService;
import com.example.StudentTrackerApplication.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class TaskController {
    @Autowired
    private TaskService taskService;

    @GetMapping("/admin/{adminId}")
    public List<TaskEntity> getTaskByAdmin(@PathVariable Long adminId){
        return null;
    }



}
