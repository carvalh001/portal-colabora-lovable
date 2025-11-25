import React, { createContext, useContext, useState, useEffect } from "react";
import { User } from "@/types";
import { mockUsers } from "@/mock/users";

interface AuthContextType {
  user: User | null;
  login: (userId: string) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("userId");
    if (storedUserId) {
      const foundUser = mockUsers.find((u) => u.id === storedUserId);
      if (foundUser) {
        setUser(foundUser);
      }
    }
  }, []);

  const login = (userId: string) => {
    const foundUser = mockUsers.find((u) => u.id === userId);
    if (foundUser) {
      setUser(foundUser);
      localStorage.setItem("userId", userId);
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("userId");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
        isAuthenticated: !!user,
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
