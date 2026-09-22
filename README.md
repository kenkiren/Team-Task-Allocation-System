# Team Task Allocation System

A full-stack task management application that helps managers assign and monitor tasks while allowing employees to view and update the tasks assigned to them.
It is a role-based access control application that provides different functionality to managers and employees.

## Features

### Authentication

* User registration and login
* JWT-based authentication
* Password hashing using bcrypt
* Persistent login using local storage
* Logout functionality

### Manager

* Manager-specific dashboard
* Create and assign tasks to employees
* View all team tasks
* Set task priority
* Monitor and update task status

### Employee

* Employee-specific dashboard
* View only assigned tasks
* Update the status of assigned tasks
* Backend authorization prevents access to other employees' tasks

### Task Management

* Task title and description
* Employee assignment
* Priority levels: Low, Medium, High
* Status levels: Todo, In Progress, Completed
* Task data stored in MongoDB
* Mongoose relationship between tasks and users

## Tech Stack

### Frontend

* React.js
* JavaScript
* Tailwind CSS

### Backend

* Node.js
* Express.js
* REST APIs
* JWT
* bcrypt.js

### Database

* MongoDB
* Mongoose

### Tools

* Git
* GitHub
* VS Code
* Thunder Client

## Project Structure

```text
Team-Task-Allocation-System/
│
├── backend/
│   ├── middleware/
│   │   ├── authMiddleware.js
│   │   └── roleMiddleware.js
│   │
│   ├── models/
│   │   ├── User.js
│   │   └── Task.js
│   │
│   ├── .env
│   ├── server.js
│   └── package.json
│
└── frontend/
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx
    │   │   ├── Register.jsx
    │   │   ├── ManagerDashboard.jsx
    │   │   ├── EmployeeDashboard.jsx
    │   │   ├── TaskForm.jsx
    │   │   └── TaskList.jsx
    │   │
    │   ├── styles/
    │   │   └── global.css
    │   │
    │   ├── App.jsx
    │   └── main.jsx
    │
    └── package.json
```

## How It Works

The application uses role-based access control to provide different functionality to managers and employees.

```text
                    Login / Register
                          │
                          ▼
                    JWT Authentication
                          │
                 ┌────────┴────────┐
                 ▼                 ▼
             Manager            Employee
                 │                 │
                 ▼                 ▼
        Manager Dashboard    Employee Dashboard
                 │                 │
          ┌──────┴──────┐          │
          ▼             ▼          ▼
       Create       View All    View Own Tasks
       Tasks         Tasks          │
          │             │           ▼
          └──────┬──────┘      Update Status
                 │
                 ▼
              MongoDB
```

## API Endpoints

### Authentication

| Method | Endpoint        | Description           |
| ------ | --------------- | --------------------- |
| POST   | `/api/register` | Register a new user   |
| POST   | `/api/login`    | Login and receive JWT |

### Tasks

| Method | Endpoint                | Access             | Description        |
| ------ | ----------------------- | ------------------ | ------------------ |
| POST   | `/api/tasks`            | Manager            | Create a task      |
| GET    | `/api/tasks`            | Manager            | Get all tasks      |
| GET    | `/api/tasks/my`         | Employee           | Get assigned tasks |
| PUT    | `/api/tasks/:id/status` | Manager / Employee | Update task status |

## Authentication Flow

1. User logs in with email and password.
2. Backend verifies the password using bcrypt.
3. A JWT containing the user's ID and role is generated.
4. The frontend stores the JWT locally.
5. Protected API requests send the JWT using the `Authorization` header.
6. Authentication middleware verifies the token.
7. Role middleware checks whether the user has permission to access the requested resource.

## Environment Variables

Create a `.env` file in the backend:

```env
MONGO_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret
```

Do not commit `.env` or expose your JWT secret.

## Running Locally

### 1. Clone the repository

```bash
git clone YOUR_GITHUB_REPOSITORY_URL
```

### 2. Start the backend

```bash
cd backend
npm install
npm run dev
```

The backend runs on:

```text
http://localhost:5000
```

### 3. Start the frontend

Open another terminal:

```bash
cd frontend
npm install
npm run dev
```

The frontend will be available at the Vite development URL shown in the terminal.

## Future Improvements

Possible future enhancements include:

* Task deadlines
* Task editing and deletion
* Search and filtering
* Dashboard statistics
* Notifications
* Admin-level user management

## Author

**Devesh Gupta**

MCA Student | Full-Stack Developer
