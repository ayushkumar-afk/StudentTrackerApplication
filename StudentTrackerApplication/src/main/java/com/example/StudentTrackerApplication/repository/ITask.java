package com.example.StudentTrackerApplication.repository;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.modals.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ITask extends JpaRepository<TaskEntity,Long> {
        
}
