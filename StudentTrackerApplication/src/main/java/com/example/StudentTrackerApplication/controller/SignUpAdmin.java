package com.example.StudentTrackerApplication.controller;

import com.example.StudentTrackerApplication.modals.AdminEntity;
import com.example.StudentTrackerApplication.service.AdminServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/admins/")
public class SignUpAdmin {

    @Autowired
    private AdminServiceImpl adminService;

    @PostMapping("/signup")
    public AdminEntity signup(@RequestBody AdminEntity admin){
    return adminService.createAdmin(admin);
    }

    public String login(@RequestParam String username, @RequestParam String password){
        AdminEntity admin = adminService.getAdminByUsername(username);

        if(admin != null &&  admin.getPassword().equals(password)){
            return "Login successful";
        }else{
            return "Invalid Credentials";
        }
    }
    @GetMapping("/all")
    public List<AdminEntity> getAllAdmins(){
            return adminService.getAllAdmins();
    }


}
