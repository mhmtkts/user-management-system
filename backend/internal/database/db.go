package database

import (
	"log"
	"user-management-system/backend/internal/models"

	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
	"gorm.io/gorm/logger"
)

func InitDB() (*gorm.DB, error) {
    log.Println("Initializing database...")
    
    db, err := gorm.Open(sqlite.Open("database.db"), &gorm.Config{
        Logger: logger.Default.LogMode(logger.Info),
    })
    if err != nil {
        log.Printf("Database connection error: %v", err)
        return nil, err
    }

    if err := db.AutoMigrate(&models.User{}); err != nil {
        log.Printf("Migration error: %v", err)
        return nil, err
    }

    log.Println("Database initialized successfully")
    return db, nil
}