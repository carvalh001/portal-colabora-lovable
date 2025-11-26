import React, { createContext, useContext, useState, useEffect } from "react";
import { User, UserRole } from "@/types";
import { useCurrentUser } from "@/hooks/useAuthQueries";
import { useQueryClient } from "@tanstack/react-query";
import { authService } from "@/services/authService";
import { userService } from "@/services/userService";

interface AuthContextType {
  user: User | null;
  login: (usernameOrEmail: string, senha: string) => Promise<boolean>;
  logout: () => void;
  register: (userData: any) => Promise<boolean>;
  updateUserRole: (userId: number, newRole: UserRole) => Promise<void>;
  isAuthenticated: boolean;
  isLoading: boolean;
  hasRole: (role: UserRole) => boolean;
  hasAnyRole: (roles: UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const queryClient = useQueryClient();
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(() => {
    return !!localStorage.getItem('token');
  });

  // Usar React Query para buscar dados do usuário atual
  const { data: user, isLoading, refetch } = useCurrentUser(isAuthenticated);

  const login = async (usernameOrEmail: string, senha: string): Promise<boolean> => {
    try {
      const response = await authService.login({
        username: usernameOrEmail,
        senha,
      });
      
      if (response.access_token) {
        setIsAuthenticated(true);
        // Refetch user data
        await refetch();
        return true;
      }
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const logout = () => {
    authService.logout();
    setIsAuthenticated(false);
    // Limpar todo o cache do React Query
    queryClient.clear();
  };

  const register = async (userData: any): Promise<boolean> => {
    try {
      await authService.register(userData);
      return true;
    } catch (error) {
      console.error('Register error:', error);
      return false;
    }
  };

  const updateUserRole = async (userId: number, newRole: UserRole): Promise<void> => {
    try {
      await userService.updateUserRole(userId, newRole);
      // Refetch user data se for o usuário atual
      if (user?.id === userId) {
        await refetch();
      }
    } catch (error) {
      console.error('Update user role error:', error);
      throw error;
    }
  };

  const hasRole = (role: UserRole): boolean => {
    return user?.papel === role;
  };

  const hasAnyRole = (roles: UserRole[]): boolean => {
    return user ? roles.includes(user.papel) : false;
  };

  return (
    <AuthContext.Provider
      value={{
        user: user || null,
        login,
        logout,
        register,
        updateUserRole,
        isAuthenticated,
        isLoading,
        hasRole,
        hasAnyRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
