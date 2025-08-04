package com.example.StudentTrackerApplication.controller;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.service.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admins")
public class AdminController {

    @Autowired
    private AdminServiceImpl adminService;

    @PostMapping("/create")
    public AdminEntity createAdmin(@RequestBody AdminEntity admin){
        return adminService.createAdmin(admin);
    }

    @GetMapping("/all")
    public List<AdminEntity> getAllAdmins() {
        return adminService.getAllAdmins();
    }
}
