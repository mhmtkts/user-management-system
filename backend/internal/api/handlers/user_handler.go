package handlers

import (
	"errors"
	"log"
	"net/http"
	"strconv"
	"user-management-system/backend/internal/models"
	"user-management-system/backend/internal/services"

	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

type UserHandler struct {
    userService *services.UserService
}

func NewUserHandler(userService *services.UserService) *UserHandler {
    return &UserHandler{userService: userService}
}

// GetUsers godoc
// @Summary Get all users
// @Description Get all users from database
// @Tags users
// @Accept json
// @Produce json
// @Success 200 {array} models.User
// @Router /api/users [get]
func (h *UserHandler) GetUsers(c *gin.Context) {
    users, err := h.userService.GetAllUsers()
    if err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    c.JSON(http.StatusOK, users)
}

// GetUser godoc
// @Summary Get user by ID
// @Description Get user by ID from database
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 200 {object} models.User
// @Router /api/users/{id} [get]
func (h *UserHandler) GetUser(c *gin.Context) {
    id := c.Param("id")
    idUint, err := strconv.ParseUint(id, 10, 64)
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid ID format"})
        return
    }
    
    user, err := h.userService.GetUserByID(uint(idUint))
    if err != nil {
        c.JSON(http.StatusNotFound, gin.H{"error": "User not found"})
        return
    }
    c.JSON(http.StatusOK, user)
}
// CreateUser godoc
// @Summary Create new user
// @Description Create new user in database
// @Tags users
// @Accept json
// @Produce json
// @Param user body models.User true "User object"
// @Success 201 {object} models.User
// @Router /api/users [post]
func (h *UserHandler) CreateUser(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }

    // Add log for debug
    log.Printf("Creating user: %+v", user)

    err := h.userService.CreateUser(&user)
    if err != nil {
        log.Printf("Error creating user: %v", err)
        if err.Error() == "email already exists" {
            c.JSON(http.StatusConflict, gin.H{"error": "Email already exists"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }

    c.JSON(http.StatusCreated, user)
}
// UpdateUser godoc
// @Summary Update user
// @Description Update user in database
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Param user body models.User true "User object"
// @Success 200 {object} models.User
// @Router /api/users/{id} [put]
func (h *UserHandler) UpdateUser(c *gin.Context) {
    var user models.User
    if err := c.ShouldBindJSON(&user); err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
        return
    }
    
    if err := h.userService.UpdateUser(&user); err != nil {
        c.JSON(http.StatusInternalServerError, gin.H{"error": err.Error()})
        return
    }
    
    c.JSON(http.StatusOK, user)
}

// DeleteUser godoc
// @Summary Delete user
// @Description Delete user from database
// @Tags users
// @Accept json
// @Produce json
// @Param id path int true "User ID"
// @Success 204 "No Content"
// @Router /api/users/{id} [delete]
func (h *UserHandler) DeleteUser(c *gin.Context) {
    id, err := strconv.Atoi(c.Param("id"))
    if err != nil {
        c.JSON(http.StatusBadRequest, gin.H{"error": "Geçersiz kullanıcı ID"})
        return
    }

    if err := h.userService.DeleteUser(id); err != nil {
        if errors.Is(err, gorm.ErrRecordNotFound) {
            c.JSON(http.StatusNotFound, gin.H{"error": "Kullanıcı bulunamadı"})
            return
        }
        c.JSON(http.StatusInternalServerError, gin.H{"error": "Kullanıcı silinirken hata oluştu"})
        return
    }

    c.JSON(http.StatusOK, gin.H{"message": "Kullanıcı başarıyla silindi"})
}