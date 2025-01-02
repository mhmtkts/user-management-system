'use client';

import { useState } from 'react';
import { DataGrid, GridColDef, GridRowSelectionModel } from '@mui/x-data-grid';
import { 
    Button, 
    Box, 
    Alert, 
    CircularProgress,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions 
} from '@mui/material';
import { User } from '../types';

interface UserGridProps {
    users: User[];
    onNew: () => void;
    onEdit: (user: User) => void;
    onDelete: (user: User) => void;
    isLoading?: boolean;
    error?: string | null;
}

export default function UserGrid({ 
    users, 
    onNew, 
    onEdit, 
    onDelete, 
    isLoading = false,
    error = null 
}: UserGridProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);

    const handleSelectionChange = (selectionModel: GridRowSelectionModel) => {
        const selected = users.find(user => user.id === selectionModel[0]);
        setSelectedUser(selected || null);
    };

    const handleDelete = () => {
        if (selectedUser) {
            onDelete(selectedUser);
            setConfirmDelete(false);
        }
    };

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { field: 'firstName', headerName: 'First Name', width: 130 },
        { field: 'lastName', headerName: 'Last Name', width: 130 },
        { field: 'email', headerName: 'Email', width: 200 },
        { field: 'active', headerName: 'Active', width: 100, type: 'boolean' }
    ];

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box sx={{ width: '100%', height: 400 }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}
            
            <Box sx={{ mb: 2 }}>
                <Button 
                    variant="contained" 
                    onClick={onNew} 
                    sx={{ mr: 1 }}
                >
                    New
                </Button>
                <Button 
                    variant="contained" 
                    onClick={() => selectedUser && onEdit(selectedUser)}
                    disabled={!selectedUser}
                    sx={{ mr: 1 }}
                >
                    Edit
                </Button>
                <Button 
                    variant="contained" 
                    color="error"
                    onClick={() => selectedUser && setConfirmDelete(true)}
                    disabled={!selectedUser}
                >
                    Delete
                </Button>
            </Box>

            <DataGrid
                rows={users}
                columns={columns}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                checkboxSelection
                onRowSelectionModelChange={handleSelectionChange}
                rowSelectionModel={selectedUser ? [selectedUser.id] : []}
            />

            <Dialog
                open={confirmDelete}
                onClose={() => setConfirmDelete(false)}
            >
                <DialogTitle>Delete User</DialogTitle>
                <DialogContent>
                    Are you sure you want to delete this user?
                </DialogContent>
                <DialogActions>
                    <Button onClick={() => setConfirmDelete(false)}>
                        Cancel
                    </Button>
                    <Button color="error" onClick={handleDelete}>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Box>
    );
}