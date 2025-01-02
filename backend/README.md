# README for Backend User Management System

## Overview
This is the backend part of the User Management System project, built using Go and SQLite. It provides RESTful API endpoints for managing user data, including CRUD operations.

## Project Structure
- **cmd/main.go**: Entry point of the application.
- **internal/api/handlers/user_handler.go**: Contains the `UserHandler` struct and methods for handling user-related API requests.
- **internal/api/routes/routes.go**: Defines the API routes and associates them with the corresponding handler methods.
- **internal/database/db.go**: Manages the SQLite database connection and provides functions for database operations.
- **internal/database/sqlite.db**: SQLite database file that stores user data persistently.
- **internal/models/user.go**: Defines the `User` struct and methods for user-related operations.
- **internal/services/user_service.go**: Contains the business logic for user management.

## Setup Instructions
1. Clone the repository.
2. Navigate to the `backend` directory.
3. Run `go mod tidy` to install dependencies.
4. Start the application using `go run cmd/main.go`.

## API Endpoints
- **GET /users**: Returns all users.
- **GET /users/{id}**: Returns the user with the specified ID.
- **POST /users**: Saves a new user.
- **PUT /users/{id}**: Updates the user with the specified ID.
- **DELETE /users/{id}**: Deletes the user with the specified ID.

## Usage
Use the provided API endpoints to perform user management operations. Ensure that the SQLite database is properly configured and accessible.

## License
This project is licensed under the MIT License.