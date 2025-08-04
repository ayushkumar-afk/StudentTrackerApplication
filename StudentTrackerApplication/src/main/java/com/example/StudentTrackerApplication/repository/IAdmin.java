package com.example.StudentTrackerApplication.repository;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.modals.StudentEntity;
import com.example.StudentTrackerApplication.modals.TaskEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

// will communicate with the database
@Repository
public interface IAdmin extends JpaRepository<AdminEntity,Long> {    // one will be taking the Entityone and the other willbe taking the Long
        Optional<AdminEntity> findByUsername(String username);

}
