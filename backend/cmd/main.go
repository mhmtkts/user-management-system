package main

import (
    "log"
    "user-management-system/backend/internal/api/handlers"
    "user-management-system/backend/internal/api/routes"
    "user-management-system/backend/internal/database"
    "user-management-system/backend/internal/services"
    "github.com/gin-contrib/cors"
    "github.com/gin-gonic/gin"
)

func main() {
    db, err := database.InitDB()
    if err != nil {
        log.Fatal("Database initialization failed:", err)
    }

    userService := services.NewUserService(db)
    userHandler := handlers.NewUserHandler(userService)

    r := gin.Default()

    // CORS settings
    r.Use(cors.New(cors.Config{
        AllowOrigins:     []string{"http://localhost:3000"},
        AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
        AllowHeaders:     []string{"Origin", "Content-Type"},
        AllowCredentials: true,
    }))

    routes.SetupRoutes(r, userHandler)

    if err := r.Run(":8080"); err != nil {
        log.Fatal("Server failed to start:", err)
    }
}