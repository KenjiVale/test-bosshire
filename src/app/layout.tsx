import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { AuthProvider } from "../contexts/AuthContext";
import { AppNotificationProvider } from "../contexts/NotificationContext";
import { ThemeProvider } from "../contexts/ThemeContext";
import { CartProvider } from "../contexts/CartContext";
import ClientStyleRegistry from "./registry";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "E-Commerce Admin Dashboard",
  description: "Admin dashboard for managing e-commerce products and carts",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${geistSans.variable} ${geistMono.variable}`}
        suppressHydrationWarning
      >
        <ClientStyleRegistry>
          <AuthProvider>
            <ThemeProvider>
              <AppNotificationProvider>
                <CartProvider>{children}</CartProvider>
              </AppNotificationProvider>
            </ThemeProvider>
          </AuthProvider>
        </ClientStyleRegistry>
      </body>
    </html>
  );
}
