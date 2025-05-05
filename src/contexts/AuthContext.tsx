"use client";

import React, { createContext, useState, useContext, useEffect } from "react";
import { User, LoginCredentials } from "../types";
import { loginApi } from "../features/auth/api";

interface AuthContextType {
  user: User | null;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Create the context with a default value
const AuthContext = createContext<AuthContextType>({
  user: null,
  login: async () => {},
  logout: () => {},
  isAuthenticated: false,
  isLoading: true,
});

// Custom hook to use the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // Check for existing user on initial load
  useEffect(() => {
    const checkExistingUser = () => {
      const storedUser = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (storedUser && token) {
        try {
          const parsedUser = JSON.parse(storedUser);
          setUser(parsedUser);
          setIsAuthenticated(true);
        } catch {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }

      setIsLoading(false);
    };

    checkExistingUser();
  }, []);

  // Login function that uses the API
  const login = async (credentials: LoginCredentials) => {
    // Validate credentials
    if (!credentials.username) {
      throw new Error("Username is required");
    }

    if (credentials.password.length < 8) {
      throw new Error("Password must be at least 8 characters long");
    }

    try {
      setIsLoading(true);
      // Call the API
      const data = await loginApi(credentials);

      // Save user data
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", data.token);
      setUser(data.user);
      setIsAuthenticated(true);
    } catch (error) {
      // If it's already an Error object, throw it directly
      if (error instanceof Error) {
        throw error;
      }
      // Otherwise, create a new Error
      throw new Error("Authentication failed");
    } finally {
      setIsLoading(false);
    }
  };

  const logout = () => {
    setIsLoading(true);
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
    setIsAuthenticated(false);
    setIsLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{ user, login, logout, isAuthenticated, isLoading }}
    >
      {children}
    </AuthContext.Provider>
  );
};
