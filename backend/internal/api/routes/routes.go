package routes

import (
    "github.com/gin-gonic/gin"
    "user-management-system/backend/internal/api/handlers"
    "user-management-system/backend/internal/api/middleware"

)

func SetupRouter(userHandler *handlers.UserHandler) *gin.Engine {
    router := gin.Default()
    
    // CORS middleware
    router.Use(middleware.CorsMiddleware())
    
    // API routes
    api := router.Group("/api")
    {
        users := api.Group("/users")
        {
            users.GET("", userHandler.GetUsers)
            users.GET("/:id", userHandler.GetUser)
            users.POST("", userHandler.CreateUser)
            users.PUT("/:id", userHandler.UpdateUser)
            users.DELETE("/:id", userHandler.DeleteUser)
        }
    }
    
    return router
}