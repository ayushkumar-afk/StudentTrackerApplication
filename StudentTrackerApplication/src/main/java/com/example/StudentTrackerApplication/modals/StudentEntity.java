package com.example.StudentTrackerApplication.modals;

import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import java.util.Date;
import java.util.List;

@Entity
@Table(name = "students")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)

public class StudentEntity {
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getRollNumber() {
//        return rollNumber;
//    }
//
//    public void setRollNumber(String rollNumber) {
//        this.rollNumber = rollNumber;
//    }
//
//    public String getName() {
//        return name;
//    }
//
//    public void setName(String name) {
//        this.name = name;
//    }
//
//    public String getEmail() {
//        return email;
//    }
//
//    public void setEmail(String email) {
//        this.email = email;
//    }
//
//    public List<TaskEntity> getTasks() {
//        return tasks;
//    }
//
//    public void setTasks(List<TaskEntity> tasks) {
//        this.tasks = tasks;
//    }



   @Id
   @GeneratedValue(strategy = GenerationType.IDENTITY)
   private Long studentId;


    @Email(message = "Enter a valid email")
    @NotBlank(message = "Email is required")
    @Column(unique = true)
    private String studentEmailId;

    @NotBlank(message = "DOB is required")
    private String studentDOB;

    @NotBlank(message = "Contact number is required")
    private String studentContactNo;

    @NotBlank(message = "Password is required")
    @Size(min = 8, max = 50, message = "Password must be 8-50 characters")
    private String studentPassword;


    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)   // format of the date stored
    @CreatedDate   //timecreate of the entity is saved for trailes and tracking and debugging
    private Date createAt;


    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;

    // getters and setters
}

