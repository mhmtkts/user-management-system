import { User } from '../types';

const API_URL = 'http://localhost:8080/api';

export const userApi = {
    // Get all users from the databas
    getAll: async (): Promise<User[]> => {
        const response = await fetch(`${API_URL}/users`);
        if (!response.ok) throw new Error('Failed to fetch users');
        return response.json();
    },

    getById: async (id: number): Promise<User> => {
        const response = await fetch(`${API_URL}/users/${id}`);
        if (!response.ok) throw new Error('User not found');
        return response.json();
    },

    // Create a new user
    create: async (user: Omit<User, 'id'>): Promise<User> => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
    
        const data = await response.json();
    
        if (!response.ok) {
            if (response.status === 409) {
                throw new Error('Email already exists');
            }
            throw new Error(data.error || 'Failed to create user');
        }
    
        return data;
    },

    // Update existing user
    update: async (user: User): Promise<User> => {
        const response = await fetch(`${API_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error('Failed to update user');
        return response.json();
    },

    // Delete user by ID
    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
    },
};