🧑‍🎓 Student Tracker Application
This is a Spring Boot web application for managing students and assigning tasks to them by administrators.

🚀 Technologies Used
Java 17
Spring Boot 3.5.3
Spring Web (REST APIs)
Spring Data JPA (Hibernate)
MySQL Database
Lombok
Maven
📁 Project Structure
✅ Features
Admin registration (with email, password)
Student registration (with contact info and DOB)
Admin can assign tasks to students
View tasks by Admin or by Student
Automatic auditing (created/updated timestamps)
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
GET	/api/tasks/student/{id}	Get tasks assigned to student
GET	/api/tasks/admin/{id}	Get tasks assigned by admin
⚙️ Configuration (application.properties)
▶️ Run the App
In terminal:
./mvnw spring-boot:run

📫 Test with Postman Run the app

Use endpoints listed above (POST/GET)

Add JSON bodies to create admins, students, and assign tasks

You can now:

Create a file in your root directory called README.md
Paste the above markdown
View it nicely on GitHub or any markdown viewer
Let me know if you'd like a sample screenshot section, GitHub badges, or to attach a database ER diagram!
