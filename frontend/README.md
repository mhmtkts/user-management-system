# README for User Management System Frontend

## Project Overview

This project is a User Management System built with React and Next.js for the frontend and Go with SQLite for the backend. It allows users to perform CRUD operations on user data.

## Features

- **User Listing**: A master view that lists all users in a data grid.
- **CRUD Operations**: Users can create, edit, and delete user records.
- **Responsive Design**: The application is designed to be responsive and user-friendly.

## Technologies
### Backend
- Go
- SQLite
- GORM
- Gin Web Framework

### Frontend
- Next.js 13
- TypeScript
- Material-UI
- Axios

## Prerequisites
- Go 1.21 or higher
- Node.js 18 or higher
- npm 9 or higher

## Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd user-management-system
```

2. Install backend dependencies:
```bash
cd backend
go mod tidy
```

3. Install frontend dependencies:
```bash
cd ../frontend
npm install
```
## Running the Application

1. Start the backend server (in a new terminal):

```bash
cd backend
go run cmd/main.go
```
Backend will run on http://localhost:8080

2. Start the frontend development server (in another terminal):

```bash
cd frontend
npm run dev
```

Frontend will run on http://localhost:3000

## API Endpoints

- GET /api/users - List all users
- GET /api/users/:id - Get user by ID
- POST /api/users - Create new user
- PUT /api/users/:id - Update user
- DELETE /api/users/:id - Delete user

## Features

- Master view with data grid displaying all users
- CRUD operations through user-friendly interface
- Form validation
- Responsive design
- Real-time data updates

## Important Notes

- Both backend and frontend services must be running simultaneously
- The backend service must be running for the frontend to function properly