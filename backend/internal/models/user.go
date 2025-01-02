package models

import (
    "time"
    "gorm.io/gorm"
)

type User struct {
    ID        uint           `json:"id" gorm:"primaryKey"`
    FirstName string        `json:"firstName" binding:"required,min=2,max=50"`
    LastName  string        `json:"lastName" binding:"required,min=2,max=50"`
    Email     string        `json:"email" binding:"required,email"`
    Active    bool          `json:"active" gorm:"default:true"`
    CreatedAt time.Time     `json:"createdAt"`
    UpdatedAt time.Time     `json:"updatedAt"`
    DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty" gorm:"index"`
}