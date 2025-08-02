🧑‍🎓 Student Tracker Application
A Spring Boot web application for managing students and assigning tasks to them by administrators.
This project provides REST APIs for admin and student management, along with task assignment features.

🚀 Technologies Used
Java 17

Spring Boot 3.5.3

Spring Web (REST APIs)

Spring Data JPA (Hibernate)

MySQL Database

Lombok

Maven



📂 Project Structure & Features
✅ Core Features
Admin Management – Register admins with email & password

Student Management – Register students with contact info & date of birth

Task Assignment – Admin can assign tasks to students

View Tasks – Tasks can be viewed by both admins and students

Automatic Auditing – Created and updated timestamps for entities



entities

📦 API Endpoints
👨‍💼 Admin APIs
Method	Endpoint	Description
POST	/api/admins/create	Create a new admin
GET	/api/admins/all	Get all admins

👨‍🎓 Student APIs
Method	Endpoint	Description
POST	/api/students/register	Register a new student
GET	/api/students/all	Get all students

📌 Task APIs
Method	Endpoint	Description
POST	/api/tasks/assign?adminId=1&studentId=2	Assign task to student
GET	/api/tasks/student/{id}	Get tasks assigned to a student
GET	/api/tasks/admin/{id}	Get tasks assigned by an admin



⚙️ Configuration (application.properties)
Make sure to configure your MySQL database credentials in src/main/resources/application.properties:

properties
Copy
Edit
spring.datasource.url=jdbc:mysql://localhost:3306/student_tracker
spring.datasource.username=root
spring.datasource.password=your_password
spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
▶️ How to Run the Application
Clone the Repository

bash
Copy
Edit
git clone https://github.com/your-username/student-tracker.git
cd student-tracker
Run with Maven

bash
Copy
Edit
./mvnw spring-boot:run
Or, using Maven installed on your system:

bash
Copy
Edit
mvn spring-boot:run
📫 Testing with Postman
Once the application is running:

Use the POST and GET endpoints listed above

Provide JSON request bodies when creating admins, students, or assigning tasks

Example JSON for creating a student:

json
Copy
Edit
{
  "name": "John Doe",
  "email": "john@example.com",
  "contactNumber": "1234567890",
  "dateOfBirth": "2000-05-15"
}
