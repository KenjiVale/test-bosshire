import { NextRequest, NextResponse } from "next/server";

const FAKE_STORE_API_URL = process.env.NEXT_PUBLIC_FAKE_STORE_API_URL;

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { username, password } = body;

    // Validate request body
    if (!username || !password) {
      return NextResponse.json(
        { error: "Username and password are required" },
        { status: 400 }
      );
    }

    // Forward the request to Fake Store API
    const response = await fetch(`${FAKE_STORE_API_URL}/auth/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (!response.ok) {
      // Forward the error from Fake Store API
      const error = await response.json();
      return NextResponse.json(
        { error: error.message || "Authentication failed" },
        { status: response.status }
      );
    }

    const data = await response.json();

    // Create our app's response format
    const loginResponse = {
      user: {
        username,
        token: data.token,
      },
      token: data.token,
    };

    return NextResponse.json(loginResponse);
  } catch (error) {
    console.error("Login error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
