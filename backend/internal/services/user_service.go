package services

import (
	"errors"
	"fmt"
	"log"
	"user-management-system/backend/internal/models"

	"gorm.io/gorm"
)    

type UserService struct {
    db *gorm.DB
}

func NewUserService(db *gorm.DB) *UserService {
    return &UserService{db: db}
}

func (s *UserService) CreateUser(user *models.User) error {
    // Add log for debug
    log.Printf("Service: Creating user with email: %s", user.Email)

    // Email check
    var count int64
    s.db.Model(&models.User{}).Where("email = ?", user.Email).Count(&count)
    if count > 0 {
        return fmt.Errorf("email already exists")
    }

    result := s.db.Create(user)
    if result.Error != nil {
        log.Printf("Database error: %v", result.Error)
        return result.Error
    }

    return nil
}

func (s *UserService) GetUserByID(id uint) (*models.User, error) {
    var user models.User
    if err := s.db.First(&user, id).Error; err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            return nil, errors.New("user not found")
        }
        return nil, err
    }
    return &user, nil
}

func (s *UserService) UpdateUser(user *models.User) error {
    if user == nil {
        return errors.New("user cannot be nil")
    }
    if err := s.db.First(&models.User{}, user.ID).Error; err != nil {
        return errors.New("user not found")
    }
    return s.db.Save(user).Error
}

func (s *UserService) DeleteUser(id int) error {
    // Use hard delete
    result := s.db.Unscoped().Delete(&models.User{}, id)
    if result.Error != nil {
        return result.Error
    }
    if result.RowsAffected == 0 {
        return gorm.ErrRecordNotFound
    }
    return nil
}

func (s *UserService) GetAllUsers() ([]models.User, error) {
    var users []models.User
    if err := s.db.Find(&users).Error; err != nil {
        return nil, err
    }
    return users, nil
}

func (s *UserService) GetUserByEmail(email string) (*models.User, error) {
    var user models.User
    result := s.db.Where("email = ?", email).First(&user)
    if result.Error != nil {
        if errors.Is(result.Error, gorm.ErrRecordNotFound) {
            return nil, nil
        }
        return nil, result.Error
    }
    return &user, nil
}