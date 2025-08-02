package com.example.StudentTrackerApplication.modals;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;


import java.util.Date;
import java.util.List;

@Entity
@Table(name = "admins")
@Getter
@Setter
@Builder
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)


public class AdminEntity {
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getUsername() {
//        return username;
//    }
//
//    public void setUsername(String username) {
//        this.username = username;
//    }
//
//    public String getPassword() {
//        return password;
//    }
//
//    public void setPassword(String password) {
//        this.password = password;
//    }

//    public List<TaskEntity> getTasksAssigned() {
//        return tasksAssigned;
//    }

//    public void setTasksAssigned(List<TaskEntity> tasksAssigned) {
//        this.tasksAssigned = tasksAssigned;
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false, unique = true)
    private String username;

    @Column(nullable = false)
    private String password; //  Store securely with encoding in the service layer

    @Column(nullable = false)
    private String mail;

    // One Admin can assign many tasks
    @OneToMany(mappedBy = "assignedBy", cascade = CascadeType.ALL)
    private List<TaskEntity> tasksAssigned;

    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)   // format of the date stored
    @CreatedDate   //timecreate of the entity is saved for trailes and tracking and debugging
    private Date createAt;


    @Column(nullable = false)
    @Temporal(TemporalType.TIMESTAMP)
    @LastModifiedDate
    private Date updatedAt;
}

