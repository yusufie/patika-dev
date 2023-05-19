# SmartEdu - Education Portal

SmartEdu is an advanced Education Portal built with Node.js and various other technologies. It provides a comprehensive platform for educational institutions to manage their courses, students, and instructors efficiently. With SmartEdu, educational institutions can streamline their administrative processes, facilitate online learning, and enhance collaboration among students and instructors.

## Features

- Course management: Create, update, and manage courses with detailed information, including course descriptions, schedules, and instructor assignments.
- Student management: Maintain student records, track their progress, and manage enrollment in courses.
- Instructor management: Manage instructors, assign them to courses, and track their teaching responsibilities.
- Authentication and authorization: Implement secure user authentication and role-based access control to ensure that only authorized individuals can access specific features and data.
- Interactive learning materials: Provide interactive learning materials, such as lecture notes, presentations, and multimedia content, to enhance the learning experience.

## Roles
SmartEdu supports three types of users:

- Admin: Admins can manage all aspects of the application, including courses, students, and instructors.
- Teacher: Teachers can create and manage courses, enroll students, and release course materials.
- Student: Students can enroll in courses and access course materials.

## Pages

- Home: The home page provides an overview of the application and its features.
- Login: The login page allows users to log in to the application.
- Register: The register page allows users to create an account.
- Dashboard: The dashboard page provides an overview of the user's account and allows them to manage their courses, students, and instructors.
- About: The about page provides information about the application.
- Contact: The contact page allows users to contact the application administrators.
- Courses: The courses page allows users to search for courses.
- Single Course: The single course page provides detailed information about a course.

## Screenshot
### HOME
![HOME](/public/images/readmePhotos/home.png)

### ADMIN
![ADMIN](/public/images/readmePhotos/admin.png)

### LOGIN 
![LOGIN](/public/images/readmePhotos/login.png)

### REGISTER 
![REGISTER](/public/images/readmePhotos/register.png)

### STUDENT DASHBOARD 
![STUDENT DASHBOARD](/public/images/readmePhotos/student-dashboard.png)

### CONTACT 
![CONTACT](/public/images/readmePhotos/contact.png)

### COURSES 
![COURSES](/public/images/readmePhotos/courses.png)

### SINGLE-COURSE 
![SINGLE-COURSE](/public/images/readmePhotos/single-course.png)


## Demo


## Installation

1. Clone the repository: `git clone https://github.com/ArinSoftware/SmarteduProject.git`
2. Navigate to the project directory: `cd smartedu`
3. Install dependencies: `npm install`

## Usage

1. Run the application: `npm start`
2. Open your web browser and visit [http://localhost:3000](http://localhost:3000)
3. Follow the on-screen instructions to set up the initial configuration and create an admin account.
4. Explore the different features of SmartEdu and customize it according to your institution's needs.

## Configuration

SmartEdu requires certain configuration settings to function correctly. Please refer to the project documentation for detailed instructions on configuring the application.

## Dependencies

- [bcrypt](https://www.npmjs.com/package/bcrypt): "^5.0.1"
- [connect-flash](https://www.npmjs.com/package/connect-flash): "^0.1.1"
- [connect-mongo](https://www.npmjs.com/package/connect-mongo): "^4.6.0"
- [ejs](https://www.npmjs.com/package/ejs): "^3.1.8"
- [express](https://www.npmjs.com/package/express): "^4.18.1"
- [express-session](https://www.npmjs.com/package/express-session): "^1.17.3"
- [express-validator](https://www.npmjs.com/package/express-validator): "^6.14.2"
- [method-override](https://www.npmjs.com/package/method-override): "^3.0.0"
- [mongoose](https://www.npmjs.com/package/mongoose): "^6.4.4"
- [nodemailer](https://www.npmjs.com/package/nodemailer): "^6.7.7"
- [slugify](https://www.npmjs.com/package/slugify): "^1.6.5"

## Dev Dependencies

- [nodemon](https://www.npmjs.com/package/nodemon): "^2.0.7"

## License

This project is licensed under the ISC License. You can find more details in the [LICENSE](http://opensource.org/licenses/ISC) file.

## Contact

For any inquiries or support, please contact [Gürcan Çekiç](https://github.com/ArinSoftware)