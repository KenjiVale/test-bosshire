"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "../../../contexts/AuthContext";
import { useNotification } from "../../../contexts/NotificationContext";
import { LoginCredentials } from "../../../types";

export const useLogin = () => {
  const [isLoading, setIsLoading] = useState(false);
  const { login } = useAuth();
  const { showNotification } = useNotification();
  const router = useRouter();

  const handleLogin = async (data: LoginCredentials) => {
    setIsLoading(true);
    try {
      await login(data);
      showNotification("Login successful!", "success");
      router.push("/cart");
    } catch (error) {
      showNotification(
        error instanceof Error ? error.message : "Login failed",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    handleLogin,
  };
};
