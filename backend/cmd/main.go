package main

import (
    "log"
    "user-management-system/backend/internal/database"
    "user-management-system/backend/internal/api/routes"
    "user-management-system/backend/internal/api/handlers"
    "user-management-system/backend/internal/api/middleware"
    "user-management-system/backend/internal/services"

)

func main() {
    db := database.InitDB()
    if db == nil {
        log.Fatal("Database initialization failed")
    }

    userService := services.NewUserService(db)
    userHandler := handlers.NewUserHandler(userService)
    router := routes.SetupRouter(userHandler)
    
    // CORS middleware ekle
    router.Use(middleware.CorsMiddleware())

    log.Println("Server running on :8080")
    router.Run(":8080")
}