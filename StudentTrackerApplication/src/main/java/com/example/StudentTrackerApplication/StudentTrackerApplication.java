package com.example.StudentTrackerApplication;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;


@SpringBootApplication
@EnableJpaAuditing
public class StudentTrackerApplication {

	public static void main(String[] args) {
		SpringApplication.run(StudentTrackerApplication.class, args);
	}

}
