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

    return (
        <Container maxWidth="lg">
            <Box sx={{ my: 4 }}>
                {mode !== 'view' ? (
                    <UserForm
                        mode={mode}
                        user={selectedUser || undefined}
                        onSubmit={handleSubmit}
                        onBack={() => {
                            setMode('view');
                            setSelectedUser(null);
                        }}
                    />
                ) : (
                    <UserGrid
                        users={users}
                        onNew={() => setMode('new')}
                        onEdit={(user) => {
                            setSelectedUser(user);
                            setMode('edit');
                        }}
                        onDelete={(user) => {
                            setSelectedUser(user);
                            setMode('delete');
                        }}
                    />
                )}
            </Box>
        </Container>
    );
}