import { NextResponse } from "next/server";

// Simple GET endpoint that doesn't require authentication
export async function GET() {
  return NextResponse.json({
    message: "Test endpoint working",
    timestamp: new Date().toISOString(),
  });
}
