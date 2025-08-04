package com.example.StudentTrackerApplication.service;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.repository.IAdmin;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
@Service
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

    @Override
    public AdminEntity getAdminByUsername(String username) {
        return adminRespository.findByUsername(username).orElseThrow(()-> new RuntimeException("Admin not found"));
    }
}
