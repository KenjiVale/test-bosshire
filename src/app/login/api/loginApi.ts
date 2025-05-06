"use client";

import { LoginCredentials, LoginResponse } from "../../../types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// Function to login user
export async function login(
  credentials: LoginCredentials
): Promise<LoginResponse> {
  try {
    const response = await fetch(`${API_BASE_URL}/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error(`Authentication failed: ${response.statusText}`);
    }

    const data: LoginResponse = await response.json();
    return data;
  } catch (error) {
    throw error;
  }
}
