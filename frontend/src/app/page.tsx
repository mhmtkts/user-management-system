'use client';

import { useState, useEffect } from 'react';
import { Container, Box } from '@mui/material';
import UserGrid from '../components/UserGrid';
import UserForm from '../components/UserForm';
import { userApi } from '../services/api';
import { User, FormMode } from '../types';

export default function Home() {
    const [users, setUsers] = useState<User[]>([]);
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [mode, setMode] = useState<FormMode>('view');
    const [error, setError] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        loadUsers();
    }, []);

    const loadUsers = async () => {
        try {
            const data = await userApi.getAll();
            setUsers(data);
        } catch (error) {
            console.error('Failed to load users:', error);
        }
    };

    const handleSubmit = async (userData: Partial<User>) => {
        try {
            if (mode === 'new') {
                await userApi.create(userData as Omit<User, 'id'>);
            } else if (mode === 'edit' && selectedUser) {
                await userApi.update({ ...userData, id: selectedUser.id } as User);
            } else if (mode === 'delete' && selectedUser) {
                await userApi.delete(selectedUser.id);
            }
            await loadUsers();
            setMode('view');
            setSelectedUser(null);
        } catch (error) {
            console.error('Operation failed:', error);
        }
    };

    const handleDelete = async (user: User) => {
        try {
            await userApi.delete(user.id);
            // Silinen kullanıcıyı state'den kaldır
            setUsers(prevUsers => prevUsers.filter(u => u.id !== user.id));
            setMode('view');
            setError(null);
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            }
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-8">
            <div className="container mx-auto px-4">
                {mode !== 'view' ? (
                    <UserForm
                        mode={mode}
                        user={selectedUser || undefined}
                        onSubmit={handleSubmit}
                        onBack={() => {
                            setMode('view');
                            setSelectedUser(null); // Back butonunda da sıfırla
                            setError(null);
                        }}
                        isLoading={isLoading}
                        error={error}
                    />
                ) : (
                    <UserGrid
                        users={users}
                        onNew={() => setMode('new')}
                        onEdit={(user) => {
                            setSelectedUser(user);
                            setMode('edit');
                        }}
                        onDelete={handleDelete}
                        isLoading={isLoading}
                        error={error}
                    />
                )}
            </div>
        </div>
    );
}