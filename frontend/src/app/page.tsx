"use client";

import { useState, useEffect } from "react";
import { Container } from "@mui/material";
import UserGrid from "../components/UserGrid";
import UserForm from "../components/UserForm";
import { userApi } from "../services/api";
import { User, FormMode } from "../types";

export default function Home() {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [mode, setMode] = useState<FormMode>("view");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const data = await userApi.getAll();
      setUsers(data);
    } catch (error) {
      console.error("Failed to load users:", error);
      setError("Failed to load users");
    } finally {
      setIsLoading(false);
    }
  };

  const handleSubmit = async (userData: Partial<User>) => {
    setIsLoading(true);
    setError(null);
    try {
      if (mode === "new") {
        await userApi.create(userData as Omit<User, "id">);
        await loadUsers();
        setMode("view");
        setSelectedUser(null);
      } else if (mode === "edit" && selectedUser) {
        await userApi.update({ ...userData, id: selectedUser.id } as User);
        await loadUsers();
        setMode("view");
        setSelectedUser(null);
      } else if (mode === "delete" && selectedUser) {
        await userApi.delete(selectedUser.id);
        await loadUsers();
        setMode("view");
        setSelectedUser(null);
      }
    } catch (error: any) {
      setError(error.message || "Operation failed");
    } finally {
      setIsLoading(false);
    }
  };

  const handleDelete = async (user: User) => {
    setIsLoading(true);
    setError(null);
    try {
      await userApi.delete(user.id);
      setUsers((prevUsers) => prevUsers.filter((u) => u.id !== user.id));
      setMode("view");
      setSelectedUser(null);
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Container maxWidth="lg" sx={{ py: { xs: 2, sm: 3, md: 4 } }}>
      {mode !== "view" ? (
        <UserForm
          mode={mode}
          user={selectedUser || undefined}
          onSubmit={handleSubmit}
          onBack={() => {
            setMode("view");
            setSelectedUser(null);
            setError(null);
          }}
          isLoading={isLoading}
          error={error}
        />
      ) : (
        <UserGrid
          users={users}
          onNew={() => setMode("new")}
          onEdit={(user) => {
            setSelectedUser(user);
            setMode("edit");
          }}
          onDelete={handleDelete}
          isLoading={isLoading}
          error={error}
        />
      )}
    </Container>
  );
}
