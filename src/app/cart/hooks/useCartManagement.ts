"use client";

import { useState } from "react";
import { useNotification } from "../../../contexts/NotificationContext";
import { Cart, Product } from "../../../types";
import {
  fetchCarts,
  createCart,
  updateCart,
  deleteCart as apiDeleteCart,
} from "../api";

export const useCartManagement = () => {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [dateRange, setDateRange] = useState<{
    start: Date | null;
    end: Date | null;
  }>({ start: null, end: null });
  const { showNotification } = useNotification();

  // Fetch all carts
  const loadCarts = async () => {
    try {
      setIsLoading(true);
      const data = await fetchCarts();
      setCarts(data);
    } catch {
      showNotification("Failed to load carts", "error");
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new cart
  const addCart = async (
    items: { productId: string; product: Product; quantity: number }[]
  ) => {
    if (items.length === 0) return;

    try {
      setIsLoading(true);
      await createCart(items);
      showNotification("Cart created successfully", "success");

      // Refetch all carts to ensure data consistency
      await loadCarts();

      // Reset filters to show all carts including the new one
      setDateRange({ start: null, end: null });
    } catch (error) {
      showNotification("Failed to create cart", "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Update an existing cart
  const updateCartItems = async (
    cartId: string,
    items: { productId: string; product: Product; quantity: number }[]
  ) => {
    if (items.length === 0) return;

    try {
      setIsLoading(true);
      await updateCart(cartId, items);
      showNotification("Cart updated successfully", "success");

      // Refetch all carts to ensure data consistency
      await loadCarts();
    } catch (error) {
      showNotification("Failed to update cart", "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a cart
  const deleteCart = async (cartId: string) => {
    try {
      setIsLoading(true);
      await apiDeleteCart(cartId);
      showNotification("Cart deleted successfully", "success");

      // Update local state by removing the deleted cart
      setCarts((currentCarts) =>
        currentCarts.filter((cart) => cart.id !== cartId)
      );
    } catch (error) {
      showNotification("Failed to delete cart", "error");
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  // Refresh the carts list
  const refetchCarts = async () => {
    try {
      setIsLoading(true);
      await loadCarts();
    } catch (error) {
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    carts,
    isLoading,
    dateRange,
    setDateRange,
    loadCarts,
    addCart,
    updateCartItems,
    deleteCart,
    refetchCarts,
  };
};
