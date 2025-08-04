package com.example.StudentTrackerApplication.controller;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.modals.TaskEntity;
import com.example.StudentTrackerApplication.service.AdminService;
import com.example.StudentTrackerApplication.service.AdminServiceImpl;
import com.example.StudentTrackerApplication.service.TaskService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/tasks")
public class TaskController {

    @Autowired
    private TaskService taskService;



    // Assign a new task
    @PostMapping("/assign")
    public TaskEntity assignTask(
            @RequestBody TaskEntity task,
            @RequestParam Long adminId,
            @RequestParam Long studentId
    ) {
        return taskService.assignTask(task, adminId, studentId);
    }

    // Get tasks assigned by a specific admin
    @GetMapping("/admin/{adminId}")
    public List<TaskEntity> getTasksByAdmin(@PathVariable Long adminId) {
        return taskService.getTaskbyAdmin(adminId);
    }

    // Get tasks assigned to a specific student
    @GetMapping("/student/{studentId}")
    public List<TaskEntity> getTasksByStudent(@PathVariable Long studentId) {
        return taskService.getTaskbyStudent(studentId);
    }


}