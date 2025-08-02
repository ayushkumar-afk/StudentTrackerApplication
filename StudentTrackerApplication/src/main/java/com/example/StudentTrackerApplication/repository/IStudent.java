package com.example.StudentTrackerApplication.repository;

import com.example.StudentTrackerApplication.modals.StudentEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface IStudent extends JpaRepository<StudentEntity,Long> {

}
