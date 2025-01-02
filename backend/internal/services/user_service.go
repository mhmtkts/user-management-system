package services

import (
    "errors"
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
    if user == nil {
        return errors.New("user cannot be nil")
    }
    return s.db.Create(user).Error
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

func (s *UserService) DeleteUser(id uint) error {
    result := s.db.Delete(&models.User{}, id)
    if result.Error != nil {
        return result.Error
    }
    if result.RowsAffected == 0 {
        return errors.New("user not found")
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