package com.example.StudentTrackerApplication.service;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.repository.IAdmin;
import org.springframework.beans.factory.annotation.Autowired;

import java.util.List;

public class AdminServiceImpl implements AdminService{

    @Autowired
    private IAdmin adminRespository;
    @Override
    public AdminEntity createAdmin(AdminEntity admin) {
        return adminRespository.save(admin);
    }

    @Override
    public List<AdminEntity> getAllAdmins() {
        return adminRespository.findAll();
    }
}
