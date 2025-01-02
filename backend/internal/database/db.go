package database

import (
    "log"
    "user-management-system/backend/internal/models"
    "gorm.io/driver/sqlite"
    "gorm.io/gorm"
    "gorm.io/gorm/logger"
)

func InitDB() *gorm.DB {
    db, err := gorm.Open(sqlite.Open("database.sqlite"), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        log.Fatal("Failed to connect database:", err)
    }

    // Auto Migrate
    err = db.AutoMigrate(&models.User{})
    if err != nil {
        log.Fatal("Failed to migrate database:", err)
    }

    return db
}