package models

import (
    "time"
    "gorm.io/gorm"
)

type User struct {
    ID        uint   `json:"id" gorm:"primaryKey"`
    FirstName string `json:"firstName" binding:"required"`
    LastName  string `json:"lastName" binding:"required"`
    Email     string `json:"email" binding:"required,email" gorm:"uniqueIndex;not null"`
    Active    bool   `json:"active" gorm:"default:true"`
    CreatedAt time.Time     `json:"createdAt"`
    UpdatedAt time.Time     `json:"updatedAt"`
    DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty" gorm:"index"`
}