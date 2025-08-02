package com.example.StudentTrackerApplication.service;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.modals.TaskEntity;

import java.util.List;

public interface TaskServiceImpl {
    TaskEntity assignTask(TaskEntity task, Long adminId , Long StudentId);
    List<TaskEntity> getTaskbyAdmin(Long AdminId);
    List<TaskEntity> getTaskbyStudent(Long StudentId);


}
