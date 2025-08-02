package com.example.StudentTrackerApplication.modals;
import jakarta.persistence.*;
import jakarta.validation.constraints.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.annotation.LastModifiedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;
import java.util.Date;

@Entity
@Table(name = "tasks")
@NoArgsConstructor
@AllArgsConstructor
@EntityListeners(AuditingEntityListener.class)
@Data
public class TaskEntity {
//    public Long getId() {
//        return id;
//    }
//
//    public void setId(Long id) {
//        this.id = id;
//    }
//
//    public String getTitle() {
//        return title;
//    }
//
//    public void setTitle(String title) {
//        this.title = title;
//    }
//
//    public String getDescription() {
//        return description;
//    }
//
//    public void setDescription(String description) {
//        this.description = description;
//    }
//
//    public AdminEntity getAssignedBy() {
//        return assignedBy;
//    }
//
//    public void setAssignedBy(AdminEntity assignedBy) {
//        this.assignedBy = assignedBy;
//    }
//
//    public StudentEntity getAssignedTo() {
//        return assignedTo;
//    }
//
//    public void setAssignedTo(StudentEntity assignedTo) {
//        this.assignedTo = assignedTo;
//    }
//
//    public LocalDateTime getAssignedAt() {
//        return assignedAt;
//    }
//
//    public void setAssignedAt(LocalDateTime assignedAt) {
//        this.assignedAt = assignedAt;
//    }
//
//    public boolean isCompleted() {
//        return completed;
//    }
//
//    public void setCompleted(boolean completed) {
//        this.completed = completed;
//    }

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    @NotBlank
    private String title;

    private String description;

    @ManyToOne
    @JoinColumn(name = "admin_id", nullable = false)
    private AdminEntity assignedBy;

    @ManyToOne
    @JoinColumn(name = "student_id", nullable = false)
    private StudentEntity assignedTo;

    private LocalDateTime assignedAt;

    private boolean completed;


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
