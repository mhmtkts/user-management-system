import { useState } from 'react';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { 
    Button, Box, Alert, CircularProgress, Dialog,
    DialogTitle, DialogContent, DialogActions, Paper,
    useTheme, useMediaQuery 
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

export default function UserGrid({ users, onNew, onEdit, onDelete, isLoading, error }: UserGridProps) {
    const [selectedUser, setSelectedUser] = useState<User | null>(null);
    const [confirmDelete, setConfirmDelete] = useState(false);
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    const columns: GridColDef[] = [
        { field: 'id', headerName: 'ID', width: 90 },
        { 
            field: 'firstName', 
            headerName: 'First Name', 
            width: 130,
            flex: isMobile ? 1 : undefined 
        },
        { 
            field: 'lastName', 
            headerName: 'Last Name', 
            width: 130,
            flex: isMobile ? 1 : undefined 
        },
        { 
            field: 'email', 
            headerName: 'Email', 
            width: 200,
            flex: isMobile ? 1 : undefined 
        },
        { 
            field: 'active', 
            headerName: 'Status', 
            width: 120,
            renderCell: (params) => (
                <Box sx={{ 
                    bgcolor: params.value ? '#E8F5E9' : '#FFEBEE',
                    color: params.value ? '#2E7D32' : '#C62828',
                    px: 2,
                    py: 0.5,
                    borderRadius: 1,
                    fontSize: '0.875rem'
                }}>
                    {params.value ? 'Active' : 'Inactive'}
                </Box>
            )
        }
    ];

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, m: { xs: 1, sm: 2 } }}>
            {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                    {error}
                </Alert>
            )}

            <Box sx={{ 
                mb: 2, 
                display: 'flex', 
                flexDirection: { xs: 'column', sm: 'row' },
                gap: 1 
            }}>
                <Button 
                    fullWidth={isMobile}
                    variant="contained" 
                    onClick={onNew}
                >
                    New
                </Button>
                <Button 
                    fullWidth={isMobile}
                    variant="contained" 
                    onClick={() => selectedUser && onEdit(selectedUser)}
                    disabled={!selectedUser}
                >
                    Edit
                </Button>
                <Button 
                    fullWidth={isMobile}
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
                autoHeight
                checkboxSelection
                density={isMobile ? "compact" : "standard"}
                onRowSelectionModelChange={(newSelection) => {
                    const selected = users.find(user => user.id === newSelection[0]);
                    setSelectedUser(selected || null);
                }}
                rowSelectionModel={selectedUser ? [selectedUser.id] : []}
                initialState={{
                    pagination: { paginationModel: { pageSize: 5 } },
                }}
                pageSizeOptions={[5, 10, 25]}
                sx={{
                    '& .MuiDataGrid-row:hover': {
                        bgcolor: '#F5F5F5'
                    }
                }}
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
                    <Button 
                        onClick={() => {
                            selectedUser && onDelete(selectedUser);
                            setConfirmDelete(false);
                        }} 
                        color="error"
                    >
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </Paper>
    );
}