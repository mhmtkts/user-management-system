'use client';

import { useState, useEffect } from 'react';
import { TextField, Button, Box, Switch, FormControlLabel, Alert, CircularProgress } from '@mui/material';
import { User, FormMode } from '../types';
import { validateEmail } from '../utils/validation';

interface UserFormProps {
    mode: FormMode;
    user?: User;
    onSubmit: (user: Partial<User>) => Promise<void>;
    onBack: () => void;
    isLoading?: boolean;
    error?: string | null;
}

export default function UserForm({ 
    mode, 
    user, 
    onSubmit, 
    onBack,
    isLoading = false,
    error = null 
}: UserFormProps) {
    const [formData, setFormData] = useState<Partial<User>>(
        user || {
            firstName: '',
            lastName: '',
            email: '',
            active: true
        }
    );

    const [validationErrors, setValidationErrors] = useState({
        firstName: '',
        lastName: '',
        email: ''
    });

    useEffect(() => {
        if (user) {
            setFormData(user);
        }
    }, [user]);

    const validateForm = (): boolean => {
        const newErrors = {
            firstName: !formData.firstName ? 'First name is required' : 
                      formData.firstName.length < 2 ? 'First name must be at least 2 characters' :
                      formData.firstName.length > 50 ? 'First name cannot exceed 50 characters' : '',
            lastName: !formData.lastName ? 'Last name is required' : 
                     formData.lastName.length < 2 ? 'Last name must be at least 2 characters' :
                     formData.lastName.length > 50 ? 'Last name cannot exceed 50 characters' : '',
            email: !formData.email ? 'Email is required' : 
                   !validateEmail(formData.email) ? 'Please enter a valid email address' : ''
        };
        setValidationErrors(newErrors);
        return !Object.values(newErrors).some(error => error !== '');
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateForm()) return;
        await onSubmit(formData);
    };

    const getActionButtonText = () => {
        if (isLoading) return 'Processing...';
        switch (mode) {
            case 'new': return 'Create';
            case 'edit': return 'Save';
            case 'delete': return 'Delete';
            default: return 'Submit';
        }
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, mx: 'auto' }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, firstName: value });
                    if (value.length > 50) {
                        setValidationErrors(prev => ({
                            ...prev,
                            firstName: 'First name cannot exceed 50 characters'
                        }));
                    } else if (value.length < 2 && value.length > 0) {
                        setValidationErrors(prev => ({
                            ...prev,
                            firstName: 'First name must be at least 2 characters'
                        }));
                    } else {
                        setValidationErrors(prev => ({
                            ...prev,
                            firstName: ''
                        }));
                    }
                }}
                margin="normal"
                disabled={mode === 'delete'}
                required
                error={!!validationErrors.firstName}
                helperText={validationErrors.firstName}
                inputProps={{ maxLength: 50 }}
            />

            <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, lastName: value });
                    if (value.length > 50) {
                        setValidationErrors(prev => ({
                            ...prev,
                            lastName: 'Last name cannot exceed 50 characters'
                        }));
                    } else if (value.length < 2 && value.length > 0) {
                        setValidationErrors(prev => ({
                            ...prev,
                            lastName: 'Last name must be at least 2 characters'
                        }));
                    } else {
                        setValidationErrors(prev => ({
                            ...prev,
                            lastName: ''
                        }));
                    }
                }}
                margin="normal"
                disabled={mode === 'delete'}
                required
                error={!!validationErrors.lastName}
                helperText={validationErrors.lastName}
                inputProps={{ maxLength: 50 }}
            />

            <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                    const value = e.target.value;
                    setFormData({ ...formData, email: value });
                    if (!validateEmail(value) && value.length > 0) {
                        setValidationErrors(prev => ({
                            ...prev,
                            email: 'Please enter a valid email address'
                        }));
                    } else {
                        setValidationErrors(prev => ({
                            ...prev,
                            email: ''
                        }));
                    }
                }}
                margin="normal"
                disabled={mode === 'delete'}
                required
                error={!!validationErrors.email}
                helperText={validationErrors.email}
            />

            <FormControlLabel
                control={
                    <Switch
                        checked={formData.active}
                        onChange={(e) => setFormData({ ...formData, active: e.target.checked })}
                        disabled={mode === 'delete'}
                    />
                }
                label="Active"
            />

            <Box sx={{ mt: 2 }}>
                <Button 
                    type="submit" 
                    variant="contained" 
                    color={mode === 'delete' ? 'error' : 'primary'}
                    sx={{ mr: 1 }}
                    disabled={isLoading}
                >
                    {getActionButtonText()}
                </Button>
                <Button 
                    onClick={onBack} 
                    variant="outlined"
                    disabled={isLoading}
                >
                    Back
                </Button>
            </Box>
        </Box>
    );
}