package com.example.StudentTrackerApplication.repository;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.modals.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ITask extends JpaRepository<TaskEntity,Long> {
    List<TaskEntity> findByAssignedById(Long adminId);
    List<TaskEntity> findByAssignedToId(Long studentId);
}
