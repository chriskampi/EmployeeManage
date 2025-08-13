# Employee Management System

A comprehensive Employee Management System built with Node.js, Express, and MySQL.

## Project Structure

```
EmployeeManage/
├── server.js                 # Main server file
├── package.json             # Project dependencies
├── README.md               # This file
├── routes/                 # API route handlers
│   ├── adminRouter.js      # Admin management routes
│   ├── employeeRouter.js   # Employee management routes
│   └── skillRouter.js      # Skill management routes
└── models/                 # Database models
    └── mySQL/             # MySQL-specific models
        ├── admin.js        # Admin database operations
        ├── employee.js     # Employee database operations
        └── skill.js        # Skill database operations
```

## Features

- **Admin Management**: CRUD operations for admin users with authentication
- **Employee Management**: Complete employee lifecycle management
- **Skill Management**: Skill tracking and categorization
- **Employee-Skill Relationships**: Track which employees have which skills
- **RESTful API**: Clean, RESTful endpoints for all operations
- **MySQL Database**: Robust data persistence with MySQL

## Prerequisites

- Node.js (version 14 or higher)
- MySQL (version 5.7 or higher)
- npm or yarn package manager

## Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd EmployeeManage
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory with the following variables:
   ```env
   # Database Configuration
   DB_HOST=localhost
   DB_USER=root
   DB_PASSWORD=your_password_here
   DB_NAME=employee_management
   DB_PORT=3306

   # Server Configuration
   PORT=3000
   NODE_ENV=development

   # JWT Configuration (for authentication)
   JWT_SECRET=your_jwt_secret_key_here
   JWT_EXPIRES_IN=24h
   ```

4. **Set up MySQL database**
   ```sql
   CREATE DATABASE employee_management;
   USE employee_management;
   
   -- Create admins table
   CREATE TABLE admins (
       id INT PRIMARY KEY AUTO_INCREMENT,
       username VARCHAR(50) UNIQUE NOT NULL,
       password VARCHAR(255) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       full_name VARCHAR(100) NOT NULL,
       role VARCHAR(50) DEFAULT 'admin',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   
   -- Create employees table
   CREATE TABLE employees (
       id INT PRIMARY KEY AUTO_INCREMENT,
       first_name VARCHAR(50) NOT NULL,
       last_name VARCHAR(50) NOT NULL,
       email VARCHAR(100) UNIQUE NOT NULL,
       phone VARCHAR(20),
       department VARCHAR(50) NOT NULL,
       position VARCHAR(50) NOT NULL,
       hire_date DATE NOT NULL,
       salary DECIMAL(10,2),
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   
   -- Create skills table
   CREATE TABLE skills (
       id INT PRIMARY KEY AUTO_INCREMENT,
       name VARCHAR(100) NOT NULL,
       description TEXT,
       category VARCHAR(50) NOT NULL,
       difficulty_level ENUM('beginner', 'intermediate', 'advanced') DEFAULT 'beginner',
       created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
   );
   
   -- Create employee_skills junction table
   CREATE TABLE employee_skills (
       id INT PRIMARY KEY AUTO_INCREMENT,
       employee_id INT NOT NULL,
       skill_id INT NOT NULL,
       proficiency_level ENUM('1', '2', '3', '4', '5') DEFAULT '1',
       acquired_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
       FOREIGN KEY (employee_id) REFERENCES employees(id) ON DELETE CASCADE,
       FOREIGN KEY (skill_id) REFERENCES skills(id) ON DELETE CASCADE,
       UNIQUE KEY unique_employee_skill (employee_id, skill_id)
   );
   ```

5. **Start the server**
   ```bash
   # Development mode with auto-reload
   npm run dev
   
   # Production mode
   npm start
   ```

## API Endpoints

### Admin Routes (`/api/admin`)
- `GET /` - Get all admins
- `GET /:id` - Get admin by ID
- `POST /` - Create new admin
- `PUT /:id` - Update admin
- `DELETE /:id` - Delete admin
- `POST /login` - Admin login

### Employee Routes (`/api/employees`)
- `GET /` - Get all employees
- `GET /:id` - Get employee by ID
- `POST /` - Create new employee
- `PUT /:id` - Update employee
- `DELETE /:id` - Delete employee
- `GET /department/:department` - Get employees by department
- `GET /:id/skills` - Get employee skills
- `POST /:id/skills` - Assign skill to employee

### Skill Routes (`/api/skills`)
- `GET /` - Get all skills
- `GET /:id` - Get skill by ID
- `POST /` - Create new skill
- `PUT /:id` - Update skill
- `DELETE /:id` - Delete skill
- `GET /category/:category` - Get skills by category
- `GET /level/:level` - Get skills by proficiency level
- `GET /:id/employees` - Get employees with specific skill

## Usage Examples

### Creating an Employee
```bash
curl -X POST http://localhost:3000/api/employees \
  -H "Content-Type: application/json" \
  -d '{
    "first_name": "John",
    "last_name": "Doe",
    "email": "john.doe@company.com",
    "phone": "+1234567890",
    "department": "Engineering",
    "position": "Software Developer",
    "hire_date": "2023-01-15",
    "salary": 75000
  }'
```

### Assigning a Skill to an Employee
```bash
curl -X POST http://localhost:3000/api/employees/1/skills \
  -H "Content-Type: application/json" \
  -d '{
    "skill_id": 1,
    "proficiency_level": "3"
  }'
```

## Development

The project uses:
- **Express.js** for the web framework
- **MySQL2** for database operations
- **CORS** for cross-origin requests
- **Nodemon** for development auto-reload

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support and questions, please open an issue in the repository.
