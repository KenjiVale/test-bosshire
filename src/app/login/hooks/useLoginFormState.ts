"use client";

import { useState } from "react";
import { useLogin as useAuthLogin } from "../../auth/hooks";

export const useLoginFormState = () => {
  const [showPassword, setShowPassword] = useState(false);
  const authLogin = useAuthLogin();

  const toggleShowPassword = () => {
    setShowPassword((prev) => !prev);
  };

  return {
    isLoading: authLogin.isLoading,
    showPassword,
    handleLogin: authLogin.handleLogin,
    toggleShowPassword,
  };
};
