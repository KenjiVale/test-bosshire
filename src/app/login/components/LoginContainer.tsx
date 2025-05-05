"use client";

import React from "react";
import { Container, Box, Typography, Paper } from "@mui/material";
import { LoginForm } from "./LoginForm";

export const LoginContainer = () => {
  return (
    <Container maxWidth="sm">
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          py: 4,
        }}
      >
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography component="h1" variant="h4" align="center" gutterBottom>
            E-Commerce Admin
          </Typography>
          <Typography variant="h6" align="center" color="text.secondary" mb={4}>
            Login to your account
          </Typography>
          <LoginForm />
        </Paper>
      </Box>
    </Container>
  );
};
