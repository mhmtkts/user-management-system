import { User } from '../types';

const API_URL = 'http://localhost:8080/api';

export const userApi = {
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

    create: async (user: Omit<User, 'id'>): Promise<User> => {
        const response = await fetch(`${API_URL}/users`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error('Failed to create user');
        return response.json();
    },

    update: async (user: User): Promise<User> => {
        const response = await fetch(`${API_URL}/users/${user.id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user),
        });
        if (!response.ok) throw new Error('Failed to update user');
        return response.json();
    },

    delete: async (id: number): Promise<void> => {
        const response = await fetch(`${API_URL}/users/${id}`, {
            method: 'DELETE',
        });
        if (!response.ok) throw new Error('Failed to delete user');
    },
};