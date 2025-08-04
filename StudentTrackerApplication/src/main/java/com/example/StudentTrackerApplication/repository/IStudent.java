package com.example.StudentTrackerApplication.repository;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface IStudent extends JpaRepository<StudentEntity,Long> {
     Optional<StudentEntity>  findByStudentEmailId(String studentEmailId);

}
