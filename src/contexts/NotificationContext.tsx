"use client";

import React, { createContext, useContext } from "react";
import { SnackbarProvider, useSnackbar, VariantType } from "notistack";

interface NotificationContextType {
  showNotification: (message: string, variant?: VariantType) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification must be used within a NotificationProvider"
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { enqueueSnackbar } = useSnackbar();

  const showNotification = (
    message: string,
    variant: VariantType = "default"
  ) => {
    enqueueSnackbar(message, {
      variant,
      autoHideDuration: 2000,
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const AppNotificationProvider: React.FC<{
  children: React.ReactNode;
}> = ({ children }) => {
  return (
    <SnackbarProvider
      maxSnack={3}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
      autoHideDuration={2000}
      dense
      preventDuplicate
    >
      <NotificationProvider>{children}</NotificationProvider>
    </SnackbarProvider>
  );
};
