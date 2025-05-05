"use client";

import { Cart, Product } from "../../../types";

export const fetchCarts = async (): Promise<Cart[]> => {
  const response = await fetch("/api/carts");

  if (!response.ok) {
    throw new Error("Failed to fetch carts");
  }

  return await response.json();
};

export const createCart = async (
  items: { productId: string; product: Product; quantity: number }[]
): Promise<Cart> => {
  const response = await fetch("/api/carts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error("Failed to create cart");
  }

  return await response.json();
};

export const updateCart = async (
  cartId: string,
  items: { productId: string; product: Product; quantity: number }[]
): Promise<Cart> => {
  const response = await fetch(`/api/carts/${cartId}`, {
    method: "PUT",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ items }),
  });

  if (!response.ok) {
    throw new Error(`Failed to update cart ${cartId}`);
  }

  return await response.json();
};

export const deleteCartById = async (cartId: string): Promise<void> => {
  const response = await fetch(`/api/carts/${cartId}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(`Failed to delete cart ${cartId}`);
  }
};
