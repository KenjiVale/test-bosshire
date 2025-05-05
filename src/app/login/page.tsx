"use client";

import React, { useState, useEffect } from "react";
import { LoadingContainer, LoginContainer } from "./components";

export default function LoginPage() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <LoadingContainer />;
  }

  return <LoginContainer />;
}
