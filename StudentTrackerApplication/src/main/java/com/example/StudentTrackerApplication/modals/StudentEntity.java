package com.example.StudentTrackerApplication.modals;

import com.fasterxml.jackson.annotation.JsonIgnore;
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

 @Id
 @GeneratedValue(strategy = GenerationType.IDENTITY)
 @Column(name = "student_id")
 private Long id;

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

 // One student can have many tasks (ignored in JSON to prevent recursion)
 @OneToMany(mappedBy = "assignedTo", cascade = CascadeType.ALL)
 @JsonIgnore
 private List<TaskEntity> tasks;

 @Column(nullable = false)
 @Temporal(TemporalType.TIMESTAMP)
 @CreatedDate
 private Date createAt;

 @Column(nullable = false)
 @Temporal(TemporalType.TIMESTAMP)
 @LastModifiedDate
 private Date updatedAt;
}
