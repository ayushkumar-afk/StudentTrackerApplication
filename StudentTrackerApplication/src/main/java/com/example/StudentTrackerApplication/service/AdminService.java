package com.example.StudentTrackerApplication.service;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public interface AdminService {
    AdminEntity createAdmin(AdminEntity admin);
    List<AdminEntity> getAllAdmins();


}
