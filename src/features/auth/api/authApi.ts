"use client";

import { LoginCredentials, LoginResponse } from "../../../types";

export const loginApi = async (
  credentials: LoginCredentials
): Promise<LoginResponse> => {
  const response = await fetch("/api/auth", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(credentials),
  });

  if (!response.ok) {
    const errorData = await response.json();
    throw new Error(errorData.error || "Authentication failed");
  }

  return await response.json();
};
