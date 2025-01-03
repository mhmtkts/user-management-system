import { useState, useEffect } from "react";
import {
  TextField,
  Button,
  Box,
  Switch,
  FormControlLabel,
  Alert,
  Paper,
  Grid,
  Container,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { User, FormMode } from "../types";

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
  isLoading,
  error,
}: UserFormProps) {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));
  const [formData, setFormData] = useState<Partial<User>>(
    user || {
      firstName: "",
      lastName: "",
      email: "",
      active: true,
    }
  );

  const [validationErrors, setValidationErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  useEffect(() => {
    if (user) {
      setFormData(user);
    }
  }, [user]);

  const resetForm = () => {
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      active: true,
    });
    setValidationErrors({
      firstName: "",
      lastName: "",
      email: "",
    });
  };

  const validateForm = (): boolean => {
    const newErrors = {
      firstName:
        formData.firstName?.length === 0
          ? "First name is required"
          : formData.firstName && formData.firstName.length < 2
          ? "First name must be at least 2 characters"
          : formData.firstName && formData.firstName.length > 50
          ? "First name cannot exceed 50 characters"
          : "",
      lastName:
        formData.lastName?.length === 0
          ? "Last name is required"
          : formData.lastName && formData.lastName.length < 2
          ? "Last name must be at least 2 characters"
          : formData.lastName && formData.lastName.length > 50
          ? "Last name cannot exceed 50 characters"
          : "",
      email: !formData.email
        ? "Email is required"
        : !/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(
            formData.email
          )
        ? "Please enter a valid email address"
        : "",
    };
    setValidationErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      await onSubmit(formData);
    } catch (error) {
      if (error instanceof Error) {
         // Email error check
        if (error.message.includes("Email already exists")) {
          setValidationErrors((prev) => ({
            ...prev,
            email: "Email already exists",
          }));
        }
      }
    }
  };

  return (
    <Container maxWidth="md">
      <Paper elevation={3} sx={{ p: { xs: 2, sm: 3 }, m: { xs: 1, sm: 2 } }}>
        {error && (
          <Alert severity="error" sx={{ mb: 2 }}>
            {error}
          </Alert>
        )}

        <form onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="First Name"
                value={formData.firstName}
                onChange={(e) => {
                  setFormData({ ...formData, firstName: e.target.value });
                  setValidationErrors({ ...validationErrors, firstName: "" });
                }}
                error={!!validationErrors.firstName}
                helperText={validationErrors.firstName}
                disabled={mode === "delete"}
                required
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Last Name"
                value={formData.lastName}
                onChange={(e) => {
                  setFormData({ ...formData, lastName: e.target.value });
                  setValidationErrors({ ...validationErrors, lastName: "" });
                }}
                error={!!validationErrors.lastName}
                helperText={validationErrors.lastName}
                disabled={mode === "delete"}
                required
                inputProps={{ maxLength: 50 }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Email"
                type="email"
                value={formData.email}
                onChange={(e) => {
                  setFormData({ ...formData, email: e.target.value });
                  setValidationErrors((prev) => ({ ...prev, email: "" }));
                }}
                error={!!error || !!validationErrors.email}
                helperText={error || validationErrors.email}
                disabled={mode === "delete"}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <FormControlLabel
                control={
                  <Switch
                    checked={formData.active}
                    onChange={(e) =>
                      setFormData({ ...formData, active: e.target.checked })
                    }
                    disabled={mode === "delete"}
                  />
                }
                label="Active"
              />
            </Grid>
            <Grid item xs={12}>
              <Box
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  gap: 1,
                }}
              >
                <Button
                  fullWidth={isMobile}
                  type="submit"
                  variant="contained"
                  color={mode === "delete" ? "error" : "primary"}
                  disabled={
                    isLoading ||
                    (mode === "edit" && !formData.firstName) ||
                    (mode === "edit" && !formData.lastName) ||
                    (mode === "edit" && !formData.email)
                  }
                >
                  {mode === "new"
                    ? "Create"
                    : mode === "edit"
                    ? "Save"
                    : "Delete"}
                </Button>
                <Button
                  fullWidth={isMobile}
                  variant="outlined"
                  onClick={() => {
                    resetForm();
                    onBack();
                  }}
                >
                  Back
                </Button>
              </Box>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
}
